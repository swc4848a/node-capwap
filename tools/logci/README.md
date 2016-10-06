# logci
## mysql => message table
* select ap_sn, count(ap_sn) from message where msg_type=1 group by ap_sn;
* select max(ts), min(ts) from message;

## shell => jenkins
### tree
.
|--- bin
|   |--- ci.sh
|   |--- logci.sh
|--- statistics

### jenkins
#### SSH Exec Command
* cat /home/logsu/logci/statistics/discovery/logci.log.* | gawk -F ' ' '{if(length($2)==16) array[$2]+=$1} END {n = asort(array, dest); sql="SELECT ap.sn,ap.fwVersion,a.email FROM ap_ap AS ap JOIN ap_network AS n ON ap.apNetworkOid = n.oid JOIN account AS a ON a.oid = n.accountOid WHERE ap.active=1"; cmd="mysql -u forticrm -pflzx3kc -s -N -h 192.168.223.37 portal -e \""sql"\""; while(cmd|getline){version[$1]=$2;email[$1]=$3;};close(cmd); for (i in array) {sn=""i""; print array[i]" "sn" "version[sn]" 1 "email[sn]" => discovery";}}' | grep -v 12345678 | grep -E "build03[3-9][0-9]|build01[5-9][0-9]" | sort -k1 -n -r;

* rm /home/logsu/logci/statistics/discovery/logci.log*;

* cat /home/logsu/logci/statistics/join/logci.log.* | gawk -F ' ' '{if(length($2)==16) array[$2]+=$1} END {n = asort(array, dest); sql="SELECT ap.sn,ap.fwVersion,a.email FROM ap_ap AS ap JOIN ap_network AS n ON ap.apNetworkOid = n.oid JOIN account AS a ON a.oid = n.accountOid WHERE ap.active=1"; cmd="mysql -u forticrm -pflzx3kc -s -N -h 192.168.223.37 portal -e \""sql"\""; while(cmd|getline){version[$1]=$2;email[$1]=$3;};close(cmd); for (i in array) {sn=""i""; print array[i]" "sn" "version[sn]" 1 "email[sn]" => join";}}' | grep -v 12345678 | grep -E "build03[3-9][0-9]|build01[5-9][0-9]" | sort -k1 -n -r;

* rm /home/logsu/logci/statistics/join/logci.log*;

#### Email Template
* $PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS!
* 
* Apserver received Discovery/Join Request Statistics for last 24 hours ($BUILD_TIMESTAMP):
* 
* FAP Version from build0330-0399, FAP-S Version from build0150-0199
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

