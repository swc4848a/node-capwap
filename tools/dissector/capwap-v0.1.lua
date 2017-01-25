local capwap = Proto("FTNT-CAPWAP-Control", "Fortinet Control And Provisioning of Wireless Access Points - Control")

local ptypes = {
    [0] = "CAPWAP Header",
    [1] = "CAPWAP DTLS Header"
}

local booltypes = {
    [0] = "False",
    [1] = "True"
}

local yntypes = {
    [0] = "No",
    [1] = "Yes"
}

local btypes = {
    [1] = "IEEE 802.11"
}

local ntypes = {
    [0] = "Reserved"
}

local stypes = {
    [1] = "Discovery Request",
    [2] = "Discovery Response",
    [3] = "Join Request",
    [4] = "Join Response",
    [5] = "Configuration Status Request",
    [6] = "Configuration Status Response",
    [7] = "Configuration Update Request",
    [8] = "Configuration Update Response",
    [9] = "WTP Event Request",
    [10] = "WTP Event Response",
    [11] = "Change State Request",
    [12] = "Change State Response",
    [13] = "Echo Request",
    [14] = "Echo Response",
    [15] = "Image Data Request",
    [16] = "Image Data Response",
    [17] = "Reset Request",
    [18] = "Reset Response",
    [19] = "Primary Discovery Request",
    [20] = "Primary Discovery Response",
    [21] = "Data Transfer Request",
    [22] = "Data Transfer Response",
    [23] = "Clear Configuration Request",
    [24] = "Clear Configuration Response",
    [25] = "Station Configuration Request",
    [26] = "Station Configuration Response",

 -- /* RFC5416 : Section 3 : IEEE 802.11 Specific CAPWAP Control Messages */
    [3398913] = "IEEE 802.11 WLAN Configuration Request",
    [3398914] = "IEEE 802.11 WLAN Configuration Response"
}

-- /* ************************************************************************* */
-- /*                      Message Element Type                                 */
-- /* ************************************************************************* */
local elementTypes = {
    ["TYPE_AC_DESCRIPTOR"] = 1,
    ["TYPE_AC_IPV4_LIST"] = 2,
    ["TYPE_AC_IPV6_LIST"] = 3,
    ["TYPE_AC_NAME"] = 4,
    ["TYPE_AC_NAME_W_PRIORITY"] = 5,
    ["TYPE_AC_TIMESTAMP"] = 6,
    ["TYPE_ADD_MAC_ACL_ENTRY"] = 7,
    ["TYPE_ADD_STATION"] = 8,
    ["TYPE_RESERVED_9"] = 9,
    ["TYPE_CAPWAP_CONTROL_IPV4_ADDRESS"] = 10,
    ["TYPE_CAPWAP_CONTROL_IPV6_ADDRESS"] = 11,
    ["TYPE_CAPWAP_TIMERS"] = 12,
    ["TYPE_DATA_TRANSFER_DATA"] = 13,
    ["TYPE_DATA_TRANSFER_MODE"] = 14,
    ["TYPE_DESCRYPTION_ERROR_REPORT"] = 15,
    ["TYPE_DECRYPTION_ERROR_REPORT_PERIOD"] = 16,
    ["TYPE_DELETE_MAC_ENTRY"] = 17,
    ["TYPE_DELETE_STATION"] = 18,
    ["TYPE_RESERVED_19"] = 19,
    ["TYPE_DISCOVERY_TYPE"] = 20,
    ["TYPE_DUPLICATE_IPV4_ADDRESS"] = 21,
    ["TYPE_DUPLICATE_IPV6_ADDRESS"] = 22,
    ["TYPE_IDLE_TIMEOUT"] = 23,
    ["TYPE_IMAGE_DATA"] = 24,
    ["TYPE_IMAGE_IDENTIFIER"] = 25,
    ["TYPE_IMAGE_INFORMATION"] = 26,
    ["TYPE_INITIATE_DOWNLOAD"] = 27,
    ["TYPE_LOCATION_DATA"] = 28,
    ["TYPE_MAXIMUM_MESSAGE_LENGTH"] = 29,
    ["TYPE_CAPWAP_LOCAL_IPV4_ADDRESS"] = 30,
    ["TYPE_RADIO_ADMINISTRATIVE_STATE"] = 31,
    ["TYPE_RADIO_OPERATIONAL_STATE"] = 32,
    ["TYPE_RESULT_CODE"] = 33,
    ["TYPE_RETURNED_MESSAGE_ELEMENT"] = 34,
    ["TYPE_SESSION_ID"] = 35,
    ["TYPE_STATISTICS_TIMER"] = 36,
    ["TYPE_VENDOR_SPECIFIC_PAYLOAD"] = 37,
    ["TYPE_WTP_BOARD_DATA"] = 38,
    ["TYPE_WTP_DESCRIPTOR"] = 39,
    ["TYPE_WTP_FALLBACK"] = 40,
    ["TYPE_WTP_FRAME_TUNNEL_MODE"] = 41,
    ["TYPE_RESERVED_42"] = 42,
    ["TYPE_RESERVED_43"] = 43,
    ["TYPE_WTP_MAC_TYPE"] = 44,
    ["TYPE_WTP_NAME"] = 45,
    ["TYPE_RESERVED_46"] = 46,
    ["TYPE_WTP_RADIO_STATISTICS"] = 47,
    ["TYPE_WTP_REBOOT_STATISTICS"] = 48,
    ["TYPE_WTP_STATIC_IP_ADDRESS_INFORMATION"] = 49,
    ["TYPE_CAPWAP_LOCAL_IPV6_ADDRESS"] = 50,
    ["TYPE_CAPWAP_TRANSPORT_PROTOCOL"] = 51,
    ["TYPE_MTU_DISCOVERY_PADDING"] = 52,
    ["TYPE_ECN_SUPPORT"] = 53,

    ["IEEE80211_ADD_WLAN"] = 1024,
    ["IEEE80211_ANTENNA"] = 1025,
    ["IEEE80211_ASSIGNED_WTP_BSSID"] = 1026,
    ["IEEE80211_DELETE_WLAN"] = 1027,
    ["IEEE80211_DIRECT_SEQUENCE_CONTROL"] = 1028,
    ["IEEE80211_INFORMATION_ELEMENT"] = 1029,
    ["IEEE80211_MAC_OPERATION"] = 1030,
    ["IEEE80211_MIC_COUNTERMEASURES"] = 1031,
    ["IEEE80211_MULTI_DOMAIN_CAPABILITY"] = 1032,
    ["IEEE80211_OFDM_CONTROL"] = 1033,
    ["IEEE80211_RATE_SET"] = 1034,
    ["IEEE80211_RSNA_ERROR_REPORT_FROM_STATION"] = 1035,
    ["IEEE80211_STATION"] = 1036,
    ["IEEE80211_STATION_QOS_PROFILE"] = 1037,
    ["IEEE80211_STATION_SESSION_KEY"] = 1038,
    ["IEEE80211_STATISTICS"] = 1039,
    ["IEEE80211_SUPPORTED_RATES"] = 1040,
    ["IEEE80211_TX_POWER"] = 1041,
    ["IEEE80211_TX_POWER_LEVEL"] = 1042,
    ["IEEE80211_UPDATE_STATION_QOS"] = 1043,
    ["IEEE80211_UPDATE_WLAN"] = 1044,
    ["IEEE80211_WTP_QUALITY_OF_SERVICE"] = 1045,
    ["IEEE80211_WTP_RADIO_CONFIGURATION"] = 1046,
    ["IEEE80211_WTP_RADIO_FAIL_ALARM_INDICATION"] = 1047,
    ["IEEE80211_WTP_RADIO_INFORMATION"] = 1048,
    ["IEEE80211_SUPPORTED_MAC_PROFILES"] = 1060,
    ["IEEE80211_MAC_PROFILE"] = 1061,
}


-- /* ************************************************************************* */
-- /*                      Message Element Type Value                           */
-- /* ************************************************************************* */
local tlvTypes = {
    [elementTypes.TYPE_AC_DESCRIPTOR] = "AC Descriptor",
    [elementTypes.TYPE_AC_IPV4_LIST] = "AC IPv4 List",
    [elementTypes.TYPE_AC_IPV6_LIST] = "AC IPv6 List",
    [elementTypes.TYPE_AC_NAME] = "AC Name",
    [elementTypes.TYPE_AC_NAME_W_PRIORITY] = "AC Name With Priority",
    [elementTypes.TYPE_AC_TIMESTAMP] = "AC Timestamp",
    [elementTypes.TYPE_ADD_MAC_ACL_ENTRY] = "Add MAC ACL Entry",
    [elementTypes.TYPE_ADD_STATION] = "Add Station",
    [elementTypes.TYPE_RESERVED_9] = "Reserved",
    [elementTypes.TYPE_CAPWAP_CONTROL_IPV4_ADDRESS] = "CAPWAP Control IPv4 Address",
    [elementTypes.TYPE_CAPWAP_CONTROL_IPV6_ADDRESS] = "CAPWAP Control IPv6 Address",
    [elementTypes.TYPE_CAPWAP_TIMERS] = "CAPWAP Timers",
    [elementTypes.TYPE_DATA_TRANSFER_DATA] = "Data Transfer Data",
    [elementTypes.TYPE_DATA_TRANSFER_MODE] = "Data Transfer Mode",
    [elementTypes.TYPE_DESCRYPTION_ERROR_REPORT] = "Decryption Error Report",
    [elementTypes.TYPE_DECRYPTION_ERROR_REPORT_PERIOD] = "Decryption Error Report Period",
    [elementTypes.TYPE_DELETE_MAC_ENTRY] = "Delete MAC ACL Entry",
    [elementTypes.TYPE_DELETE_STATION] = "Delete Station",
    [elementTypes.TYPE_RESERVED_19] = "Reserved",
    [elementTypes.TYPE_DISCOVERY_TYPE] = "Discovery Type",
    [elementTypes.TYPE_DUPLICATE_IPV4_ADDRESS] = "Duplicate IPv4 Address",
    [elementTypes.TYPE_DUPLICATE_IPV6_ADDRESS] = "Duplicate IPv6 Address",
    [elementTypes.TYPE_IDLE_TIMEOUT] = "Idle Timeout",
    [elementTypes.TYPE_IMAGE_DATA] = "Image Data",
    [elementTypes.TYPE_IMAGE_IDENTIFIER] = "Image Identifier",
    [elementTypes.TYPE_IMAGE_INFORMATION] = "Image Information",
    [elementTypes.TYPE_INITIATE_DOWNLOAD] = "Initiate Download",
    [elementTypes.TYPE_LOCATION_DATA] = "Location Data",
    [elementTypes.TYPE_MAXIMUM_MESSAGE_LENGTH] = "Maximum Message Length",
    [elementTypes.TYPE_CAPWAP_LOCAL_IPV4_ADDRESS] = "CAPWAP Local IPv4 Address",
    [elementTypes.TYPE_RADIO_ADMINISTRATIVE_STATE] = "Radio Administrative State ",
    [elementTypes.TYPE_RADIO_OPERATIONAL_STATE] = "Radio Operational State",
    [elementTypes.TYPE_RESULT_CODE] = "Result Code",
    [elementTypes.TYPE_RETURNED_MESSAGE_ELEMENT] = "Returned Message Element",
    [elementTypes.TYPE_SESSION_ID] = "Session ID",
    [elementTypes.TYPE_STATISTICS_TIMER] = "Statistics Timer",
    [elementTypes.TYPE_VENDOR_SPECIFIC_PAYLOAD] = "Vendor Specific Payload",
    [elementTypes.TYPE_WTP_BOARD_DATA] = "WTP Board Data",
    [elementTypes.TYPE_WTP_DESCRIPTOR] = "WTP Descriptor",
    [elementTypes.TYPE_WTP_FALLBACK] = "WTP Fallback ",
    [elementTypes.TYPE_WTP_FRAME_TUNNEL_MODE] = "WTP Frame Tunnel Mode ",
    [elementTypes.TYPE_RESERVED_42] = "Reserved",
    [elementTypes.TYPE_RESERVED_43] = "Reserved",
    [elementTypes.TYPE_WTP_MAC_TYPE] = "WTP MAC Type",
    [elementTypes.TYPE_WTP_NAME] = "WTP Name",
    [elementTypes.TYPE_RESERVED_46] = "Unused/Reserved",
    [elementTypes.TYPE_WTP_RADIO_STATISTICS] = "WTP Radio Statistics",
    [elementTypes.TYPE_WTP_REBOOT_STATISTICS] = "WTP Reboot Statistics",
    [elementTypes.TYPE_WTP_STATIC_IP_ADDRESS_INFORMATION] = "WTP Static IP Address Information",
    [elementTypes.TYPE_CAPWAP_LOCAL_IPV6_ADDRESS] = "CAPWAP Local IPv6 Address",
    [elementTypes.TYPE_CAPWAP_TRANSPORT_PROTOCOL] = "CAPWAP Transport Protocol",
    [elementTypes.TYPE_MTU_DISCOVERY_PADDING] = "MTU Discovery Padding",
    [elementTypes.TYPE_ECN_SUPPORT] = "ECN Support",

    [elementTypes.IEEE80211_ADD_WLAN] = "IEEE 802.11 Add WLAN",
    [elementTypes.IEEE80211_ANTENNA] = "IEEE 802.11 Antenna",
    [elementTypes.IEEE80211_ASSIGNED_WTP_BSSID] = "IEEE 802.11 Assigned WTP BSSID",
    [elementTypes.IEEE80211_DELETE_WLAN] = "IEEE 802.11 Delete WLAN",
    [elementTypes.IEEE80211_DIRECT_SEQUENCE_CONTROL] = "IEEE 802.11 Direct Sequence Control",
    [elementTypes.IEEE80211_INFORMATION_ELEMENT] = "IEEE 802.11 Information Element",
    [elementTypes.IEEE80211_MAC_OPERATION] = "IEEE 802.11 MAC Operation",
    [elementTypes.IEEE80211_MIC_COUNTERMEASURES] = "IEEE 802.11 MIC Countermeasures",
    [elementTypes.IEEE80211_MULTI_DOMAIN_CAPABILITY] = "IEEE 802.11 Multi-Domain Capability",
    [elementTypes.IEEE80211_OFDM_CONTROL] = "IEEE 802.11 OFDM Control",
    [elementTypes.IEEE80211_RATE_SET] = "IEEE 802.11 Rate Set",
    [elementTypes.IEEE80211_RSNA_ERROR_REPORT_FROM_STATION] = "IEEE 802.11 RSNA Error Report From Station",
    [elementTypes.IEEE80211_STATION] = "IEEE 802.11 Station",
    [elementTypes.IEEE80211_STATION_QOS_PROFILE] = "IEEE 802.11 Station QoS Profile",
    [elementTypes.IEEE80211_STATION_SESSION_KEY] = "IEEE 802.11 Station Session Key",
    [elementTypes.IEEE80211_STATISTICS] = "IEEE 802.11 Statistics",
    [elementTypes.IEEE80211_SUPPORTED_RATES] = "IEEE 802.11 Supported Rates",
    [elementTypes.IEEE80211_TX_POWER] = "IEEE 802.11 Tx Power",
    [elementTypes.IEEE80211_TX_POWER_LEVEL] = "IEEE 802.11 Tx Power Level",
    [elementTypes.IEEE80211_UPDATE_STATION_QOS] = "IEEE 802.11 Update Station QoS",
    [elementTypes.IEEE80211_UPDATE_WLAN] = "IEEE 802.11 Update WLAN",
    [elementTypes.IEEE80211_WTP_QUALITY_OF_SERVICE] = "IEEE 802.11 WTP Quality of Service",
    [elementTypes.IEEE80211_WTP_RADIO_CONFIGURATION] = "IEEE 802.11 WTP Radio Configuration",
    [elementTypes.IEEE80211_WTP_RADIO_FAIL_ALARM_INDICATION] = "IEEE 802.11 WTP Radio Fail Alarm Indication",
    [elementTypes.IEEE80211_WTP_RADIO_INFORMATION] = "IEEE 802.11 WTP Radio Information",
    [elementTypes.IEEE80211_SUPPORTED_MAC_PROFILES] = "IEEE 802.11 Supported MAC Profiles",
    [elementTypes.IEEE80211_MAC_PROFILE] = "IEEE 802.11 MAC Profile",
    [0] = "Unknown"
}

-- /* ************************************************************************* */
-- /*                      Discovery Type                                       */
-- /* ************************************************************************* */
local discovery_type_vals = {
    [0] = "Unknown",
    [1] = "Static Configuration",
    [2] = "DHCP",
    [3] = "DNS",
    [4] = "AC Referral"
};

local vsp = {}
-- /* From FortiAP/WiFI 5.2.0 */
vsp.VSP_FORTINET_AP_SCAN = 16
vsp.VSP_FORTINET_AP_LIST = 17

vsp.VSP_FORTINET_AP_SCAN_IDLE = 23
vsp.VSP_FORTINET_PASSIVE = 24
vsp.VSP_FORTINET_AP_SCAN_SNIFFER = 25

vsp.VSP_FORTINET_DAEMON_RST = 32
vsp.VSP_FORTINET_MAC = 33
vsp.VSP_FORTINET_WTP_ALLOW = 34
vsp.VSP_FORTINET_WDS_STA = 35
vsp.VSP_FORTINET_WBH_STA = 36
vsp.VSP_FORTINET_MIC_FAILURE = 37
vsp.VSP_FORTINET_STA_IP_LIST = 38
vsp.VSP_FORTINET_STA_HOST_INFO_LIST = 39
vsp.VSP_FORTINET_ADD_STA = 40
vsp.VSP_FORTINET_ADD_TUNLAN_HOST = 41
vsp.VSP_FORTINET_DEL_TUNLAN_HOST = 42
vsp.VSP_FORTINET_STA_SESSION_KEY = 43
vsp.VSP_FORTINET_STA_AUTHED = 44
vsp.VSP_FORTINET_ADD_STA_LOC = 45

vsp.VSP_FORTINET_HTCAP = 49
vsp.VSP_FORTINET_MGMT_VAP = 50
vsp.VSP_FORTINET_MODE = 51
vsp.VSP_FORTINET_COEXT = 52
vsp.VSP_FORTINET_AMSDU = 53
vsp.VSP_FORTINET_PS_OPT = 54
vsp.VSP_FORTINET_PURE = 55
vsp.VSP_FORTINET_EBP_TAG = 56

vsp.VSP_FORTINET_AUTO_CHAN = 65
vsp.VSP_FORTINET_RADAR = 66
vsp.VSP_FORTINET_NOL_DEL = 67
vsp.VSP_FORTINET_NOL_ADD = 68
vsp.VSP_FORTINET_CONFIG_CODE = 69
vsp.VSP_FORTINET_DHCP_STARVATION = 70
vsp.VSP_FORTINET_VAP_STATE_LIST = 71

vsp.VSP_FORTINET_TELNET_ENABLE = 81
vsp.VSP_FORTINET_ADMIN_PASSWD = 82
vsp.VSP_FORTINET_REGCODE = 83
vsp.VSP_FORTINET_COUNTRYCODE = 84
vsp.VSP_FORTINET_HTTP_ENABLE = 85
vsp.VSP_FORTINET_HTTPS_ENABLE = 86
vsp.VSP_FORTINET_SSH_ENABLE = 87
vsp.VSP_FORTINET_CMD_DATA = 88
vsp.VSP_FORTINET_CMD_NAME = 89

vsp.VSP_FORTINET_STA_LIST = 97
vsp.VSP_FORTINET_ARP_LIST = 98
vsp.VSP_FORTINET_STA_SCAN = 99
vsp.VSP_FORTINET_SCAN_CLR_ALL = 100
vsp.VSP_FORTINET_STA_CAP_LIST = 101
vsp.VSP_FORTINET_STA_CAP = 102
vsp.VSP_FORTINET_FHO = 103
vsp.VSP_FORTINET_APHO = 104

vsp.VSP_FORTINET_STA_LOCATE = 106
vsp.VSP_FORTINET_STA_LOCATE_RESET = 107
vsp.VSP_FORTINET_SPECTRUM_ANALYSIS = 108
vsp.VSP_FORTINET_SA_SAMP = 109
vsp.VSP_FORTINET_ENCRYPT_KEY = 110

vsp.VSP_FORTINET_DARRP_CFG = 112
vsp.VSP_FORTINET_DARRP_RTBL = 113
vsp.VSP_FORTINET_DARRP_OPER_CHAN = 114
vsp.VSP_FORTINET_DARRP_OPTIMIZE = 115
vsp.VSP_FORTINET_VAP_STA_MAX_AP = 116
vsp.VSP_FORTINET_RADIO_STA_MAX = 117
vsp.VSP_FORTINET_WTP_STA_MAX = 118

