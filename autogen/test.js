const S = require('string');
let should = require('should');

const net = require('net');
const fs = require('fs');
const os = require('os');

let options = {
    port: 6020,
    host: '172.16.94.163'
};

console.log(os.arch());

let path = (
    'x64' === os.arch() ?
    'D:\\Workspaces\\svn\\CfgServer\\src\\daemon\\cfgsvrd\\test' :
    '/home/zqqiang/workspace/gate-cloud/CfgServer/src/daemon/cfgsvrd/test'
);

let client;
let put;
let result;

let sep = ('x64' === os.arch() ? '\\' : '/');

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
            let file = path + sep + module + S('_' + method).camelize().s + '.json';
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
        { module: 'address' + sep + 'addrgrp', param: 'addrgrp' },
        { module: 'address' + sep + 'address', param: 'address' },
        { module: 'schedule' + sep + 'group', param: 'scheduleGroup' },
        { module: 'schedule' + sep + 'onetime', param: 'scheduleOnetime' },
        { module: 'schedule' + sep + 'recurring', param: 'scheduleRecurring' },
        { module: 'service' + sep + 'custom', param: 'serviceCustom' },
        { module: 'service' + sep + 'group', param: 'serviceGroup' },
        { module: 'service' + sep + 'category', param: 'serviceCategory' },
        { module: 'admin' },
        { module: 'vip' + sep + 'vip', param: 'vip' },
        { module: 'ippool' + sep + 'ippool', param: 'ippool' },
        { module: 'shaper' + sep + 'trafficShaper', param: 'trafficShaper' },
        { module: 'shaper' + sep + 'perIpShaper', param: 'perIpShaper' },
        // { module: 'shapingPolicy' },
        // { module: 'accprofile' }
    ];

    let forms = [
        { module: 'fortiGuard' },
        { module: 'adminSettings' },
        { module: 'advancedSettings' },
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
