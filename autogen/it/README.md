#CFG Server IT Framework

## Setup

###node.js
1. curl --silent --location https://rpm.nodesource.com/setup_6.x | bash -
2. yum -y install nodejs
3. node -v => v6.3.x

###project init
* npm install

## Configuration
* modify ConfigServer host to your CfgServer IP address
* modify testcase to your CfgServer/src/daemon/cfgsvrd/test path
* add your testcase to tables and forms array.(tables: address..., forms: settings...)


## Run
* npm run test


## Jenkins
[Jenkins Server](http://172.16.94.162:8080/job/CfgServerIT/)