vsp.VSP_FORTINET_AP_SUPPRESS_LIST = 128
vsp.VSP_FORTINET_FORTIPRESENCE_ENABLE = 129
vsp.VSP_FORTINET_FORTIPRESENCE_PARAMS = 130

vsp.VSP_FORTINET_VAP_DOWNUP = 144
vsp.VSP_FORTINET_WDS = 145
vsp.VSP_FORTINET_VAP_FLAGS = 146
vsp.VSP_FORTINET_VAP_VLAN_TAG = 147
vsp.VSP_FORTINET_VAP_BITMAP = 148
vsp.VSP_FORTINET_MCAST_RATE = 149
vsp.VSP_FORTINET_CFG = 150
vsp.VSP_FORTINET_SPLIT_TUN_CFG = 151

vsp.VSP_FORTINET_WTP_LED_DARK = 156
vsp.VSP_FORTINET_MAX_RETRANSMIT = 157
vsp.VSP_FORTINET_VAP_NATIP = 158
vsp.VSP_FORTINET_DOWNUP_SCHEDULE = 159
vsp.VSP_FORTINET_FORTIK_MESH_WIRED_LINK = 160
vsp.VSP_FORTINET_MGMT_VLAN_TAG = 161
vsp.VSP_FORTINET_DEL_STA_TS = 162
vsp.VSP_FORTINET_DISABLE_THRESH = 163
vsp.VSP_FORTINET_LAN_PORT_MAPPING = 164
vsp.VSP_FORTINET_DEL_STA_REASON = 165
vsp.VSP_FORTINET_STA_VLAN_TAG = 166
vsp.VSP_FORTINET_VAP_PSK_PASSWD = 167
vsp.VSP_FORTINET_LAN_PORT_CFG = 168
vsp.VSP_FORTINET_LAN_PORT_MAC = 169
vsp.VSP_FORTINET_IP_FRAG = 170
vsp.VSP_FORTINET_MAX_DISTANCE = 171
vsp.VSP_FORTINET_DEL_STA_BY = 172
vsp.VSP_FORTINET_DTLS_DATA_IN_KERNEL = 173
vsp.VSP_FORTINET_RADIUS_CONFIG = 174
vsp.VSP_FORTINET_VAP_WEB_AUTH_SERVER = 175
vsp.VSP_FORTINET_MESH_ETH_BRIDGE_ENABLE = 176
vsp.VSP_FORTINET_MESH_ETH_BRIDGE_TYPE = 177

vsp.VSP_FORTINET_WTP_CAP = 192
vsp.VSP_FORTINET_TXPWR = 193
vsp.VSP_FORTINET_AC_CAP = 194
vsp.VSP_FORTINET_STA_STATS = 195
vsp.VSP_FORTINET_VAP_STATS = 196
vsp.VSP_FORTINET_WTP_STATS = 197
vsp.VSP_FORTINET_WTP_UPTIME = 198
vsp.VSP_FORTINET_STA_WPA_INFO = 199
vsp.VSP_FORTINET_RADIO_STATS = 200
vsp.VSP_FORTINET_STA_STATS_INTERVAL = 201
vsp.VSP_FORTINET_STA_CAP_INTERVAL = 202
vsp.VSP_FORTINET_MU_LIST = 203
vsp.VSP_FORTINET_TXPWR_MAX = 204
vsp.VSP_FORTINET_TXPWR_DBM = 205
vsp.VSP_FORTINET_TIMERS_INTERVAL = 206

vsp.VSP_FORTINET_WIDS = 208
vsp.VSP_FORTINET_WIDS_ENABLE = 209
vsp.VSP_FORTINET_WIDS_PARAMS_LONG_DUR = 210
vsp.VSP_FORTINET_WIDS_PARAMS_ASSOC_TIME = 211
vsp.VSP_FORTINET_WIDS_PARAMS_ASSOC_THRESH = 212
vsp.VSP_FORTINET_WIDS_PARAMS_AUTH_TIME = 213
vsp.VSP_FORTINET_WIDS_PARAMS_AUTH_THRESH = 214

vsp.VSP_FORTINET_VAP_RATES = 225
vsp.VSP_FORTINET_BONJOUR_CONFIG = 226
vsp.VSP_FORTINET_VAP_OKC_CONFIG = 228
vsp.VSP_FORTINET_VAP_DYNAMIC_VLAN = 230
vsp.VSP_FORTINET_ST_RADIUS_USER = 231
vsp.VSP_FORTINET_VAP_LDPC_CONFIG = 232
vsp.VSP_FORTINET_ST_VLAN_ID = 234
vsp.VSP_FORTINET_STA_RADIUS_INFO = 235

vsp.VSP_FORTINET_WIDS_SUBTYPE_RF_THREAT_ROGUE_AP = 0x500
vsp.VSP_FORTINET_WIDS_SUBTYPE_RF_THREAT_INTERFEAR_AP = 0x501
vsp.VSP_FORTINET_WIDS_SUBTYPE_RF_THREAT_WL_BR = 0x502
vsp.VSP_FORTINET_WIDS_SUBTYPE_RF_THREAT_WEP_IV = 0x506
vsp.VSP_FORTINET_WIDS_SUBTYPE_RF_THREAT_BC_DEAUTH = 0x507
vsp.VSP_FORTINET_WIDS_SUBTYPE_RF_THREAT_NL_PBRESP = 0x508
vsp.VSP_FORTINET_WIDS_SUBTYPE_RF_THREAT_LONG_DUR = 0x509
vsp.VSP_FORTINET_WIDS_SUBTYPE_RF_THREAT_MAC_OUI = 0x50a
vsp.VSP_FORTINET_WIDS_SUBTYPE_RF_THREAT_MGMT_FLOOD = 0x50b
vsp.VSP_FORTINET_WIDS_SUBTYPE_RF_THREAT_SPOOF_DEAUTH = 0x50f
vsp.VSP_FORTINET_WIDS_SUBTYPE_RF_THREAT_ASLEAP = 0x510
vsp.VSP_FORTINET_WIDS_SUBTYPE_RF_THREAT_EAPOL = 0x511
vsp.VSP_FORTINET_WIDS_SUBTYPE_RF_THREAT_LAST = 0x600

vsp.VSP_FORTINET_WALLED_GARDEN = 0x811
vsp.VSP_FORTINET_UTM_INFO = 0x812
vsp.VSP_FORTINET_UTM_DATA = 0x813
vsp.VSP_FORTINET_UTM_JSON_INFO = 0x814
vsp.VSP_FORTINET_UTM_JSON_DATA = 0x815
vsp.VSP_FORTINET_UTM_VERSION = 0x816
vsp.VSP_FORTINET_UPLOAD_LOG_NOW = 0x817
vsp.VSP_FORTINET_USER_GROUP = 0x818
vsp.VSP_FORTINET_ROAMING_SUCCESS = 0x819
vsp.VSP_FORTINET_FORTIGUARD_IMAGE_ID = 0x820
vsp.VSP_FORTINET_FCLD_FIRMWWARE_INFO_URL = 0x821
vsp.VSP_FORTINET_FCLD_FIRMWWARE_DOWNLOAD_URL = 0x822
vsp.VSP_FORTINET_FCLD_FIRMWARE_RESULT = 0x823
vsp.VSP_FORTINET_TIMEZONE_INFO = 0x824

local fortinet_element_id_vals = {
    [vsp.VSP_FORTINET_AP_SCAN] = "AP Scan",
    [vsp.VSP_FORTINET_AP_LIST] = "AP List",
    [vsp.VSP_FORTINET_DAEMON_RST] = "Daemon Reset",
    [vsp.VSP_FORTINET_MAC] = "MAC",
    [vsp.VSP_FORTINET_AP_SCAN_IDLE] = "AP Scan Idle",
    [vsp.VSP_FORTINET_PASSIVE] = "Passive",
    [vsp.VSP_FORTINET_AP_SCAN_SNIFFER] = "AP Scan Sniffer",
    [vsp.VSP_FORTINET_WTP_ALLOW] = "WTP Allow",
    [vsp.VSP_FORTINET_WDS_STA] = "Mesh WDS STA",
    [vsp.VSP_FORTINET_WBH_STA] = "Mesh WBH STA",
    [vsp.VSP_FORTINET_MIC_FAILURE] = "MIC Failure",
    [vsp.VSP_FORTINET_STA_IP_LIST] = "STA IP List",
    [vsp.VSP_FORTINET_STA_HOST_INFO_LIST] = "STA Host Info List",
    [vsp.VSP_FORTINET_ADD_STA] = "Add STA",
    [vsp.VSP_FORTINET_ADD_TUNLAN_HOST]  ="Add Tunlan Host",
    [vsp.VSP_FORTINET_DEL_TUNLAN_HOST]  ="Del Tunlan Host",
    [vsp.VSP_FORTINET_STA_SESSION_KEY]  ="STA Session Key",
    [vsp.VSP_FORTINET_STA_AUTHED]  ="STA Authed",
    [vsp.VSP_FORTINET_ADD_STA_LOC]  ="Add STA Loc",
    [vsp.VSP_FORTINET_HTCAP] = "HT Capabilities",
    [vsp.VSP_FORTINET_MGMT_VAP] = "Management VAP",
    [vsp.VSP_FORTINET_MODE] = "Mode",
    [vsp.VSP_FORTINET_COEXT] = "Coext",
    [vsp.VSP_FORTINET_AMSDU] = "AMSDU",
    [vsp.VSP_FORTINET_PS_OPT] = "PS OPT",
    [vsp.VSP_FORTINET_PURE] = "Pure",
    [vsp.VSP_FORTINET_EBP_TAG] = "EBP Tag",
    [vsp.VSP_FORTINET_AUTO_CHAN] = "Auto Channel",
    [vsp.VSP_FORTINET_RADAR] = "Radar",
    [vsp.VSP_FORTINET_NOL_DEL] = "Nol Delete",
    [vsp.VSP_FORTINET_NOL_ADD] = "Nol Add",
    [vsp.VSP_FORTINET_CONFIG_CODE] = "Config Code",
    [vsp.VSP_FORTINET_DHCP_STARVATION] = "DHCP Starvation",
    [vsp.VSP_FORTINET_VAP_STATE_LIST] = "State List",
    [vsp.VSP_FORTINET_TELNET_ENABLE] = "Telnet Enable",
    [vsp.VSP_FORTINET_ADMIN_PASSWD] = "Admin Password",
    [vsp.VSP_FORTINET_REGCODE] = "Reg Code",
    [vsp.VSP_FORTINET_COUNTRYCODE] = "Country Code",
    [vsp.VSP_FORTINET_HTTP_ENABLE] = "HTTP Enable",
    [vsp.VSP_FORTINET_HTTPS_ENABLE] = "HTTPS Enable",
    [vsp.VSP_FORTINET_SSH_ENABLE] = "SSH Enable",
    [vsp.VSP_FORTINET_CMD_DATA] = "Cmd Data",
    [vsp.VSP_FORTINET_CMD_NAME] = "Cmd Name",
    [vsp.VSP_FORTINET_STA_LIST] = "Sta List",
    [vsp.VSP_FORTINET_ARP_LIST] = "Arp List",
    [vsp.VSP_FORTINET_STA_SCAN] = "STA Scan",
    [vsp.VSP_FORTINET_SCAN_CLR_ALL] = "Scan Clear All",
    [vsp.VSP_FORTINET_STA_CAP_LIST] = "STA Capability List",
    [vsp.VSP_FORTINET_STA_CAP] = "STA Capability",
    [vsp.VSP_FORTINET_FHO] = "FHO",
    [vsp.VSP_FORTINET_APHO] = "APHO",
    [vsp.VSP_FORTINET_STA_LOCATE] = "STA Locate",
    [vsp.VSP_FORTINET_STA_LOCATE_RESET] = "STA Locate Reset",
    [vsp.VSP_FORTINET_SPECTRUM_ANALYSIS] = "Spectrum Analysis",
    [vsp.VSP_FORTINET_SA_SAMP] = "Sa Samp",
    [vsp.VSP_FORTINET_ENCRYPT_KEY] = "Encrypt Key",
    [vsp.VSP_FORTINET_DARRP_CFG] = "DARRP Configuration",
    [vsp.VSP_FORTINET_DARRP_RTBL] = "DARRP Rtbl",
    [vsp.VSP_FORTINET_DARRP_OPER_CHAN] = "DARRP Operation Channel",
    [vsp.VSP_FORTINET_DARRP_OPTIMIZE] = "DARRP Optimize",
    [vsp.VSP_FORTINET_VAP_STA_MAX_AP] = "Sta Max AP",
    [vsp.VSP_FORTINET_RADIO_STA_MAX] = "Radio Sta Max",
    [vsp.VSP_FORTINET_WTP_STA_MAX] = "Wtp Sta Max",
    [vsp.VSP_FORTINET_AP_SUPPRESS_LIST] = "AP Suppress List",
    [vsp.VSP_FORTINET_FORTIPRESENCE_ENABLE] = "FortiPresence Enable",
    [vsp.VSP_FORTINET_FORTIPRESENCE_PARAMS] = "FortiPresence Params",
    [vsp.VSP_FORTINET_VAP_DOWNUP] = "Down Up",
    [vsp.VSP_FORTINET_VAP_FLAGS] = "VAP Flags",
    [vsp.VSP_FORTINET_WDS] = "WDS",
    [vsp.VSP_FORTINET_VAP_VLAN_TAG] = "VAP Vlan",
    [vsp.VSP_FORTINET_VAP_BITMAP] = "VAP Bitmap",
    [vsp.VSP_FORTINET_MCAST_RATE] = "Multicast Rate",
    [vsp.VSP_FORTINET_CFG] = "Configuration",
    [vsp.VSP_FORTINET_SPLIT_TUN_CFG] = "Split Tunnel Configuration",
    [vsp.VSP_FORTINET_WTP_LED_DARK] = "Wtp Led Dark",
    [vsp.VSP_FORTINET_MAX_RETRANSMIT] = "Max Retransmit",
    [vsp.VSP_FORTINET_VAP_NATIP] = "Vap NatIP",
    [vsp.VSP_FORTINET_DOWNUP_SCHEDULE] = "Downup Schedule",
    [vsp.VSP_FORTINET_FORTIK_MESH_WIRED_LINK] = "Fortik Mesh Wired Link",
    [vsp.VSP_FORTINET_MGMT_VLAN_TAG] = "Management Vlan",
    [vsp.VSP_FORTINET_DEL_STA_TS] = "Delete STA Timestamp",
    [vsp.VSP_FORTINET_DISABLE_THRESH] = "Disable Threshold",
    [vsp.VSP_FORTINET_LAN_PORT_MAPPING] = "Lan Port Mapping",
    [vsp.VSP_FORTINET_DEL_STA_REASON] = "Delete STA Reason",
    [vsp.VSP_FORTINET_STA_VLAN_TAG] = "STA Vlan Tag",
    [vsp.VSP_FORTINET_VAP_PSK_PASSWD] = "VAP PSK Password",
    [vsp.VSP_FORTINET_LAN_PORT_CFG] = "Lan Port Config",
    [vsp.VSP_FORTINET_LAN_PORT_MAC] = "Lan Port Mac",
    [vsp.VSP_FORTINET_IP_FRAG] = "IP Frag",
    [vsp.VSP_FORTINET_MAX_DISTANCE] = "Max Distance",
    [vsp.VSP_FORTINET_DEL_STA_BY] = "Delete STA By",
    [vsp.VSP_FORTINET_DTLS_DATA_IN_KERNEL] = "DTLS Data In Kernel",
    [vsp.VSP_FORTINET_RADIUS_CONFIG] = "Radius Config",
    [vsp.VSP_FORTINET_VAP_WEB_AUTH_SERVER] = "Web Auth Server",
    [vsp.VSP_FORTINET_MESH_ETH_BRIDGE_ENABLE] = "Mesh Eth Bridge Enable",
    [vsp.VSP_FORTINET_MESH_ETH_BRIDGE_TYPE] = "Mesh Eth Bridge Type",
    [vsp.VSP_FORTINET_WTP_CAP] = "WTP Capabilities",
    [vsp.VSP_FORTINET_TXPWR] = "Tx Power",
    [vsp.VSP_FORTINET_AC_CAP] = "AC Capabilities",
    [vsp.VSP_FORTINET_STA_STATS] = "STA Statistics",
    [vsp.VSP_FORTINET_VAP_STATS] = "VAP Statistics",
    [vsp.VSP_FORTINET_WTP_STATS] = "WTP Statistics",
    [vsp.VSP_FORTINET_WTP_UPTIME] = "WTP Uptime",
    [vsp.VSP_FORTINET_STA_WPA_INFO] = "STA WPA Info",
    [vsp.VSP_FORTINET_RADIO_STATS] = "Radio Statistics",
    [vsp.VSP_FORTINET_STA_STATS_INTERVAL] = "STA Statistics Interval",
    [vsp.VSP_FORTINET_STA_CAP_INTERVAL] = "STA Capabilities Interval",
    [vsp.VSP_FORTINET_MU_LIST] = "Mu List",
    [vsp.VSP_FORTINET_TXPWR_MAX] = "Tx Power Max",
    [vsp.VSP_FORTINET_TXPWR_DBM] = "TxPower dbm",
    [vsp.VSP_FORTINET_TIMERS_INTERVAL] = "Timers Interval",
    [vsp.VSP_FORTINET_WIDS] = "WIDS",
    [vsp.VSP_FORTINET_WIDS_ENABLE] = "WIDS Enable",
    [vsp.VSP_FORTINET_WIDS_PARAMS_LONG_DUR] = "WIDS Params Long dur",
    [vsp.VSP_FORTINET_WIDS_PARAMS_ASSOC_TIME] = "WIDS Params Assoc Time",
    [vsp.VSP_FORTINET_WIDS_PARAMS_ASSOC_THRESH] = "WIDS Params Assoc Thresh",
    [vsp.VSP_FORTINET_WIDS_PARAMS_AUTH_TIME] = "WIDS Params Auth Time",
    [vsp.VSP_FORTINET_WIDS_PARAMS_AUTH_THRESH] = "WIDS Params Auth Thresh",
    [vsp.VSP_FORTINET_VAP_RATES] = "Vap Rates",
    [vsp.VSP_FORTINET_BONJOUR_CONFIG] = "Bonjour Config",
    [vsp.VSP_FORTINET_VAP_OKC_CONFIG] = "Vap OKC Config",
    [vsp.VSP_FORTINET_VAP_DYNAMIC_VLAN] = "Dynamic Vlan",
    [vsp.VSP_FORTINET_ST_RADIUS_USER] = "St Radius User",
    [vsp.VSP_FORTINET_VAP_LDPC_CONFIG] = "Vap Ldpc Config",
    [vsp.VSP_FORTINET_ST_VLAN_ID] = "St Vlan ID",
    [vsp.VSP_FORTINET_STA_RADIUS_INFO] = "Sta Radius Info",
    [vsp.VSP_FORTINET_WIDS_SUBTYPE_RF_THREAT_ROGUE_AP] = "Wids Subtype Rf Threat Rogue Ap",
    [vsp.VSP_FORTINET_WIDS_SUBTYPE_RF_THREAT_INTERFEAR_AP] = "Wids Subtype Rf Threat Interfear Ap",
    [vsp.VSP_FORTINET_WIDS_SUBTYPE_RF_THREAT_WL_BR] = "Wids Subtype Rf Threat Wl Br",
    [vsp.VSP_FORTINET_WIDS_SUBTYPE_RF_THREAT_WEP_IV] = "Wids Subtype Rf Threat Wep Iv",
    [vsp.VSP_FORTINET_WIDS_SUBTYPE_RF_THREAT_BC_DEAUTH] = "Wids Subtype Rf Threat Bc Deauth",
    [vsp.VSP_FORTINET_WIDS_SUBTYPE_RF_THREAT_NL_PBRESP] = "Wids Subtype Rf Threat Nl Pbresp",
    [vsp.VSP_FORTINET_WIDS_SUBTYPE_RF_THREAT_LONG_DUR] = "Wids Subtype Rf Threat Long Dur",
    [vsp.VSP_FORTINET_WIDS_SUBTYPE_RF_THREAT_MAC_OUI] = "Wids Subtype Rf Threat Mac Oui",
    [vsp.VSP_FORTINET_WIDS_SUBTYPE_RF_THREAT_MGMT_FLOOD] = "Wids Subtype Rf Threat Mgmt Flood",
    [vsp.VSP_FORTINET_WIDS_SUBTYPE_RF_THREAT_SPOOF_DEAUTH] = "Wids Subtype Rf Threat Spoof Deauth",
    [vsp.VSP_FORTINET_WIDS_SUBTYPE_RF_THREAT_ASLEAP] = "Wids Subtype Rf Threat Asleap",
    [vsp.VSP_FORTINET_WIDS_SUBTYPE_RF_THREAT_EAPOL] = "Wids Subtype Rf Threat Eapol",
    [vsp.VSP_FORTINET_WIDS_SUBTYPE_RF_THREAT_LAST] = "Wids Subtype Rf Threat Last",
    [vsp.VSP_FORTINET_WALLED_GARDEN] = "Walled Garden",
    [vsp.VSP_FORTINET_UTM_INFO] = "Utm Info",
    [vsp.VSP_FORTINET_UTM_DATA] = "Utm Data",
    [vsp.VSP_FORTINET_UTM_JSON_INFO] = "Utm Json Info",
    [vsp.VSP_FORTINET_UTM_JSON_DATA] = "Utm Json Data",
    [vsp.VSP_FORTINET_UTM_VERSION] = "Utm Version",
    [vsp.VSP_FORTINET_UPLOAD_LOG_NOW] = "Upload Log Now",
    [vsp.VSP_FORTINET_USER_GROUP] = "User Group",
    [vsp.VSP_FORTINET_ROAMING_SUCCESS] = "Roaming Success",
    [vsp.VSP_FORTINET_FORTIGUARD_IMAGE_ID] = "FortiGuard Image Id",
    [vsp.VSP_FORTINET_FCLD_FIRMWWARE_INFO_URL] = "Fcld Firmware Info Url",
    [vsp.VSP_FORTINET_FCLD_FIRMWWARE_DOWNLOAD_URL] = "Fcld Firmware Download Url",
    [vsp.VSP_FORTINET_FCLD_FIRMWARE_RESULT] = "Fcld Firmware Result",
    [vsp.VSP_FORTINET_TIMEZONE_INFO] = "Timezone Info",
};

