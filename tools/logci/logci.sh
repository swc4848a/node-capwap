tail -F /var/log/capwap.log | rotatelogs -p '/home/logsu/logci/bin/ci.sh' logci.log 1G &
