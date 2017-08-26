# start server
mysql-5.7/bin/mysqld --defaults-file=data/s1/s1.cnf --user=root &
mysql-5.7/bin/mysqld --defaults-file=data/s2/s2.cnf --user=root &
mysql-5.7/bin/mysqld --defaults-file=data/s3/s3.cnf --user=root &

# connect shell
mysql-5.7/bin/mysql --port=24801 --host=127.0.0.1
mysql-5.7/bin/mysql --port=24802 --host=127.0.0.1
mysql-5.7/bin/mysql --port=24803 --host=127.0.0.1

# grant previllage
CREATE USER 'group'@'172.16.95.49' IDENTIFIED BY 'group';
GRANT ALL ON *.* TO 'group'@'172.16.95.49';
FLUSH PRIVILEGES;

# sql for master
SET SQL_LOG_BIN=0;
CREATE USER rpl_user@'%' IDENTIFIED BY 'rpl_pass';
GRANT REPLICATION SLAVE ON *.* TO rpl_user@'%';
FLUSH PRIVILEGES;
SET SQL_LOG_BIN=1;
CHANGE MASTER TO MASTER_USER='rpl_user', MASTER_PASSWORD='rpl_pass' FOR CHANNEL 'group_replication_recovery';
INSTALL PLUGIN group_replication SONAME 'group_replication.so';
SHOW PLUGINS;
SET GLOBAL group_replication_bootstrap_group=ON;
START GROUP_REPLICATION;
SET GLOBAL group_replication_bootstrap_group=OFF;
SELECT * FROM performance_schema.replication_group_members;

# sql for slave
SET SQL_LOG_BIN=0;
CREATE USER rpl_user@'%';
GRANT REPLICATION SLAVE ON *.* TO rpl_user@'%' IDENTIFIED BY 'rpl_pass';
SET SQL_LOG_BIN=1;
CHANGE MASTER TO MASTER_USER='rpl_user', MASTER_PASSWORD='rpl_pass' FOR CHANNEL 'group_replication_recovery';
INSTALL PLUGIN group_replication SONAME 'group_replication.so';
START GROUP_REPLICATION;
SELECT * FROM performance_schema.replication_group_members;

# gh-ost
./gh-ost \
--max-load=Threads_running=25 \
--critical-load=Threads_running=1000 \
--chunk-size=1000 \
--throttle-control-replicas="127.0.0.1:24801,127.0.0.1:24803" \
--max-lag-millis=500 \
--heartbeat-interval-millis=100 \
--host=127.0.0.1 \
--port=24803 \
--database="test" \
--table="t1" \
--verbose \
--alter="engine=innodb" \
--switch-to-rbr \
--initially-drop-old-table \
--initially-drop-ghost-table \
--initially-drop-socket-file \
--serve-socket-file=./gh-ost.test.sock \
--cut-over=default \
--exact-rowcount \
--concurrent-rowcount \
--default-retries=1 \
--panic-flag-file=/home/zqqiang/Workspaces/groupReplication/ghost.panic.flag \
--user=root \
--debug \
--stack \
--assume-master-host=127.0.0.1:24801 \
--execute \
--alter="change column c2 c3 int not null" --approve-renamed-columns