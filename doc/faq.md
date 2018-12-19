## FAQ

#### Q: AP Discovery: high level description of what happens here and how we process, and which programs/functions are involved?

dispatcher_thread -> dispatcher_process_incoming_packets -> cwAcProcDiscoverReqMsg

1. dispatcher thread receive discovery req control packet from 5246 port.
1. Discovery Req packet should take wtp board data element with serial number.
1. Check if ap SN already in wtp sn hash table. (when user add ap to apnetwork portal will insert sn into apportal.ap_ap table and apserver load it when startup. [DB Load](#db-load))
1. update ap port and ip in wtp hash. (wtp is the alias of ap in code and protocol)
1. build Discovery Response message elements.
1. send response message by cwSendCtlSockMsg

#### Q: AP Join: high level description of what happens here and how we process, and which programs/functions are involved

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

main -> capwap_ac_main -> cwACInit -> cwAcCmfInit2 -> load_wtps_from_db -> cwAcAddWtpHashEntry -> add_wtp_sn_hash_entry

1. when capwap daemon start db load is part of the init process.
1. load wtps is part of the db load process.
1. SQL "SELECT ... p.sn ... from ap_ap AS p ..." is in load_wtps.
1. finally \_\_wtp_sn_head filled with all the related ap info.
1. other part of codes can use find_wtp_sn_hash_entry to check if ap already configed.
