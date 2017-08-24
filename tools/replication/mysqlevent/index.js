var MySQLEvents = require('mysql-events');

var dsn = {
    host: '172.16.94.164',
    user: 'forticrm',
    password: 'forticrm',
    debug: true
};

var mysqlEventWatcher = MySQLEvents(dsn, {
    includeEvents: ['unknown', 'query', 'tablemap', 'writerows', 'updaterows', 'deleterows']
});

var watcher = mysqlEventWatcher.add(
    'monitor',
    function(oldRow, newRow, event) {
        console.log(oldRow);
        console.log(newRow);
        console.log(event);
    }
);