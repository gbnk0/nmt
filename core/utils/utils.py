import os
import json
from ipaddress import IPv4Network


def is_private(string):
    """ Check if a network address is private or public """
    result = False
    result = IPv4Network(string, strict=False).is_private

    return result



""" PLUGINS """

def get_plugin_info(plugin_path):

    infos = {
        "version": "Unknown"
    }

    try:
        with open(plugin_path + '/plugin.json', 'r') as info_file:
            infos = json.load(info_file)
    except:
        pass

    return infos


def list_plugins(path):
    """ list all plugins """
    plugins = []
    available_path = path + '/available/'
    for root, dirs, files in os.walk(available_path):
        for filename in dirs:
            plugin_path = available_path + filename
            plugin_info = get_plugin_info(plugin_path)
            
            plugin = {
                "path": plugin_path,
            }
            
            for k,v in plugin_info.items():
                plugin[k] = v

            plugins.append(plugin)

    return plugins


