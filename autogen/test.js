// const net = require('net');

// const client = net.createConnection({
//     port: 6020,
//     host: '172.16.94.163'
// }, () => {
//     //'connect' listener
//     console.log('connected to server!');
//     let req = '{"action":"serviceCategoryGet","sn":"FGT60D4615007833"}\r\n';
//     client.write(req);
//     console.log(req);
// });

// client.on('data', (data) => {
//     console.log(data.toString());
//     client.end();
// });

// client.on('end', () => {
//     console.log('disconnected from server');
// });

let assert = require('chai').assert;
let should = require('should');

const net = require('net');
const fs = require('fs');

let options = {
    port: 6020,
    host: '172.16.94.163'
};

let path = 'D:\\Workspaces\\svn\\CfgServer\\src\\daemon\\cfgsvrd\\test';

describe('Config', function() {
    let client;
    let put;
    let get;

    beforeEach(function() {
        client = net.createConnection(options, () => {
            // console.log('connected to server!');
        });

        client.on('end', () => {
            // console.log('disconnected from server');
        });
    });

    afterEach(function() {
        client.end();
    });

    let modules = ['address\\group', 'address\\address'];

    modules.forEach((item) => {
        describe(item + ' getAll', function() {
            it('should getAll success!', function(done) {
                fs.readFile(path + '\\' + item + 'GetAll.json', (err, file) => {
                    client.write(file);
                    client.on('data', (data) => {
                        let rsp = JSON.parse(data.toString());
                        done(rsp.code);
                    });
                });
            });
        });

        describe(item + ' put', () => {
            it('should put success!', (done) => {
                fs.readFile(path + '\\' + item + 'Put.json', (err, file) => {
                    let req = JSON.parse(file);
                    put = req.params['addrgrp'];
                    client.write(file);
                    client.on('data', (data) => {
                        let rsp = JSON.parse(data.toString());
                        done(rsp.code);
                    });
                });
            });
        });

        describe(item + ' get', function() {
            it('should get success!', function(done) {
                fs.readFile(path + '\\' + item + 'Get.json', (err, file) => {
                    client.write(file);
                    client.on('data', (data) => {
                        let rsp = JSON.parse(data.toString());
                        get = rsp.result[0];
                        get.should.be.eql(put);
                        done(rsp.code);
                    });
                });
            });
        });

        describe(item + ' delete', () => {
            it('should delete success!', (done) => {
                fs.readFile(path + '\\' + item + 'Delete.json', (err, file) => {
                    client.write(file);
                    client.on('data', (data) => {
                        let rsp = JSON.parse(data.toString());
                        done(rsp.code);
                    });
                });
            });
        });

        describe(item + ' get', function() {
            it('should not get delete item!', function(done) {
                fs.readFile(path + '\\' + item + 'Get.json', (err, file) => {
                    client.write(file);
                    client.on('data', (data) => {
                        let rsp = JSON.parse(data.toString());
                        rsp.should.containEql({ code: -1, result: [] });
                        done();
                    });
                });
            });
        });
    });

});