-- /* ************************************************************************* */
-- /*                      Board Data Type Value                                */
-- /* ************************************************************************* */
local BOARD_DATA_WTP_MODEL_NUMBER = 0
local BOARD_DATA_WTP_SERIAL_NUMBER = 1
local BOARD_DATA_BOARD_ID = 2
local BOARD_DATA_BOARD_REVISION = 3
local BOARD_DATA_BASE_MAC_ADDRESS = 4

local board_data_type_vals = {
    [BOARD_DATA_WTP_MODEL_NUMBER] = "WTP Model Number",
    [BOARD_DATA_WTP_SERIAL_NUMBER] = "WTP Serial Number",
    [BOARD_DATA_BOARD_ID] = "Board ID",
    [BOARD_DATA_BOARD_REVISION] = "Board Revision",
    [BOARD_DATA_BASE_MAC_ADDRESS] = "Base MAC Address",
};

-- /* ************************************************************************* */
-- /*                      Descriptor WTP Type Value                            */
-- /* ************************************************************************* */
local WTP_DESCRIPTOR_HARDWARE_VERSION = 0
local WTP_DESCRIPTOR_ACTIVE_SOFTWARE_VERSION = 1
local WTP_DESCRIPTOR_BOOT_VERSION = 2
local WTP_DESCRIPTOR_OTHER_SOFTWARE_VERSION = 3

local wtp_descriptor_type_vals = {
    [WTP_DESCRIPTOR_HARDWARE_VERSION] = "WTP Hardware Version",
    [WTP_DESCRIPTOR_ACTIVE_SOFTWARE_VERSION] = "WTP Active Software Version",
    [WTP_DESCRIPTOR_BOOT_VERSION] = "WTP Boot Version",
    [WTP_DESCRIPTOR_OTHER_SOFTWARE_VERSION] = "WTP Other Software Version",
};

-- WTP MAC Type
local wtp_mac_vals = {
    [0] = "Local MAC",
    [1] = "Split MAC",
    [2] = "Both (Local and Split MAC)",
};

-- AC Information Type Value
local AC_INFORMATION_HARDWARE_VERSION = 4
local AC_INFORMATION_SOFTWARE_VERSION = 5

local ac_information_type_vals = {
    [AC_INFORMATION_HARDWARE_VERSION] = "AC Hardware Version",
    [AC_INFORMATION_SOFTWARE_VERSION] = "AC Software Version",
};

local ecn_support_vals = {
    [0] = "Limited ECN Support",
    [1] = "Full and Limited ECN Support",
};

-- Result Code
local result_code_vals = {
    [0] = "Success",
    [1] = "Failure (AC List Message Element MUST Be Present)",
    [2] = "Success (NAT Detected)",
    [3] = "Join Failure (Unspecified)",
    [4] = "Join Failure (Resource Depletion)",
    [5] = "Join Failure (Unknown Source)",
    [6] = "Join Failure (Incorrect Data)",
    [7] = "Join Failure (Session ID Already in Use)",
    [8] = "Join Failure (WTP Hardware Not Supported)",
    [9] = "Join Failure (Binding Not Supported)",
    [10] = "Reset Failure (Unable to Reset)",
    [11] = "Reset Failure (Firmware Write Error)",
    [12] = "Configuration Failure (Unable to Apply Requested Configuration - Service Provided Anyhow)",
    [13] = "Configuration Failure (Unable to Apply Requested Configuration - Service Not Provided)",
    [14] = "Image Data Error (Invalid Checksum)",
    [15] = "Image Data Error (Invalid Data Length)",
    [16] = "Image Data Error (Other Error)",
    [17] = "Image Data Error (Image Already Present)",
    [18] = "Message Unexpected (Invalid in Current State)",
    [19] = "Message Unexpected (Unrecognized Request)",
    [20] = "Failure - Missing Mandatory Message Element",
    [21] = "Failure - Unrecognized Message Element",
    [22] = "Data Transfer Error (No Information to Transfer)",
};

-- /* ************************************************************************* */
-- /*                     Last Failure Type                                     */
-- /* ************************************************************************* */
local last_failure_type_vals = {
    [0] = "Not Supported",
    [1] = "AC Initiated",
    [2] = "Link Failure",
    [3] = "Software Failure",
    [4] = "Hardware Failure",
    [5] = "Other Failure",
    [2] =5, "Unknown (e.g., WTP doesn't keep track of info)",
};

-- /* ************************************************************************* */
-- /*                      Radio Administrative State                           */
-- /* ************************************************************************* */
local radio_admin_state_vals = {
    [1] = "Enabled",
    [2] = "Disabled",
};

-- /* ************************************************************************* */
-- /*                     IEE8011 Antenna                                       */
-- /* ************************************************************************* */
local ieee80211_antenna_diversity_vals = {
    [0] = "Disabled",
    [1] = "Enabled",
};

local ieee80211_antenna_combiner_vals = {
    [1] = "Sectorized (Left)",
    [2] = "Sectorized (Right)",
    [3] = "Omni",
    [4] = "Multiple Input/Multiple Output (MIMO)",
};

local ieee80211_antenna_selection_vals = {
    [1] = "Internal Antenna",
    [2] = "External Antenna",
};

-- /* ************************************************************************* */
-- /*                      WTP Fallback                                         */
-- /* ************************************************************************* */
local wtp_fallback_vals = {
    [0] =  "Reserved",
    [1] =  "Enabled",
    [2] =  "Disabled",
};

-- /* ************************************************************************* */
-- /*                      Radio Operational State                              */
-- /* ************************************************************************* */
local radio_op_state_vals = {
    [0] = "Reserved",
    [1] = "Enabled",
    [2] = "Disabled",
};

-- /* ************************************************************************* */
-- /*                      Radio Operational Cause                              */
-- /* ************************************************************************* */
local radio_op_cause_vals = {
    [0] = "Normal",
    [1] = "Radio Failure",
    [2] = "Software Failure",
    [3] = "Administratively Set",
};

-- /* ************************************************************************* */
-- /*                     Add/Update WLAN : Key Status                          */
-- /* ************************************************************************* */
local ieee80211_wlan_key_status_vals = {
    [0] = "SN Information Element means that the WLAN uses per-station encryption keys",
    [1] = "static WEP Key",
    [2] = "Rekeying the GTK with the STA's in the BSS",
    [3] = "Rekeying the GTK and broadcast",
};

-- /* ************************************************************************* */
-- /*                     Add WLAN : QoS                                        */
-- /* ************************************************************************* */
local ieee80211_add_wlan_qos_vals = {
    [0] = "Best Effort",
    [1] = "Video",
    [2] = "Voice",
    [3] = "Background",
};

-- /* ************************************************************************* */
-- /*                     Add WLAN : Auth Type                                  */
-- /* ************************************************************************* */
local ieee80211_add_wlan_auth_type_vals = {
    [0] = "Open System",
    [1] = "WEP Shared Key",
};

-- /* ************************************************************************* */
-- /*                     Add WLAN : MAC Mode                                   */
-- /* ************************************************************************* */
local ieee80211_add_wlan_mac_mode_vals = {
    [0] = "Local MAC",
    [1] = "Split MAC",
};

-- /* ************************************************************************* */
-- /*                     Add WLAN : Tunnel Mode                                */
-- /* ************************************************************************* */
local ieee80211_add_wlan_tunnel_mode_vals = {
    [0] = "Local Bridging",
    [1] = "802.3 Tunnel",
    [2] = "802.11 Tunnel",
};

local CAPWAP_HDR_LEN = 16

local pf = {}

pf.preamble_version = ProtoField.new("Version", "ftnt.capwap.preamble.version", ftypes.UINT8, nil, base.DEC, 0xf0)
pf.preamble_type = ProtoField.new("Type", "ftnt.capwap.preamble.type", ftypes.UINT8, ptypes, base.DEC, 0x0f)
pf.preamble_reserved = ProtoField.new("Reserved", "ftnt.capwap.preamble.reserved", ftypes.UINT24)

pf.header_length = ProtoField.new("Header Length", "ftnt.capwap.header.length", ftypes.UINT24, nil, base.DEC, 0xf80000)
pf.header_radio_id = ProtoField.new("Radio ID", "ftnt.capwap.header.radio.id", ftypes.UINT24, nil, base.DEC, 0x07c000)
pf.header_binding_id = ProtoField.new("Wireless Binding ID", "ftnt.capwap.header.binding.id", ftypes.UINT24, btypes, base.DEC, 0x003e00)
pf.header_flags = ProtoField.new("Header Flags", "ftnt.capwap.header.flags", ftypes.UINT24, nil, base.HEX, 0x0001ff)
pf.header_fragment_id = ProtoField.new("Fragment ID", "ftnt.capwap.header.fragment.id", ftypes.UINT16, nil, base.DEC)
pf.header_fragment_offset = ProtoField.new("Fragment Offset", "ftnt.capwap.header.fragment.offset", ftypes.UINT16, nil, base.DEC, 0xfff8)
pf.header_reserved = ProtoField.new("Reserved", "ftnt.capwap.header.reserved", ftypes.UINT16, nil, base.DEC, 0x0007)

pf.control_header_message_type = ProtoField.new("Message Type", "ftnt.capwap.control.header.message.type", ftypes.UINT32)
pf.control_header_message_type_enterprise_number = ProtoField.new("Message Type (Enterprise Number)", "ftnt.capwap.control.header.message.type.enterprise.number", ftypes.UINT24, ntypes)
pf.control_header_message_type_enterprise_specific = ProtoField.new("Message Type (Enterprise Specific)", "ftnt.capwap.control.header.message.type.enterprise.specific", ftypes.UINT8, stypes)
pf.control_header_sequence_number = ProtoField.new("Sequence Number", "ftnt.capwap.control.header.sequence.number", ftypes.UINT8)
pf.control_header_message_element_length = ProtoField.new("Message Element Length", "ftnt.capwap.control.header.message.element.length", ftypes.UINT16)
pf.control_header_message_flags = ProtoField.new("Flags", "ftnt.capwap.control.header.flags", ftypes.UINT8)

pf.tlv = ProtoField.new("Type", "ftnt.capwap.message.element.tlv", ftypes.NONE)
pf.tlv_type = ProtoField.new("Type", "ftnt.capwap.message.element.tlv.type", ftypes.UINT16, tlvTypes)
pf.tlv_length = ProtoField.new("Length", "ftnt.capwap.message.element.tlv.length", ftypes.UINT16)
pf.tlv_value = ProtoField.new("Value", "ftnt.capwap.message.element.tlv.value", ftypes.BYTES)

-- message elements protocol common fields
pf.radio_id = ProtoField.new("Radio ID", "ftnt.capwap.message.element.radio.id", ftypes.UINT8)
pf.reserved = ProtoField.new("Reserved", "ftnt.capwap.message.element.reserved", ftypes.UINT8)
pf.current_channel = ProtoField.new("Current Channel", "ftnt.capwap.message.element.current.channel", ftypes.UINT8)
pf.length = ProtoField.new("Length", "ftnt.capwap.message.element.length", ftypes.UINT8)
pf.length16 = ProtoField.new("Length", "ftnt.capwap.message.element.length16", ftypes.UINT16)
pf.sta_mac = ProtoField.new("STA MAC", "ftnt.capwap.message.element.sta.mac", ftypes.ETHER)
pf.bssid = ProtoField.new("BSSID", "ftnt.capwap.message.element.bssid", ftypes.BYTES)
pf.mhc = ProtoField.new("MHC", "ftnt.capwap.message.element.mhc", ftypes.UINT8)
pf.country_code = ProtoField.new("Country Code", "ftnt.capwap.message.element.country.code", ftypes.UINT16)
pf.country_code_string = ProtoField.new("Country Code", "ftnt.capwap.message.element.country.code.string", ftypes.STRING)

-- message elements protocol fields
pf.discovery_type = ProtoField.new("Discovery Type", "ftnt.capwap.message.element.discovery.type", ftypes.UINT8, discovery_type_vals)
pf.vendor_identifier = ProtoField.new("Vendor Identifier", "ftnt.capwap.message.element.vendor.identifier", ftypes.UINT32, {[12356] = "Fortinet, Inc."})
pf.vendor_element_id = ProtoField.new("Vendor Element ID", "ftnt.capwap.message.element.vendor.element.id", ftypes.UINT16)
pf.vendor_data = ProtoField.new("Vendor Data", "ftnt.capwap.message.element.vendor.data", ftypes.BYTES)
pf.fortinet_element_id = ProtoField.new("Fortinet Element ID", "ftnt.capwap.message.element.fortinet.element.id", ftypes.UINT16, fortinet_element_id_vals)
pf.fortinet_value = ProtoField.new("Fortinet Value", "ftnt.capwap.message.element.fortinet.value", ftypes.BYTES)

pf.wtp_board_data_vendor = ProtoField.new("WTP Board Data Vendor", "ftnt.capwap.message.element.wtp.board.data.vendor", ftypes.UINT32, {[12356] = "Fortinet, Inc."})
pf.wtp_board_data = ProtoField.new("WTP Board Data", "ftnt.capwap.message.element.wtp.board.data", ftypes.NONE)
pf.board_data_type = ProtoField.new("Board Data Type", "ftnt.capwap.message.element.wtp.board.data.type", ftypes.UINT16, board_data_type_vals)
pf.board_data_length = ProtoField.new("Board Data Length", "ftnt.capwap.message.element.wtp.board.data.length", ftypes.UINT16)
pf.board_data_value = ProtoField.new("Board Data Value", "ftnt.capwap.message.element.wtp.board.data.value", ftypes.BYTES)
pf.wtp_model_number = ProtoField.new("WTP Model Number", "ftnt.capwap.message.element.wtp.board.data.wtp.model.number", ftypes.STRING)
pf.wtp_serial_number = ProtoField.new("WTP Serial Number", "ftnt.capwap.message.element.wtp.board.data.wtp.serial.number", ftypes.STRING)
pf.wtp_board_id = ProtoField.new("WTP Board ID", "ftnt.capwap.message.element.wtp.board.data.wtp.board.id", ftypes.STRING)
pf.wtp_board_revision = ProtoField.new("WTP Board Revision", "ftnt.capwap.message.element.wtp.board.data.wtp.board.revision", ftypes.STRING)
pf.base_mac_address = ProtoField.new("Base Mac Address", "ftnt.capwap.message.element.wtp.board.data.base.mac.address", ftypes.STRING)

pf.wtp_descriptor_max_radios = ProtoField.new("Max Radios", "ftnt.capwap.message.element.wtp.descriptor.max.radios", ftypes.UINT8)
pf.wtp_descriptor_radio_in_use = ProtoField.new("Radio in use", "ftnt.capwap.message.element.wtp.descriptor.radio.in.use", ftypes.UINT8)
pf.wtp_descriptor_encryption_capabilities = ProtoField.new("Encryption Capabilities (Number)", "ftnt.capwap.message.element.wtp.descriptor.encryption.capabilities", ftypes.UINT8)
pf.wtp_descriptor_encryption_capabilities_encryption_capabilities = ProtoField.new("Encryption Capabilities", "ftnt.capwap.message.element.wtp.descriptor.encryption.capabilities", ftypes.UINT24)
pf.wtp_descriptor_encryption_capabilities_reserved = ProtoField.new("Reserved (Encrypt)", "ftnt.capwap.message.element.wtp.descriptor.encryption.capabilities.reserved", ftypes.UINT8, nil, base.DEC, 0xe0)
pf.wtp_descriptor_encryption_capabilities_wbid = ProtoField.new("Encrypt WBID", "ftnt.capwap.message.element.wtp.descriptor.encryption.capabilities.wbid", ftypes.UINT8, btypes, base.DEC, 0x1f)
pf.wtp_descriptor_encryption_capabilities_values = ProtoField.new("Encryption Capabilities", "ftnt.capwap.message.element.wtp.descriptor.encryption.capabilities.values", ftypes.UINT16)

pf.wtp_descriptor_vendor = ProtoField.new("WTP Descriptor Vendor", "ftnt.capwap.message.element.wtp.descriptor.vendor", ftypes.UINT32)
pf.wtp_descriptor_type = ProtoField.new("Descriptor Type", "ftnt.capwap.message.element.wtp.descriptor.type", ftypes.UINT16, wtp_descriptor_type_vals)
pf.wtp_descriptor_length = ProtoField.new("Descriptor Length", "ftnt.capwap.message.element.wtp.descriptor.length", ftypes.UINT16)
pf.wtp_descriptor_value = ProtoField.new("Descriptor Value", "ftnt.capwap.message.element.wtp.descriptor.value", ftypes.BYTES)
pf.wtp_descriptor_hardware_version = ProtoField.new("WTP Hardware Version", "ftnt.capwap.message.element.wtp.descriptor.hardware.version", ftypes.UINT8)
pf.wtp_descriptor_software_version = ProtoField.new("WTP Active Software Version", "ftnt.capwap.message.element.wtp.descriptor.active.software.version", ftypes.STRING)
pf.wtp_descriptor_boot_version = ProtoField.new("WTP Boot Version", "ftnt.capwap.message.element.wtp.descriptor.boot.version", ftypes.STRING)
pf.wtp_descriptor_other_software_version = ProtoField.new("WTP Other Software Version", "ftnt.capwap.message.element.wtp.descriptor.other.software.version", ftypes.STRING)

pf.wtp_frame_tunnel_mode = ProtoField.new("WTP Frame Tunnel Mode", "ftnt.capwap.message.element.wtp.frame.tunnel.mode", ftypes.UINT8)
pf.wtp_native_frame_tunnel_mode = ProtoField.new("Native Frame Tunnel Mode", "ftnt.capwap.message.element.wtp.native.frame.tunnel.mode", ftypes.UINT8, booltypes, base.DEC, 0x08)
pf.wtp_8023_frame_tunnel_mode = ProtoField.new("802.3 Frame Tunnel Mode", "ftnt.capwap.message.element.wtp.8023.frame.tunnel.mode", ftypes.UINT8, booltypes, base.DEC, 0x04)
pf.wtp_frame_tunnel_mode_local_bridging = ProtoField.new("Local Bridging", "ftnt.capwap.message.element.wtp.frame.tunnel.mode.local.bridging", ftypes.UINT8, booltypes, base.DEC, 0x02)

pf.wtp_frame_tunnel_mode_reserved = ProtoField.new("Reserved", "ftnt.capwap.message.element.wtp.native.frame.tunnel.mode.reserved", ftypes.UINT8, nil, base.DEC, 0xf1)
pf.wtp_mac_type = ProtoField.new("WTP MAC Type", "ftnt.capwap.message.element.wtp.mac.type", ftypes.UINT8, wtp_mac_vals)

-- pf.wtp_radio_information_radio_id = ProtoField.new("Radio ID", "ftnt.capwap.message.element.wtp.radio.information.radio.id", ftypes.UINT8)
pf.wtp_radio_information_radio_type_reserved = ProtoField.new("Radio Type Reserved", "ftnt.capwap.message.element.wtp.radio.information.radio.type.reserved", ftypes.BYTES)
pf.wtp_radio_information_radio_type_80211n = ProtoField.new("Radio Type 802.11n", "ftnt.capwap.message.element.wtp.radio.information.radio.type.80211n", ftypes.UINT8, booltypes, base.DEC, 0x08)
pf.wtp_radio_information_radio_type_80211g = ProtoField.new("Radio Type 802.11g", "ftnt.capwap.message.element.wtp.radio.information.radio.type.80211g", ftypes.UINT8, booltypes, base.DEC, 0x04)
pf.wtp_radio_information_radio_type_80211a = ProtoField.new("Radio Type 802.11a", "ftnt.capwap.message.element.wtp.radio.information.radio.type.80211a", ftypes.UINT8, booltypes, base.DEC, 0x02)
pf.wtp_radio_information_radio_type_80211b = ProtoField.new("Radio Type 802.11b", "ftnt.capwap.message.element.wtp.radio.information.radio.type.80211b", ftypes.UINT8, booltypes, base.DEC, 0x01)

