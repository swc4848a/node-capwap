# ConfigManagerServer

## Design pitfalls

### All module rest api should have same behavior.  
For now some module has key to indicate put operation while others use seqNum (Routing).  
Some moudle key is in parent object while others in child object (utmWebRating).  
~~~~
{"params":{"utmWebRating":{"url":"a.com","key":"a.com","rating":9}}}
~~~~

### 