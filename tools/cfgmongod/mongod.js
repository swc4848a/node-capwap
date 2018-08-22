const MongoClient = require('mongodb').MongoClient;
const Binary = require('mongodb').Binary;
const fs = require('fs');
const util = require('util');
const bytes = require('utf8-length')
const _ = require('lodash')

const url = `mongodb://172.16.95.48:27017,172.16.94.164:27017,172.16.94.163:27017?replicaSet=rs0`;
const dbname = `cfgserver`;

const collection = [
    `cacert`, `config`, `dev_status`, `device`, `fulllog`,
    `local`, `remote`, `remote_1`, `status`, `sysstatus`
]

function randomCollection() {
    return collection[_.random(collection.length)]
}

function randomSN() {
    return (`FGT60D` + _.padStart(`${_.random(10000)}`, 10, '0'))
}

function isBinary(collection) {
    return (collection === `cacert` || collection === `dev_status` || collection === `fulllog` ||
        collection === `local` || collection === `remote` || collection === `remote_1`)
}

async function insert(db, collection, sn) {
    let file = fs.readFileSync(isBinary(collection) ? `sample/${collection}` : `sample/${collection}.json`);

    db.collection(`${collection}`).insertOne = util.promisify(db.collection(`${collection}`).insertOne);

    let obj = {
        sn: `${sn}`,
        collection: isBinary(collection) ? Binary(file) : JSON.parse(file),
    }

    try {
        await db.collection(`${collection}`).insertOne(obj);
    } catch (err) {
        console.error(err)
        return 0;
    }

    console.log(`inserted ${collection} ${sn}`)

    return bytes(JSON.stringify(obj))
}

async function update(db, collection, sn) {
    let hugeFile = fs.readFileSync(isBinary(collection) ? `sample/huge` : `sample/huge.json`);

    db.collection(`${collection}`).update = util.promisify(db.collection(`${collection}`).update);

    try {
        await db.collection(`${collection}`).update({
            sn: `${sn}`
        }, {
            $inc: {
                update: 1
            },
            $set: {
                collection: isBinary(collection) ? Binary(hugeFile) : JSON.parse(hugeFile),
            }
        });
    } catch (err) {
        console.error(err)
        return 0;
    }

    console.log(`udpated ${collection} ${sn}`)

    return bytes(JSON.stringify({
        collection: Binary(hugeFile)
    }))
}

async function find(db, collection, sn) {
    db.collection(`${collection}`).find = util.promisify(db.collection(`${collection}`).find);
    let result

    try {
        result = await db.collection(`${collection}`).find({
            sn: sn
        });
    } catch (err) {
        console.error(err)
        return 0;
    }

    console.log(`find ${collection} ${sn}`)

    return bytes(result)
}

async function remove(db, collection, sn) {
    db.collection(`${collection}`).deleteOne = util.promisify(db.collection(`${collection}`).deleteOne);

    try {
        result = await db.collection(`${collection}`).deleteOne({
            sn: sn
        });
    } catch (err) {
        console.error(err)
        return 0;
    }

    console.log(`delete ${collection} ${sn}`)

    return bytes(result)
}

async function insertTest(client) {
    const db = client.db(dbname);
    const max = 10;
    let totalSize = 0;

    let start = new Date();

    for (let i = 0; i < max; ++i) {
        totalSize += await insert(db, randomCollection(), randomSN());
        totalSize += await update(db, randomCollection(), randomSN());
        totalSize += await find(db, randomCollection(), randomSN());
        totalSize += await remove(db, randomCollection(), randomSN());
    }

    let end = new Date();

    client.close();

    let diff = (end - start) / 1000;
    let speed = totalSize / (diff * 1024 * 1024);

    console.log(`use ${diff} s, speed ${speed} M/s`);
}

async function collectionInit(client) {
    const db = client.db(dbname)
    db.createCollection = util.promisify(db.createCollection)

    try {
        await db.createCollection(`cacert`)
        await db.createCollection(`config`)
        await db.createCollection(`dev_status`)
        await db.createCollection(`device`)
        await db.createCollection(`fulllog`)
        await db.createCollection(`local`)
        await db.createCollection(`remote`)
        await db.createCollection(`remote_1`)
        await db.createCollection(`status`)
        await db.createCollection(`sysstatus`)
    } catch (err) {
        console.error(err)
    }

    console.log(`init db collection!`)
}

(async () => {
    let client

    MongoClient.connect = util.promisify(MongoClient.connect)

    try {
        client = await MongoClient.connect(url)
    } catch (err) {
        console.error(err)
    }

    console.log(`start mongod test client!`)

    await collectionInit(client)
    await insertTest(client)

    client.close()
})();