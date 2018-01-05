
import os
import sys
import logging
from config import debug, production
from sanic import Sanic
from sanic import response
from sanic_cors import CORS

# Blueprints for swagger ( REMOVE IN PRODUCTION MODE)
if not production:
    from sanic_openapi import swagger_blueprint, openapi_blueprint

from sanic_openapi import doc

import json
import database as db
from shared import mactools
from time import sleep
from shared.mltools import is_gateway
from shared.console import write
from utils.utils import is_private, list_plugins

from sanic_jwt import initialize
from sanic_jwt import exceptions
from sanic_jwt.decorators import protected


# Get script paths
pathname = os.path.dirname(sys.argv[0])
fullpath = os.path.abspath(pathname)

""" DEFINE THE APP """

app = Sanic(strict_slashes=True)

""" OPENAPI/ SWAGGER BLUEPRINTS """

if not production:
    # Blueprints for swagger ( REMOVE IN PRODUCTION MODE)
    app.blueprint(openapi_blueprint)
    app.blueprint(swagger_blueprint)


""" AUTH FUNCTIONS """

async def authenticate(request, *args, **kwargs):
    """ This function is used for checking
        user/password from the database """
    user = None

    email = request.json.get('email', None)
    password = request.json.get('password', None)

    if not email or not password:
        raise exceptions.AuthenticationFailed("Missing email or password.")

    user = db.get_user(email=email)

    if (user is None) or (password != user['password']):
        raise exceptions.AuthenticationFailed("Incorrect user/password")

    return user


def retrieve_user(request, payload, *args, **kwargs):
    if payload:
        user_id = payload.get('user_id', None)
        user = db.get_user(user_id=user_id)

        return user
    else:
        return None

initialize(app,
           authenticate,
           retrieve_user=retrieve_user
        )


""" CORS """

cors = CORS(app, resources={r"*": {"origins": "*"}})

@doc.summary("Returns route METHODS")
@app.middleware('request')
async def method_interception(request):
    if request.method == 'OPTIONS':
        return response.json(
            {},
            headers={'Access-Control-Max-Age': 3600},
            status=200
        )


""" HOSTS """

def count_ports(host):
    svc_count = 0

    for proto in host['services']:
        for port in proto['ports']:
            svc_count += 1

    host['open_ports'] = svc_count

    return host

@doc.summary("Show host details")
@app.route("/hosts/<host_id>/", methods=['GET'])
@protected()
async def get_host(request, host_id):

    results = {
        "host": {
        }
    }

    hosts = db.get_hosts(host_id=host_id)

    if len(hosts) > 0:
        host = hosts[0]
        host = count_ports(host)

        results['host'] = host
        results['host']['network'] = db.get_networks(
            network_id=host['network_id'])[0]

    return response.json(results)


""" NETWORKS """


@doc.summary("Returns all discovered networks")
@app.route("/networks/", methods=['GET'])
@protected()
async def get_networks(request):

    results = {
        "results": []
    }

    args = request.args
    filters = None

    if 'filter' in args:
        filters = args['filter'][0]

    networks = db.get_networks(ip_addr=filters)

    total = len(networks)

    if total >0:

        for network in networks:

            network_id = network['id']
            network['host_count'] = len(db.get_hosts(network_id=network_id))
            results['results'].append(network)

    results['total'] = total

    return response.json(results)


@doc.summary("Updates networks")
@app.route("/networks/", methods=['POST'])
@protected()
async def update_networks(request):

    results = {}
    status_code = 201

    if request.json:
        json_query = request.json

        if type(json_query) != dict:
            json_query = json.loads(json_query)

        isprivate = is_private(json_query['ip_addr'])
        json_query['is_private'] = isprivate

        db.update_network(**json_query)
        results = {"status": "created"}

    else:
        results = {"status": "error"}
        status_code = 500



    results = response.json(results, status=status_code)
    
    return results


@doc.summary("Deletes an array of networkIds")
@app.route("/networks/", methods=['DELETE'])
@protected()
async def delete_network_list(request):

    results = {
        "status": "deleted"
    }

    args = request.args
    filters = None

    if request.json:
        json_query = request.json
        for network_id in json_query:
            db.delete_network(network_id=network_id)

    return response.json(results)



@doc.summary("Return all hosts in the selected network_id")
@app.route("/networks/<network_id>/", methods=['GET'])
@protected()
async def get_network_hosts(request, network_id):

    results = {
        "network": {
        },
        "results": []
    }

    hosts = db.get_hosts(network_id=network_id)

    for h in hosts:
        h = count_ports(h)
        results['results'].append(h)

    network = db.get_networks(network_id=network_id)

    results['network'] = network[0]

    results['total'] = len(hosts)

    return response.json(results)


@doc.summary("Delete the specified network")
@app.route("/networks/<network_id>/", methods=['DELETE'])
@protected()
async def delete_network(request, network_id):

    results = {}

    db.delete_network(network_id=network_id)
    results = {"status": "deleted"}

    return response.json(results, status=200)


