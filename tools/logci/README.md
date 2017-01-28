# logci
## mysql => message table (old version: parse apserver log file and send json to logserver to update mysql database)
* select ap_sn, count(ap_sn) from message where msg_type=1 group by ap_sn;
* select max(ts), min(ts) from message;

## couchdb.js
* parse apserver log file and use couchdb none sql database

## shell => jenkins
### tree
.
|--- bin
|   |--- ci.sh
|   |--- logci.sh
|--- statistics

### jenkins
#### SSH Exec Command
* cat /home/logsu/logci/statistics/discovery/logci.log.* | gawk -F ' ' '{if(length($2)==16) array[$2]+=$1} END {n = asort(array, dest); sql="SELECT ap.sn,ap.fwVersion,a.email FROM ap_ap AS ap JOIN ap_network AS n ON ap.apNetworkOid = n.oid JOIN account AS a ON a.oid = n.accountOid WHERE ap.active=1"; cmd="mysql -u forticrm -pflzx3kc -s -N -h 192.168.223.37 portal -e \""sql"\""; while(cmd|getline){version[$1]=$2;email[$1]=$3;};close(cmd); for (i in array) {sn=""i""; print array[i]" "sn" "version[sn]" 1 "email[sn]" => discovery"; if(array[i]==1) stat["a# [1, 2)"]+=1; else if(array[i]==2) stat["b# [2, 3)"]+=1; else if(array[i]>=3 && array[i]<10) stat["c# [3, 10)"]+=1; else if(array[i]>=10&&array[i]<100) stat["d# [10, 100)"]+=1; else if(array[i]>=100&&array[i]<1000) stat["e# [100, 1000)"]+=1; else stat["f# [1000, *)"]+=1}; for (s in stat) {print s" = "stat[s]}}' | grep -v 12345678 | grep -E "build03[3-9][0-9]|build01[5-9][0-9]|\) =" | sort -k1 -n -r

* rm /home/logsu/logci/statistics/discovery/logci.log*;

* cat /home/logsu/logci/statistics/join/logci.log.* | gawk -F ' ' '{if(length($2)==16) array[$2]+=$1} END {n = asort(array, dest); sql="SELECT ap.sn,ap.fwVersion,a.email FROM ap_ap AS ap JOIN ap_network AS n ON ap.apNetworkOid = n.oid JOIN account AS a ON a.oid = n.accountOid WHERE ap.active=1"; cmd="mysql -u forticrm -pflzx3kc -s -N -h 192.168.223.37 portal -e \""sql"\""; while(cmd|getline){version[$1]=$2;email[$1]=$3;};close(cmd); for (i in array) {sn=""i""; print array[i]" "sn" "version[sn]" 1 "email[sn]" => join";if(array[i]==1) stat["g# [1, 2)"]+=1; else if(array[i]==2) stat["h# [2, 3)"]+=1; else if(array[i]>=3 && array[i]<10) stat["i# [3, 10)"]+=1; else if(array[i]>=10&&array[i]<100) stat["j# [10, 100)"]+=1; else if(array[i]>=100&&array[i]<1000) stat["k# [100, 1000)"]+=1; else stat["l# [1000, *)"]+=1}; for (s in stat) {print s" = "stat[s]}}' | grep -v 12345678 | grep -E "build03[3-9][0-9]|build01[5-9][0-9]|\) =" | sort -k1 -n -r

* rm /home/logsu/logci/statistics/join/logci.log*;

#### Email Template
* $PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS!
* 
* Apserver received Discovery/Join Request Statistics for last 24 hours ($BUILD_TIMESTAMP):
* 
* FAP Version from build0330-0399, FAP-S Version from build0150-0199
* 
* Discovery
* ${BUILD_LOG_REGEX, regex="[a-f]\\#\\s+(\\[\\d+,\\s+(?:\\d+|\\*)\\)\\s+=\\s+\\d+)", showTruncatedLines=false, substText="$1"}
* * Join
* ${BUILD_LOG_REGEX, regex="[g-l]\\#\\s+(\\[\\d+,\\s+(?:\\d+|\\*)\\)\\s+=\\s+\\d+)", showTruncatedLines=false, substText="$1"}
* 
* ---------------------------------------------------------------------------------------------------------------------------
* DISCOVERY SN VERSION ACTIVE ACCOUNT
* 
* ${BUILD_LOG_REGEX, regex="\\d+\\s+[\\w+]{16}.*[=>]\\s+discovery", showTruncatedLines=false}
* 
* ---------------------------------------------------------------------------------------------------------------------------
* JOIN SN VERSION ACTIVE ACCOUNT
* 
* ${BUILD_LOG_REGEX, regex="\\d+\\s+[\\w+]{16}.*[=>]\\s+join", showTruncatedLines=false}
* 
* Check console output at $BUILD_URL to view the results.

