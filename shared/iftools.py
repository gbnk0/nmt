from attrdict import AttrDict
import netifaces as ni
from ipaddress import ip_address
import re


def is_mac(mac):
    result = False

    result = bool(
        re.match('^' + '[\:\-]'.join(['([0-9a-f]{2})']*6) + '$', mac.lower()))

    return result


def is_ip(ip):
    result = False
    try:
        result = ip_address(ip)
        if result:
            result = True
    except:
        pass
    return result


def sensor_ifaces():
    interfaces = []

    sensor_interfaces = ni.interfaces()

    for iface in sensor_interfaces:
        if not 'lo' in iface:
            interface = {
                'name': iface,
            }

            ifaddrs = ni.ifaddresses(iface).items()

            for info in ifaddrs:

                addr = info[1][0]['addr']
                

                if is_mac(addr):
                    interface['mac_addr'] = addr

                if is_ip(addr):
                    interface['ip_addr'] = addr

                mask_infos = info[1][0]

                if 'netmask' in mask_infos:
                    netmask = mask_infos['netmask']
                    if is_ip(netmask):
                        interface['netmask'] = netmask



                if 'ip_addr' in interface.keys():
                    interface = AttrDict(interface)
                    if not interface in interfaces:
                        interfaces.append(interface)

    return interfaces


def which_iface(ip):
    result = None
    # Remove netmask
    if "/" in ip:
        ip = ip.split('/')[0]

    # Remove last digit
    ip = ip.split('.')[:-1]
    ip = ".".join(ip)

    for iface in sensor_ifaces():
        try:
            if hasattr(iface, 'ip_addr'):
                sensorip = iface.ip_addr
                if sensorip.startswith(ip):
                    result = iface.name

        except ValueError:
            pass

    return result

if __name__ == "__main__":
    print("INTERFACES", sensor_ifaces())
    print("IS IP: ", is_ip("192.168.56.22"))
    print("WHICH IFACE:", which_iface("192.168.56.22"))
    print("IS MAC:", is_mac("0a:00:27:00:00:00"))
