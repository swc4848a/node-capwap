#!/bin/bash
# tail -F /var/log/capwap.log | rotatelogs -p '/home/logsu/logci/bin/ci.sh' logci.log 1G &
# parse old file from params $2
grep "<msg>" $2 | 
  grep DISCOVERY_REQ | 
  grep "<==" | 
  cut -d\[ -f2- | 
  grep -v "DEMO" | 
  grep -v "0m" | 
  grep -v "cwAcProto.c:1486" | 
  gawk '{print $1" "$13}' | 
  cut -d\- -f 1-4 | 
  cut -d '(' -f 1-2 --output-delimiter='-' | 
  cut -d\- -f 1-3,5 | 
  sort | 
  uniq -c | 
  sort -k1 -n -r > statistics/$2;

# rm old log
rm $2
