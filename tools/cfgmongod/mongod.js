const MongoClient = require('mongodb').MongoClient;
const Binary = require('mongodb').Binary;
const fs = require('fs');

const url = `mongodb://172.16.95.48:27017`;
const dbname = `cfgserver`;
const sn = 'FGT60D4615007833';

const insertDocuments = function (db, count) {
    let local = fs.readFileSync(`${sn}\\local`);
    let cacert = fs.readFileSync(`${sn}\\cacert`);
    let config = fs.readFileSync(`${sn}\\config.json`);
    let status = fs.readFileSync(`${sn}\\status.json`);
    db
        .collection('fos')
        .insertOne({
            sn: `${sn}`,
            local: Binary(local),
            cacert: Binary(cacert),
            config: JSON.parse(config),
            status: JSON.parse(status)
        }, function (err, result) {
            if (err) {
                console.error(err);
            } else {
                // console.log(`inserted ${count} document ...`);
            }
        });
}

const insertLimitTest = function (client) {
    let insertCount = 0;
    let max = 100;
    const db = client.db(dbname);

    let start = new Date();

    const task = setInterval(function () {
        insertCount++;
        if (insertCount > max) {
            clearInterval(task);
            client.close();
            let end = new Date();
            console.log(`clear task, close connection! use ${end - start} ms`);
        } else {
            insertDocuments(db, insertCount);
        }
    }, 1);
}

MongoClient.connect(url, function (err, client) {
    if (err) {
        console.error(err);
        return;
    }

    console.log("Connected successfully to server");
    insertLimitTest(client);
});