pf.ac_descriptor_stations = ProtoField.new("Stations", "ftnt.capwap.message.element.ac.descriptor.stations", ftypes.UINT16)
pf.ac_descriptor_limit_stations = ProtoField.new("Limit Stations", "ftnt.capwap.message.element.ac.descriptor.limit.stations", ftypes.UINT16)
pf.ac_descriptor_active_wtps = ProtoField.new("Active WTPs", "ftnt.capwap.message.element.ac.descriptor.active.wtps", ftypes.UINT16)
pf.ac_descriptor_max_wtps = ProtoField.new("Max WTPs", "ftnt.capwap.message.element.ac.descriptor.max.wtps", ftypes.UINT16)
pf.ac_descriptor_security_flags = ProtoField.new("Security Flags", "ftnt.capwap.message.element.ac.descriptor.security.flags", ftypes.UINT8, nil, base.HEX)
pf.ac_descriptor_security_flags_reserved = ProtoField.new("Reserved", "ftnt.capwap.message.element.ac.descriptor.security.flags.reserved", ftypes.UINT8, nil, base.DEC, 0xf9)
pf.ac_descriptor_security_flags_ac_supports_pre_shared = ProtoField.new("AC supports the pre-shared", "ftnt.capwap.message.element.ac.descriptor.security.flags.ac.supports.pre.shared", ftypes.UINT8, booltypes, base.DEC, 0x04)
pf.ac_descriptor_security_flags_ac_supports_x509 = ProtoField.new("AC supports X.509 Certificate", "ftnt.capwap.message.element.ac.descriptor.security.flags.ac.supports.x509", ftypes.UINT8, booltypes, base.DEC, 0x02)
pf.ac_descriptor_rmac_field = ProtoField.new("R-MAC Field", "ftnt.capwap.message.element.ac.descriptor.rmac.field", ftypes.UINT8, {[0] = "Reserved"})
-- pf.ac_descriptor_reserved = ProtoField.new("Reserved", "ftnt.capwap.message.element.ac.descriptor.reserved", ftypes.UINT8)
pf.ac_descriptor_dtls_policy_flags = ProtoField.new("DTLS Policy Flags", "ftnt.capwap.message.element.ac.descriptor.dtls.policy.flags", ftypes.UINT8)
pf.ac_descriptor_ac_information = ProtoField.new("AC Information", "ftnt.capwap.message.element.ac.descriptor.ac.information", ftypes.BYTES)
pf.ac_descriptor_ac_information_vendor = ProtoField.new("AC Information Vendor", "ftnt.capwap.message.element.ac.descriptor.ac.information.vendor", ftypes.BYTES)
pf.ac_descriptor_ac_information_type = ProtoField.new("AC Information Type", "ftnt.capwap.message.element.ac.descriptor.ac.information.type", ftypes.BYTES)
pf.ac_descriptor_ac_information_length = ProtoField.new("AC Information Length", "ftnt.capwap.message.element.ac.descriptor.ac.information.length", ftypes.BYTES)
pf.ac_descriptor_ac_information_value = ProtoField.new("AC Information Value", "ftnt.capwap.message.element.ac.descriptor.ac.information.value", ftypes.BYTES)

pf.ac_name = ProtoField.new("AC Name", "ftnt.capwap.message.element.ac.name", ftypes.STRING)
pf.ac_timestamp = ProtoField.new("AC Timestamp", "ftnt.capwap.message.element.ac.timestamp", ftypes.STRING)
pf.location_data = ProtoField.new("Location Data", "ftnt.capwap.message.element.location.data", ftypes.STRING)
pf.wtp_name = ProtoField.new("WTP Name", "ftnt.capwap.message.element.wtp.name", ftypes.STRING)
pf.session_id = ProtoField.new("Session ID", "ftnt.capwap.message.element.session.id", ftypes.BYTES)
pf.ecn_support = ProtoField.new("ECN Support", "ftnt.capwap.message.element.ecn.support", ftypes.UINT8, ecn_support_vals)
pf.capwap_local_ipv4_address = ProtoField.new("CAPWAP Local IPv4 Address", "ftnt.capwap.message.element.capwap.local.ipv4.address", ftypes.IPv4)
pf.result_code = ProtoField.new("Result Code", "ftnt.capwap.message.element.result.code", ftypes.UINT32, result_code_vals)
pf.statistics_timer = ProtoField.new("Statistics Timer (Sec)", "ftnt.capwap.message.element.statistics.timer", ftypes.UINT16)

pf.wtp_reboot_statistics_reboot_count = ProtoField.new("Reboot Count", "ftnt.capwap.message.element.wtp.reboot.statistics.reboot.count", ftypes.UINT16)
pf.wtp_reboot_statistics_ac_initiated_count =  ProtoField.new("AC Initiated Count", "ftnt.capwap.message.element.wtp.reboot.statistics.ac.initiated.count", ftypes.UINT16)
pf.wtp_reboot_statistics_linked_failure_count = ProtoField.new("Link Failure Count", "ftnt.capwap.message.element.wtp.reboot.statistics.linked.failure.count", ftypes.UINT16)
pf.wtp_reboot_statistics_sw_failure_count = ProtoField.new("SW Failure Count", "ftnt.capwap.message.element.wtp.reboot.statistics.sw.failure.count", ftypes.UINT16)
pf.wtp_reboot_statistics_hw_failure_count = ProtoField.new("HW Failure Count", "ftnt.capwap.message.element.wtp.reboot.statistics.hw.failure.count", ftypes.UINT16)
pf.wtp_reboot_statistics_other_failure_count = ProtoField.new("Other Failure Count", "ftnt.capwap.message.element.wtp.reboot.statistics.other.failure.count", ftypes.UINT16)
pf.wtp_reboot_statistics_unknown_failure_count = ProtoField.new("Unknown Failure Count", "ftnt.capwap.message.element.wtp.reboot.statistics.unknown.failure.count", ftypes.UINT16)
pf.wtp_reboot_statistics_last_failure_type = ProtoField.new("Last Failure Type", "ftnt.capwap.message.element.wtp.reboot.statistics.last.failure.type", ftypes.UINT16, last_failure_type_vals)

pf.radio_administrative_id = ProtoField.new("Radio Administrative ID", "ftnt.capwap.message.element.radio.administrative.id", ftypes.UINT8)
pf.radio_administrative_state = ProtoField.new("Radio Administrative State", "ftnt.capwap.message.element.radio.administrative.state", ftypes.UINT8, radio_admin_state_vals)

-- pf.ieee_80211_antenna_radio_id = ProtoField.new("Radio ID", "ftnt.capwap.message.element.ieee.80211.antenna.radio.id", ftypes.UINT8)
pf.ieee_80211_antenna_diversity = ProtoField.new("Diversity", "ftnt.capwap.message.element.ieee.80211.antenna.diversity", ftypes.UINT8, ieee80211_antenna_diversity_vals)
pf.ieee_80211_antenna_combiner = ProtoField.new("Combiner", "ftnt.capwap.message.element.ieee.80211.antenna.combiner", ftypes.UINT8, ieee80211_antenna_combiner_vals)
pf.ieee_80211_antenna_count = ProtoField.new("Antenna Count", "ftnt.capwap.message.element.ieee.80211.antenna.count", ftypes.UINT8)
pf.ieee_80211_antenna_selection = ProtoField.new("Selection", "ftnt.capwap.message.element.ieee.80211.antenna.selection", ftypes.UINT8, ieee80211_antenna_selection_vals)

-- pf.ieee_80211_tx_power_radio_id = ProtoField.new("Radio ID", "ftnt.capwap.message.element.ieee.80211.tx.power.radio.id", ftypes.UINT8)
-- pf.ieee_80211_tx_power_reserved = ProtoField.new("Reserved", "ftnt.capwap.message.element.ieee.80211.tx.power.reserved", ftypes.UINT8)
pf.ieee_80211_tx_power_current_tx_power = ProtoField.new("Current Tx Power", "ftnt.capwap.message.element.ieee.80211.tx.power.current.tx.power", ftypes.UINT16)

-- pf.ieee_80211_tx_power_level_radio_id = ProtoField.new("Radio ID", "ftnt.capwap.message.element.ieee.80211.tx.power.level.radio.id", ftypes.UINT8)
pf.ieee_80211_tx_power_level_num_levels = ProtoField.new("Num Levels", "ftnt.capwap.message.element.ieee.80211.tx.power.level.num.levels", ftypes.UINT8)
pf.ieee_80211_tx_power_level_power_level = ProtoField.new("Power Level", "ftnt.capwap.message.element.ieee.80211.tx.power.level.power.level", ftypes.UINT16)

-- pf.ieee_80211_wtp_radio_configuration_radio_id = ProtoField.new("Radio ID", "ftnt.capwap.message.element.ieee.80211.wtp.radio.configuration.radio.id", ftypes.UINT8)
pf.ieee_80211_wtp_radio_configuration_short_preamble = ProtoField.new("Short Preamble", "ftnt.capwap.message.element.ieee.80211.wtp.radio.configuration.short.preamble", ftypes.UINT8)
pf.ieee_80211_wtp_radio_configuration_num_of_bssids = ProtoField.new("Num of BSSIDs", "ftnt.capwap.message.element.ieee.80211.wtp.radio.configuration.num.of.bssids", ftypes.UINT8)
pf.ieee_80211_wtp_radio_configuration_dtim_period = ProtoField.new("DTIM Period", "ftnt.capwap.message.element.ieee.80211.wtp.radio.configuration.dtim.period", ftypes.UINT8)
pf.ieee_80211_wtp_radio_configuration_bssid = ProtoField.new("BSSID", "ftnt.capwap.message.element.ieee.80211.wtp.radio.configuration.bssid", ftypes.BYTES)
pf.ieee_80211_wtp_radio_configuration_beacon_period = ProtoField.new("Beacon Period", "ftnt.capwap.message.element.ieee.80211.wtp.radio.configuration.beacon.period", ftypes.UINT16)
pf.ieee_80211_wtp_radio_configuration_country_string = ProtoField.new("Country String", "ftnt.capwap.message.element.ieee.80211.wtp.radio.configuration.country.string", ftypes.STRING)

-- pf.ieee_80211_mac_operation_radio_id = ProtoField.new("Radio ID", "ftnt.capwap.message.element.ieee.80211.mac.operation.radio.id", ftypes.UINT8)
-- pf.ieee_80211_mac_operation_reserved = ProtoField.new("Reserved", "ftnt.capwap.message.element.ieee.80211.mac.operation.reserved", ftypes.UINT8)
pf.ieee_80211_mac_operation_rts_threshold = ProtoField.new("RTS Threshold", "ftnt.capwap.message.element.ieee.80211.mac.operation.rts.threshold", ftypes.UINT16)
pf.ieee_80211_mac_operation_short_retry = ProtoField.new("Short Retry", "ftnt.capwap.message.element.ieee.80211.mac.operation.short.retry", ftypes.UINT8)
pf.ieee_80211_mac_operation_long_retry = ProtoField.new("Long Retry", "ftnt.capwap.message.element.ieee.80211.mac.operation.long.retry", ftypes.UINT8)
pf.ieee_80211_mac_operation_fragmentation_threshold = ProtoField.new("Fragmentation Threshold", "ftnt.capwap.message.element.ieee.80211.mac.operation.fragmentation.threshold", ftypes.UINT16)
pf.ieee_80211_mac_operation_tx_mdsu_lifetime = ProtoField.new("Tx MDSU Lifetime", "ftnt.capwap.message.element.ieee.80211.mac.operation.tx.mdsu.lifetime", ftypes.UINT24)
pf.ieee_80211_mac_operation_rx_mdsu_lifetime = ProtoField.new("Rx MDSU Lifetime", "ftnt.capwap.message.element.ieee.80211.mac.operation.rx.mdsu.lifetime", ftypes.UINT24)

pf.capwap_timers_discovery = ProtoField.new("CAPWAP Timers Discovery (Sec)", "ftnt.capwap.message.element.capwap.timers.discovery", ftypes.UINT8)
pf.capwap_timers_echo_request = ProtoField.new("CAPWAP Timers Echo Request (Sec)", "ftnt.capwap.message.element.capwap.timers.echo.request", ftypes.UINT8)

pf.decryption_error_report_period_radio_id = ProtoField.new("Decryption Error Report Period Radio ID", "ftnt.capwap.message.element.decryption.error.report.period.radio.id", ftypes.UINT8)
pf.decryption_error_report_report_interval = ProtoField.new("Decryption Error Report Report Interval (Sec)", "ftnt.capwap.message.element.decryption.error.report.report.interval", ftypes.UINT8)

pf.idle_timeout = ProtoField.new("Idle Timeout", "ftnt.capwap.message.element.idle.timeout", ftypes.UINT32)
pf.wtp_fallback = ProtoField.new("WTP Fallback", "ftnt.capwap.message.element.wtp.fallback", ftypes.UINT8, wtp_fallback_vals)

-- pf.ieee_80211_multi_domain_capability_radio_id = ProtoField.new("Radio ID", "ftnt.capwap.message.element.ieee.80211.multi.domain.capability.radio.id", ftypes.UINT8)
-- pf.ieee_80211_multi_domain_capability_reserved = ProtoField.new("Reserved", "ftnt.capwap.message.element.ieee.80211.multi.domain.capability.reserved", ftypes.UINT8)
pf.ieee_80211_multi_domain_capability_first_channel = ProtoField.new("First Channel", "ftnt.capwap.message.element.ieee.80211.multi.domain.capability.first.channel", ftypes.UINT16)
pf.ieee_80211_multi_domain_capability_number_of_channels = ProtoField.new("Number of Channels", "ftnt.capwap.message.element.ieee.80211.multi.domain.capability.number.of.channels", ftypes.UINT16)
pf.ieee_80211_multi_domain_capability_max_tx_power_level = ProtoField.new("Max Tx Power Level", "ftnt.capwap.message.element.ieee.80211.multi.domain.capability.max.tx.power.level", ftypes.UINT16)

pf.ieee_80211_direct_sequence_control_current_cca = ProtoField.new("Current CCA", "ftnt.capwap.message.element.ieee.80211.direct.sequence.control.current.cca", ftypes.UINT8)
pf.ieee_80211_direct_sequence_control_energy_detect_threshold = ProtoField.new("Energy Detect Threshold", "ftnt.capwap.message.element.ieee.80211.direct.sequence.control.energy.detect.threshold", ftypes.UINT32)

pf.ieee_80211_ofdm_control_band_support = ProtoField.new("Band Support", "ftnt.capwap.message.element.ieee.80211.ofdm.control.band.support", ftypes.UINT8)
pf.ieee_80211_ofdm_control_ti_threshold = ProtoField.new("TI Threshold", "ftnt.capwap.message.element.ieee.80211.ofdm.control.ti.threshold", ftypes.UINT32)

pf.radio_operational_id = ProtoField.new("Radio Operational ID", "ftnt.capwap.message.element.radio.operation.id", ftypes.UINT8)
pf.radio_operational_state = ProtoField.new("Radio Operational State", "ftnt.capwap.message.element.radio.operation.state", ftypes.UINT8, radio_op_state_vals)
pf.radio_operational_cause = ProtoField.new("Radio Operational Cause", "ftnt.capwap.message.element.radio.operation.cause", ftypes.UINT8, radio_op_cause_vals)

