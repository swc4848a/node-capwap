# Cloud AP Platform Upgrade Tool

## MySQL Setup
### Setup 172.16.94.164 as Dev Release Server database.  
1. First time we need create a forticrm user and grant privilege on database  
````
CREATE USER 'forticrm'@'*' IDENTIFIED BY 'XXX';  
GRANT ALL PRIVILEGES ON *.* TO 'forticrm'@'*' IDENTIFIED BY PASSWORD 'xxxx';
FLUSH PRIVILEGES;
````
2. Backup QA Release portal by GUI.  
3. Import QA Release portal by mysql.  
````
/* set limit if ERROR 1153 (08S01) at line 79: Got a packet bigger than 'max_allowed_packet' bytes */
mysql>set global net_buffer_length=1000000;  
mysql>set global max_allowed_packet=1000000000;  
mysql -u forticrm -p < qa_release_portal.sql;  
````
4. 
