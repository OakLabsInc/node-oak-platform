# Node.js Oak Platform

Node module to interact with the OakOS Platform API

## Setup

```bash
# retrieve the protobuf definitions
git submodule init
git submodule update

# install node modules
npm i
```

## Usage

```
# view the logs for your Oak instance
HOST=192.168.1.10 node examples/application-logs.example.js

# install a new set of services
HOST=192.168.1.10 DUSER=foo DPASS=bar node examples/application-install.example.js
```
