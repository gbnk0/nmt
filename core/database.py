
import json
from shared.hashtools import make_shortuuid
import rethinkdb as r
import rethinkdb.errors
from config import db_host, db_port, db_name

tableList = ['hosts', 'networks', 'sensors', 'users']

""" INIT DATABASE """


def make_connection(dbhost, dbport, **kwargs):
    conn = r.connect(dbhost, dbport, **kwargs).repl()
    return conn


def create_database(conn, dbname):
    try:
        r.db_create(dbname).run(conn)
    except rethinkdb.errors.ReqlOpFailedError:
        pass
    return True


def create_table(conn, dbname, tablename):
    try:
        r.db(dbname).table_create(tablename).run(conn)
    except rethinkdb.errors.ReqlOpFailedError:
        pass
    return True


def init_database(dbhost, dbport, dbname, tableList):
    conn = make_connection(dbhost, dbport)
    create_database(conn, dbname)

    for table in tableList:
        create_table(conn, dbname, table)

    conn = make_connection(dbhost, dbport, db=dbname)
    return conn

setup_db = init_database(db_host, db_port, db_name, tableList)

conn = make_connection(db_host, db_port, db=db_name)



""" INSERT/UPDATE NETWORK """



def update_network(**kwargs):

    """ Network id is based on network name """

    ip_addr = kwargs.get('ip_addr')
    is_private = kwargs.get('is_private')
    name = kwargs.get('name')
    dns_names = kwargs.get('dns_names')
    is_scanning = kwargs.get('is_scanning', False)
    network_id = make_shortuuid(name)

    network = {
        'dns_names': dns_names,
        'ip_addr': ip_addr,
        'is_private' : is_private,
        'name': name,
        'id': network_id,
        'is_scanning': is_scanning,
        'updated_count': 0

    }

    network_exists = r.table("networks").insert([network], conflict="update")

    return network_exists.run(conn)


def delete_network(**kwargs):
    
    network_id = kwargs.get('network_id')

    network = r.table("networks").filter({'id': network_id})
    
    return network.delete().run(conn)

""" INSERT NEW HOST """
""" Host_id is based on mac_address"""


def new_host(**kwargs):

    mac_addr = kwargs.get('mac_addr')

    host = kwargs
    host['id'] = make_shortuuid(mac_addr)

    r.table("hosts").insert([host], conflict="update").run(conn)
    
    return True


""" GET ALL NETWORKS """


def get_networks(**kwargs):

    network_id = kwargs.get('network_id')
    ip_addr = kwargs.get('ip_addr', False)

    networks = r.table('networks')

    if network_id:
        networks = networks.filter({'id': network_id})

    if ip_addr:
        networks = networks.filter({'ip_addr': ip_addr})

    networks = networks.order_by(r.desc('name')).run(conn)


    return list(networks)


""" GET ALL HOSTS FROM THE SPECIFIED NETWORK ID"""


def get_hosts(**kwargs):


    network_id = kwargs.get('network_id')
    text_query = kwargs.get('text_query')
    host_id = kwargs.get('host_id')

    hosts = r.table('hosts')

    if network_id:
        hosts = hosts.filter({'network_id': network_id})

    if host_id:
        hosts = hosts.filter({'id': host_id})

    if text_query:
        hosts = hosts.filter(
            lambda doc: (doc['dns_names'].match(text_query)) | (
                doc['ip_addr'].match(text_query))
        
        )

    hosts = hosts.order_by('ip_addr').run(conn)

    return list(hosts)


""" SENSORS PART """
""" GET ALL SENSORS"""

def get_sensors(**kwargs):


    sensors = r.table('sensors').run(conn)
    
    return list(sensors)


""" INSERT/UPDATE SENSOR """


def update_sensor(**kwargs):

    ip_addr = kwargs.get('ip_addr')
    is_private = kwargs.get('is_private')
    name = kwargs.get('name')
    dns_names = kwargs.get('dns_names')
    interfaces = kwargs.get('interfaces', [])

    sensor = {

        'dns_names': dns_names,
        'ip_addr': ip_addr,
        'is_private' : is_private,
        'name': name,
        'id': make_shortuuid(name),
        'interfaces': interfaces

    }

    r.table("sensors").insert([sensor], conflict="update").run(conn)
    
    return True


"""" USERS PART """

def get_user(**kwargs):
    email = kwargs.get('email')
    user_id = kwargs.get('user_id')

    users = r.table('users')
    
    if email:
        users = users.filter({'email': email})
    
    if user_id:
        users = users.filter({'id': user_id})
    
    users = users.run(conn)
    user = list(users)
    
    if len(user)>0:
        user = user[0]
    else:
        user = None

    return user


def get_users(**kwargs):
    email = kwargs.get('email')
    user_id = kwargs.get('user_id')

    users = r.table('users')
    
    if email:
        users = users.filter({'email': email})
    
    if user_id:
        users = users.filter({'id': user_id})
    
    users = users.run(conn, read_mode="outdated")
    
    return list(users)


def add_user(**kwargs):

    email = kwargs.get('email')
    password = kwargs.get('password')

    user = {

        'email': email,
        'password': password,
    }

    user_exists = get_users(email=email)
    if len(user_exists) == 0:
        return r.table("users").insert([user], conflict="update").run(conn)
    
    return True

    
    
def server_status():
    if r.db('rethinkdb').table('server_status').run(conn):
        return True
    else:
        return False
