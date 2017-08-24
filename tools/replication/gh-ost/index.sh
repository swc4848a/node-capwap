# start server
mysql-5.7/bin/mysqld --defaults-file=data/s1/s1.cnf --user=root
mysql-5.7/bin/mysqld --defaults-file=data/s2/s2.cnf --user=root
mysql-5.7/bin/mysqld --defaults-file=data/s3/s3.cnf --user=root

# connect shell
mysql-5.7/bin/mysql --port=24801 --host=127.0.0.1
mysql-5.7/bin/mysql --port=24802 --host=127.0.0.1
mysql-5.7/bin/mysql --port=24803 --host=127.0.0.1

# gh-ost
gh-ost \
--max-load=Threads_running=25 \
--critical-load=Threads_running=1000 \
--chunk-size=1000 \
--throttle-control-replicas="127.0.0.1:24801,127.0.0.1:24802,127.0.0.1:24803" \
--max-lag-millis=1500 \
--host=127.0.0.1 \
--port=24802 \
--database="test" \
--table="t1" \
--verbose \
--alter="engine=innodb" \
--switch-to-rbr \
--allow-master-master \
--cut-over=default \
--exact-rowcount \
--concurrent-rowcount \
--default-retries=120 \
--panic-flag-file=/home/zqqiang/Workspaces/groupReplication/ghost.panic.flag \
--postpone-cut-over-flag-file=/home/zqqiang/Workspaces/groupReplication/ghost.postpone.flag \
--debug \
--user=root \
--assume-master-host=127.0.0.1:24801 \
