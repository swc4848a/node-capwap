# logci
* select ap_sn, count(ap_sn) from message where msg_type=1 group by ap_sn;
* select max(ts), min(ts) from message;