pf.vsp_ftnt_vlanid = ProtoField.new("Vlan ID", "ftnt.capwap.message.element.fortinet.vlan.id", ftypes.UINT16)
pf.vsp_ftnt_wtpcap = ProtoField.new("WTP CAP", "ftnt.capwap.message.element.fortinet.wtp.cap", ftypes.BYTES)
pf.serial_number = ProtoField.new("Serial Number", "ftnt.capwap.message.element.fortinet.serial.number", ftypes.STRING)
pf.allowed = ProtoField.new("Allowed", "ftnt.capwap.message.element.fortinet.allowed", ftypes.UINT8)
pf.ip_frag_enable = ProtoField.new("IP Frag Enable", "ftnt.capwap.message.element.fortinet.ip.frag.enable", ftypes.UINT8)
pf.tun_mtu_uplink = ProtoField.new("Tun Mtu Uplink", "ftnt.capwap.message.element.fortinet.tun.mtu.uplink", ftypes.UINT16)
pf.tun_mtu_downlink = ProtoField.new("Tun Mtu Downlink", "ftnt.capwap.message.element.fortinet.tun.mtu.downlink", ftypes.UINT16)
pf.regcode = ProtoField.new("Reg Code", "ftnt.capwap.message.element.fortinet.regcode", ftypes.STRING)
pf.version = ProtoField.new("Version", "ftnt.capwap.message.element.fortinet.version", ftypes.UINT8)
pf.version16 = ProtoField.new("Version", "ftnt.capwap.message.element.fortinet.version16", ftypes.UINT16)
pf.ac_capbilities = ProtoField.new("AC Capabilities", "ftnt.capwap.message.element.fortinet.ac.capbilities", ftypes.BYTES)
pf.telnet_enable = ProtoField.new("Telnet Enable", "ftnt.capwap.message.element.fortinet.telnet.enable", ftypes.UINT32)
pf.sn_length= ProtoField.new("SN Length", "ftnt.capwap.message.element.fortinet.sn.length", ftypes.UINT16)
pf.sn = ProtoField.new("SN", "ftnt.capwap.message.element.fortinet.sn", ftypes.STRING)
pf.prev_r32 = ProtoField.new("Prev R32", "ftnt.capwap.message.element.fortinet.prev.r32", ftypes.UINT32)
pf.curr_r32 = ProtoField.new("Curr R32", "ftnt.capwap.message.element.fortinet.curr.r32", ftypes.UINT32)
pf.age = ProtoField.new("Age", "ftnt.capwap.message.element.fortinet.age", ftypes.UINT32)
pf.period = ProtoField.new("Period", "ftnt.capwap.message.element.fortinet.period", ftypes.UINT32)
pf.vfid = ProtoField.new("Vfid", "ftnt.capwap.message.element.fortinet.vfid", ftypes.UINT32)
pf.mesh_eth_bridge_type = ProtoField.new("Mesh Eth Bridge Type", "ftnt.capwap.message.element.fortinet.mesh.eth.bridge.type", ftypes.UINT16)
pf.sta_stats_interval = ProtoField.new("STA Statistics Report Interval", "ftnt.capwap.message.element.fortinet.sta.stats.interval", ftypes.UINT16)
pf.sta_cap_interval = ProtoField.new("STA Capabilities Report Interval", "ftnt.capwap.message.element.fortinet.sta.cap.interval", ftypes.UINT16)
pf.max_distance = ProtoField.new("Max Distance", "ftnt.capwap.message.element.fortinet.max.distance", ftypes.UINT32)
pf.txpower_dbm = ProtoField.new("TxPower dbm", "ftnt.capwap.message.element.fortinet.txpower.dbm", ftypes.UINT16)
pf.vap_stats = ProtoField.new("Vap Statistics", "ftnt.capwap.message.element.fortinet.vap.stats", ftypes.BYTES)
pf.cpu_load = ProtoField.new("CPU Load", "ftnt.capwap.message.element.fortinet.cpu.load", ftypes.UINT8)
pf.mem_total = ProtoField.new("Memory Total", "ftnt.capwap.message.element.fortinet.memory.total", ftypes.UINT32)
pf.mem_free = ProtoField.new("Memory Free", "ftnt.capwap.message.element.fortinet.memory.free", ftypes.UINT32)
pf.ap_list = ProtoField.new("AP List", "ftnt.capwap.message.element.fortinet.ap.list", ftypes.BYTES)
pf.ap_scan_idle = ProtoField.new("AP Scan Idle", "ftnt.capwap.message.element.fortinet.ap.scan.idle", ftypes.UINT16)
pf.auto_chan = ProtoField.new("Auto Channel", "ftnt.capwap.message.element.fortinet.auto.channel", ftypes.UINT16)
pf.wlan_id = ProtoField.new("Wlan ID", "ftnt.capwap.message.element.fortinet.wlan.id", ftypes.UINT8)
pf.disable_thresh = ProtoField.new("Auto Channel", "ftnt.capwap.message.element.fortinet.disable.thresh", ftypes.UINT16)
pf.vap_flags = ProtoField.new("VAP Flags", "ftnt.capwap.message.element.fortinet.vap.flags", ftypes.UINT32)
pf.wtp_up_time = ProtoField.new("WTP Up Time", "ftnt.capwap.message.element.fortinet.wtp.up.time", ftypes.UINT32)
pf.daemon_up_time = ProtoField.new("Daemon Up Time", "ftnt.capwap.message.element.fortinet.daemon.up.time", ftypes.UINT32)
pf.session_up_time = ProtoField.new("Session Up Time", "ftnt.capwap.message.element.fortinet.session.up.time", ftypes.UINT32)
pf.oper_chan = ProtoField.new("Operation Channel", "ftnt.capwap.message.element.fortinet.oper.chan", ftypes.UINT8)
pf.sta_cap_list = ProtoField.new("Station Capability List", "ftnt.capwap.message.element.fortinet.sta.cap.list", ftypes.BYTES)
pf.radio_stats = ProtoField.new("Radio Statistics", "ftnt.capwap.message.element.fortinet.radio.stats", ftypes.BYTES)
pf.mesh_eth_bridge_enable = ProtoField.new("Mesh Eth Bridge Enable", "ftnt.capwap.message.element.fortinet.mesh.eth.bridge.enable", ftypes.UINT8)
pf.ps_opt = ProtoField.new("PS OPT", "ftnt.capwap.message.element.fortinet.ps.opt", ftypes.UINT8)
pf.pure = ProtoField.new("Pure", "ftnt.capwap.message.element.fortinet.pure", ftypes.UINT8)
pf.mode = ProtoField.new("Mode", "ftnt.capwap.message.element.fortinet.mode", ftypes.UINT8)
pf.amsdu = ProtoField.new("AMSDU", "ftnt.capwap.message.element.fortinet.amsdu", ftypes.UINT8)
pf.coext = ProtoField.new("Coext", "ftnt.capwap.message.element.fortinet.coext", ftypes.UINT8)
pf.mcs = ProtoField.new("MCS", "ftnt.capwap.message.element.fortinet.mcs", ftypes.UINT8)
pf.ht_short_gi = ProtoField.new("HT Short GI", "ftnt.capwap.message.element.fortinet.ht.short.gi", ftypes.UINT8)
pf.bandwidth = ProtoField.new("Bandwidth", "ftnt.capwap.message.element.fortinet.bandwidth", ftypes.UINT8)
pf.bg_scan_interval = ProtoField.new("bg scan interval", "ftnt.capwap.message.element.fortinet.bg.scan.interval", ftypes.UINT16)
pf.bg_scan_idle = ProtoField.new("bg scan idle", "ftnt.capwap.message.element.fortinet.bg.scan.idle", ftypes.UINT24)
pf.bg_scan_rpt_interval = ProtoField.new("bg scan rpt interval", "ftnt.capwap.message.element.fortinet.bg.scan.rpt.interval", ftypes.UINT16)
pf.fg_scan_rpt_interval = ProtoField.new("fg scan rpt interval", "ftnt.capwap.message.element.fortinet.fg.scan.rpt.interval", ftypes.UINT16)
pf.passive = ProtoField.new("Passive", "ftnt.capwap.message.element.fortinet.passive", ftypes.UINT8)
pf.sta_scan = ProtoField.new("STA Scan", "ftnt.capwap.message.element.fortinet.sta.scan", ftypes.UINT16)
pf.spectrum_analysis_enable = ProtoField.new("Spectrum Analysis Enable", "ftnt.capwap.message.element.fortinet.spectrum.analysis.enable", ftypes.UINT8)
pf.ssid = ProtoField.new("SSID", "ftnt.capwap.message.element.fortinet.ssid", ftypes.STRING)
pf.darrp_cfg_enable = ProtoField.new("DARRP CFG Enable", "ftnt.capwap.message.element.fortinet.darrp.cfg.enable", ftypes.UINT8)
pf.darrp_cfg_interval = ProtoField.new("DARRP CFG Interval", "ftnt.capwap.message.element.fortinet.darrp.cfg.interval", ftypes.UINT8)
pf.fho = ProtoField.new("FHO", "ftnt.capwap.message.element.fortinet.fho", ftypes.UINT8)
pf.apho = ProtoField.new("APHO", "ftnt.capwap.message.element.fortinet.apho", ftypes.UINT8)
pf.locate_enable = ProtoField.new("Locate Enable", "ftnt.capwap.message.element.fortinet.locate.enable", ftypes.UINT8)
pf.locate_interval = ProtoField.new("Locate Interval", "ftnt.capwap.message.element.fortinet.locate.interval", ftypes.UINT16)
pf.wids_enable = ProtoField.new("WIDS Enable", "ftnt.capwap.message.element.fortinet.wids.enable", ftypes.UINT32)
pf.bitmap = ProtoField.new("Bitmap", "ftnt.capwap.message.element.fortinet.bitmap", ftypes.UINT16, nil, base.HEX)
pf.enable_local_subnet = ProtoField.new("Enable Local Subnet", "ftnt.capwap.message.element.fortinet.enable.local.subnet", ftypes.UINT8)
pf.cnt = ProtoField.new("CNT", "ftnt.capwap.message.element.fortinet.cnt", ftypes.UINT8)
pf.wlan_id = ProtoField.new("WLAN ID", "ftnt.capwap.message.element.fortinet.wlan.id", ftypes.UINT8)
pf.wds_enable = ProtoField.new("WDS Enable", "ftnt.capwap.message.element.fortinet.wds.enable", ftypes.UINT8)
pf.multicast_rate = ProtoField.new("Multicast Rate", "ftnt.capwap.message.element.fortinet.multicast.rate", ftypes.UINT32)
pf.vlan_id = ProtoField.new("Vlan ID", "ftnt.capwap.message.element.fortinet.vlan.id", ftypes.UINT16)
pf.ip = ProtoField.new("IP", "ftnt.capwap.message.element.fortinet.ip", ftypes.IPv4)
pf.mask = ProtoField.new("MASK", "ftnt.capwap.message.element.fortinet.mask", ftypes.IPv4)

pf.capability = ProtoField.new("Capability", "ftnt.capwap.message.element.capability", ftypes.UINT16, nil, base.HEX)
pf.key_index = ProtoField.new("Key-Index", "ftnt.capwap.message.element.key.index", ftypes.UINT8)
pf.key_status = ProtoField.new("Key Status", "ftnt.capwap.message.element.key.status", ftypes.UINT8, ieee80211_wlan_key_status_vals)
pf.key_length = ProtoField.new("Key Length", "ftnt.capwap.message.element.key.length", ftypes.UINT16)
pf.key = ProtoField.new("Key", "ftnt.capwap.message.element.key", ftypes.BYTES)
pf.group_tsc = ProtoField.new("Group TSC", "ftnt.capwap.message.element.group.tsc", ftypes.BYTES, nil) -- todo:
pf.qos = ProtoField.new("QoS", "ftnt.capwap.message.element.qos", ftypes.UINT8, ieee80211_add_wlan_qos_vals)
pf.auth_type = ProtoField.new("Auth Type", "ftnt.capwap.message.element.auth.type", ftypes.UINT8, ieee80211_add_wlan_auth_type_vals)
pf.mac_mode = ProtoField.new("MAC Mode", "ftnt.capwap.message.element.mac.mode", ftypes.UINT8, ieee80211_add_wlan_mac_mode_vals)
pf.tunnel_mode = ProtoField.new("Tunnel Mode", "ftnt.capwap.message.element.tunnel.mode", ftypes.UINT8, ieee80211_add_wlan_tunnel_mode_vals)
pf.suppress_ssid = ProtoField.new("Suppress SSID", "ftnt.capwap.message.element.suppress.ssid", ftypes.UINT8, yntypes, base.HEX, 0x01)
pf.key = ProtoField.new("Key", "ftnt.capwap.message.element.key", ftypes.BYTES)
pf.flags = ProtoField.new("Flags", "ftnt.capwap.message.element.flags", ftypes.UINT8)
pf.flags32 = ProtoField.new("Flags", "ftnt.capwap.message.element.flags32", ftypes.UINT32)
pf.tag = ProtoField.new("Tag", "ftnt.capwap.message.element.tag", ftypes.BYTES)

pf.auth_server = ProtoField.new("Auth Server", "ftnt.capwap.message.element.auth.server", ftypes.STRING)
pf.walled_garden = ProtoField.new("Walled Garden", "ftnt.capwap.message.element.walled.garden", ftypes.STRING)
pf.mac = ProtoField.new("MAC", "ftnt.capwap.message.element.mac", ftypes.ETHER)
pf.rssi = ProtoField.new("RSSI", "ftnt.capwap.message.element.rssi", ftypes.UINT8)
pf.chan = ProtoField.new("Channel", "ftnt.capwap.message.element.channel", ftypes.UINT8)
pf.size = ProtoField.new("Size", "ftnt.capwap.message.element.size", ftypes.UINT32)
pf.hash = ProtoField.new("Hash", "ftnt.capwap.message.element.hash", ftypes.BYTES)
pf.opcode = ProtoField.new("OpCode", "ftnt.capwap.message.element.opcode", ftypes.UINT8)
pf.data = ProtoField.new("Data", "ftnt.capwap.message.element.data", ftypes.STRING)
pf.unused = ProtoField.new("Unused", "ftnt.capwap.message.element.unused", ftypes.UINT8)
pf.fgs_img_id = ProtoField.new("FgsImgId", "ftnt.capwap.message.element.fgsimgid", ftypes.STRING)
pf.url = ProtoField.new("url", "ftnt.capwap.message.element.url", ftypes.STRING)
pf.av_engine_version = ProtoField.new("AV Engine Version", "ftnt.capwap.message.element.av.engine.version", ftypes.STRING)
pf.av_db_version = ProtoField.new("AV DB Version", "ftnt.capwap.message.element.av.db.version", ftypes.STRING)
pf.ips_engine_version = ProtoField.new("IPS Engine Version", "ftnt.capwap.message.element.ips.engine.version", ftypes.STRING)
pf.ips_db_version = ProtoField.new("IPS DB Version", "ftnt.capwap.message.element.ips.db.version", ftypes.STRING)
pf.botnet_db_version = ProtoField.new("Botnet DB Version", "ftnt.capwap.message.element.botnet.db.version", ftypes.STRING)
pf.sta_ip = ProtoField.new("Sta IP list", "ftnt.capwap.message.element.sta.ip.list", ftypes.IPv4)

local CW_UTM_AV_ENGINE_VER = 1
local CW_UTM_AV_DB_VER = 2
local CW_UTM_IPS_ENGINE_VER = 3
local CW_UTM_IPS_DB_VER = 4
local CW_UTM_BOTNET_DB_VER = 5

local utypes = {
    [CW_UTM_AV_ENGINE_VER] = "AV Engine Version",
    [CW_UTM_AV_DB_VER] = "AV DB Version",
    [CW_UTM_IPS_ENGINE_VER] = "IPS Engine Version",
    [CW_UTM_IPS_DB_VER] = "IPS DB Version",
    [CW_UTM_BOTNET_DB_VER] = "Botnet DB Version",
}

local infoTypes = {
    [12] = "DHO_HOST_NAME",
    [60] = "DHO_VENDOR_CLASS_IDENTIFIER"
}

pf.utm_version_type = ProtoField.new("Utm Version Type", "ftnt.capwap.message.element.utm.version.type", ftypes.UINT16, utypes)
pf.utm_verson_time = ProtoField.new("Utm Version Time", "ftnt.capwap.message.element.utm.version.time", ftypes.ABSOLUTE_TIME)
pf.utm_verson_len = ProtoField.new("Utm Version Length", "ftnt.capwap.message.element.utm.version.len", ftypes.UINT16)

pf.ip_list = ProtoField.new("IP List", "ftnt.capwap.message.element.ip.list", ftypes.BYTES)
pf.sta_host_info = ProtoField.new("Sta Host Info", "ftnt.capwap.message.element.sta.host.info", ftypes.BYTES)
pf.info_age = ProtoField.new("Info Age", "ftnt.capwap.message.element.info.age", ftypes.UINT32)
pf.info_len = ProtoField.new("Info Length", "ftnt.capwap.message.element.info.length", ftypes.UINT8)
pf.info = ProtoField.new("Info", "ftnt.capwap.message.element.info", ftypes.STRING)
pf.info_type = ProtoField.new("Info Type", "ftnt.capwap.message.element.type", ftypes.UINT8, infoTypes)

pf.rx_lastdata = ProtoField.new("Rx Lastdata", "ftnt.capwap.message.element.rx.last.data", ftypes.UINT32)
pf.tx_lastdata = ProtoField.new("Tx Lastdata", "ftnt.capwap.message.element.tx.last.data", ftypes.UINT32)
pf.rx_bytes = ProtoField.new("Rx Bytes", "ftnt.capwap.message.element.rx.bytes", ftypes.UINT64)
pf.tx_bytes = ProtoField.new("Tx Bytes", "ftnt.capwap.message.element.tx.bytes", ftypes.UINT64)
pf.rate = ProtoField.new("Rate", "ftnt.capwap.message.element.rate", ftypes.UINT32)
pf.snr = ProtoField.new("SNR", "ftnt.capwap.message.element.snr", ftypes.UINT8)

pf.mac_length = ProtoField.new("Mac Length", "ftnt.capwap.message.element.mac.length", ftypes.UINT8)
pf.mac_address = ProtoField.new("Mac Address", "ftnt.capwap.message.element.mac.address", ftypes.ETHER)
pf.del_ts = ProtoField.new("Delete Timestamp", "ftnt.capwap.message.element.delete.timestamp", ftypes.RELATIVE_TIME)
pf.del_by = ProtoField.new("Delete By", "ftnt.capwap.message.element.delete.by", ftypes.UINT32)
pf.del_reason = ProtoField.new("Delete Reason", "ftnt.capwap.message.element.delete.reason", ftypes.UINT32)
pf.conf = ProtoField.new("Configuration", "ftnt.capwap.message.element.conf", ftypes.BYTES)
pf.tx_power = ProtoField.new("Tx Power", "ftnt.capwap.message.element.tx.power", ftypes.UINT16)
pf.power_max = ProtoField.new("Power Max", "ftnt.capwap.message.element.power.max", ftypes.UINT16)
pf.dynamic_vlan = ProtoField.new("Dynamic Vlan", "ftnt.capwap.message.element.dynamic.vlan", ftypes.UINT8)
pf.number32 = ProtoField.new("Number", "ftnt.capwap.message.element.number", ftypes.UINT32)
pf.downup_cfg = ProtoField.new("Downup Config", "ftnt.capwap.message.element.", ftypes.UINT8)
pf.wday = ProtoField.new("Wday", "ftnt.capwap.message.element.wday", ftypes.UINT8)
pf.bhour = ProtoField.new("Bhour", "ftnt.capwap.message.element.bhour", ftypes.UINT8)
pf.bmin = ProtoField.new("Bmin", "ftnt.capwap.message.element.bmin", ftypes.UINT8)
pf.ehour = ProtoField.new("Ehour", "ftnt.capwap.message.element.ehour", ftypes.UINT8)
pf.emin = ProtoField.new("Emin", "ftnt.capwap.message.element.emin", ftypes.UINT8)
pf.state_list = ProtoField.new("State List", "ftnt.capwap.message.element.state.list", ftypes.BYTES)
pf.old_state = ProtoField.new("Old State", "ftnt.capwap.message.element.old.state", ftypes.UINT32)
pf.new_state = ProtoField.new("New State", "ftnt.capwap.message.element.new.state", ftypes.UINT32)
pf.down_up = ProtoField.new("Down up", "ftnt.capwap.message.element.down.up", ftypes.UINT8)

pf.ts = ProtoField.new("Timestamp", "ftnt.capwap.message.element.timestamp", ftypes.UINT32)
pf.tzid_len = ProtoField.new("Timezone ID Length", "ftnt.capwap.message.element.timezone.id.length", ftypes.UINT8)
pf.tzid = ProtoField.new("Timezone ID", "ftnt.capwap.message.element.timezone.id", ftypes.STRING)
pf.timezone_len = ProtoField.new("Timezone Length", "ftnt.capwap.message.element.timezone.length", ftypes.UINT8)
pf.timezone = ProtoField.new("Timezone", "ftnt.capwap.message.element.timezone", ftypes.STRING)

capwap.fields = pf

function mgmtVlanTagDecoder(tlv, tvbrange)
    tlv:add(pf.vsp_ftnt_vlanid, tvbrange)
end

function deleteStaTsDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.radio_id, tvb:range(0, 1))
    tlv:add(pf.wlan_id, tvb:range(1, 1))
    tlv:add(pf.mac_length, tvb:range(2, 1))
    local len = tvb:range(2, 1):uint()
    tlv:add(pf.mac_address, tvb:range(3, len))
    tlv:add(pf.del_ts, tvb:range(3 + len, 4))
end

function wtpCapDecoder(tlv, tvbrange)
    tlv:add(pf.vsp_ftnt_wtpcap, tvbrange)
end

function txPowerDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.radio_id, tvb:range(0, 1))
    tlv:add(pf.tx_power, tvb:range(1, 2))
end

function wtpAllowDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.serial_number, tvb:range(0, 16))
    tlv:add(pf.allowed, tvb:range(16, 1))
end

function ipFragDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.ip_frag_enable, tvb:range(0, 1))
    tlv:add(pf.tun_mtu_uplink, tvb:range(1, 2))
    tlv:add(pf.tun_mtu_downlink, tvb:range(3, 2))
end

function wbhStaDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.radio_id, tvb:range(0, 1))
    tlv:add(pf.length, tvb:range(1, 1))
    tlv:add(pf.sta_mac, tvb:range(2, 6))
    tlv:add(pf.bssid, tvb:range(8, 6))
    tlv:add(pf.mhc, tvb:range(14, 1))
end

function staIpListDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.version16, tvb:range(0, 2))
    tlv:add(pf.radio_id, tvb:range(2, 1))
    local iplist = tlv:add(pf.ip_list, tvb:range(3))
    local pos = 3
    repeat
        iplist:add(pf.sta_ip, tvb:range(pos, 4))
        pos = pos + 4
    until pos + 4 >= tvbrange:len()
end

function staHostInfoListDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.version16, tvb:range(0, 2))
    tlv:add(pf.radio_id, tvb:range(2, 1))
    local list = tlv:add(pf.sta_host_info, tvb:range(3))
    local pos = 3
    repeat
        list:add(pf.radio_id, tvb:range(pos, 1))
        pos = pos + 1
        list:add(pf.wlan_id, tvb:range(pos, 1))
        pos = pos + 1
        list:add(pf.sta_mac, tvb:range(pos, 6))
        pos = pos + 6
        list:add(pf.info_type, tvb:range(pos, 1))
        pos = pos + 1
        list:add(pf.info_age, tvb:range(pos, 4))
        pos = pos + 4
        list:add(pf.info_len, tvb:range(pos, 1))
        local info_len = tvb:range(pos, 1):uint()
        pos = pos + 1
        list:add(pf.info, tvb:range(pos, info_len))
        pos = pos + info_len
    until pos >= tvbrange:len()
end

function addStaDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.radio_id, tvb:range(0, 1))
    tlv:add(pf.wlan_id, tvb:range(1, 1))
    tlv:add(pf.length, tvb:range(2, 1))
    tlv:add(pf.mac, tvb:range(3))
end

function regcodeDecoder(tlv, tvbrange)
    tlv:add(pf.regcode, tvbrange)
end

function telnetEnableDecoder(tlv, tvbrange)
    tlv:add(pf.telnet_enable, tvbrange)
end

function meshEthBridgeTypeDecoder(tlv, tvbrange)
    tlv:add(pf.mesh_eth_bridge_type, tvbrange)
end

function staStatsIntervalDecoder(tlv, tvbrange)
    tlv:add(pf.sta_stats_interval, tvbrange)
end

function staCapIntervalDecoder(tlv, tvbrange)
    tlv:add(pf.sta_cap_interval, tvbrange)
end

function txPowerMaxDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.radio_id, tvb:range(0, 1))
    tlv:add(pf.power_max, tvb:range(1, 2))
end

function meshEthBridgeEnableDecoder(tlv, tvbrange)
    tlv:add(pf.mesh_eth_bridge_enable, tvbrange)
end

function acCapDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.version, tvb:range(0, 1))
    tlv:add(pf.radio_id, tvb:range(1, 1))
    tlv:add(pf.ac_capbilities, tvb:range(2))
end

function vapStatsDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.version, tvb:range(0, 1))
    tlv:add(pf.radio_id, tvb:range(1, 1))
    tlv:add(pf.vap_stats, tvb:range(2))
end

function staStatsDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.version16, tvb:range(0, 2))
    tlv:add(pf.radio_id, tvb:range(2, 1))
    local list = tlv:add(pf.sta_host_info, tvb:range(3))
    local pos = 3
    repeat
        list:add(pf.sta_mac, tvb:range(pos, 6))
        pos = pos + 6
        list:add(pf.radio_id, tvb:range(pos, 1))
        pos = pos + 1
        list:add(pf.wlan_id, tvb:range(pos, 1))
        pos = pos + 1
        list:add(pf.flags32, tvb:range(pos, 4))
        pos = pos + 4
        list:add(pf.rx_lastdata, tvb:range(pos, 4))
        pos = pos + 4
        list:add(pf.tx_lastdata, tvb:range(pos, 4))
        pos = pos + 4
        list:add(pf.rx_bytes, tvb:range(pos, 8))
        pos = pos + 8
        list:add(pf.tx_bytes, tvb:range(pos, 8))
        pos = pos + 8
        list:add(pf.rate, tvb:range(pos, 4))
        pos = pos + 4
        list:add(pf.snr, tvb:range(pos, 1))
        pos = pos + 1
    until pos >= tvbrange:len()
end

function apListDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.version, tvb:range(0, 1))
    tlv:add(pf.radio_id, tvb:range(1, 1))
    tlv:add(pf.ap_list, tvb:range(2))
end

function staCapListDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.version, tvb:range(0, 1))
    tlv:add(pf.radio_id, tvb:range(1, 1))
    tlv:add(pf.sta_cap_list, tvb:range(2))
end

function staCapDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.radio_id, tvb:range(0, 1))
    tlv:add(pf.wlan_id, tvb:range(1, 1))
    tlv:add(pf.mac, tvb:range(2, 6))
    tlv:add(pf.rssi, tvb:range(8, 1))
    tlv:add(pf.capability, tvb:range(9, 2))
    tlv:add(pf.chan, tvb:range(11, 1))
end

function radioStatsDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.version, tvb:range(0, 1))
    tlv:add(pf.radio_id, tvb:range(1, 1))
    tlv:add(pf.radio_stats, tvb:range(2))
end

function wtpStatsDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.cpu_load, tvb:range(0, 1))
    tlv:add(pf.mem_total, tvb:range(1, 4))
    tlv:add(pf.mem_free, tvb:range(5, 4))
end

function countryCodeDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.radio_id, tvb:range(0, 1))
    tlv:add(pf.country_code, tvb:range(1, 2))
    tlv:add(pf.country_code_string, tvb:range(3, 3))
end

function downUpDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.radio_id, tvb:range(0, 1))
    tlv:add(pf.wlan_id, tvb:range(1, 1))
    tlv:add(pf.down_up, tvb:range(2))
end

function maxDistanceDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.radio_id, tvb:range(0, 1))
    tlv:add(pf.max_distance, tvb:range(1, 4))
end

function deleteStaDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.radio_id, tvb:range(0, 1))
    tlv:add(pf.wlan_id, tvb:range(1, 1))
    tlv:add(pf.mac_length, tvb:range(2, 1))
    local len = tvb:range(2, 1):uint()
    tlv:add(pf.mac_address, tvb:range(3, len))
    tlv:add(pf.del_by, tvb:range(3 + len, 4))
end

function radiusConfigDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.radio_id, tvb:range(0, 1))
    tlv:add(pf.wlan_id, tvb:range(1, 1))
    tlv:add(pf.length16, tvb:range(2, 2))
    local len = tvb:range(2, 2):uint()
    tlv:add(pf.conf, tvb:range(4, len))
end

function vapWebAuthServerDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.radio_id, tvb:range(0, 1))
    tlv:add(pf.wlan_id, tvb:range(1, 1))
    tlv:add(pf.auth_server, tvb:range(2))
end

function txPowerDbmDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.radio_id, tvb:range(0, 1))
    tlv:add(pf.txpower_dbm, tvb:range(1, 2))
end

function apScanIdleDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.radio_id, tvb:range(0, 1))
    tlv:add(pf.ap_scan_idle, tvb:range(1, 2))
end

function autoChanDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.radio_id, tvb:range(0, 1))
    tlv:add(pf.auto_chan, tvb:range(1, 2))
end

function stateListDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.version16, tvb:range(0, 2))
    tlv:add(pf.radio_id, tvb:range(2, 1))
    local list = tlv:add(pf.state_list, tvb:range(3))
    local pos = 3
    repeat
        list:add(pf.radio_id, tvb:range(pos, 1))
        pos = pos + 1
        list:add(pf.wlan_id, tvb:range(pos, 1))
        pos = pos + 1
        list:add(pf.mac_address, tvb:range(pos, 6))
        pos = pos + 6
        list:add(pf.old_state, tvb:range(pos, 4))
        pos = pos + 4
        list:add(pf.new_state, tvb:range(pos, 4))
        pos = pos + 4
        list:add(pf.age, tvb:range(pos, 4))
        pos = pos + 4
    until pos >= tvbrange:len()
end

function disableThreshDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.radio_id, tvb:range(0, 1))
    tlv:add(pf.wlan_id, tvb:range(1, 1))
    tlv:add(pf.disable_thresh, tvb:range(2, 2))
end

function deleteStaReasonDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.radio_id, tvb:range(0, 1))
    tlv:add(pf.wlan_id, tvb:range(1, 1))
    tlv:add(pf.mac_length, tvb:range(2, 1))
    local len = tvb:range(2, 1):uint()
    tlv:add(pf.mac_address, tvb:range(3, len))
    tlv:add(pf.del_reason, tvb:range(3 + len, 4))
end

function vapFlagsDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.radio_id, tvb:range(0, 1))
    tlv:add(pf.wlan_id, tvb:range(1, 1))
    tlv:add(pf.vap_flags, tvb:range(2, 4))
end

function psOptDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.radio_id, tvb:range(0, 1))
    tlv:add(pf.ps_opt, tvb:range(1, 1))
end

function modeDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.radio_id, tvb:range(0, 1))
    tlv:add(pf.mode, tvb:range(1, 1))
end

function pureDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.radio_id, tvb:range(0, 1))
    tlv:add(pf.pure, tvb:range(1, 1))
end

function amsduDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.radio_id, tvb:range(0, 1))
    tlv:add(pf.amsdu, tvb:range(1, 1))
end

function coextDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.radio_id, tvb:range(0, 1))
    tlv:add(pf.coext, tvb:range(1, 1))
end

function passiveDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.radio_id, tvb:range(0, 1))
    tlv:add(pf.passive, tvb:range(1, 1))
end

function macDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.radio_id, tvb:range(0, 1))
    tlv:add(pf.wlan_id, tvb:range(1, 1))
    tlv:add(pf.length, tvb:range(2, 1))
    tlv:add(pf.mac, tvb:range(3))
end

function fhoDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.radio_id, tvb:range(0, 1))
    tlv:add(pf.fho, tvb:range(1, 1))
end

function aphoDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.radio_id, tvb:range(0, 1))
    tlv:add(pf.apho, tvb:range(1, 1))
end

function staScanDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.radio_id, tvb:range(0, 1))
    tlv:add(pf.sta_scan, tvb:range(1, 2))
end

function spectrumAnalysisDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.radio_id, tvb:range(0, 1))
    tlv:add(pf.spectrum_analysis_enable, tvb:range(1, 1))
    tlv:add(pf.ssid, tvb:range(2))
end

function wtpUptimeDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.wtp_up_time, tvb:range(0, 4))
    tlv:add(pf.daemon_up_time, tvb:range(4, 4))
    tlv:add(pf.session_up_time, tvb:range(8, 4))
end

function darryOperChanDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.sn, tvb:range(0, 16))
    tlv:add(pf.radio_id, tvb:range(16, 1))
    tlv:add(pf.base_mac_address, tvb:range(17, 6))
    tlv:add(pf.oper_chan, tvb:range(23, 1))
end

function staMaxApDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.radio_id, tvb:range(0, 1))
    tlv:add(pf.wlan_id, tvb:range(1, 1))
    tlv:add(pf.number32, tvb:range(2))
end

function darrpCfgDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.radio_id, tvb:range(0, 1))
    tlv:add(pf.darrp_cfg_enable, tvb:range(1, 1))
    tlv:add(pf.darrp_cfg_interval, tvb:range(2, 1))
end

function staLocateDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.radio_id, tvb:range(0, 1))
    tlv:add(pf.locate_enable, tvb:range(1, 1))
    tlv:add(pf.locate_interval, tvb:range(2, 2))
end

function widsEnableDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.radio_id, tvb:range(0, 1))
    tlv:add(pf.wids_enable, tvb:range(1, 4))
end

function dynamicVlanDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.radio_id, tvb:range(0, 1))
    tlv:add(pf.wlan_id, tvb:range(1, 1))
    tlv:add(pf.dynamic_vlan, tvb:range(2, 1))
end

function walledGardenDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.radio_id, tvb:range(0, 1))
    tlv:add(pf.wlan_id, tvb:range(1, 1))
    tlv:add(pf.walled_garden, tvb:range(2))
    -- todo: walled garden
end

function utmInfoDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.size, tvb:range(0, 4))
    tlv:add(pf.hash, tvb:range(4))
end

function utmDataDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.length, tvb:range(0, 2))
    tlv:add(pf.opcode, tvb:range(2, 1))
    tlv:add(pf.data, tvb:range(3))
end

function utmJsonInfoDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.size, tvb:range(0, 4))
    tlv:add(pf.hash, tvb:range(4))
end

function utmJsonDataDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.length, tvb:range(0, 2))
    tlv:add(pf.opcode, tvb:range(2, 1))
    tlv:add(pf.data, tvb:range(3))
end

function utmVersionDecoder(tlv, tvbrange)
    -- tlv:add_expert_info(PI_MALFORMED, PI_ERROR, "Unknown Utm Version Decoder")
    local tvb = tvbrange:tvb()
    local is_new = tvb:range(2, 1):uint()
    local length = tvbrange:len()
    local pos = 0

    repeat
        local type = tvb:range(pos, 2):uint()
        tlv:add(pf.utm_version_type, tvb:range(pos, 2))
        pos = pos + 2

        local len = 0
        
        if is_new then
            local time = tvb:range(pos, 4):uint64()
            tlv:add(pf.utm_verson_time, tvb:range(pos, 4))
            pos = pos + 4
            len = tvb:range(pos, 2):uint()
            tlv:add(pf.utm_verson_len, tvb:range(pos, 2))
            pos = pos + 2
        else
            len = tvb:range(pos, 2):uint()
            tlv:add(pf.utm_verson_len, tvb:range(pos, 2))
            pos = pos + 2
        end

        if is_new then
            length = length - 8
        else
            length = length - 4
        end

        -- tlv:add_expert_info(PI_MALFORMED, PI_ERROR, "len: "..len.." pos: "..pos)
        -- type_process[type](tlv, tvb, pos, len)

        if CW_UTM_AV_ENGINE_VER == type then
            tlv:add(pf.av_engine_version, tvb:range(pos, len))
            pos = pos + len
        end

        if CW_UTM_AV_DB_VER == type then
            tlv:add(pf.av_db_version, tvb:range(pos, len))
            pos = pos + len
        end

        if CW_UTM_IPS_ENGINE_VER == type then
            tlv:add(pf.ips_engine_version, tvb:range(pos, len))
            pos = pos + len
        end

        if CW_UTM_IPS_DB_VER == type then
            tlv:add(pf.ips_db_version, tvb:range(pos, len))
            pos = pos + len
        end

        if CW_UTM_BOTNET_DB_VER == type then
            tlv:add(pf.botnet_db_version, tvb:range(pos, len))
            pos = pos + len
        end

        length = length - len

        -- tlv:add_expert_info(PI_MALFORMED, PI_ERROR, "length: "..length)
    until length <= 8
end

function uploadLogNowDecoder (tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.unused, tvb:range(0, 1))
end

function userGroupDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    local user_len = tvb:range(3, 1):uint()
    tlv:add(pf.radio_id, tvb:range(0, 1))
    tlv:add(pf.wlan_id, tvb:range(1, 1))
    tlv:add(pf.usergroup_type, tvb:range(2, 1))
    tlv:add(pf.user_len, tvb:range(3, 1))
    tlv:add(pf.user, tvb:range(4, user_len))
    tlv:add(pf.usergroup_type, tvb:range(4 + user_len, 1))
    tlv:add(pf.group_len, tvb:range(5 + user_len, 1))
    tlv:add(pf.group, tvb:range(6 + user_len))
end

function roamingSuccessDecoder(tlv, tvbrange)
    tlv:add_expert_info(PI_MALFORMED, PI_ERROR, "Unknown Roadming Success")
end

function fortiguardImageIdDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.length, tvb:range(0, 1))
    tlv:add(pf.fgs_img_id, tvb:range(1))
end

function fcldFirmwwareInfoUrlDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.length, tvb:range(0, 1))
    tlv:add(pf.url, tvb:range(1))
end

function fcldFirmwwareDownloadUrlDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.length, tvb:range(0, 1))
    tlv:add(pf.url, tvb:range(1))
end

function fcldFirmwareResultDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.result_code, tvb:range(0, 1))
end

function timezoneInfoDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    local tzid_len = tvb:range(4, 1):uint()
    tlv:add(pf.ts, tvb:range(0, 4))
    tlv:add(pf.tzid_len, tvb:range(4, 1))
    tlv:add(pf.tzid, tvb:range(5, tzid_len))
    tlv:add(pf.timezone_len, tvb:range(5 + tzid_len, 1))
    tlv:add(pf.timezone, tvb:range(6 + tzid_len))
end

function vapBitmapDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.radio_id, tvb:range(0, 1))
    tlv:add(pf.bitmap, tvb:range(1, 2))
end

function splitTunCfgDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.enable_local_subnet, tvb:range(0, 1))
    tlv:add(pf.cnt, tvb:range(1, 1))
end

function downupScheduleDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.radio_id, tvb:range(0, 1))
    tlv:add(pf.wlan_id, tvb:range(1, 1))
    tlv:add(pf.downup_cfg, tvb:range(2, 1))
    tlv:add(pf.wday, tvb:range(3, 1))
    tlv:add(pf.bhour, tvb:range(4, 1))
    tlv:add(pf.bmin, tvb:range(5, 1))
    tlv:add(pf.ehour, tvb:range(6, 1))
    tlv:add(pf.emin, tvb:range(7, 1))
end

function htcapDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.radio_id, tvb:range(0, 1))
    tlv:add(pf.mcs, tvb:range(1, 1))
    tlv:add(pf.ht_short_gi, tvb:range(2, 1))
    tlv:add(pf.bandwidth, tvb:range(3, 1))
end

function wdsDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.radio_id, tvb:range(0, 1))
    tlv:add(pf.wlan_id, tvb:range(1, 1))
    tlv:add(pf.wds_enable, tvb:range(2, 1))
end

function mcastRateDeocder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.radio_id, tvb:range(0, 1))
    tlv:add(pf.wlan_id, tvb:range(1, 1))
    tlv:add(pf.multicast_rate, tvb:range(2, 4))
end

function vapVlanTagDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.radio_id, tvb:range(0, 1))
    tlv:add(pf.wlan_id, tvb:range(1, 1))
    tlv:add(pf.vlan_id, tvb:range(2, 2))
end

function cfgDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.radio_id, tvb:range(0, 1))
    tlv:add(pf.wlan_id, tvb:range(1, 1))
    tlv:add(pf.ip, tvb:range(2, 4))
    tlv:add(pf.mask, tvb:range(6, 4))
end

function vapPskPasswdDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.radio_id, tvb:range(0, 1))
    tlv:add(pf.wlan_id, tvb:range(1, 1))
    tlv:add(pf.key, tvb:range(2))
end

function apScanDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.radio_id, tvb:range(0, 1))
    tlv:add(pf.bg_scan_interval, tvb:range(1, 2))
    tlv:add(pf.bg_scan_idle, tvb:range(3, 3))
    tlv:add(pf.bg_scan_rpt_interval, tvb:range(6, 2))
    tlv:add(pf.fg_scan_rpt_interval, tvb:range(8, 2))
end

function mgmtVapDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.sn_length, tvb:range(0, 2))
    local sn_length = tvb:range(0,2):uint();
    tlv:add(pf.sn, tvb:range(2, sn_length))
    tlv:add(pf.prev_r32, tvb:range(2+sn_length, 4))
    tlv:add(pf.curr_r32, tvb:range(6+sn_length, 4))
    tlv:add(pf.age, tvb:range(10+sn_length, 4))
    tlv:add(pf.period, tvb:range(14+sn_length, 4))
    tlv:add(pf.vfid, tvb:range(18+sn_length, 4))
end

