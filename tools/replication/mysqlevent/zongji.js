var ZongJi = require('zongji');

var zongji = new ZongJi({
    host: '172.16.94.164',
    user: 'forticrm',
    password: 'forticrm',
    debug: true
});

// Each change to the replication log results in an event
zongji.on('binlog', function(evt) {
    evt.dump();
});

// Binlog must be started, optionally pass in filters
zongji.start({
    includeEvents: ['unknown', 'query', 'tablemap', 'writerows', 'updaterows', 'deleterows']
});

process.on('SIGINT', function() {
    console.log('Got SIGINT.');
    zongji.stop();
    process.exit();
});