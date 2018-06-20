const MongoClient = require('mongodb').MongoClient;
const Binary = require('mongodb').Binary;
const fs = require('fs');

const url = `mongodb://172.16.95.48:27017`;
const dbname = `cfgserver`;
const sn = 'FGT60D4615007833';
const max = 5;

const insertDocuments = function (db, insertcb, findcb) {
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
                insertcb(result);
            }
        });

    // db
    //     .collection('fos')
    //     .find({
    //         sn: `${sn}`
    //     }, function (err, result) {
    //         if (err) {
    //             console.error(err)
    //         } else {
    //             findcb(result)
    //         }
    //     })
}

MongoClient.connect(url, function (err, client) {
    if (err) {
        console.error(err);
        return;
    }
    console.log("Connected successfully to server");
    const db = client.db(dbname);
    let count = 0;
    let task = setInterval(function () {
        insertDocuments(db, function (r) {
            console.log(`Insert ${count} document => ${r}`);
            count++;
        }, function (r) {});
    }, 10);
});
