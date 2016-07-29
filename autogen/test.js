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

function factory(module, method, index) {
    let finished = (req, rsp, done) => {
        if ('getAll' === method && 0 == index) {
            done(rsp.code);
        } else if ('put' === method && 1 == index) {
            put = req.params[module];
            done(rsp.code);
        } else if ('get' === method && 2 == index) {
            result = rsp.result[0];
            result.should.be.eql(put);
            done(rsp.code);
        } else if ('delete' === method && 3 == index) {
            done(rsp.code);
        } else if ('get' === method && 4 == index) {
            rsp.should.containEql({ code: -1, result: [] });
            done();
        } else if ('put' === method && 0 == index) {
            put = req.params[module];
            done(rsp.code);
        } else if ('get' === method && 1 == index) {
            result = rsp.result[0];
            result.should.be.eql(put);
            done(rsp.code);
        } else {
            done(rsp.code);
        }
    };

    describe(module + ' ' + method, function() {
        it('should ' + method + ' success!', function(done) {
            let file = path + '\\' + module + S('_' + method).camelize().s + '.json';
            fs.readFile(file, (err, file) => {
                if (err && 'ENOENT' === err.code) done();
                if (err && 'ENOENT' !== err.code) done(err);
                client.write(file);
                client.on('data', (data) => {
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

        client.on('end', () => {
            // console.log('disconnected from server');
        });
    });

    afterEach(() => {
        client.end();
    });

    let modules = [
        'address\\group',
        // 'address\\address',
        // 'schedule\\group',
        // 'schedule\\onetime',
        // 'schedule\\recurring',
        // 'fortiGuard'
    ];

    let forms = [
        'fortiGuard'
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
