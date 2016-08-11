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
let sn;
let newRsp;

let finished = (req, rsp, done, index, method) => {
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
        console.log('method %s, index %d', method, index);
        done(200 === rsp.code ? 0 : rsp.code);
    }
};

let finished7 = (req, rsp, done, index, method) => {
    if ('get' === method && 0 == index) {
        done(200 === rsp.code ? 0 : rsp.code);
    } else if ('new' === method && 1 == index) {
        put = req.params[_.keys(req.params)[0]];
        newRsp = rsp.result;
        done(200 === rsp.code ? 0 : rsp.code);
    } else if ('get' === method && 2 == index) {
        result = _.omit(rsp.result[0], 'id');
        result.should.containEql(_.omit(put, 'key'));
        done(200 === rsp.code ? 0 : rsp.code);
    } else if ('put' === method && 3 == index) {
        put = req.params[_.keys(req.params)[0]];
        done(200 === rsp.code ? 0 : rsp.code);
    } else if ('get' === method && 4 == index) {
        result = rsp.result[0];
        result.should.containEql(_.omit(put, 'key', 'seqNum'));
        done(200 === rsp.code ? 0 : rsp.code);
    } else if ('delete' === method && 0 == index) {
        done(200 === rsp.code ? 0 : rsp.code);
    } else if ('get' === method && 1 == index) {
        rsp.should.containEql({ result: [] });
        done();
    } else {
        done(200 === rsp.code ? 0 : rsp.code);
    }
};

function factory(options, method, index, finished) {
    let module = options;

    describe(module + ' ' + method, function() {
        it('should ' + method + ' success!', function(done) {
            let file = path + module + S('_' + method).camelize().s + '.json';
            fs.readFile(file, (err, file) => {
                if (err && 'ENOENT' === err.code) done();
                if (err && 'ENOENT' !== err.code) done(err);
                let req = JSON.parse(file);
                if (sn !== req.sn) req.sn = sn;
                if ('put' === method) {
                    let param = req.params[_.keys(req.params)[0]];
                    if (param.id) {
                        param.id = newRsp.id
                    } else if (param.key) {
                        if (_.isNumber(param.key)) {
                            param.key = newRsp.id
                        }
                    } else if (param.name) {

                    } else {
                        newRsp.id ? (param.seqNum = newRsp.id) : (undefined);
                    }
                } else if ('get' === method) {
                    let id = newRsp ? [newRsp.id] : [];
                    if (req.params && req.params.id) {
                        req.params.id = id;
                    } else if (req.params && req.params.seqNum) {
                        req.params.seqNum = id;
                    }
                } else if ('delete' === method) {
                    req.params.id ? (req.params.id = [newRsp.id]) : (req.params.seqNum = [newRsp.id]);
                }
                client.end(JSON.stringify(req));
                let bufArray = [];
                client.on('data', (data) => {
                    bufArray.push(data);
                });
                client.on('end', () => {
                    const data = Buffer.concat(bufArray);
                    let rsp = JSON.parse(data.toString());
                    finished(req, rsp, done, index, method);
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

    let tables = config.tables;
    let forms = config.forms;
    let tablesWithNew = config.tablesWithNew;
    sn = config.sn;

    tablesWithNew.forEach((item) => {
        ['get', 'new', 'get', 'put', 'get', 'delete', 'get'].forEach((method, index) => {
            factory(item, method, index, finished7);
        });
    });

    tables.forEach((item) => {
        ['getAll', 'put', 'get', 'delete', 'get'].forEach((method, index) => {
            factory(item, method, index, finished);
        });
    });

    forms.forEach((item) => {
        ['put', 'get'].forEach((method, index) => {
            factory(item, method, index, finished);
        });
    });
});
