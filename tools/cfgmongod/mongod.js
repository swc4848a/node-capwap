const MongoClient = require('mongodb').MongoClient;
const Binary = require('mongodb').Binary;
const fs = require('fs');
const util = require('util');
const bytes = require('utf8-length')

const url = `mongodb://172.16.95.48:27017`;
const dbname = `cfgserver`;
const sn = 'FGT60D4615007833';

const insertDocuments = async function (db) {
    let local = fs.readFileSync(`${sn}\\local`);
    let cacert = fs.readFileSync(`${sn}\\cacert`);
    let config = fs.readFileSync(`${sn}\\config.json`);
    let status = fs.readFileSync(`${sn}\\status.json`);

    db.collection('fos').insertOne = util.promisify(db.collection('fos').insertOne);

    let obj = {
        sn: `${sn}`,
        local: Binary(local),
        cacert: Binary(cacert),
        config: JSON.parse(config),
        status: JSON.parse(status)
    }

    await db.collection('fos').insertOne(obj);

    return bytes(JSON.stringify(obj))
}

const insertLimitTest = async function (client) {
    const db = client.db(dbname);
    const max = 1000;
    let totalSize = 0;

    let start = new Date();

    for (let i = 0; i < max; ++i) {
        totalSize += await insertDocuments(db);
    }

    let end = new Date();

    client.close();

    let diff = (end - start) / 1000;
    let speed = totalSize / (diff * 1024 * 1024);

    console.log(`use ${diff} s, speed ${speed} M/s`);
}

MongoClient.connect(url, function (err, client) {
    if (err) {
        console.error(err);
        return;
    }

    console.log("Connected successfully to server");

    insertLimitTest(client);
});