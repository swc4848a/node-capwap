const S = require('string');
let should = require('should');

const net = require('net');
const fs = require('fs');

let options = {
    port: 6020,
    host: '172.16.94.163'
};

let path = 'D:\\Workspaces\\svn\\CfgServer\\src\\daemon\\cfgsvrd\\test';

let client;
let put;
let result;

function factory(options, method, index) {
    let module = options.module;
    let param = options.param ? options.param : module;

    let finished = (req, rsp, done) => {
        if ('getAll' === method && 0 == index) {
            done(200 === rsp.code ? 0 : rsp.code);
        } else if ('put' === method && 1 == index) {
            put = req.params[param];
            done(200 === rsp.code ? 0 : rsp.code);
        } else if ('get' === method && 2 == index) {
            result = rsp.result[0];
            result.should.be.eql(put);
            done(200 === rsp.code ? 0 : rsp.code);
        } else if ('delete' === method && 3 == index) {
            done(200 === rsp.code ? 0 : rsp.code);
        } else if ('get' === method && 4 == index) {
            // todo: check error code
            rsp.should.containEql({ result: [] });
            done();
        } else if ('put' === method && 0 == index) {
            put = req.params[param];
            done(200 === rsp.code ? 0 : rsp.code);
        } else if ('get' === method && 1 == index) {
            result = rsp.result[0];
            result.should.be.eql(put);
            done(200 === rsp.code ? 0 : rsp.code);
        } else {
            done(200 === rsp.code ? 0 : rsp.code);
        }
    };

    describe(module + ' ' + method, function() {
        it('should ' + method + ' success!', function(done) {
            let file = path + '\\' + module + S('_' + method).camelize().s + '.json';
            fs.readFile(file, (err, file) => {
                if (err && 'ENOENT' === err.code) done();
                if (err && 'ENOENT' !== err.code) done(err);
                client.end(file);
                let bufArray = [];
                client.on('data', (data) => {
                    bufArray.push(data);
                });
                client.on('end', () => {
                    const data = Buffer.concat(bufArray);
                    let req = JSON.parse(file);
                    let rsp = JSON.parse(data.toString());
                    finished(req, rsp, done);
                });
            });
        });
    });
}

describe('Config', function() {

    beforeEach(() => {
        client = net.createConnection(options, () => {
            // console.log('connected to server!');
        });
    });

    afterEach(() => {
        client.end();
    });

    let modules = [
        { module: 'address\\addrgrp', param: 'addrgrp' },
        { module: 'address\\address', param: 'address' },
        { module: 'schedule\\group', param: 'scheduleGroup' },
        { module: 'schedule\\onetime', param: 'scheduleOnetime' },
        { module: 'schedule\\recurring', param: 'scheduleRecurring' },
        { module: 'service\\custom', param: 'serviceCustom' },
        { module: 'service\\group', param: 'serviceGroup' },
        { module: 'service\\category', param: 'serviceCategory' },
        { module: 'admin' },
        { module: 'vip\\vip', param: 'vip' },
        // { module: 'accprofile' }
    ];

    let forms = [
        // 'fortiGuard'
    ];

    modules.forEach((item) => {
        ['getAll', 'put', 'get', 'delete', 'get'].forEach((method, index) => {
            factory(item, method, index);
        });
    });

    forms.forEach((item) => {
        ['put', 'get'].forEach((method, index) => {
            factory(item, method, index);
        });
    });
});
