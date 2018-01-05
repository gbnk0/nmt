
import sys
import logging
import argparse
from queue import Queue
from attrdict import AttrDict
from shared import api_wrapper as apiwr
from shared import console
from shared.iptools import arp_scan, ping_scan, nmap_host, get_network
from shared.dnstools import reverse_lookup, get_domain_name
from shared.iftools import which_iface, sensor_ifaces
from attrdict import AttrDict
from datetime import datetime
from config import api_url, sensor_name, tcp_port_range, login, password


parser = argparse.ArgumentParser()
parser.add_argument('--no-portscan', help='disable port scan', action="store_true")
parser.add_argument('--no-icmp', help='disable ICMP scan', action="store_true")
parser.add_argument('--filter', help='Scan only selected network')
parser.add_argument('--show-networks', help='Display all networks provided by the API', action="store_true")
parser.add_argument('--discover', help='Auto-detect networks', action="store_true")

args = parser.parse_args()


''' Sensor object '''

class Sensor(object):
    """ Sensor object """
    
    def __init__(self, api_url, **kwargs):
        self.api = self.connect(api_url)
        self.interfaces = sensor_ifaces()
        self.portscan = kwargs.get('portscan', True)
        self.icmpscan = kwargs.get('icmpscan', True)
        self.filter = kwargs.get('filter', None)
        self.networks = self.api.get_networks(filter=self.filter)
        self.local_networks = []
        self.update()

    def connect(self, api_url):
        """ Connection to the api with the api_wrapper lib """
        
        print('\n------------------------------')
        try:
            console.write('Checking API connectivity at ' + api_url + "...", 3)
            api = apiwr.CoreApi(
                url=api_url,
                login=login,
                password=password
            )
            console.write('Successfully connected to ' + api_url + "...", 0)
            print('------------------------------\n')

        except BaseException:
            console.write('Unable to communicate with the API at ' + api_url, 2)
            print('------------------------------\n')
            sys.exit(2)

        return api


    def update(self):
        self.api.update_sensor(ip_addr=self.interfaces[0].ip_addr,
                               name=sensor_name,
                               dns_names='sensor1.local',
                               interfaces=self.interfaces)


    def full_scan(self, network):
        network_ip = network['ip_addr']

        # Choose interface for performing the scan
        interface = which_iface(network_ip)
        console.write('Using interface: {}'.format(interface), 3)

        updated_network = AttrDict({
            "hosts": [],
            "dns_names": ""
        })

        hosts = []

        # 1 - do arp scan
        console.write('Performing ARP Scan', 3)
        arphosts = arp_scan(interface, network_ip)
        if len(arphosts) > 0:
            console.write('Found {} Hosts'.format(len(arphosts)), 4)

        # 2 - do icmp scan
        # Fusion the two objects (pingscan[] and arpscan[])

        pinghosts = []
        if self.icmpscan:
            console.write('Performing ICMP Scan', 3)
            pinghosts = ping_scan(interface, network_ip)

        hosts = {x['mac_addr']: x for x in arphosts + pinghosts}.values()

        # Resolve each found host threaded ?
        for host in hosts:

            # Get current date
            host.last_seen = datetime.now().isoformat()

            """ dns """
            host.dns_names = reverse_lookup(host.ip_addr)
            console.write('Performing Reverse lookup on {} -> {}'.format(host.ip_addr, host.dns_names), 3)
            """"""

            """ PORT SCAN (uses nmap) """
            host.services = []
            if self.portscan:
                msg = 'Performing Service discovery on {} / TCP: {}'.format(str(host.ip_addr), tcp_port_range)
                console.write(msg, 3)
                host = nmap_host(
                    host, port_range=tcp_port_range)
            """"""

            """ Get mac vendor """
            macvendor = self.api.get_macvendor(host.mac_addr)
            console.write(
                "Resolving MAC vendor for {} -> {}".format(host.ip_addr, macvendor), 3)
            host['mac_vendor'] = macvendor
            """"""


            host['network_id'] = network['id']

            self.api.add_host(**host)

            # Get the network domain name if possible
            if hasattr(updated_network, 'dns_names'):
                if '.' in host.dns_names:
                    domain_name = get_domain_name(host.dns_names)
                    if len(domain_name) > len(updated_network['dns_names']):
                        updated_network.dns_names = domain_name

            updated_network['hosts'].append(host)

        return updated_network


def main():
    """ Main program """
    sensor = Sensor(api_url,
                    portscan=(not args.no_portscan),
                    icmpscan=(not args.no_icmp),
                    filter=args.filter)

    returned_networks = len(sensor.networks)
    if returned_networks == 0:
        msg = "No networks were returned by the API. You can add networks on the web interface."
        console.write(msg, 3)

        sys.exit(0)

    api = sensor.api

    if args.no_icmp:
        console.write('ICMP scan disabled', 3)

    if args.no_portscan:
        console.write('Port scan disabled', 3)

    if args.discover:

        net_count = 0

        for i in sensor.interfaces:
            network = get_network(i.ip_addr, i.netmask)
            api.update_network(**network)
            msg = 'Detected {} - {}'.format(network['name'],
                                            network['ip_addr'])
            console.write(msg, 3)
            net_count += 1

        msg = 'Added/updated {} network(s) to the api'.format(net_count)
        console.write(msg, 0)
        sys.exit(0)

    if args.show_networks:
        console.write('Network list:', 3)
        for network in sensor.networks:
            print(network['name'], network['ip_addr'])
        sys.exit(0)

    # Retreive networks from the API
    for network in sensor.networks:

        start = datetime.now()

        msg = "Starting scan on: {} - {}".format(
            network['name'], network['ip_addr'])

        console.write(msg, 3)

        network['is_scanning'] = True
        api.update_network(**network)
        scan_result = sensor.full_scan(network)

        network['is_scanning'] = False
        network['dns_names'] = scan_result.dns_names

        api.update_network(**network)

        hosts = scan_result.hosts

        end = datetime.now()
        elapsed = (end - start) / 60

        console.write("Scan finnished, {} host(s) found. Elapsed time: {}".format(
            len(hosts), elapsed), 0)
        print('\n------------------------------')

if __name__ == "__main__":
    main()
