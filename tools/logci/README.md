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
* cat /home/logsu/logci/statistics/logci.log.* | gawk -F ' ' '{if(length($2)==16) array[$2]+=$1} END {n = asort(array, dest); for (i in array) {sn=""i"";sql="SELECT ap.fwVersion,ap.active,a.email FROM ap_ap AS ap JOIN ap_network AS n ON ap.apNetworkOid = n.oid JOIN account AS a ON a.oid = n.accountOid WHERE ap.sn=\\\""sn"\\\""; cmd="mysql -u forticrm -pflzx3kc -s -N -h 192.168.223.37 portal -e \""sql"\""; while(cmd|getline){print array[i]" "i" "$1" "$2" "$3" "};close(cmd);}}' | grep -E "build03[3-9][0-9]|build01[5-9][0-9]" | sort -k1 -n -r;

* rm /home/logsu/logci/statistics/logci.log*;