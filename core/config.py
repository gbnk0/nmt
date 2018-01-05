import configparser

""" Config part """
config = configparser.ConfigParser()
config.read('core.conf')


""" GENERAL CONFIG """


production = bool(int(config['general']['production']))


""" DATABASE CONFIG """


db_host = config['database']['host']
db_port = int(config['database']['port'])
db_name = config['database']['name']


""" API CONFIG """

debug = bool(int(config['api']['debug']))