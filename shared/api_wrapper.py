import requests
import json
from attrdict import AttrDict

conn_headers = {
    'Content-type': 'application/json'
}

class CoreApi:

    def __init__(self, url, **kwargs):
        self.url = url
        self.login = kwargs.get('login')
        self.password = kwargs.get('password')
        self.headers = conn_headers

        if self.login or self.password:
            self.headers['Authorization'] = self.get_auth_token()
        
        self.check = requests.get(url + "/check")

    """ AUTH PART """

    def get_auth_token(self):
        auth_url = "{}/auth".format(self.url)

        creds = {
            'email': self.login,
            'password' : self.password
        }

        r = requests.post(auth_url, json=creds)
        
        token = r.json()['access_token']
        auth_string = 'Bearer {}'.format(token)

        return auth_string

    """ SENSORS PART """

    def update_sensor(self, **kwargs):

        url = "{}/sensors/".format(self.url)

        data = json.dumps(kwargs)

        r = requests.post(url,
                          json=data,
                          headers=self.headers
                          )
        if r.status_code == 201:
            return True
        else:
            return False

    """ NETWORKS PART """

    def update_network(self, **kwargs):

        url = "{}/networks/".format(self.url)

        data = json.dumps(kwargs)

        r = requests.post(url,
                          json=data,
                          headers=self.headers
                          )
        if r.status_code == 201:
            return True
        else:
            return False

    def get_networks(self, **kwargs):
        url = "{}/networks/".format(self.url)

        filters = kwargs.get('filter', None)

        if filters:
            url += '?filter='+str(filters)

        r = requests.get(url, headers=self.headers)

        if r.status_code == 200:
            return AttrDict({'networks': json.loads(r.text)['results']}).networks
        else:
            return []

    """ HOSTS PART """
    # Update / Add host in a network

    def add_host(self, **kwargs):

        network_id = kwargs.get('network_id', None)
        url = "{}/networks/{}/".format(self.url, network_id)
        data = json.dumps(kwargs)
        r = requests.post(url,
                          json=data,
                          headers=self.headers
                          )
        if r.status_code == 201:
            return True
        else:
            return False

    def get_macvendor(self, mac_addr):
        url = "{}/macvendor/{}/".format(self.url, mac_addr)
        r = requests.get(url, headers=self.headers)

        if r.status_code == 200:
            return json.loads(r.text)['vendor']
        else:
            return ""
