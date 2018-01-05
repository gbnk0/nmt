
import pprint
import requests
import json
import os

datapath = os.path.abspath(__file__).split('/')[:-1]
datapath = "/".join(datapath) + "/data/"

macvendors = {}
with open(datapath + 'mac_vendors.txt', 'r') as f:
    for line in f:
        line = line.strip().rstrip()
        line = line.split(';')
        mac = line[0]
        vendor = line[1]
        macvendors[mac] = vendor


def get_mac_vendor(mac):
    result = "Unknown"

    # Anonymize mac
    mac = mac.split(':')[:3]
    mac = "".join(mac)

    mac = mac.strip(':')
    mac = mac.upper()

    if mac in macvendors.keys():
        result = macvendors[mac]

    return result

if __name__ == "__main__":
    print(get_mac_vendor("4c:34:88"))
