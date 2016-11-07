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
