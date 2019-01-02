# Concepts

## APNetwork

#### Client Idle Timeout

The Idle Timeout message element is sent by the AC to the WTP to  
provide the Idle Timeout value that the WTP SHOULD enforce for its  
active stations. The value applies to all radios on the WTP.

The presence of the Delete Station message element is used by the WTP  
to inform the AC that it is no longer providing service to the  
station. This could be the result of an Idle Timeout due to resource shortages, or some other reason.

## WTP

#### Enterprise License (Contract Info)

```c
exec_wtp_enterprise_license_update
```

Some advanced features such as dynamic VLAN need AP has enterprise license.  
Admin user can set ap contract start and end date on controller GUI.  
APServer aync task will pull these contract info in period from meta db portal.deviceContract table.  
APServer only keep ap with enterprise license and check from the diff between pull result.

## SSID (VAP)
