import pprint
import json
import time
import pymongo
from pymongo import MongoClient

# client = MongoClient('mongodb://172.16.94.164:27017/')
# client = MongoClient('mongodb://172.16.94.163:27017/')
client = MongoClient('mongodb://172.16.95.48:27017/')

db = client.cfgserver
fos = db.fos

local = open("FGT60D4615007833/local", 'r').read()
remote = open("FGT60D4615007833/remote", 'r').read()
config = json.loads(open("FGT60D4615007833/config.json", 'r').read())

start = time.time()

max = 1000

for x in range(max):
    fos.insert_one({
        "sn": "FGT60D4615007833",
        "seq": x,
        "local": local,
        "config": config,
    })
    fos.update_one({"sn": "FGT60D4615007833"}, {"$set": {
        "sn": "FGT60D4615007833",
        "seq": x,
        "remote": remote,
        "config": config,
    }})
    fos.find_one({
        "sn": "FGT60D4615007833"
    })
    fos.delete_one({
        "sn":"FGT60D4615007833"
    })

end = time.time()

dur = end - start
speed = max/dur

print("insert using %f s, insert speed is %f per second" % (end - start, speed))
