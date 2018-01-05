import logging
logging.getLogger("scapy.runtime").setLevel(logging.ERROR)

import os, sys
import netifaces as ni
from attrdict import AttrDict
from ipaddress import ip_address, ip_network, IPv4Network, IPv4Interface
from scapy.all import srp, Ether, ARP, conf
from queue import Queue
import threading
from shared.iftools import sensor_ifaces

import nmap
try:
    nm = nmap.PortScanner()
except:
    print('Nmap not found', sys.exc_info()[0])
    sys.exit(0)
    


conf.verbose = 0

# Check if an ip is in the specified range


def in_network(ip_addr, network):
    result = False
    if ip_address(ip_addr) in ip_network(network, strict=False):
        result = True

    return result

def get_network(ip_addr, netmask):
    result = ip_addr
    
    interface = IPv4Interface(ip_addr+'/'+netmask)
    network = interface.network

    network = {
        'name': 'NET_' + str(network),
        'ip_addr': str(network)
    }

    return network


# Local IP -> MAC

def local_mac_from_ip(ip):
    for i in ni.interfaces():
        addrs = ni.ifaddresses(i)
        try:
            if_mac = addrs[ni.AF_LINK][0]['addr']
            if_ip = addrs[ni.AF_INET][0]['addr']
        except:
            if_mac = if_ip = None

        if if_ip == ip:
            return if_mac
    return ""

# Quiet ARP Scanner


def arp_scan(iface, network):
    results = []
    alive, dead = srp(Ether(dst="ff:ff:ff:ff:ff:ff") /
                      ARP(pdst=network), timeout=2, verbose=False, iface=iface)
    for i in range(0, len(alive)):
        mac = alive[i][1].hwsrc
        ip = alive[i][1].psrc

        cur_host = {
            "ip_addr": ip,
            "mac_addr": mac
        }

        results.append(AttrDict(cur_host))

    # Adding the local sensor to the list
    for addr in sensor_ifaces():
        if hasattr(addr, 'ip_addr'):
            cur_addr = addr['ip_addr']
            if in_network(cur_addr, network):
                cur_mac = local_mac_from_ip(cur_addr)
                for host in results:
                    if host['ip_addr'] == cur_addr:
                        host['mac_addr'] = cur_mac

                local_host = AttrDict(
                    {"ip_addr": cur_addr, "mac_addr": cur_mac})
                if not local_host in results:
                    results.append(local_host)

    return results


def ping(ip):
    return os.system("ping -c 1 " + ip + " >/dev/null 2>&1") == 0


def arping(iface, ip):
    result = ""
    ans, uans = srp(Ether(dst="FF:FF:FF:FF:FF:FF")/ARP(pdst=ip),
                    timeout=2, inter=0.1, verbose=False, iface=iface)
    if len(ans) > 0:
        for snd, rcv in ans:
            result = rcv.sprintf(r"%Ether.src%")

    return result


def ping_scan(iface, network):

    input_queue = Queue()
    results = []

    class PingHostThread(threading.Thread):

        def __init__(self, iface, input_queue, results):
            super().__init__()
            self.input_queue = input_queue
            self.results = results
            self.iface = iface

        def run(self):
            while True:
                ip = self.input_queue.get()
                is_alive = ping(ip)
                if is_alive:
                    mac_addr = arping(self.iface, ip)
                    if len(mac_addr) > 0:
                        cur_host = {
                            "ip_addr": ip,
                            "mac_addr": mac_addr
                        }

                        self.results.append(AttrDict(cur_host))
                self.input_queue.task_done()

    # Start 20 Threads, all are waiting in run -> self.input_queue.get()
    for i in range(32):
        thread = PingHostThread(iface, input_queue, results)
        thread.setDaemon(True)
        thread.start()

    # Fill the input queue
    for addr in IPv4Network(network, strict=False):
        input_queue.put(str(addr))

    input_queue.join()

    return results



def nmap_host(host, **kwargs):

    tcp_port_range = kwargs.get('tcp_port_range', '22-443')

    services = []
    details = {}
    ip_addr = host.ip_addr

    nm.scan(ip_addr, tcp_port_range,
            arguments='-sS -sU --max-retries 1 -PN -n -O')
    
    """ There is a better way to do that """
    for proto in nm[ip_addr].all_protocols():
        
        proto_dict = {
            'name': proto,
            'ports': []
        }

        ports = []
        for port in list(nm[ip_addr][proto].keys()):
            if nm[ip_addr][proto][port]['state'] == 'open':
                if not port in ports:
                    ports.append(port)
        
        proto_dict['ports'] = ports
        
        if not proto_dict in services:
            services.append(proto_dict)

    for l in nm[ip_addr]['osmatch']:
        
        for os in l['osclass']:
            
            accuracy = int(os['accuracy'])
            osfamily = os['osfamily']
            if osfamily != None and accuracy >= 90:
                details['osfamily'] = osfamily
                details['osgen'] = os['osgen']

    host.services = services
    host.details = details
    
    return host

    

if __name__ == "__main__":
    # print(ping_scan("192.168.56.0/24"))
    print(arping("vboxnet0", "192.168.56.1"))
    print(ping_scan('vboxnet0', '192.168.56.0/24'))
    print(nmap_host('192.168.40.254'))
