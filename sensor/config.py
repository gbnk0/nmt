import logging
import configparser
from pythonjsonlogger import jsonlogger

# For hiding scapy warnings
logging.getLogger("scapy.runtime").setLevel(logging.ERROR)


""" Logging part """
logger = logging.getLogger()

logHandler = logging.StreamHandler()
formatter = jsonlogger.JsonFormatter()
logHandler.setFormatter(formatter)
logger.addHandler(logHandler)
logger.setLevel(logging.ERROR)


""" Config part """
config = configparser.ConfigParser()
config.read('sensor.conf')

api_host = config['core_api']['host']
api_port = config['core_api']['port']

sensor_name = config['general']['sensor_name']

tcp_port_range = config['scanner']['tcp_port_range']

api_url = "http://{}:{}".format(api_host, api_port)

login = 'admin'
password = 'password'