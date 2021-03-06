const S = require('string');
let should = require('should');

const net = require('net');
const fs = require('fs');
const os = require('os');
const _ = require('underscore');

let config = JSON.parse(fs.readFileSync('config.json'));
let options = config.configServer;
let path = config.testcase;

console.log(config);
console.log(os.platform());

let client;
let put;
let result;

function factory(options, method, index) {
    let module = options;

    let finished = (req, rsp, done) => {
        if ('getAll' === method && 0 == index) {
            done(200 === rsp.code ? 0 : rsp.code);
        } else if ('put' === method && 1 == index) {
            put = req.params[_.keys(req.params)[0]];
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
            put = req.params[_.keys(req.params)[0]];
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
            let file = path + module + S('_' + method).camelize().s + '.json';
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

    let modules = config.tables;
    let forms = config.forms;

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
