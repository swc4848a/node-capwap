## FAQ

#### Q: AP Discovery: high level description of what happens here and how we process, and which programs/functions are involved?

capwap daemon(dispatcher thread) validates sending AP’s serial number to see if the AP has been added (deployed) by customer to his AP network

```mermaid
graph LR;
    user(User)
    gui[Protal GUI]
    db[DB apportal]
    capwap[APServer capwap]

    user-->|ap deploy|gui
    gui-->|insert ap_ap|db

    db-->|load|capwap

```

![db load](db_load.svg)

```c
dispatcher_thread -> dispatcher_process_incoming_packets -> cwAcProcDiscoverReqMsg
```

1. dispatcher thread receive discovery req control packet from 5246 port
1. Discovery Req packet should take wtp board data element with serial number
1. Check if ap SN already in wtp sn hash table.  
   (when user add ap to apnetwork portal will insert sn into apportal.ap_ap table and apserver load it when startup [DB Load](#db-load))
   - not configed: no response
1. update ap port and ip in wtp hash. (wtp is the alias of ap in code and protocol)
1. build Discovery Response message elements
1. send response message by cwSendCtlSockMsg

#### Q: AP Join: high level description of what happens here and how we process, and which programs/functions are involved

```c
dispatcher_thread -> dispatcher_process_incoming_packets -> packet_list_add ==> worker->pkts_queue

cwAcThreadMain -> cwAcThreadProcPacket -> cwAcThreadProcCtlPacket -> cwAcProcPlainCtlMsg -> cwAcProcJoinReq ==> emit CWAE_JOIN_REQ_RECV event

cwAcThreadMain -> cwAcFsmThread -> cwAcFsm_advance -> CWAS_JOIN_enter
```

1. dispatcher thread dispatch the join request message to worker pkts queue
1. worker thread main loop get join request message from pkts queue and emit CWAE_JOIN_REQ_RECV event
1. worker thread state machine call CWAS_JOIN_enter to handle join req message
1. do some element checking including: sn, admin status, session id, dfs cap
1. update wtp session context, firmware upgrade result, database utm version
1. build join response message, send by CW_AC_SEND_CTL_MSG, change

#### Q: AP Firmware Download: please mention flow/sequence such as AP -> CAPWAP, AP -> FMServer -> DB, etc (which programs/functions are involved and the flow like how AP request the image until how the same reaches the AP)

#### Q: AP Config Download: please mention flow (programs and database) for one example such as an user creating an SSID in AP Portal (available for all his APs) ; i.e., where AP Portal stores the SSID config, how CAPWAP program reads it and sends it to all involved APs ; in capwap module , please try to mention names of functions/threads involved in the flow ; please start the flow from user (GUI) and how config lands in AP

#### Q: AP Config Changes: please mention flow when for example an AP’s LED is turned on or off, an AP radio’s transmit power is changed, etc; please start the flow from user (GUI) and how changed config lands in AP

#### Q: Client Connection - Probing: Are Probe Request / Probe Response processing handled locally in AP or are they forwarded to controller? If forwarded to controller, please mention the flow with CAPWAP protocol message types used.

#### Q: Client Connection – Authentication and Association: Are Authentication / Association Request / Association Response processing handled locally in AP or are they forwarded to controller? If forwarded to controller, please mention the flow with CAPWAP protocol message types used.

#### Q: Client Authentication (11i) – PSK (Personal): Is this handled locally at AP or at controller? If at controller, please mention the flow with CAPWAP protocol message types used. Please mention flow like AP -> CAPWAP program -> …

#### Q: Client Authentication (11i) – 802.1X (Enterprise): please mention the flow with CAPWAP protocol message types used. AP -> EAP_PROXY program -> …

#### Q: Client Data Transfer - data frames (encrypted or open): I assume AP does not forward data frames to controller. Please clarify.

#### Q: Client Disconnection – De-authentication and Disassociation: please mention where these are processed and the flow.

#### Q: Periodically Collecting Client Statistics: please mention flow for how AP sends stats such as its clients count, throughput of each client, RSSI of each client, etc. do these go to CAPWAP or APLOGGER, and which database/table. Please try to mention program names and funtions/threads for receiving these statistics. I assume these are WTP Event Requests, please clarify

#### Q: Periodically Collecting AP Statistics: please mention flow for how AP sends its stats such as operating channel and transmit power, rogue aps detected, etc.

#### Q: Client Roaming (Reassociation): please mention the flow and CAPWAP messages involved

#### Q: Keep-Alive: Is there any keep-alive mechanism between AP and AC? If so, please tell whether it uses control or data channel. I assume it uses Echo Request / Echo Response packets, please confirm.

#### Q:

## Others

### DB Load

APServer start will load related config from apportal database

```c
main -> capwap_ac_main -> cwACInit -> cwAcCmfInit2 -> load_wtps_from_db -> cwAcAddWtpHashEntry -> add_wtp_sn_hash_entry
```

1. when capwap daemon start db load is part of the init process.
1. load wtps is part of the db load process.
1. SQL "SELECT ... p.sn ... from ap_ap AS p ..." is in load_wtps.
1. finally \_\_wtp_sn_head filled with all the related ap info.
1. other part of codes can use find_wtp_sn_hash_entry to check if ap already configed.

#### Q: In DB Load, how the cache (in memory list of ap_ap table) gets updated when customer deploys a new AP through AP Portal (how the entry is read from ap_ap table into cache)

1. APServer only load database when startup
1. When user change configuration on GUI the apportal will send [json cmd](#json-cmd) to APServer capwap daemon

### JSON Cmd

todos
