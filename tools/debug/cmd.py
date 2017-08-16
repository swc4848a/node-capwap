import sys
import socket
import json
import time
import base64
import mmap
import re
from pprint import pprint

def getServerIp():
    with open("/etc/apserver.conf") as f:
        for line in f:
            if 'listen=' in line:
                ip = line.split('=')
                print 'apserver ip: ' + ip[1]
                return ip[1]

def run(method, cmd, oid, ip, port):
    jsoncmd = '''{
          "id": 1,
          "url": "/debug/remote/exec/",
          "apNetworkOid": ''' + oid + ''',
          "method": "''' + method + '''",
          "params": [
            {
              "wtpAddr": "''' + ip + '''",
              "wtpPort": "''' + port + '''",
              "type": "r&s",
              "cmd": "''' + cmd + '''"
            }
          ]
        }'''
    
    print '== request ===================================> '
    print jsoncmd

    data = json.loads(jsoncmd)

    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.settimeout(3)

    sip = getServerIp()
    s.connect((sip, 9688))
    s.send(str(json.dumps(data)))
    s.shutdown(socket.SHUT_WR)

    resp = ""
    while 1:
        ret = s.recv(65535);
        if ret:
            resp += ret
        else:
            break;
    s.close();

    print '<======== response =========================== '

    rsp = json.loads(resp)

    if data['url'] == '/debug/remote/exec/' and data['method'] == 'get' and rsp['result'][0]['code'] == 0:
        result = rsp['result']
        b64 = result[0]['data'][0]
        print(base64.b64decode(b64))
    else:
        r = json.dumps(rsp, sort_keys=True, indent=4)
        print(r)

    s.close()

def put(cmd, oid, ip, port):
    run('put', cmd, oid, ip, port)

def get(oid, ip, port):
    run('get', '', oid, ip, port)

def getParams(sn):
    lastmatch = None
    with open("/var/log/capwap.log") as f:
        for line in f:
            if sn in line:
                lastmatch = line
        if lastmatch is not None:
            m = re.findall(r"(\b\d+)[-]([0-9A-Z]+)[-]([0-9.]+):(\b\d+)", lastmatch)
            print m[0]
            return m[0]
        else:
            print 'Can not find AP in apserver!'
            sys.exit(1)

if __name__ == '__main__' :
    if len(sys.argv) < 3:
        print 'Usage: %s <cmd> <ap-sn>' % (sys.argv[0])
        sys.exit(0)

    (oid, sn, ip, port) = getParams(sys.argv[2])
    put(sys.argv[1], oid, ip, port)
    time.sleep(5)
    get(oid, ip, port)

# query log before ap start send discovery req
# grep -rnw /tmp/var_log_wtpd -e CWWS_DISCOVERY_enter -B 200