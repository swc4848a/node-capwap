<<<<<<< HEAD
# Issues

## Table of Contents

### How to restore MySQL database from MyISAM to InnoDB?

<details>
<summary>View answer</summary>

#### Description

- Export innondb database to import.sql file
- Import to database which is under myisam mode (show engines to check if innodb is working)
- The engine change to myisam silently so that all the table change to myisam and remove all the constrain

#### Solution

- backup database by folling command

```
mysqldump -uuser -p database > database.sql
```

- stop mysqld service

```
service mysqld stop
```

- remove some mysql db key file to /tmp/

```
mv /var/lib/mysql/ib... /tmp/
```

- start mysqld service

```
service mysqld start
```

- check ib files and engines

```
ls /var/lib/mysql/;
mysql -uuser -p -e "show engines;";
# should has innodb
```

- remove garbage data by write sql script
- add constrains again

```
alter table table_name add constrains ...;
```

<br>[⬆ Back to top](#table-of-contents)
=======
# Capwap Issues

#### why AP <==> AC ssl handshake failed ?
```js
Certificate failed verification. Error: 9 (certificate is not yet valid)
```
by default it should be somewhere around July 2017 when FAP boot up  
if AP time older than July 2017 cert verify will fail  

#### how AP and AC sync their time ?
>>>>>>> ca7bfa490ed0b8c558ca1078b8042f6d9fb6e065
