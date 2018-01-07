
# NMT

### GOAL OF THIS PROJECT

A network mapper / scanner for improving the pentesters/admin/engineers knowledge of local networks (maybe public soon).


| Build status    |
|------------|
| [![pipeline status](https://travis-ci.org/gbnk0/nmt.svg?branch=develop)]() | [![pipeline status](https://img.shields.io/badge/Python-3.5%2C%203.6-blue.svg)](https://gitlab.com/gbnk0/nmt/commits/develop)|

## DOCUMENTATION
[Jump to the documentation](https://gitlab.com/gbnk0/nmt/wikis/home)


#### QUICK START

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
