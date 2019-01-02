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
