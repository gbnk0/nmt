from shared import api_wrapper as apiwr
from random import randint
from datetime import datetime

api_url = 'http://localhost:8080'
login = 'admin'
password = 'password'

api = apiwr.CoreApi(
    url=api_url,
    login=login,
    password=password
)

fake_nets = []
for i in range(0,1):
    fake_num = randint(0,250)
    fake_net = '192.168.{}.0/24'.format(fake_num)
    if not fake_net in fake_nets:
        fake_nets.append(fake_net)
        api.update_network(name='TEST_' + str(fake_num), ip_addr=fake_net)
        print(fake_net)



for net in api.get_networks():
    host_count = randint(0,250)
    hosts = []
    cur_host = {
        'ip_addr': ".".join(net['ip_addr'].split('/')[0].split('.')[:-1]) +'.' + str(254),
        'dns_names': 'host_test_{}'.format(i),
        'network_id': net['id'],
        'mac_addr': '00:50:F3:{}{}:{}{}'.format(randint(0,9), randint(0,9), randint(0,9), randint(0,9)),
        'mac_vendor': 'VMWare',
        'last_seen': datetime.now().isoformat(),
        'services': []
    }
    hosts.append(cur_host)
    for i in range(1, host_count):
        try:
            cur_host = {
                'ip_addr': ".".join(net['ip_addr'].split('/')[0].split('.')[:-1]) +'.' + str(i),
                'dns_names': 'host_test_{}'.format(i),
                'network_id': net['id'],
                'mac_addr': '00:50:F3:{}{}:{}{}'.format(randint(0,9), randint(0,9), randint(0,9), randint(0,9)),
                'mac_vendor': 'VMWare',
                'last_seen': datetime.now().isoformat(),
                'services': []
            }
            hosts.append(cur_host)
            api.add_host(**cur_host)
            print(cur_host)
        except:
            raise
