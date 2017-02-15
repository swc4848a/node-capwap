#! /bin/gawk -f
{
    if(length($2)==16) array[$2]+=$1
} END {
    n = asort(array, dest);
    sql="SELECT ap.sn,ap.fwVersion,a.email FROM ap_ap AS ap JOIN ap_network AS n ON ap.apNetworkOid = n.oid JOIN account AS a ON a.oid = n.accountOid WHERE ap.active=1";
    cmd="mysql -u forticrm -pflzx3kc -s -N -h 192.168.223.37 portal -e \""sql"\"";
    while(cmd|getline) {
        version[$1]=$2;
        email[$1]=$3;
    };
    close(cmd);
    for (i in array) {
        sn=""i"";
        if(index(sn, "12345678")!=0)
            continue;
        if(match(version[sn], /build03[3-9][0-9]|build01[5-9][0-9]|\) =/)==0)
            continue;
        print array[i]" "sn" "version[sn]" 1 "email[sn]" => join";
        if(array[i]==1)
            stat["g# [1, 2)"]+=1;
        else if(array[i]==2)
            stat["h# [2, 3)"]+=1;
        else if(array[i]>=3 && array[i]<10)
            stat["i# [3, 10)"]+=1;
        else if(array[i]>=10&&array[i]<100)
            stat["j# [10, 100)"]+=1;
        else if(array[i]>=100&&array[i]<1000)
            stat["k# [100, 1000)"]+=1;
        else 
            stat["l# [1000, *)"]+=1;
    };
    for (s in stat) {
        print s" = "stat[s]
    }
}