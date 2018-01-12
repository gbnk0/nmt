# NMT

A network mapper / scanner for improving the pentesters/admin/engineers knowledge of local networks (maybe public soon).



[![pipeline status](https://travis-ci.org/gbnk0/nmt.svg?branch=develop)][![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fgbnk0%2Fnmt.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fgbnk0%2Fnmt?ref=badge_shield)
()
[![coverage](https://coveralls.io/repos/github/gbnk0/nmt/badge.svg?branch=develop)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![python_version](https://img.shields.io/badge/python-3.5%2C3.6-blue.svg)]()




## DOCUMENTATION
[Jump to the documentation](https://github.com/gbnk0/nmt/wiki)


## QUICK START

```bash
cd docker/
docker-compose -f docker-compose-all.yml up --build
```

Go to localhost:8000 in your browser

##### DEFAULT CREDENTIALS
`admin/ password`


## INSTALLATION (DEV)
```bash
git clone git@gitlab.com:gbnk0/nmt.git
```
### DEVELOPEMENT ENV REQUIREMENTS
- Minimum python version: 3.5
- Install docker: 
```bash
curl https://get.docker.com/|sudo sh
```

- Install docker-compose: 
```bash
pip3 install docker-compose
```

- Install NodeJS 8 LTS:
```bash
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
```

- Install requirements:
```bash
pip3 install -r requirements.txt
```

### CORE API
#### LAUNCH THE API
- Move into the core folder:

```bash
cd core/
```

- The api needs a RethinkDB instance for storing hosts, networks data, we'll use docker-compose for bringing it up:

```bash
docker-compose -f docker/docker-compose.yml up #( add -d for background )

```

- Now you can install dependencies, and run the api with sanic-admin:

```bash
pip3 install sanic-admin
sanic-admin api.py
```


#### LAUNCH THE SENSOR
```bash
cd sensor/
python3 sensor.py
```


### WEB UI 
#### LAUNCH THE WEB UI (DEV MODE)
( Soon with docker-compose UP)

```bash
cd web/
npm install # (wait...)
npm start
```


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fgbnk0%2Fnmt.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fgbnk0%2Fnmt?ref=badge_large)