#!/bin/bash
# tail -F /var/log/capwap.log | rotatelogs -p '/home/logsu/logci/bin/ci.sh' logci.log 1G &
# parse old file from params $2

grep "<msg>" $2 |
grep JOIN_REQ |
grep "<==" |
cut -d\[ -f2- |
grep -v "DEMO" |
grep -v "0m" |
grep -v "cwAcProto.c:1486" |
gawk '{split($13, arr, "-"); if (length(arr[2]) == 16) print arr[2]}' |
sort | uniq -c | sort -k1 -n -r > statistics/$2;

# rm old log
scp $2 root@172.16.94.162:/home/zqqiang/logci_warehouse/
rm $2
