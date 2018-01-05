import socket
import subprocess

socket.setdefaulttimeout(2)


def mdns_reverse(ip_addr):
    try:
        cmd = "/usr/bin/dig +time=2 -x {} @224.0.0.251 -p 5353".format(ip_addr)
        response = subprocess.run(cmd, stdout=subprocess.PIPE, shell=True)
        response = str(response.stdout)
        response = response.split('PTR')[2].split(';')[0]
        response = response.strip('\\t').strip('\\n')
        response = response[:-1].lower()
    except:
        response = ""
        pass

    return response


# DNS Resolver
def reverse_lookup(ip_addr):
    result = ""
    try:
        result = socket.gethostbyaddr(ip_addr)[0]

    except:
        result = mdns_reverse(ip_addr)
        pass

    result = "".join(result)

    if len(result) == 0:
        result = "Unknown"

    return str(result)


# Get domain name from fqdn
def get_domain_name(fqdn):
    domain_name = ""
    try:
        domain_name = fqdn.split('.')[1:]
        domain_name = ".".join(domain_name)
    except:
        pass

    return domain_name
