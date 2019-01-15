#Features

## Short guard interval in 20MHz

ncfg_capwap.c:
cw_wtp_cap defines platform capabilities, such as CW_WTP_CAP_NO_20M_GI which indicates whether it support short guard interval in 20MHz.
when this feature is changed, we need modify cw_wtp_cap and change portal.ap_platforms 20MHzGI columns value.

## New platform

update portal.ap_platforms ap_platform_radios ap_platform_radio_band ap_channels
::Radio Resource Provision & Automatic TX Power Control is hardcode in GUI

Add Platform Profile
Radio Channel checkbox config is from ap_channels column channels, the default selected checkbox maybe form GUI.

Sta IP
AC get sta ip from WTP EVENT REQ from vsp CW_ME_TYPE_VSP_STA_IP_LIST

## AP Offline Alert (Deprecated)

## acctxxxx Database

APServer(aplogger daemon) and APLogServer are responsible for handle AP logs which containing both event, traffic and UTM logs.  
When user create new APNetwork APServer will create the new acctxxxx database and all the tables in that db on APPortal Server.  
wlEvent: all the event logs will write to this table containing join, client auth and errors logs.  
wlTraffic: all the traffic logs used by APPortal to draw the history user's statics chart.

APLogger receive event and traffic logs from capwap, by design we use shared memory to organize the log tree.  
Due to the huge amount of log datas so aplogger keep a tableList to separate the event and traffic log tables.  
When aplogger write logs it check if need to write to a new event/traffic table by its size.  
If the current table is bigger than the threshold then aplogger create a new table and write its name to tableList. (create_next_log_table)  
APLogger is still use mulithread design each worker thread handle parts of the account logs. (worker_thread)  
We have a merger thread to do merge on traffic logs because the traffic logs is 2 miniutes interval.  
So we can merge the traffic logs by sum the tx/rx bytes insert new 1 hour logs and delete 2 mins logs without lost the accurate datas. (do_account_log_hourly_merge)  
We also have rollout design to remove old logs older than 1 year. (process_account_rollout)

## rogue ap detection

From wtp event request message which carry vsp_dot11_ap_list element apserver use this update rogue ap list. (cwAcUpd_aplist)

## captive portal authentication
