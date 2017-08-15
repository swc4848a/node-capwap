import sys
import socket
import json
import time
import base64
from pprint import pprint

def loadCmd(file):
    with open(file, 'r') as content_file:
        content = content_file.read()
        if "XXXX" in content:
            content = content.replace("XXXX", sys.argv[4])
        print '== request ===================================> '
        print content
    return content

def run(method, cmd):
    jsoncmd = '''{
          "id": 1,
          "url": "/debug/remote/exec/",
          "apNetworkOid": 72214,
          "method": "''' + method + '''",
          "params": [
            {
              "wtpAddr": "190.167.110.183",
              "wtpPort": "5246",
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

    ip = '192.168.223.72'
    port = 9688
    s.connect((ip, port))
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

def put(cmd):
    run('put', cmd)

def get():
    run('get', '')

if __name__ == '__main__' :
    if len(sys.argv) < 2:
        print 'Usage: %s <cmd>' % (sys.argv[0])
        sys.exit(0)

    put(sys.argv[1])
    time.sleep(1)
    get()