local ftntElementDecoder = {
    [vsp.VSP_FORTINET_AP_SCAN] = apScanDecoder,
    [vsp.VSP_FORTINET_AP_LIST] = apListDecoder,
    [vsp.VSP_FORTINET_AP_SCAN_IDLE] = apScanIdleDecoder,
    [vsp.VSP_FORTINET_PASSIVE] = passiveDecoder,
    [vsp.VSP_FORTINET_AP_SCAN_SNIFFER] = nil,
    [vsp.VSP_FORTINET_DAEMON_RST] = nil,
    [vsp.VSP_FORTINET_MAC] = macDecoder,
    [vsp.VSP_FORTINET_WTP_ALLOW] = wtpAllowDecoder,
    [vsp.VSP_FORTINET_WDS_STA] = nil,
    [vsp.VSP_FORTINET_WBH_STA] = wbhStaDecoder,
    [vsp.VSP_FORTINET_MIC_FAILURE] = nil,
    [vsp.VSP_FORTINET_STA_IP_LIST] = staIpListDecoder,
    [vsp.VSP_FORTINET_STA_HOST_INFO_LIST] = staHostInfoListDecoder,
    [vsp.VSP_FORTINET_ADD_STA] = addStaDecoder,
    [vsp.VSP_FORTINET_ADD_TUNLAN_HOST] = nil,
    [vsp.VSP_FORTINET_DEL_TUNLAN_HOST] = nil,
    [vsp.VSP_FORTINET_STA_SESSION_KEY] = nil,
    [vsp.VSP_FORTINET_STA_AUTHED] = nil,
    [vsp.VSP_FORTINET_ADD_STA_LOC] = nil,
    [vsp.VSP_FORTINET_HTCAP] = htcapDecoder,
    [vsp.VSP_FORTINET_MGMT_VAP] = mgmtVapDecoder,
    [vsp.VSP_FORTINET_MODE] = modeDecoder,
    [vsp.VSP_FORTINET_COEXT] = coextDecoder,
    [vsp.VSP_FORTINET_AMSDU] = amsduDecoder,
    [vsp.VSP_FORTINET_PS_OPT] = psOptDecoder,
    [vsp.VSP_FORTINET_PURE] = pureDecoder,
    [vsp.VSP_FORTINET_EBP_TAG] = nil,
    [vsp.VSP_FORTINET_AUTO_CHAN] = autoChanDecoder,
    [vsp.VSP_FORTINET_RADAR] = nil,
    [vsp.VSP_FORTINET_NOL_DEL] = nil,
    [vsp.VSP_FORTINET_NOL_ADD] = nil,
    [vsp.VSP_FORTINET_CONFIG_CODE] = nil,
    [vsp.VSP_FORTINET_DHCP_STARVATION] = nil,
    [vsp.VSP_FORTINET_VAP_STATE_LIST] = stateListDecoder,
    [vsp.VSP_FORTINET_TELNET_ENABLE] = telnetEnableDecoder,
    [vsp.VSP_FORTINET_ADMIN_PASSWD] = nil,
    [vsp.VSP_FORTINET_REGCODE] = regcodeDecoder,
    [vsp.VSP_FORTINET_COUNTRYCODE] = countryCodeDecoder,
    [vsp.VSP_FORTINET_HTTP_ENABLE] = nil,
    [vsp.VSP_FORTINET_HTTPS_ENABLE] = nil,
    [vsp.VSP_FORTINET_SSH_ENABLE] = nil,
    [vsp.VSP_FORTINET_CMD_DATA] = nil,
    [vsp.VSP_FORTINET_CMD_NAME] = nil,
    [vsp.VSP_FORTINET_STA_LIST] = nil,
    [vsp.VSP_FORTINET_ARP_LIST] = nil,
    [vsp.VSP_FORTINET_STA_SCAN] = staScanDecoder,
    [vsp.VSP_FORTINET_SCAN_CLR_ALL] = nil,
    [vsp.VSP_FORTINET_STA_CAP_LIST] = staCapListDecoder,
    [vsp.VSP_FORTINET_STA_CAP] = staCapDecoder,
    [vsp.VSP_FORTINET_FHO] = fhoDecoder,
    [vsp.VSP_FORTINET_APHO] = aphoDecoder,
    [vsp.VSP_FORTINET_STA_LOCATE] = staLocateDecoder,
    [vsp.VSP_FORTINET_STA_LOCATE_RESET] = nil,
    [vsp.VSP_FORTINET_SPECTRUM_ANALYSIS] = spectrumAnalysisDecoder,
    [vsp.VSP_FORTINET_SA_SAMP] = nil,
    [vsp.VSP_FORTINET_ENCRYPT_KEY] = nil,
    [vsp.VSP_FORTINET_DARRP_CFG] = darrpCfgDecoder,
    [vsp.VSP_FORTINET_DARRP_RTBL] = nil,
    [vsp.VSP_FORTINET_DARRP_OPER_CHAN] = darryOperChanDecoder,
    [vsp.VSP_FORTINET_DARRP_OPTIMIZE] = nil,
    [vsp.VSP_FORTINET_VAP_STA_MAX_AP] = staMaxApDecoder,
    [vsp.VSP_FORTINET_RADIO_STA_MAX] = nil,
    [vsp.VSP_FORTINET_WTP_STA_MAX] = nil,
    [vsp.VSP_FORTINET_AP_SUPPRESS_LIST] = nil,
    [vsp.VSP_FORTINET_FORTIPRESENCE_ENABLE] = nil,
    [vsp.VSP_FORTINET_FORTIPRESENCE_PARAMS] = nil,
    [vsp.VSP_FORTINET_VAP_DOWNUP] = downUpDecoder,
    [vsp.VSP_FORTINET_VAP_FLAGS] = vapFlagsDecoder,
    [vsp.VSP_FORTINET_WDS] = wdsDecoder,
    [vsp.VSP_FORTINET_VAP_VLAN_TAG] = vapVlanTagDecoder,
    [vsp.VSP_FORTINET_VAP_BITMAP] = vapBitmapDecoder,
    [vsp.VSP_FORTINET_MCAST_RATE] = mcastRateDeocder,
    [vsp.VSP_FORTINET_CFG] = cfgDecoder,
    [vsp.VSP_FORTINET_SPLIT_TUN_CFG] = splitTunCfgDecoder,
    [vsp.VSP_FORTINET_WTP_LED_DARK] = nil,
    [vsp.VSP_FORTINET_MAX_RETRANSMIT] = nil,
    [vsp.VSP_FORTINET_VAP_NATIP] = nil,
    [vsp.VSP_FORTINET_DOWNUP_SCHEDULE] = downupScheduleDecoder,
    [vsp.VSP_FORTINET_FORTIK_MESH_WIRED_LINK] = nil,
    [vsp.VSP_FORTINET_MGMT_VLAN_TAG] = mgmtVlanTagDecoder,
    [vsp.VSP_FORTINET_DEL_STA_TS] = deleteStaTsDecoder,
    [vsp.VSP_FORTINET_DISABLE_THRESH] = disableThreshDecoder,
    [vsp.VSP_FORTINET_LAN_PORT_MAPPING] = nil,
    [vsp.VSP_FORTINET_DEL_STA_REASON] = deleteStaReasonDecoder,
    [vsp.VSP_FORTINET_STA_VLAN_TAG] = nil,
    [vsp.VSP_FORTINET_VAP_PSK_PASSWD] = vapPskPasswdDecoder,
    [vsp.VSP_FORTINET_LAN_PORT_CFG] = nil,
    [vsp.VSP_FORTINET_LAN_PORT_MAC] = nil,
    [vsp.VSP_FORTINET_IP_FRAG] = ipFragDecoder,
    [vsp.VSP_FORTINET_MAX_DISTANCE] = maxDistanceDecoder,
    [vsp.VSP_FORTINET_DEL_STA_BY] = deleteStaDecoder,
    [vsp.VSP_FORTINET_DTLS_DATA_IN_KERNEL] = nil,
    [vsp.VSP_FORTINET_RADIUS_CONFIG] = radiusConfigDecoder,
    [vsp.VSP_FORTINET_VAP_WEB_AUTH_SERVER] = vapWebAuthServerDecoder,
    [vsp.VSP_FORTINET_MESH_ETH_BRIDGE_ENABLE] = meshEthBridgeEnableDecoder,
    [vsp.VSP_FORTINET_MESH_ETH_BRIDGE_TYPE] = meshEthBridgeTypeDecoder,
    [vsp.VSP_FORTINET_WTP_CAP] = wtpCapDecoder,
    [vsp.VSP_FORTINET_TXPWR] = txPowerDecoder,
    [vsp.VSP_FORTINET_AC_CAP] = acCapDecoder,
    [vsp.VSP_FORTINET_STA_STATS] = staStatsDecoder,
    [vsp.VSP_FORTINET_VAP_STATS] = vapStatsDecoder,
    [vsp.VSP_FORTINET_WTP_STATS] = wtpStatsDecoder,
    [vsp.VSP_FORTINET_WTP_UPTIME] = wtpUptimeDecoder,
    [vsp.VSP_FORTINET_STA_WPA_INFO] = nil,
    [vsp.VSP_FORTINET_RADIO_STATS] = radioStatsDecoder,
    [vsp.VSP_FORTINET_STA_STATS_INTERVAL] = staStatsIntervalDecoder,
    [vsp.VSP_FORTINET_STA_CAP_INTERVAL] = staCapIntervalDecoder,
    [vsp.VSP_FORTINET_MU_LIST] = nil,
    [vsp.VSP_FORTINET_TXPWR_MAX] = txPowerMaxDecoder,
    [vsp.VSP_FORTINET_TXPWR_DBM] = txPowerDbmDecoder,
    [vsp.VSP_FORTINET_TIMERS_INTERVAL] = nil,
    [vsp.VSP_FORTINET_WIDS] = nil,
    [vsp.VSP_FORTINET_WIDS_ENABLE] = widsEnableDecoder,
    [vsp.VSP_FORTINET_WIDS_PARAMS_LONG_DUR] = nil,
    [vsp.VSP_FORTINET_WIDS_PARAMS_ASSOC_TIME] = nil,
    [vsp.VSP_FORTINET_WIDS_PARAMS_ASSOC_THRESH] = nil,
    [vsp.VSP_FORTINET_WIDS_PARAMS_AUTH_TIME] = nil,
    [vsp.VSP_FORTINET_WIDS_PARAMS_AUTH_THRESH] = nil,
    [vsp.VSP_FORTINET_VAP_RATES] = nil,
    [vsp.VSP_FORTINET_BONJOUR_CONFIG] = nil,
    [vsp.VSP_FORTINET_VAP_OKC_CONFIG] = nil,
    [vsp.VSP_FORTINET_VAP_DYNAMIC_VLAN] = dynamicVlanDecoder,
    [vsp.VSP_FORTINET_ST_RADIUS_USER] = nil,
    [vsp.VSP_FORTINET_VAP_LDPC_CONFIG] = nil,
    [vsp.VSP_FORTINET_ST_VLAN_ID] = nil,
    [vsp.VSP_FORTINET_STA_RADIUS_INFO] = nil,
    [vsp.VSP_FORTINET_WIDS_SUBTYPE_RF_THREAT_ROGUE_AP] = nil,
    [vsp.VSP_FORTINET_WIDS_SUBTYPE_RF_THREAT_INTERFEAR_AP] = nil,
    [vsp.VSP_FORTINET_WIDS_SUBTYPE_RF_THREAT_WL_BR] = nil,
    [vsp.VSP_FORTINET_WIDS_SUBTYPE_RF_THREAT_WEP_IV] = nil,
    [vsp.VSP_FORTINET_WIDS_SUBTYPE_RF_THREAT_BC_DEAUTH] = nil,
    [vsp.VSP_FORTINET_WIDS_SUBTYPE_RF_THREAT_NL_PBRESP] = nil,
    [vsp.VSP_FORTINET_WIDS_SUBTYPE_RF_THREAT_LONG_DUR] = nil,
    [vsp.VSP_FORTINET_WIDS_SUBTYPE_RF_THREAT_MAC_OUI] = nil,
    [vsp.VSP_FORTINET_WIDS_SUBTYPE_RF_THREAT_MGMT_FLOOD] = nil,
    [vsp.VSP_FORTINET_WIDS_SUBTYPE_RF_THREAT_SPOOF_DEAUTH] = nil,
    [vsp.VSP_FORTINET_WIDS_SUBTYPE_RF_THREAT_ASLEAP] = nil,
    [vsp.VSP_FORTINET_WIDS_SUBTYPE_RF_THREAT_EAPOL] = nil,
    [vsp.VSP_FORTINET_WIDS_SUBTYPE_RF_THREAT_LAST] = nil,
    [vsp.VSP_FORTINET_WALLED_GARDEN] = walledGardenDecoder,
    [vsp.VSP_FORTINET_UTM_INFO] = utmInfoDecoder,
    [vsp.VSP_FORTINET_UTM_DATA] = utmDataDecoder,
    [vsp.VSP_FORTINET_UTM_JSON_INFO] = utmJsonInfoDecoder,
    [vsp.VSP_FORTINET_UTM_JSON_DATA] = utmJsonDataDecoder,
    [vsp.VSP_FORTINET_UTM_VERSION] = utmVersionDecoder,
    [vsp.VSP_FORTINET_UPLOAD_LOG_NOW] = uploadLogNowDecoder ,
    [vsp.VSP_FORTINET_USER_GROUP] = userGroupDecoder,
    [vsp.VSP_FORTINET_ROAMING_SUCCESS] = roamingSuccessDecoder,
    [vsp.VSP_FORTINET_FORTIGUARD_IMAGE_ID] = fortiguardImageIdDecoder,
    [vsp.VSP_FORTINET_FCLD_FIRMWWARE_INFO_URL] = fcldFirmwwareInfoUrlDecoder,
    [vsp.VSP_FORTINET_FCLD_FIRMWWARE_DOWNLOAD_URL] = fcldFirmwwareDownloadUrlDecoder,
    [vsp.VSP_FORTINET_FCLD_FIRMWARE_RESULT] = fcldFirmwareResultDecoder,
    [vsp.VSP_FORTINET_TIMEZONE_INFO] = timezoneInfoDecoder,
}

function boardDataWtpModelNumberDecoder(tlv, tvbrange)
    tlv:add(pf.wtp_model_number, tvbrange)
end

function boardDataWtpSerialNumberDecoder(tlv, tvbrange)
    tlv:add(pf.wtp_serial_number, tvbrange)
end

function boardDataBoardIdDecoder(tlv, tvbrange)
    tlv:add(pf.wtp_board_id, tvbrange)
end

function boardDataBoardRevisionDecoder(tlv, tvbrange)
    tlv:add(pf.wtp_board_revision, tvbrange)
end

function boardDataBaseMacAddressDecoder(tlv, tvbrange)
    local base_mac_address = tlv:add(pf.base_mac_address, tvbrange)
    local tvb = tvbrange:tvb()
    local mac_string = string.format("%2x:%2x:%2x:%2x:%2x:%2x", -- todo: format 
        tvb:range(0, 1):uint(),tvb:range(1, 1):uint(),tvb:range(2, 1):uint(), 
        tvb:range(3, 1):uint(),tvb:range(4, 1):uint(),tvb:range(5, 1):uint())
    base_mac_address:set_text("Base Mac Address: "..mac_string.." ("..mac_string..")")
end

local boardDataValueDecoder = {
    [BOARD_DATA_WTP_MODEL_NUMBER] = boardDataWtpModelNumberDecoder,
    [BOARD_DATA_WTP_SERIAL_NUMBER] = boardDataWtpSerialNumberDecoder,
    [BOARD_DATA_BOARD_ID] = boardDataBoardIdDecoder,
    [BOARD_DATA_BOARD_REVISION] = boardDataBoardRevisionDecoder,
    [BOARD_DATA_BASE_MAC_ADDRESS] = boardDataBaseMacAddressDecoder,
}

function discoveryTypeDecoder(tlv, tvbrange)
    tlv:add(pf.discovery_type, tvbrange)
end

function vendorSpecificPayloadDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.vendor_identifier, tvb:range(0, 4))
    tlv:add(pf.vendor_element_id, tvb:range(4, 2))
    tlv:add(pf.vendor_data, tvb:range(6))
    tlv:add(pf.fortinet_element_id, tvb:range(4, 2))
    tlv:add(pf.fortinet_value, tvb:range(6))

    local id = tvb:range(4, 2):uint()
    if ftntElementDecoder[id] then
        ftntElementDecoder[id](tlv, tvb:range(6))
    else
        tlv:add_expert_info(PI_MALFORMED, PI_ERROR, "Unknown Element ID "..id)
    end
end

function wtpBoardDataDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    local pktlen = tvb:reported_length_remaining()

    tlv:add(pf.wtp_board_data_vendor, tvb:range(0, 4))
    
    local pos = 4
    local pktlen_remaining = pktlen - pos

    while pktlen_remaining > 0 do
        local type = tvb:range(pos, 2):uint()
        local length = tvb:range(pos + 2, 2):uint()

        local data = tlv:add(pf.wtp_board_data, tvb:range(pos, length + 4))
        data:set_text("WTP Board Data: (t="..type..",l="..length..") "..board_data_type_vals[type])
        data:add(pf.board_data_type, tvb:range(pos, 2))
        data:add(pf.board_data_length, tvb:range(pos+2, 2))
        data:add(pf.board_data_value, tvb:range(pos+4, length))
        
        if boardDataValueDecoder[type] then
            boardDataValueDecoder[type](data, tvb:range(pos+4, length))
        end

        pos = pos + (length + 4)
        pktlen_remaining = pktlen_remaining - (length + 4)
    end
end

function wtpDescriptorHardwareVersionDecoder(tlv, tvbrange)
    tlv:add(pf.wtp_descriptor_hardware_version, tvbrange)
end

function wtpDescriptorActiveSoftwareVersionDecoder(tlv, tvbrange)
    tlv:add(pf.wtp_descriptor_software_version, tvbrange)
end

function wtpDescriptorBootVersionDecoder(tlv, tvbrange)
    tlv:add(pf.wtp_descriptor_boot_version, tvbrange)
end

function wtpDescriptorOtherSoftwareVersionDecoder(tlv, tvbrange)
    tlv:add(pf.wtp_descriptor_other_software_version, tvbrange)
end

local descriptorValueDecoder = {
    [WTP_DESCRIPTOR_HARDWARE_VERSION] = wtpDescriptorHardwareVersionDecoder,
    [WTP_DESCRIPTOR_ACTIVE_SOFTWARE_VERSION] = wtpDescriptorActiveSoftwareVersionDecoder,
    [WTP_DESCRIPTOR_BOOT_VERSION] = wtpDescriptorBootVersionDecoder,
    [WTP_DESCRIPTOR_OTHER_SOFTWARE_VERSION] = wtpDescriptorOtherSoftwareVersionDecoder,
}

function wtpDescriptorDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    local pktlen = tvb:reported_length_remaining()

    tlv:add(pf.wtp_descriptor_max_radios, tvb:range(0, 1))
    tlv:add(pf.wtp_descriptor_radio_in_use, tvb:range(1, 1))

    local encryption_capabilities = tlv:add(pf.wtp_descriptor_encryption_capabilities, tvb:range(2, 1))
    local sub_encryption_capabilities = encryption_capabilities:add(pf.wtp_descriptor_encryption_capabilities_encryption_capabilities, tvb:range(3, 3))
    sub_encryption_capabilities:set_text("Encryption Capabilities: (WBID "..tvb:range(3,1):bitfield(3,5)..") "..tvb:range(4,2):uint())
    sub_encryption_capabilities:add(pf.wtp_descriptor_encryption_capabilities_reserved, tvb:range(3, 1))
    sub_encryption_capabilities:add(pf.wtp_descriptor_encryption_capabilities_wbid, tvb:range(3, 1))
    sub_encryption_capabilities:add(pf.wtp_descriptor_encryption_capabilities_values, tvb:range(4, 2))

    local pos = 6
    local pktlen_remaining = pktlen - pos

    while pktlen_remaining > 0 do
        local type = tvb:range(pos + 4, 2):uint()
        local length = tvb:range(pos + 6, 2):uint()

        local value = tlv:add(pf.wtp_descriptor_value, tvb:range(pos, length + 8))
        value:set_text("WTP Descriptor: (t="..type..",l="..length..") "..wtp_descriptor_type_vals[type])
        value:add(pf.wtp_descriptor_vendor, tvb:range(pos, 4))
        value:add(pf.wtp_descriptor_type, tvb:range(pos+4, 2))
        value:add(pf.wtp_descriptor_length, tvb:range(pos+6, 2))
        value:add(pf.wtp_descriptor_value, tvb:range(pos+8, length))

        if descriptorValueDecoder[type] then
            descriptorValueDecoder[type](value, tvb:range(pos+8, length))
        end

        pos = pos + (length + 8)
        pktlen_remaining = pktlen_remaining - (length + 8)
    end
end

function wtpFrameTunnelModeDecoder(tlv, tvbrange)
    local mode = tlv:add(pf.wtp_frame_tunnel_mode, tvbrange)
    mode:add(pf.wtp_native_frame_tunnel_mode, tvbrange)
    mode:add(pf.wtp_8023_frame_tunnel_mode, tvbrange)
    mode:add(pf.wtp_frame_tunnel_mode_local_bridging, tvbrange)
    mode:add(pf.wtp_frame_tunnel_mode_reserved, tvbrange)
end

function wtpMacTypeDecoder(tlv, tvbrange)
    tlv:add(pf.wtp_mac_type, tvbrange)
end

function wtpRadioInformationDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.radio_id, tvb:range(0, 1))
    tlv:add(pf.wtp_radio_information_radio_type_reserved, tvb:range(1, 3))
    tlv:add(pf.wtp_radio_information_radio_type_80211n, tvb:range(4, 1))
    tlv:add(pf.wtp_radio_information_radio_type_80211g, tvb:range(4, 1))
    tlv:add(pf.wtp_radio_information_radio_type_80211a, tvb:range(4, 1))
    tlv:add(pf.wtp_radio_information_radio_type_80211b, tvb:range(4, 1))
end

function acDescriptorDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    local pktlen = tvb:reported_length_remaining()

    tlv:add(pf.ac_descriptor_stations, tvb:range(0, 2))
    tlv:add(pf.ac_descriptor_limit_stations, tvb:range(2, 2))
    tlv:add(pf.ac_descriptor_active_wtps, tvb:range(4, 2))
    tlv:add(pf.ac_descriptor_max_wtps, tvb:range(6, 2))
    
    local security_flags = tlv:add(pf.ac_descriptor_security_flags, tvb:range(8, 1))
    security_flags:add(pf.ac_descriptor_security_flags_reserved, tvb:range(8, 1))
    security_flags:add(pf.ac_descriptor_security_flags_ac_supports_pre_shared, tvb:range(8, 1))
    security_flags:add(pf.ac_descriptor_security_flags_ac_supports_x509, tvb:range(8, 1))

    tlv:add(pf.ac_descriptor_rmac_field, tvb:range(9, 1))
    tlv:add(pf.reserved, tvb:range(10, 1))
    tlv:add(pf.ac_descriptor_dtls_policy_flags, tvb:range(11, 1))

    local pos = 12
    local pktlen_remaining = pktlen - pos

    while pktlen_remaining > 0 do
        local type = tvb:range(pos + 4, 2):uint()
        local length = tvb:range(pos + 6, 2):uint()

        local tlv = tlv:add(pf.ac_descriptor_ac_information, tvb:range(pos, length + 8))
        tlv:set_text("AC Information: (t="..type..",l="..length..") "..ac_information_type_vals[type])
        tlv:add(pf.ac_descriptor_ac_information_vendor, tvb:range(pos, 4))
        tlv:add(pf.ac_descriptor_ac_information_type, tvb:range(pos+4, 2))
        tlv:add(pf.ac_descriptor_ac_information_length, tvb:range(pos+6, 2))
        tlv:add(pf.ac_descriptor_ac_information_value, tvb:range(pos+8, length))

        -- todo: add value decoder

        pos = pos + (length + 8)
        pktlen_remaining = pktlen_remaining - (length + 8)
    end
end

function acNameDecoder(tlv, tvbrange)
    tlv:add(pf.ac_name, tvbrange)
end

function acTimestampDecoder(tlv, tvbrange)
    tlv:add(pf.ac_timestamp, tvbrange)
end

function localDataDecoder(tlv, tvbrange)
    tlv:add(pf.location_data, tvbrange)
end

function wtpNameDecoder(tlv, tvbrange)
    tlv:add(pf.wtp_name, tvbrange)
end

function sessionIdDecoder(tlv, tvbrange)
    tlv:add(pf.session_id, tvbrange)
end

function ecnSupportDecoder(tlv, tvbrange)
    tlv:add(pf.ecn_support, tvbrange)
end

function capwapLocalIpv4AddressDecoder(tlv, tvbrange)
    tlv:add(pf.capwap_local_ipv4_address, tvbrange)
end

function resultCodeDecoder(tlv, tvbrange)
    tlv:add(pf.result_code, tvbrange)
end

function statisticsTimerDecoder(tlv, tvbrange)
    tlv:add(pf.statistics_timer, tvbrange)
end

function wtpRebootStatisticsDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.wtp_reboot_statistics_reboot_count, tvb:range(0, 2))
    tlv:add(pf.wtp_reboot_statistics_ac_initiated_count, tvb:range(2, 2))
    tlv:add(pf.wtp_reboot_statistics_linked_failure_count, tvb:range(4, 2))
    tlv:add(pf.wtp_reboot_statistics_sw_failure_count, tvb:range(6, 2))
    tlv:add(pf.wtp_reboot_statistics_hw_failure_count, tvb:range(8, 2))
    tlv:add(pf.wtp_reboot_statistics_other_failure_count, tvb:range(10, 2))
    tlv:add(pf.wtp_reboot_statistics_unknown_failure_count, tvb:range(12, 2))
    tlv:add(pf.wtp_reboot_statistics_last_failure_type, tvb:range(14, 1))
end

function radioAdministrativeStateDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.radio_administrative_id, tvb:range(0, 1))
    tlv:add(pf.radio_administrative_state, tvb:range(1, 1))
end

function ieee80211AntennaDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.radio_id, tvb:range(0, 1))
    tlv:add(pf.ieee_80211_antenna_diversity, tvb:range(1, 1))
    tlv:add(pf.ieee_80211_antenna_combiner, tvb:range(2, 1))
    tlv:add(pf.ieee_80211_antenna_count, tvb:range(3, 1))
    tlv:add(pf.ieee_80211_antenna_selection, tvb:range(4, 1))
    tlv:add(pf.ieee_80211_antenna_selection, tvb:range(5, 1))
end

function ieee0211AddWlanDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.radio_id, tvb:range(0, 1))
    tlv:add(pf.wlan_id, tvb:range(1, 1))
    tlv:add(pf.capability, tvb:range(2, 2))
    tlv:add(pf.key_index, tvb:range(4, 1))
    tlv:add(pf.key_status, tvb:range(5, 1))
    tlv:add(pf.key_length, tvb:range(6, 2))
    tlv:add(pf.key, tvb:range(8, 0))
    tlv:add(pf.group_tsc, tvb:range(8, 6))
    tlv:add(pf.qos, tvb:range(14, 1))
    tlv:add(pf.auth_type, tvb:range(15, 1))
    tlv:add(pf.mac_mode, tvb:range(16, 1))
    tlv:add(pf.tunnel_mode, tvb:range(17, 1))
    tlv:add(pf.suppress_ssid, tvb:range(18, 1))
    tlv:add(pf.ssid, tvb:range(19))
end

function ieee80211TxPowerDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.radio_id, tvb:range(0, 1))
    tlv:add(pf.reserved, tvb:range(1, 1))
    tlv:add(pf.ieee_80211_tx_power_current_tx_power, tvb:range(2, 2))
end

function ieee80211TxPowerLevelDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.radio_id, tvb:range(0, 1))
    tlv:add(pf.ieee_80211_tx_power_level_num_levels, tvb:range(1, 1))
    tlv:add(pf.ieee_80211_tx_power_level_power_level, tvb:range(2, 2))
    tlv:add(pf.ieee_80211_tx_power_level_power_level, tvb:range(4, 2))
    tlv:add(pf.ieee_80211_tx_power_level_power_level, tvb:range(6, 2))
    tlv:add(pf.ieee_80211_tx_power_level_power_level, tvb:range(8, 2))
    tlv:add(pf.ieee_80211_tx_power_level_power_level, tvb:range(10, 2))
    tlv:add(pf.ieee_80211_tx_power_level_power_level, tvb:range(12, 2))
    tlv:add(pf.ieee_80211_tx_power_level_power_level, tvb:range(14, 2))
    tlv:add(pf.ieee_80211_tx_power_level_power_level, tvb:range(16, 2))
end

function ieee80211WtpRadioConfigurationDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.radio_id, tvb:range(0, 1))
    tlv:add(pf.ieee_80211_wtp_radio_configuration_short_preamble, tvb:range(1, 1))
    tlv:add(pf.ieee_80211_wtp_radio_configuration_num_of_bssids, tvb:range(2, 1))
    tlv:add(pf.ieee_80211_wtp_radio_configuration_dtim_period, tvb:range(3, 1))
    tlv:add(pf.ieee_80211_wtp_radio_configuration_bssid, tvb:range(4, 6))
    tlv:add(pf.ieee_80211_wtp_radio_configuration_beacon_period, tvb:range(10, 2))
    tlv:add(pf.ieee_80211_wtp_radio_configuration_country_string, tvb:range(12, 4))
end

function ieee80211MacOperation(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.radio_id, tvb:range(0, 1))
    tlv:add(pf.reserved, tvb:range(1, 1))
    tlv:add(pf.ieee_80211_mac_operation_rts_threshold, tvb:range(2, 2))
    tlv:add(pf.ieee_80211_mac_operation_short_retry, tvb:range(4, 1))
    tlv:add(pf.ieee_80211_mac_operation_long_retry, tvb:range(5, 1))
    tlv:add(pf.ieee_80211_mac_operation_fragmentation_threshold, tvb:range(6, 2))
    tlv:add(pf.ieee_80211_mac_operation_tx_mdsu_lifetime, tvb:range(8, 4))
    tlv:add(pf.ieee_80211_mac_operation_rx_mdsu_lifetime, tvb:range(12, 4))
end

function ieee80211MultiDomainCapabilityDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.radio_id, tvb:range(0, 1))
    tlv:add(pf.reserved, tvb:range(1, 1))
    tlv:add(pf.ieee_80211_multi_domain_capability_first_channel, tvb:range(2, 2))
    tlv:add(pf.ieee_80211_multi_domain_capability_number_of_channels, tvb:range(4, 2))
    tlv:add(pf.ieee_80211_multi_domain_capability_max_tx_power_level, tvb:range(6, 2))
end

function capwapTimersDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.capwap_timers_discovery, tvb:range(0, 1))
    tlv:add(pf.capwap_timers_echo_request, tvb:range(1, 1))
end

function decrptionErrorReportPeriodDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.radio_id, tvb:range(0, 1))
    tlv:add(pf.decryption_error_report_report_interval, tvb:range(1, 2))
end

function deleteStationDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.radio_id, tvb:range(0, 1))
    tlv:add(pf.mac_length, tvb:range(1, 1))
    tlv:add(pf.mac_address, tvb:range(2))
end

function idleTimeoutDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.idle_timeout, tvb:range(0, 4))
end

function wtpFallbackDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.wtp_fallback, tvb:range(0, 1))
end

function AcIpv4ListDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
end

function AcIpv6ListDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
end

function AddMacAclEklDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
end

function AddStationDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
end

function Reserved9(tlv, tvbrange)
    local tvb = tvbrange:tvb()
end

function CapwapControlIpv4AddressDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
end

function CapwapControlIpv6AddressDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
end

function DataTransferDataDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
end

function DataTransferModeDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
end

function ieee80211DirectSequenceControlDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.radio_id, tvb:range(0, 1))
    tlv:add(pf.reserved, tvb:range(1, 1))
    tlv:add(pf.current_channel, tvb:range(2, 1))
    tlv:add(pf.ieee_80211_direct_sequence_control_current_cca, tvb:range(3, 1))
    tlv:add(pf.ieee_80211_direct_sequence_control_energy_detect_threshold, tvb:range(4, 4))
end

function ieee80211OfdmControlDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.radio_id, tvb:range(0, 1))
    tlv:add(pf.reserved, tvb:range(1, 1))
    tlv:add(pf.current_channel, tvb:range(2, 1))
    tlv:add(pf.ieee_80211_ofdm_control_band_support, tvb:range(3, 1))
    tlv:add(pf.ieee_80211_ofdm_control_ti_threshold, tvb:range(4, 4))
end

function ieee80211AssignedWtpBssidDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.radio_id, tvb:range(0, 1))
    tlv:add(pf.wlan_id, tvb:range(1, 1))
    tlv:add(pf.bssid, tvb:range(2, 6))
end

function ieee80211DeleteWlanDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.radio_id, tvb:range(0, 1))
    tlv:add(pf.wlan_id, tvb:range(1, 1))
end

function ieee80211InformationElementDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.radio_id, tvb:range(0, 1))
    tlv:add(pf.wlan_id, tvb:range(1, 1))
    tlv:add(pf.flags, tvb:range(2, 2))

    local tag_number = tvb:range(4, 1):uint()
    local tag_length = tvb:range(5, 1):uint()

    local tag = tlv:add(pf.tag, tvb:range(4))
    tag:set_text("Tag: ".."RSN Information")
    -- todo
end

function radioOperationStateDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.radio_operational_id, tvb:range(0, 1))
    tlv:add(pf.radio_operational_state, tvb:range(1, 1))
    tlv:add(pf.radio_operational_cause, tvb:range(2, 1))
end

function ieee80211UpdateWlanDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.radio_id, tvb:range(0, 1))
    tlv:add(pf.wlan_id, tvb:range(1, 1))
    tlv:add(pf.capability, tvb:range(2, 2))
    tlv:add(pf.key_index, tvb:range(4, 1))
    tlv:add(pf.key_status, tvb:range(5, 1))
    tlv:add(pf.key, tvb:range(6))
end

local messageElementDecoder = {
    [elementTypes.TYPE_AC_DESCRIPTOR] = acDescriptorDecoder,
    [elementTypes.TYPE_AC_IPV4_LIST] = AcIpv4ListDecoder,
    [elementTypes.TYPE_AC_IPV6_LIST] = AcIpv6ListDecoder,
    [elementTypes.TYPE_AC_NAME] = acNameDecoder,
    [elementTypes.TYPE_AC_NAME_W_PRIORITY] = AcNameWPriorityDecoder,
    [elementTypes.TYPE_AC_TIMESTAMP] = acTimestampDecoder,
    [elementTypes.TYPE_ADD_MAC_ACL_ENTRY] = AddMacAclEklDecoder,
    [elementTypes.TYPE_ADD_STATION] = AddStationDecoder,
    [elementTypes.TYPE_RESERVED_9] = Reserved9,
    [elementTypes.TYPE_CAPWAP_CONTROL_IPV4_ADDRESS] = CapwapControlIpv4AddressDecoder,
    [elementTypes.TYPE_CAPWAP_CONTROL_IPV6_ADDRESS] = CapwapControlIpv6AddressDecoder,
    [elementTypes.TYPE_CAPWAP_TIMERS] = capwapTimersDecoder,
    [elementTypes.TYPE_DATA_TRANSFER_DATA] = DataTransferDataDecoder,
    [elementTypes.TYPE_DATA_TRANSFER_MODE] = DataTransferModeDecoder,
    [elementTypes.TYPE_DESCRYPTION_ERROR_REPORT] = DescryptionErrorReportDecoder,
    [elementTypes.TYPE_DECRYPTION_ERROR_REPORT_PERIOD] = decrptionErrorReportPeriodDecoder,
    [elementTypes.TYPE_DELETE_MAC_ENTRY] = nil,
    [elementTypes.TYPE_DELETE_STATION] = deleteStationDecoder,
    [elementTypes.TYPE_RESERVED_19] = nil,
    [elementTypes.TYPE_DISCOVERY_TYPE] = discoveryTypeDecoder,
    [elementTypes.TYPE_DUPLICATE_IPV4_ADDRESS] = nil,
    [elementTypes.TYPE_DUPLICATE_IPV6_ADDRESS] = nil,
    [elementTypes.TYPE_IDLE_TIMEOUT] = idleTimeoutDecoder,
    [elementTypes.TYPE_IMAGE_DATA] = nil,
    [elementTypes.TYPE_IMAGE_IDENTIFIER] = nil,
    [elementTypes.TYPE_IMAGE_INFORMATION] = nil,
    [elementTypes.TYPE_INITIATE_DOWNLOAD] = nil,
    [elementTypes.TYPE_LOCATION_DATA] = localDataDecoder,
    [elementTypes.TYPE_MAXIMUM_MESSAGE_LENGTH] = nil,
    [elementTypes.TYPE_CAPWAP_LOCAL_IPV4_ADDRESS] = capwapLocalIpv4AddressDecoder,
    [elementTypes.TYPE_RADIO_ADMINISTRATIVE_STATE] = radioAdministrativeStateDecoder,
    [elementTypes.TYPE_RADIO_OPERATIONAL_STATE] = radioOperationStateDecoder,
    [elementTypes.TYPE_RESULT_CODE] = resultCodeDecoder,
    [elementTypes.TYPE_RETURNED_MESSAGE_ELEMENT] = nil,
    [elementTypes.TYPE_SESSION_ID] = sessionIdDecoder,
    [elementTypes.TYPE_STATISTICS_TIMER] = statisticsTimerDecoder,
    [elementTypes.TYPE_VENDOR_SPECIFIC_PAYLOAD] = vendorSpecificPayloadDecoder,
    [elementTypes.TYPE_WTP_BOARD_DATA] = wtpBoardDataDecoder,
    [elementTypes.TYPE_WTP_DESCRIPTOR] = wtpDescriptorDecoder,
    [elementTypes.TYPE_WTP_FALLBACK] = wtpFallbackDecoder,
    [elementTypes.TYPE_WTP_FRAME_TUNNEL_MODE] = wtpFrameTunnelModeDecoder,
    [elementTypes.TYPE_RESERVED_42] = nil,
    [elementTypes.TYPE_RESERVED_43] = nil,
    [elementTypes.TYPE_WTP_MAC_TYPE] = wtpMacTypeDecoder,
    [elementTypes.TYPE_WTP_NAME] = wtpNameDecoder,
    [elementTypes.TYPE_RESERVED_46] = nil,
    [elementTypes.TYPE_WTP_RADIO_STATISTICS] = nil,
    [elementTypes.TYPE_WTP_REBOOT_STATISTICS] = wtpRebootStatisticsDecoder,
    [elementTypes.TYPE_WTP_STATIC_IP_ADDRESS_INFORMATION] = nil,
    [elementTypes.TYPE_CAPWAP_LOCAL_IPV6_ADDRESS] = nil,
    [elementTypes.TYPE_CAPWAP_TRANSPORT_PROTOCOL] = nil,
    [elementTypes.TYPE_MTU_DISCOVERY_PADDING] = nil,
    [elementTypes.TYPE_ECN_SUPPORT] = ecnSupportDecoder,

    [elementTypes.IEEE80211_ADD_WLAN] = ieee0211AddWlanDecoder,
    [elementTypes.IEEE80211_ANTENNA] = ieee80211AntennaDecoder,
    [elementTypes.IEEE80211_ASSIGNED_WTP_BSSID] = ieee80211AssignedWtpBssidDecoder,
    [elementTypes.IEEE80211_DELETE_WLAN] = ieee80211DeleteWlanDecoder,
    [elementTypes.IEEE80211_DIRECT_SEQUENCE_CONTROL] = ieee80211DirectSequenceControlDecoder,
    [elementTypes.IEEE80211_INFORMATION_ELEMENT] = ieee80211InformationElementDecoder,
    [elementTypes.IEEE80211_MAC_OPERATION] = ieee80211MacOperation,
    [elementTypes.IEEE80211_MIC_COUNTERMEASURES] = nil,
    [elementTypes.IEEE80211_MULTI_DOMAIN_CAPABILITY] = ieee80211MultiDomainCapabilityDecoder,
    [elementTypes.IEEE80211_OFDM_CONTROL] = ieee80211OfdmControlDecoder,
    [elementTypes.IEEE80211_RATE_SET] = nil,
    [elementTypes.IEEE80211_RSNA_ERROR_REPORT_FROM_STATION] = nil,
    [elementTypes.IEEE80211_STATION] = nil,
    [elementTypes.IEEE80211_STATION_QOS_PROFILE] = nil,
    [elementTypes.IEEE80211_STATION_SESSION_KEY] = nil,
    [elementTypes.IEEE80211_STATISTICS] = nil,
    [elementTypes.IEEE80211_SUPPORTED_RATES] = nil,
    [elementTypes.IEEE80211_TX_POWER] = ieee80211TxPowerDecoder,
    [elementTypes.IEEE80211_TX_POWER_LEVEL] = ieee80211TxPowerLevelDecoder,
    [elementTypes.IEEE80211_UPDATE_STATION_QOS] = nil,
    [elementTypes.IEEE80211_UPDATE_WLAN] = ieee80211UpdateWlanDecoder,
    [elementTypes.IEEE80211_WTP_QUALITY_OF_SERVICE] = nil,
    [elementTypes.IEEE80211_WTP_RADIO_CONFIGURATION] = ieee80211WtpRadioConfigurationDecoder,
    [elementTypes.IEEE80211_WTP_RADIO_FAIL_ALARM_INDICATION] = nil,
    [elementTypes.IEEE80211_WTP_RADIO_INFORMATION] = wtpRadioInformationDecoder,
    [elementTypes.IEEE80211_SUPPORTED_MAC_PROFILES] = nil,
    [elementTypes.IEEE80211_MAC_PROFILE] = nil,
}

function capwap.dissector(tvbuf,pktinfo,root)
    pktinfo.cols.protocol:set("FTNT-CAPWAP-Control")
    
    local pktlen = tvbuf:reported_length_remaining()

    local tree = root:add(capwap, tvbuf:range(0,pktlen))

    local preamble_range = tvbuf:range(0,1)
    local preamble_tree = tree:add("Preamble")
    preamble_tree:add(pf.preamble_version, preamble_range)
    preamble_tree:add(pf.preamble_type, preamble_range)

    local ptype = tvbuf:range(0,1):bitfield(4,4)
    if ptype == 1 then
        preamble_tree:add(pf.preamble_reserved, tvbuf:range(1,3))
        local dtls = Dissector.get("dtls")
        dtls:call(tvbuf:range(4):tvb(), pktinfo, root)
        return
    end

    local header_tree = tree:add("Header")
    local header_flags_range = tvbuf:range(1,3)
    header_tree:add(pf.header_length, header_flags_range)
    header_tree:add(pf.header_radio_id, header_flags_range)
    header_tree:add(pf.header_binding_id, header_flags_range)
    header_tree:add(pf.header_flags, header_flags_range)
    header_tree:add(pf.header_fragment_id, tvbuf:range(4,2))
    header_tree:add(pf.header_fragment_offset, tvbuf:range(6,2))
    header_tree:add(pf.header_reserved, tvbuf:range(6,2))

    local control_header = tree:add("Control Header")
    local message_type = control_header:add(pf.control_header_message_type, tvbuf:range(8,4))
    message_type:add(pf.control_header_message_type_enterprise_number, tvbuf:range(8,3))
    message_type:add(pf.control_header_message_type_enterprise_specific, tvbuf:range(11,1))
    control_header:add(pf.control_header_sequence_number, tvbuf:range(12,1))
    control_header:add(pf.control_header_message_element_length, tvbuf:range(13,2))
    control_header:add(pf.control_header_message_flags, tvbuf:range(15,1))

    local binding_id = header_flags_range:bitfield(10, 5)
    if 1 == binding_id then
        pktinfo.cols.info:set("FTNT-CAPWAP-Control - "..stypes[tvbuf:range(8,4):uint()])
    else
        pktinfo.cols.info:set("FTNT-CAPWAP-Control - "..stypes[tvbuf:range(11,1):uint()])
    end

    local message_element = tree:add("Message Element")

    local pos = CAPWAP_HDR_LEN
    local pktlen_remaining = pktlen - pos

    while pktlen_remaining > 0 do
        -- todo: error length check
        local type = tvbuf:range(pos,2):uint()
        local length = tvbuf:range(pos+2,2):uint()
        local value = tvbuf:range(pos+4,length)

        local tlv = message_element:add(pf.tlv, tvbuf:range(pos, length+4))

        if type ~= elementTypes.TYPE_VENDOR_SPECIFIC_PAYLOAD then
            tlv:set_text("Type: (t="..type..",l="..length..") "..tlvTypes[type])
        else
            local ftntElementId = tvbuf:range(pos+8, 2):uint()
            if fortinet_element_id_vals[ftntElementId] then
                tlv:set_text("Type: (t="..type..",l="..length..") "..tlvTypes[type]..": Fortinet "..fortinet_element_id_vals[ftntElementId])
            else
                tlv:set_text("Type: (t="..type..",l="..length..") "..tlvTypes[type]..": Fortinet Unknown")
                tlv:add_expert_info(PI_MALFORMED, PI_ERROR, "no decoder for ftnt element id "..ftntElementId)
            end
        end

        tlv:add(pf.tlv_type, tvbuf:range(pos,2))
        tlv:add(pf.tlv_length, tvbuf:range(pos+2,2))
        tlv:add(pf.tlv_value, tvbuf:range(pos+4,length))

        if messageElementDecoder[type] then
            messageElementDecoder[type](tlv, tvbuf:range(pos+4,length))
        else
            tlv:add_expert_info(PI_MALFORMED, PI_ERROR, "no decoder for ftnt element type "..type)
        end

        pos = pos + length + 4
        pktlen_remaining = pktlen_remaining - length - 4
    end

end

udp_table = DissectorTable.get("udp.port")
udp_table:add(5246, capwap)
