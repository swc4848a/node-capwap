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
* gawk -F ' ' -f /home/logsu/logci/bin/discovery.awk /home/logsu/logci/statistics/discovery/logci.log.* | sort -k1 -n -r

* rm /home/logsu/logci/statistics/discovery/logci.log*;

* gawk -F ' ' -f /home/logsu/logci/bin/join.awk /home/logsu/logci/statistics/join/logci.log.* | sort -k1 -n -r

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