@doc.summary("Updates hosts in the selected network_id")
@app.route("/networks/<network_id>/", methods=['POST'])
@protected()
async def update_network_hosts(request, network_id):
    results = {}

    json_query = request.json

    if type(json_query) != dict:
        json_query = json.loads(json_query)
        if not 'details' in json_query.keys():
            json_query['details'] = {}

    db.new_host(**json_query)
    results = {"status": "created"}

    return response.json(results, status=201)


""" SENSORS """


@doc.summary("Returns all sensors")
@app.route("/sensors/", methods=['GET'])
@protected()
async def get_sensors(request):
    sensors = db.get_sensors()
    results = {
        "total": len(sensors),
        "results": sensors
    }

    return response.json(results)


@doc.summary("Updates sensors")
@app.route("/sensors/", methods=['POST'])
@protected()
async def update_sensors(request):

    results = {}

    json_query = request.json

    if type(json_query) != dict:
        json_query = json.loads(json_query)

    db.update_sensor(**json_query)
    results = {"status": "created"}

    return response.json(results, status=201)


""" CHECK """


@doc.summary("Check if api respond")
@app.route("/check", methods=['GET'])
async def check_api(request):
    results = {
        "status": "success"
    }

    return response.json(results)


""" METRICS """


@doc.summary("Metrics route")
@app.route("/metrics/", methods=['GET'])
@protected()
async def get_metrics(request):
    hosts = db.get_hosts()
    ports_count = 0

    for host in hosts:
        for service in host['services']:
            ports_count += 1

    host_count = len(hosts)

    results = {
        "host_count": host_count,
        "network_count": len(db.get_networks()),
        "sensor_count": len(db.get_sensors()),
        "ports_count": ports_count
    }

    return response.json(results)


""" GRAPHS """


def last_digit(ip_addr):
    result = ip_addr.split('.')[-1]
    result = "." + result
    return result

def edge(src, dst):
    _edge = {"from": src, "to": dst}
    return _edge


@doc.summary("Returns graphs v2")
@app.route("/graphs/", methods=['GET'])
@app.route("/graphs/<network_id>/", methods=['GET'])
@protected()
async def get_graphs(request, network_id=None):

    results = {
        "nodes": [],
        "edges": []
    }
    filters = {
        "network_id": network_id
    }

    for network in db.get_networks(**filters):

        gateway = {}
        
        hosts = db.get_hosts(network_id=network['id'])
        if len(hosts) > 0:

            for host in hosts:
                if is_gateway(host):
                    gateway = host

                # Make host label
                label = "{}\n {}".format(
                    last_digit(host['ip_addr']),
                    host['dns_names']
                )

                # Make host id + network_id etc..
                node = {"id": host['id'], "label": label, "group": host['network_id']}
                results["nodes"].append(node)

            if gateway != {}:
                for host in hosts:
                    if host != gateway:
                        if host['network_id'] == gateway['network_id']:
                            host_to_gw = edge(host['id'], gateway['id'])
                            results['edges'].append(host_to_gw)


    return response.json(results)


""" USERS """


@doc.summary("Get all users")
@app.route("/users/", methods=['GET'])
@protected()
async def get_users(request):

    results = {
        "results": []
    }
    users = db.get_users()
    for u in users:
        u.pop('password', None)

    results['results'] = users
    return response.json(results, status=200)



""" MAC """


@doc.summary("Resolve mac address's vendor")
@app.route("/macvendor/<mac_addr>/", methods=['GET'])
@protected()
async def get_macvendor(request, mac_addr):

    results = {
        "mac_addr": mac_addr,
        "vendor": mactools.get_mac_vendor(mac_addr)
    }

    return response.json(results, status=200)


""" SUGGESTIONS/SEARCH """


@doc.summary("Search endpoint")
@app.route("/search", methods=['GET'])
@protected()
async def search(request):
    query = {}
    text_query = request.args.get('q')
    
    if text_query:
        query['text_query'] = text_query

    hosts = db.get_hosts(**query)

    results = {
        "total": len(hosts),
        "results": hosts
    }

    return response.json(results)


""" PLUGINS """

plugin_list = list_plugins(fullpath + '/data/plugins')

@doc.summary("List all available plugins and versions")
@app.route("/plugins/", methods=['GET'])
@protected()
async def get_plugins(request):
    query = {}
    

    results = {
        "total": len(plugin_list),
        "results": plugin_list
    }

    return response.json(results)


if __name__ == "__main__":


    app.config.LOGO = False
    app.config.SANIC_JWT_USER_ID = 'id'
    app.config.SANIC_JWT_SECRET = 'gkqhkiG9w0BBQ0wMzAbBgkqhkiG9w0BBQwwDgQI9Gl6VRM+2s8CAg'
    app.config.SANIC_JWT_EXPIRATION_DELTA = 28800
    # app.config.SANIC_JWT_EXPIRATION_DELTA = 30

    logging.getLogger('sanic_cors').level = logging.DEBUG

    write("Starting API...", 3)

    if production:
        write("Production mode enabled", 0)
    else:
        write("Production mode disabled", 1)

    while db.server_status() != True:
        write("Waiting for the database to be UP...", 3)
        sleep(1)
    db.add_user(email='admin', password='password')
    write("Added default user admin/password to database", 0)

    app.run(host="0.0.0.0", port=8080, debug=debug)
