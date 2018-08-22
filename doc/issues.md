# Issues

## Table of Contents

- [How to restore MySQL database from MyISAM to InnoDB?](#how-to-restore-mysql-database-from-myisam-to-innodb)
- [Why AP <==> AC ssl handshake failed?](#why-ap-<==>-ac-ssl-handshake-failed)

### How to restore MySQL database from MyISAM to InnoDB?

<details>
<summary>View answer</summary>

#### Description

- Export innondb database to import.sql file

```
mysqldump -uuser -p database > database.sql
```

- Import to database which is under myisam mode (show engines to check if innodb is working)

```
[root@localhost workspace]# mysql -uuser -p -e "show engines";
Enter password:
+------------+---------+------------------------------------------------------------+--------------+------+------------+
| Engine     | Support | Comment                                                    | Transactions | XA   | Savepoints |
+------------+---------+------------------------------------------------------------+--------------+------+------------+
| MRG_MYISAM | YES     | Collection of identical MyISAM tables                      | NO           | NO   | NO         |
| CSV        | YES     | CSV storage engine                                         | NO           | NO   | NO         |
| MyISAM     | DEFAULT | Default engine as of MySQL 3.23 with great performance     | NO           | NO   | NO         |
| InnoDB     | YES     | Supports transactions, row-level locking, and foreign keys | YES          | YES  | YES        |
| MEMORY     | YES     | Hash based, stored in memory, useful for temporary tables  | NO           | NO   | NO         |
+------------+---------+------------------------------------------------------------+--------------+------+------------+
```

- If `show engines` not list `InnoDB` the problem happen
- The engine change to myisam silently so that all the table change to myisam and remove all the constrain

#### Solution

- backup database by folling command
- drop myisam database after backup

```
mysqldump -uuser -p database > database.sql
mysql -uuser -p -e "drop database dbname"
```

- stop mysqld service

```
service mysqld stop
```

- remove some mysql db key file to /tmp/
- mysql seemsly find the ib files corrupt so stop the InnoDB engines silently

```
mv /var/lib/mysql/ibdata1 /tmp/
mv /var/lib/mysql/ib_logfile0 /tmp/
mv /var/lib/mysql/ib_logfile1 /tmp/
```

- start mysqld service

```
service mysqld start
```

- check ib files and engines
- mysql will restore ib files and restart InnoDB engine

```
ls /var/lib/mysql/;
mysql -uuser -p -e "show engines;";
```

- create the database
- manually replace database.sql engine=myisam to innodb
- import the new database.sql to mysql

```
mysql -uuser -p -e "create database dbname";
vim replace all => :%s/=MyISAM/=InnoDB
mysql -uuser -p database < database.sql;
```

- remove garbage data by write sql script
- add constrains again

```
alter table table_name add constrains ...;
```

</details>
<br>[⬆ Back to top](#table-of-contents)

### Why AP <==> AC ssl handshake failed?

<details>
<summary>View answer</summary>

- by default it should be somewhere around July 2017 when FAP boot up
- if AP time older than July 2017 cert verify will fail

```js
Certificate failed verification. Error: 9 (certificate is not yet valid)
```

</details>
<br>[⬆ Back to top](#table-of-contents)
