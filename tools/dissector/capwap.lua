local capwap = Proto("FTNT-CAPWAP-Control", "Fortinet Control And Provisioning of Wireless Access Points - Control")

local ptypes = {
    [0] = "CAPWAP Header",
    [1] = "CAPWAP DTLS Header"
}

local booltypes = {
    [0] = "False",
    [1] = "True"
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
local TYPE_AC_DESCRIPTOR = 1
local TYPE_AC_IPV4_LIST = 2
local TYPE_AC_IPV6_LIST = 3
local TYPE_AC_NAME = 4
local TYPE_AC_NAME_W_PRIORITY = 5
local TYPE_AC_TIMESTAMP = 6
local TYPE_ADD_MAC_ACL_ENTRY = 7
local TYPE_ADD_STATION = 8
local TYPE_RESERVED_9 = 9
local TYPE_CAPWAP_CONTROL_IPV4_ADDRESS = 10
local TYPE_CAPWAP_CONTROL_IPV6_ADDRESS = 11
local TYPE_CAPWAP_TIMERS = 12
local TYPE_DATA_TRANSFER_DATA = 13
local TYPE_DATA_TRANSFER_MODE = 14
local TYPE_DESCRYPTION_ERROR_REPORT = 15
local TYPE_DECRYPTION_ERROR_REPORT_PERIOD = 16
local TYPE_DELETE_MAC_ENTRY = 17
local TYPE_DELETE_STATION = 18
local TYPE_RESERVED_19 = 19
local TYPE_DISCOVERY_TYPE = 20
local TYPE_DUPLICATE_IPV4_ADDRESS = 21
local TYPE_DUPLICATE_IPV6_ADDRESS = 22
local TYPE_IDLE_TIMEOUT = 23
local TYPE_IMAGE_DATA = 24
local TYPE_IMAGE_IDENTIFIER = 25
local TYPE_IMAGE_INFORMATION = 26
local TYPE_INITIATE_DOWNLOAD = 27
local TYPE_LOCATION_DATA = 28
local TYPE_MAXIMUM_MESSAGE_LENGTH = 29
local TYPE_CAPWAP_LOCAL_IPV4_ADDRESS = 30
local TYPE_RADIO_ADMINISTRATIVE_STATE = 31
local TYPE_RADIO_OPERATIONAL_STATE = 32
local TYPE_RESULT_CODE = 33
local TYPE_RETURNED_MESSAGE_ELEMENT = 34
local TYPE_SESSION_ID = 35
local TYPE_STATISTICS_TIMER = 36
local TYPE_VENDOR_SPECIFIC_PAYLOAD = 37
local TYPE_WTP_BOARD_DATA = 38
local TYPE_WTP_DESCRIPTOR = 39
local TYPE_WTP_FALLBACK = 40
local TYPE_WTP_FRAME_TUNNEL_MODE = 41
local TYPE_RESERVED_42 = 42
local TYPE_RESERVED_43 = 43
local TYPE_WTP_MAC_TYPE = 44
local TYPE_WTP_NAME = 45
local TYPE_RESERVED_46 = 46
local TYPE_WTP_RADIO_STATISTICS = 47
local TYPE_WTP_REBOOT_STATISTICS = 48
local TYPE_WTP_STATIC_IP_ADDRESS_INFORMATION = 49
local TYPE_CAPWAP_LOCAL_IPV6_ADDRESS = 50
local TYPE_CAPWAP_TRANSPORT_PROTOCOL = 51
local TYPE_MTU_DISCOVERY_PADDING = 52
local TYPE_ECN_SUPPORT = 53

local IEEE80211_ADD_WLAN = 1024
local IEEE80211_ANTENNA = 1025
local IEEE80211_ASSIGNED_WTP_BSSID = 1026
local IEEE80211_DELETE_WLAN = 1027
local IEEE80211_DIRECT_SEQUENCE_CONTROL = 1028
local IEEE80211_INFORMATION_ELEMENT = 1029
local IEEE80211_MAC_OPERATION = 1030
local IEEE80211_MIC_COUNTERMEASURES = 1031
local IEEE80211_MULTI_DOMAIN_CAPABILITY = 1032
local IEEE80211_OFDM_CONTROL = 1033
local IEEE80211_RATE_SET = 1034
local IEEE80211_RSNA_ERROR_REPORT_FROM_STATION = 1035
local IEEE80211_STATION = 1036
local IEEE80211_STATION_QOS_PROFILE = 1037
local IEEE80211_STATION_SESSION_KEY = 1038
local IEEE80211_STATISTICS = 1039
local IEEE80211_SUPPORTED_RATES = 1040
local IEEE80211_TX_POWER = 1041
local IEEE80211_TX_POWER_LEVEL = 1042
local IEEE80211_UPDATE_STATION_QOS = 1043
local IEEE80211_UPDATE_WLAN = 1044
local IEEE80211_WTP_QUALITY_OF_SERVICE = 1045
local IEEE80211_WTP_RADIO_CONFIGURATION = 1046
local IEEE80211_WTP_RADIO_FAIL_ALARM_INDICATION = 1047
local IEEE80211_WTP_RADIO_INFORMATION = 1048
local IEEE80211_SUPPORTED_MAC_PROFILES = 1060
local IEEE80211_MAC_PROFILE = 1061
-- /* ************************************************************************* */
-- /*                      Message Element Type Value                           */
-- /* ************************************************************************* */
local tlvTypes = {
    [TYPE_AC_DESCRIPTOR] = "AC Descriptor",
    [TYPE_AC_IPV4_LIST] = "AC IPv4 List",
    [TYPE_AC_IPV6_LIST] = "AC IPv6 List",
    [TYPE_AC_NAME] = "AC Name",
    [TYPE_AC_NAME_W_PRIORITY] = "AC Name With Priority",
    [TYPE_AC_TIMESTAMP] = "AC Timestamp",
    [TYPE_ADD_MAC_ACL_ENTRY] = "Add MAC ACL Entry",
    [TYPE_ADD_STATION] = "Add Station",
    [TYPE_RESERVED_9] = "Reserved",
    [TYPE_CAPWAP_CONTROL_IPV4_ADDRESS] = "CAPWAP Control IPv4 Address",
    [TYPE_CAPWAP_CONTROL_IPV6_ADDRESS] = "CAPWAP Control IPv6 Address",
    [TYPE_CAPWAP_TIMERS] = "CAPWAP Timers",
    [TYPE_DATA_TRANSFER_DATA] = "Data Transfer Data",
    [TYPE_DATA_TRANSFER_MODE] = "Data Transfer Mode",
    [TYPE_DESCRYPTION_ERROR_REPORT] = "Decryption Error Report",
    [TYPE_DECRYPTION_ERROR_REPORT_PERIOD] = "Decryption Error Report Period",
    [TYPE_DELETE_MAC_ENTRY] = "Delete MAC ACL Entry",
    [TYPE_DELETE_STATION] = "Delete Station",
    [TYPE_RESERVED_19] = "Reserved",
    [TYPE_DISCOVERY_TYPE] = "Discovery Type",
    [TYPE_DUPLICATE_IPV4_ADDRESS] = "Duplicate IPv4 Address",
    [TYPE_DUPLICATE_IPV6_ADDRESS] = "Duplicate IPv6 Address",
    [TYPE_IDLE_TIMEOUT] = "Idle Timeout",
    [TYPE_IMAGE_DATA] = "Image Data",
    [TYPE_IMAGE_IDENTIFIER] = "Image Identifier",
    [TYPE_IMAGE_INFORMATION] = "Image Information",
    [TYPE_INITIATE_DOWNLOAD] = "Initiate Download",
    [TYPE_LOCATION_DATA] = "Location Data",
    [TYPE_MAXIMUM_MESSAGE_LENGTH] = "Maximum Message Length",
    [TYPE_CAPWAP_LOCAL_IPV4_ADDRESS] = "CAPWAP Local IPv4 Address",
    [TYPE_RADIO_ADMINISTRATIVE_STATE] = "Radio Administrative State ",
    [TYPE_RADIO_OPERATIONAL_STATE] = "Radio Operational State",
    [TYPE_RESULT_CODE] = "Result Code",
    [TYPE_RETURNED_MESSAGE_ELEMENT] = "Returned Message Element",
    [TYPE_SESSION_ID] = "Session ID",
    [TYPE_STATISTICS_TIMER] = "Statistics Timer",
    [TYPE_VENDOR_SPECIFIC_PAYLOAD] = "Vendor Specific Payload",
    [TYPE_WTP_BOARD_DATA] = "WTP Board Data",
    [TYPE_WTP_DESCRIPTOR] = "WTP Descriptor",
    [TYPE_WTP_FALLBACK] = "WTP Fallback ",
    [TYPE_WTP_FRAME_TUNNEL_MODE] = "WTP Frame Tunnel Mode ",
    [TYPE_RESERVED_42] = "Reserved",
    [TYPE_RESERVED_43] = "Reserved",
    [TYPE_WTP_MAC_TYPE] = "WTP MAC Type",
    [TYPE_WTP_NAME] = "WTP Name",
    [TYPE_RESERVED_46] = "Unused/Reserved",
    [TYPE_WTP_RADIO_STATISTICS] = "WTP Radio Statistics",
    [TYPE_WTP_REBOOT_STATISTICS] = "WTP Reboot Statistics",
    [TYPE_WTP_STATIC_IP_ADDRESS_INFORMATION] = "WTP Static IP Address Information",
    [TYPE_CAPWAP_LOCAL_IPV6_ADDRESS] = "CAPWAP Local IPv6 Address",
    [TYPE_CAPWAP_TRANSPORT_PROTOCOL] = "CAPWAP Transport Protocol",
    [TYPE_MTU_DISCOVERY_PADDING] = "MTU Discovery Padding",
    [TYPE_ECN_SUPPORT] = "ECN Support",

    [IEEE80211_ADD_WLAN] = "IEEE 802.11 Add WLAN",
    [IEEE80211_ANTENNA] = "IEEE 802.11 Antenna",
    [IEEE80211_ASSIGNED_WTP_BSSID] = "IEEE 802.11 Assigned WTP BSSID",
    [IEEE80211_DELETE_WLAN] = "IEEE 802.11 Delete WLAN",
    [IEEE80211_DIRECT_SEQUENCE_CONTROL] = "IEEE 802.11 Direct Sequence Control",
    [IEEE80211_INFORMATION_ELEMENT] = "IEEE 802.11 Information Element",
    [IEEE80211_MAC_OPERATION] = "IEEE 802.11 MAC Operation",
    [IEEE80211_MIC_COUNTERMEASURES] = "IEEE 802.11 MIC Countermeasures",
    [IEEE80211_MULTI_DOMAIN_CAPABILITY] = "IEEE 802.11 Multi-Domain Capability",
    [IEEE80211_OFDM_CONTROL] = "IEEE 802.11 OFDM Control",
    [IEEE80211_RATE_SET] = "IEEE 802.11 Rate Set",
    [IEEE80211_RSNA_ERROR_REPORT_FROM_STATION] = "IEEE 802.11 RSNA Error Report From Station",
    [IEEE80211_STATION] = "IEEE 802.11 Station",
    [IEEE80211_STATION_QOS_PROFILE] = "IEEE 802.11 Station QoS Profile",
    [IEEE80211_STATION_SESSION_KEY] = "IEEE 802.11 Station Session Key",
    [IEEE80211_STATISTICS] = "IEEE 802.11 Statistics",
    [IEEE80211_SUPPORTED_RATES] = "IEEE 802.11 Supported Rates",
    [IEEE80211_TX_POWER] = "IEEE 802.11 Tx Power",
    [IEEE80211_TX_POWER_LEVEL] = "IEEE 802.11 Tx Power Level",
    [IEEE80211_UPDATE_STATION_QOS] = "IEEE 802.11 Update Station QoS",
    [IEEE80211_UPDATE_WLAN] = "IEEE 802.11 Update WLAN",
    [IEEE80211_WTP_QUALITY_OF_SERVICE] = "IEEE 802.11 WTP Quality of Service",
    [IEEE80211_WTP_RADIO_CONFIGURATION] = "IEEE 802.11 WTP Radio Configuration",
    [IEEE80211_WTP_RADIO_FAIL_ALARM_INDICATION] = "IEEE 802.11 WTP Radio Fail Alarm Indication",
    [IEEE80211_WTP_RADIO_INFORMATION] = "IEEE 802.11 WTP Radio Information",
    [IEEE80211_SUPPORTED_MAC_PROFILES] = "IEEE 802.11 Supported MAC Profiles",
    [IEEE80211_MAC_PROFILE] = "IEEE 802.11 MAC Profile",
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

-- /* From FortiAP/WiFI 5.2.0 */
local VSP_FORTINET_AP_SCAN = 16
local VSP_FORTINET_PASSIVE = 24
local VSP_FORTINET_DAEMON_RST = 32
local VSP_FORTINET_MAC = 33
local VSP_FORTINET_WTP_ALLOW = 34
local VSP_FORTINET_WBH_STA = 36
local VSP_FORTINET_HTCAP = 49
local VSP_FORTINET_MGMT_VAP = 50
local VSP_FORTINET_MODE = 51
local VSP_FORTINET_COEXT = 52
local VSP_FORTINET_AMSDU = 53
local VSP_FORTINET_PS_OPT = 54
local VSP_FORTINET_PURE = 55
local VSP_FORTINET_EBP_TAG = 56
local VSP_FORTINET_TELNET_ENABLE = 81
local VSP_FORTINET_ADMIN_PASSWD = 82
local VSP_FORTINET_REGCODE = 83
local VSP_FORTINET_COUNTRYCODE = 84
local VSP_FORTINET_STA_SCAN = 99
local VSP_FORTINET_FHO = 103
local VSP_FORTINET_APHO = 104
local VSP_FORTINET_STA_LOCATE = 106
local VSP_FORTINET_SPECTRUM_ANALYSIS = 108
local VSP_FORTINET_DARRP_CFG = 112
local VSP_FORTINET_AP_SUPPRESS_LIST = 128
local VSP_FORTINET_WDS = 145
local VSP_FORTINET_VAP_VLAN_TAG = 147
local VSP_FORTINET_VAP_BITMAP = 148
local VSP_FORTINET_MCAST_RATE = 149
local VSP_FORTINET_CFG = 150
local VSP_FORTINET_SPLIT_TUN_CFG = 151
local VSP_FORTINET_MGMT_VLAN_TAG = 161
local VSP_FORTINET_VAP_PSK_PASSWD = 167
local VSP_FORTINET_MESH_ETH_BRIDGE_ENABLE = 176
local VSP_FORTINET_MESH_ETH_BRIDGE_TYPE = 177
local VSP_FORTINET_WTP_CAP = 192
local VSP_FORTINET_TXPWR = 193
local VSP_FORTINET_WIDS_ENABLE = 209

local fortinet_element_id_vals = {
    [VSP_FORTINET_AP_SCAN] = "AP Scan",
    [VSP_FORTINET_DAEMON_RST] = "Daemon Reset",
    [VSP_FORTINET_MAC] = "MAC",
    [VSP_FORTINET_PASSIVE] = "Passive",
    [VSP_FORTINET_WTP_ALLOW] = "WTP Allow",
    [VSP_FORTINET_WBH_STA] = "Mesh WBH STA",
    [VSP_FORTINET_HTCAP] = "HT Capabilities",
    [VSP_FORTINET_MGMT_VAP] = "Management VAP",
    [VSP_FORTINET_MODE] = "Mode",
    [VSP_FORTINET_COEXT] = "Coext",
    [VSP_FORTINET_AMSDU] = "AMSDU",
    [VSP_FORTINET_PS_OPT] = "PS OPT",
    [VSP_FORTINET_PURE] = "Pure",
    [VSP_FORTINET_EBP_TAG] = "EBP Tag",
    [VSP_FORTINET_TELNET_ENABLE] = "Telnet Enable",
    [VSP_FORTINET_ADMIN_PASSWD] = "Admin Password",
    [VSP_FORTINET_REGCODE] = "Reg Code",
    [VSP_FORTINET_COUNTRYCODE] = "Country Code",
    [VSP_FORTINET_STA_SCAN] = "STA Scan",
    [VSP_FORTINET_FHO] = "FHO",
    [VSP_FORTINET_APHO] = "APHO",
    [VSP_FORTINET_STA_LOCATE] = "STA Locate",
    [VSP_FORTINET_SPECTRUM_ANALYSIS] = "Spectrum Analysis",
    [VSP_FORTINET_DARRP_CFG] = "DARRP Configuration",
    [VSP_FORTINET_AP_SUPPRESS_LIST] = "AP Suppress List",
    [VSP_FORTINET_WDS] = "WDS",
    [VSP_FORTINET_VAP_VLAN_TAG] = "VAP Vlan",
    [VSP_FORTINET_VAP_BITMAP] = "VAP Bitmap",
    [VSP_FORTINET_MCAST_RATE] = "Multicast Rate",
    [VSP_FORTINET_CFG] = "Configuration",
    [VSP_FORTINET_SPLIT_TUN_CFG] = "Split Tunnel Configuration",
    [VSP_FORTINET_MGMT_VLAN_TAG] = "Management Vlan",
    [VSP_FORTINET_VAP_PSK_PASSWD] = "VAP PSK Password",
    [VSP_FORTINET_MESH_ETH_BRIDGE_ENABLE] = "Mesh Eth Bridge Enable",
    [VSP_FORTINET_MESH_ETH_BRIDGE_TYPE] = "Mesh Eth Bridge Type",
    [VSP_FORTINET_WTP_CAP] = "WTP Capabilities",
    [VSP_FORTINET_TXPWR] = "Tx Power",
    [VSP_FORTINET_WIDS_ENABLE] = "WIDS Enable"
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

local CAPWAP_HDR_LEN = 16

local pf = {}

pf.pf_preamble_version = ProtoField.new   ("Version", "ftnt.capwap.preamble.version", ftypes.UINT8, nil, base.DEC, 0xf0)
pf.pf_preamble_type = ProtoField.new   ("Type", "ftnt.capwap.preamble.type", ftypes.UINT8, ptypes, base.DEC, 0x0f)
pf.pf_preamble_reserved = ProtoField.new   ("Reserved", "ftnt.capwap.preamble.reserved", ftypes.UINT24)

pf.pf_header_length = ProtoField.new   ("Header Length", "ftnt.capwap.header.length", ftypes.UINT24, nil, base.DEC, 0xf80000)
pf.pf_header_radio_id = ProtoField.new   ("Radio ID", "ftnt.capwap.header.radio.id", ftypes.UINT24, nil, base.DEC, 0x07c000)
pf.pf_header_binding_id = ProtoField.new   ("Wireless Binding ID", "ftnt.capwap.header.binding.id", ftypes.UINT24, btypes, base.DEC, 0x003e00)
pf.pf_header_flags = ProtoField.new   ("Header Flags", "ftnt.capwap.header.flags", ftypes.UINT24, nil, base.HEX, 0x0001ff)
pf.pf_header_fragment_id = ProtoField.new   ("Fragment ID", "ftnt.capwap.header.fragment.id", ftypes.UINT16, nil, base.DEC)
pf.pf_header_fragment_offset = ProtoField.new   ("Fragment Offset", "ftnt.capwap.header.fragment.offset", ftypes.UINT16, nil, base.DEC, 0xfff8)
pf.pf_header_reserved = ProtoField.new   ("Reserved", "ftnt.capwap.header.reserved", ftypes.UINT16, nil, base.DEC, 0x0007)

pf.pf_control_header_message_type = ProtoField.new("Message Type", "ftnt.capwap.control.header.message.type", ftypes.UINT32)
pf.pf_control_header_message_type_enterprise_number = ProtoField.new("Message Type (Enterprise Number)", "ftnt.capwap.control.header.message.type.enterprise.number", ftypes.UINT24, ntypes)
pf.pf_control_header_message_type_enterprise_specific = ProtoField.new("Message Type (Enterprise Specific)", "ftnt.capwap.control.header.message.type.enterprise.specific", ftypes.UINT8, stypes)
pf.pf_control_header_sequence_number = ProtoField.new("Sequence Number", "ftnt.capwap.control.header.sequence.number", ftypes.UINT8)
pf.pf_control_header_message_element_length = ProtoField.new("Message Element Length", "ftnt.capwap.control.header.message.element.length", ftypes.UINT16)
pf.pf_control_header_message_flags = ProtoField.new("Flags", "ftnt.capwap.control.header.flags", ftypes.UINT8)

pf.pf_tlv = ProtoField.new("Type", "ftnt.capwap.message.element.tlv", ftypes.NONE)
pf.pf_tlv_type = ProtoField.new("Type", "ftnt.capwap.message.element.tlv.type", ftypes.UINT16, tlvTypes)
pf.pf_tlv_length = ProtoField.new("Length", "ftnt.capwap.message.element.tlv.length", ftypes.UINT16)
pf.pf_tlv_value = ProtoField.new("Value", "ftnt.capwap.message.element.tlv.value", ftypes.BYTES)

-- message elements protocol fields
pf.pf_tlv_discovery_type = ProtoField.new("Discovery Type", "ftnt.capwap.message.element.tlv.discovery.type", ftypes.UINT8, discovery_type_vals)
pf.pf_tlv_vendor_identifier = ProtoField.new("Vendor Identifier", "ftnt.capwap.message.element.tlv.vendor.identifier", ftypes.UINT32, {[12356] = "Fortinet, Inc."})
pf.pf_tlv_vendor_element_id = ProtoField.new("Vendor Element ID", "ftnt.capwap.message.element.tlv.vendor.element.id", ftypes.UINT16)
pf.pf_tlv_vendor_data = ProtoField.new("Vendor Data", "ftnt.capwap.message.element.tlv.vendor.data", ftypes.BYTES)
pf.pf_tlv_fortinet_element_id = ProtoField.new("Fortinet Element ID", "ftnt.capwap.message.element.tlv.fortinet.element.id", ftypes.UINT16, fortinet_element_id_vals)
pf.pf_tlv_fortinet_value = ProtoField.new("Fortinet Value", "ftnt.capwap.message.element.tlv.fortinet.value", ftypes.BYTES)

pf.pf_tlv_vsp_ftnt_vlanid = ProtoField.new("Vlan ID", "ftnt.capwap.message.element.tlv.fortinet.vlan.id", ftypes.UINT16)
pf.pf_tlv_vsp_ftnt_wtpcap = ProtoField.new("WTP CAP", "ftnt.capwap.message.element.tlv.fortinet.wtp.cap", ftypes.BYTES)

pf.pf_tlv_wtp_board_data_vendor = ProtoField.new("WTP Board Data Vendor", "ftnt.capwap.message.element.tlv.wtp.board.data.vendor", ftypes.UINT32, {[12356] = "Fortinet, Inc."})
pf.pf_tlv_vsp_wtp_board_data = ProtoField.new("WTP Board Data", "ftnt.capwap.message.element.tlv.wtp.board.data", ftypes.NONE)
pf.pf_tlv_wtp_board_data_type = ProtoField.new("Board Data Type", "ftnt.capwap.message.element.tlv.wtp.board.data.type", ftypes.UINT16, board_data_type_vals)
pf.pf_tlv_wtp_board_data_length = ProtoField.new("Board Data Length", "ftnt.capwap.message.element.tlv.wtp.board.data.length", ftypes.UINT16)
pf.pf_tlv_wtp_board_data_value = ProtoField.new("Board Data Value", "ftnt.capwap.message.element.tlv.wtp.board.data.value", ftypes.BYTES)
pf.pf_tlv_wtp_board_data_model_number = ProtoField.new("WTP Model Number", "ftnt.capwap.message.element.tlv.wtp.board.data.wtp.model.number", ftypes.STRING)
pf.pf_tlv_wtp_board_data_serial_number = ProtoField.new("WTP Serial Number", "ftnt.capwap.message.element.tlv.wtp.board.data.wtp.serial.number", ftypes.STRING)
pf.pf_tlv_wtp_board_data_board_id = ProtoField.new("WTP Board ID", "ftnt.capwap.message.element.tlv.wtp.board.data.wtp.board.id", ftypes.STRING)
pf.pf_tlv_wtp_board_data_board_revision = ProtoField.new("WTP Board Revision", "ftnt.capwap.message.element.tlv.wtp.board.data.wtp.board.revision", ftypes.STRING)
pf.pf_tlv_wtp_board_data_base_mac_address = ProtoField.new("Base Mac Address", "ftnt.capwap.message.element.tlv.wtp.board.data.base.mac.address", ftypes.STRING)

pf.pf_tlv_wtp_descriptor_max_radios = ProtoField.new("Max Radios", "ftnt.capwap.message.element.tlv.wtp.descriptor.max.radios", ftypes.UINT8)
pf.pf_tlv_wtp_descriptor_radio_in_use = ProtoField.new("Radio in use", "ftnt.capwap.message.element.tlv.wtp.descriptor.radio.in.use", ftypes.UINT8)
pf.pf_tlv_wtp_descriptor_encryption_capabilities = ProtoField.new("Encryption Capabilities (Number)", "ftnt.capwap.message.element.tlv.wtp.descriptor.encryption.capabilities", ftypes.UINT8)
pf.pf_tlv_wtp_descriptor_encryption_capabilities_encryption_capabilities = ProtoField.new("Encryption Capabilities", "ftnt.capwap.message.element.tlv.wtp.descriptor.encryption.capabilities", ftypes.UINT24)
pf.pf_tlv_wtp_descriptor_encryption_capabilities_reserved = ProtoField.new("Reserved (Encrypt)", "ftnt.capwap.message.element.tlv.wtp.descriptor.encryption.capabilities.reserved", ftypes.UINT8, nil, base.DEC, 0xe0)
pf.pf_tlv_wtp_descriptor_encryption_capabilities_wbid = ProtoField.new("Encrypt WBID", "ftnt.capwap.message.element.tlv.wtp.descriptor.encryption.capabilities.wbid", ftypes.UINT8, btypes, base.DEC, 0x1f)
pf.pf_tlv_wtp_descriptor_encryption_capabilities_values = ProtoField.new("Encryption Capabilities", "ftnt.capwap.message.element.tlv.wtp.descriptor.encryption.capabilities.values", ftypes.UINT16)

pf.pf_tlv_wtp_descriptor_vendor = ProtoField.new("WTP Descriptor Vendor", "ftnt.capwap.message.element.tlv.wtp.descriptor.vendor", ftypes.UINT32)
pf.pf_tlv_wtp_descriptor_type = ProtoField.new("Descriptor Type", "ftnt.capwap.message.element.tlv.wtp.descriptor.type", ftypes.UINT16, wtp_descriptor_type_vals)
pf.pf_tlv_wtp_descriptor_length = ProtoField.new("Descriptor Length", "ftnt.capwap.message.element.tlv.wtp.descriptor.length", ftypes.UINT16)
pf.pf_tlv_wtp_descriptor_value = ProtoField.new("Descriptor Value", "ftnt.capwap.message.element.tlv.wtp.descriptor.value", ftypes.BYTES)
pf.pf_tlv_wtp_descriptor_hardware_version = ProtoField.new("WTP Hardware Version", "ftnt.capwap.message.element.tlv.wtp.descriptor.hardware.version", ftypes.UINT8)
pf.pf_tlv_wtp_descriptor_software_version = ProtoField.new("WTP Active Software Version", "ftnt.capwap.message.element.tlv.wtp.descriptor.active.software.version", ftypes.STRING)
pf.pf_tlv_wtp_descriptor_boot_version = ProtoField.new("WTP Boot Version", "ftnt.capwap.message.element.tlv.wtp.descriptor.boot.version", ftypes.STRING)
pf.pf_tlv_wtp_descriptor_other_software_version = ProtoField.new("WTP Other Software Version", "ftnt.capwap.message.element.tlv.wtp.descriptor.other.software.version", ftypes.STRING)

pf.pf_tlv_wtp_frame_tunnel_mode = ProtoField.new("WTP Frame Tunnel Mode", "ftnt.capwap.message.element.tlv.wtp.frame.tunnel.mode", ftypes.UINT8)
pf.pf_tlv_wtp_native_frame_tunnel_mode = ProtoField.new("Native Frame Tunnel Mode", "ftnt.capwap.message.element.tlv.wtp.native.frame.tunnel.mode", ftypes.UINT8, booltypes, base.DEC, 0x08)
pf.pf_tlv_wtp_8023_frame_tunnel_mode = ProtoField.new("802.3 Frame Tunnel Mode", "ftnt.capwap.message.element.tlv.wtp.8023.frame.tunnel.mode", ftypes.UINT8, booltypes, base.DEC, 0x04)
pf.pf_tlv_wtp_frame_tunnel_mode_local_bridging = ProtoField.new("Local Bridging", "ftnt.capwap.message.element.tlv.wtp.frame.tunnel.mode.local.bridging", ftypes.UINT8, booltypes, base.DEC, 0x02)

pf.pf_tlv_wtp_frame_tunnel_mode_reserved = ProtoField.new("Reserved", "ftnt.capwap.message.element.tlv.wtp.native.frame.tunnel.mode.reserved", ftypes.UINT8, nil, base.DEC, 0xf1)
pf.pf_tlv_wtp_mac_type = ProtoField.new("WTP MAC Type", "ftnt.capwap.message.element.tlv.wtp.mac.type", ftypes.UINT8, wtp_mac_vals)

pf.pf_tlv_wtp_radio_information_radio_id = ProtoField.new("Radio ID", "ftnt.capwap.message.element.tlv.wtp.radio.information.radio.id", ftypes.UINT8)
pf.pf_tlv_wtp_radio_information_radio_type_reserved = ProtoField.new("Radio Type Reserved", "ftnt.capwap.message.element.tlv.wtp.radio.information.radio.type.reserved", ftypes.BYTES)
pf.pf_tlv_wtp_radio_information_radio_type_80211n = ProtoField.new("Radio Type 802.11n", "ftnt.capwap.message.element.tlv.wtp.radio.information.radio.type.80211n", ftypes.UINT8, booltypes, base.DEC, 0x08)
pf.pf_tlv_wtp_radio_information_radio_type_80211g = ProtoField.new("Radio Type 802.11g", "ftnt.capwap.message.element.tlv.wtp.radio.information.radio.type.80211g", ftypes.UINT8, booltypes, base.DEC, 0x04)
pf.pf_tlv_wtp_radio_information_radio_type_80211a = ProtoField.new("Radio Type 802.11a", "ftnt.capwap.message.element.tlv.wtp.radio.information.radio.type.80211a", ftypes.UINT8, booltypes, base.DEC, 0x02)
pf.pf_tlv_wtp_radio_information_radio_type_80211b = ProtoField.new("Radio Type 802.11b", "ftnt.capwap.message.element.tlv.wtp.radio.information.radio.type.80211b", ftypes.UINT8, booltypes, base.DEC, 0x01)


capwap.fields = {
    pf.pf_preamble_version,
    pf.pf_preamble_type,
    pf.pf_preamble_reserved,
    pf.pf_header_length,
    pf.pf_header_radio_id,
    pf.pf_header_binding_id,
    pf.pf_header_flags,
    pf.pf_header_fragment_id,
    pf.pf_header_fragment_offset,
    pf.pf_header_reserved,
    pf.pf_control_header_message_type,
    pf.pf_control_header_message_type_enterprise_number,
    pf.pf_control_header_message_type_enterprise_specific,
    pf.pf_control_header_sequence_number,
    pf.pf_control_header_message_element_length,
    pf.pf_control_header_message_flags,
    pf.pf_tlv,
    pf.pf_tlv_type,
    pf.pf_tlv_length,
    pf.pf_tlv_value,
    pf.pf_tlv_discovery_type,
    pf.pf_tlv_vendor_identifier,
    pf.pf_tlv_vendor_element_id,
    pf.pf_tlv_vendor_data,
    pf.pf_tlv_fortinet_element_id,
    pf.pf_tlv_fortinet_value,
    pf.pf_tlv_vsp_ftnt_vlanid,
    pf.pf_tlv_vsp_ftnt_wtpcap,
    pf.pf_tlv_wtp_board_data_vendor,
    pf.pf_tlv_vsp_wtp_board_data,
    pf.pf_tlv_wtp_board_data_type,
    pf.pf_tlv_wtp_board_data_length,
    pf.pf_tlv_wtp_board_data_value,
    pf.pf_tlv_wtp_board_data_model_number,
    pf.pf_tlv_wtp_board_data_serial_number,
    pf.pf_tlv_wtp_board_data_board_id,
    pf.pf_tlv_wtp_board_data_board_revision,
    pf.pf_tlv_wtp_board_data_base_mac_address,
    pf.pf_tlv_wtp_descriptor_max_radios,
    pf.pf_tlv_wtp_descriptor_radio_in_use,
    pf.pf_tlv_wtp_descriptor_encryption_capabilities,
    pf.pf_tlv_wtp_descriptor_encryption_capabilities_encryption_capabilities,
    pf.pf_tlv_wtp_descriptor_encryption_capabilities_reserved,
    pf.pf_tlv_wtp_descriptor_encryption_capabilities_wbid,
    pf.pf_tlv_wtp_descriptor_encryption_capabilities_values,
    pf.pf_tlv_wtp_descriptor_vendor,
    pf.pf_tlv_wtp_descriptor_type,
    pf.pf_tlv_wtp_descriptor_length,
    pf.pf_tlv_wtp_descriptor_value,
    pf.pf_tlv_wtp_descriptor_hardware_version,
    pf.pf_tlv_wtp_descriptor_software_version,
    pf.pf_tlv_wtp_descriptor_boot_version,
    pf.pf_tlv_wtp_descriptor_other_software_version,
    pf.pf_tlv_wtp_frame_tunnel_mode,
    pf.pf_tlv_wtp_native_frame_tunnel_mode,
    pf.pf_tlv_wtp_8023_frame_tunnel_mode,
    pf.pf_tlv_wtp_frame_tunnel_mode_local_bridging,
    pf.pf_tlv_wtp_frame_tunnel_mode_reserved,
    pf.pf_tlv_wtp_mac_type,
    pf.pf_tlv_wtp_radio_information_radio_id,
    pf.pf_tlv_wtp_radio_information_radio_type_reserved,
    pf.pf_tlv_wtp_radio_information_radio_type_80211n,
    pf.pf_tlv_wtp_radio_information_radio_type_80211g,
    pf.pf_tlv_wtp_radio_information_radio_type_80211a,
    pf.pf_tlv_wtp_radio_information_radio_type_80211b,
}

function mgmtVlanTagDecoder(tlv, tvbrange)
    tlv:add(pf.pf_tlv_vsp_ftnt_vlanid, tvbrange)
end

function wtpCapDecoder(tlv, tvbrange)
    tlv:add(pf.pf_tlv_vsp_ftnt_wtpcap, tvbrange)
end

local ftntElementDecoder = {
    [VSP_FORTINET_MGMT_VLAN_TAG] = mgmtVlanTagDecoder,
    [VSP_FORTINET_WTP_CAP] = wtpCapDecoder,
}

function boardDataWtpModelNumberDecoder(tlv, tvbrange)
    tlv:add(pf.pf_tlv_wtp_board_data_model_number, tvbrange)
end

function boardDataWtpSerialNumberDecoder(tlv, tvbrange)
    tlv:add(pf.pf_tlv_wtp_board_data_serial_number, tvbrange)
end

function boardDataBoardIdDecoder(tlv, tvbrange)
    tlv:add(pf.pf_tlv_wtp_board_data_board_id, tvbrange)
end

function boardDataBoardRevisionDecoder(tlv, tvbrange)
    tlv:add(pf.pf_tlv_wtp_board_data_board_revision, tvbrange)
end

function boardDataBaseMacAddressDecoder(tlv, tvbrange)
    local base_mac_address = tlv:add(pf.pf_tlv_wtp_board_data_base_mac_address, tvbrange)
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
    tlv:add(pf.pf_tlv_discovery_type, tvbrange)
end

function vendorSpecificPayloadDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.pf_tlv_vendor_identifier, tvb:range(0, 4))
    tlv:add(pf.pf_tlv_vendor_element_id, tvb:range(4, 2))
    tlv:add(pf.pf_tlv_vendor_data, tvb:range(6))
    tlv:add(pf.pf_tlv_fortinet_element_id, tvb:range(4, 2))
    tlv:add(pf.pf_tlv_fortinet_value, tvb:range(6))

    local id = tvb:range(4, 2):uint()
    if ftntElementDecoder[id] then
        ftntElementDecoder[id](tlv, tvb:range(6))
    end
end

function wtpBoardDataDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    local pktlen = tvb:reported_length_remaining()

    tlv:add(pf.pf_tlv_wtp_board_data_vendor, tvb:range(0, 4))
    
    local pos = 4
    local pktlen_remaining = pktlen - pos

    while pktlen_remaining > 0 do
        local type = tvb:range(pos, 2):uint()
        local length = tvb:range(pos + 2, 2):uint()

        local data = tlv:add(pf.pf_tlv_vsp_wtp_board_data, tvb:range(pos, length + 4))
        data:set_text("WTP Board Data: (t="..type..",l="..length..") "..board_data_type_vals[type])
        data:add(pf.pf_tlv_wtp_board_data_type, tvb:range(pos, 2))
        data:add(pf.pf_tlv_wtp_board_data_length, tvb:range(pos+2, 2))
        data:add(pf.pf_tlv_wtp_board_data_value, tvb:range(pos+4, length))
        
        if boardDataValueDecoder[type] then
            boardDataValueDecoder[type](data, tvb:range(pos+4, length))
        end

        pos = pos + (length + 4)
        pktlen_remaining = pktlen_remaining - (length + 4)
    end
end

function wtpDescriptorHardwareVersionDecoder(tlv, tvbrange)
    tlv:add(pf.pf_tlv_wtp_descriptor_hardware_version, tvbrange)
end

function wtpDescriptorActiveSoftwareVersionDecoder(tlv, tvbrange)
    tlv:add(pf.pf_tlv_wtp_descriptor_software_version, tvbrange)
end

function wtpDescriptorBootVersionDecoder(tlv, tvbrange)
    tlv:add(pf.pf_tlv_wtp_descriptor_boot_version, tvbrange)
end

function wtpDescriptorOtherSoftwareVersionDecoder(tlv, tvbrange)
    tlv:add(pf.pf_tlv_wtp_descriptor_other_software_version, tvbrange)
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

    tlv:add(pf.pf_tlv_wtp_descriptor_max_radios, tvb:range(0, 1))
    tlv:add(pf.pf_tlv_wtp_descriptor_radio_in_use, tvb:range(1, 1))

    local encryption_capabilities = tlv:add(pf.pf_tlv_wtp_descriptor_encryption_capabilities, tvb:range(2, 1))
    local sub_encryption_capabilities = encryption_capabilities:add(pf.pf_tlv_wtp_descriptor_encryption_capabilities_encryption_capabilities, tvb:range(3, 3))
    sub_encryption_capabilities:set_text("Encryption Capabilities: (WBID "..tvb:range(3,1):bitfield(3,5)..") "..tvb:range(4,2):uint())
    sub_encryption_capabilities:add(pf.pf_tlv_wtp_descriptor_encryption_capabilities_reserved, tvb:range(3, 1))
    sub_encryption_capabilities:add(pf.pf_tlv_wtp_descriptor_encryption_capabilities_wbid, tvb:range(3, 1))
    sub_encryption_capabilities:add(pf.pf_tlv_wtp_descriptor_encryption_capabilities_values, tvb:range(4, 2))

    local pos = 6
    local pktlen_remaining = pktlen - pos

    while pktlen_remaining > 0 do
        local type = tvb:range(pos + 4, 2):uint()
        local length = tvb:range(pos + 6, 2):uint()

        local value = tlv:add(pf.pf_tlv_wtp_descriptor_value, tvb:range(pos, length + 8))
        value:set_text("WTP Descriptor: (t="..type..",l="..length..") "..wtp_descriptor_type_vals[type])
        value:add(pf.pf_tlv_wtp_descriptor_vendor, tvb:range(pos, 4))
        value:add(pf.pf_tlv_wtp_descriptor_type, tvb:range(pos+4, 2))
        value:add(pf.pf_tlv_wtp_descriptor_length, tvb:range(pos+6, 2))
        value:add(pf.pf_tlv_wtp_descriptor_value, tvb:range(pos+8, length))

        if descriptorValueDecoder[type] then
            descriptorValueDecoder[type](value, tvb:range(pos+8, length))
        end

        pos = pos + (length + 8)
        pktlen_remaining = pktlen_remaining - (length + 8)
    end
end

function wtpFrameTunnelModeDecoder(tlv, tvbrange)
    local mode = tlv:add(pf.pf_tlv_wtp_frame_tunnel_mode, tvbrange)
    mode:add(pf.pf_tlv_wtp_native_frame_tunnel_mode, tvbrange)
    mode:add(pf.pf_tlv_wtp_8023_frame_tunnel_mode, tvbrange)
    mode:add(pf.pf_tlv_wtp_frame_tunnel_mode_local_bridging, tvbrange)
    mode:add(pf.pf_tlv_wtp_frame_tunnel_mode_reserved, tvbrange)
end

function wtpMacTypeDecoder(tlv, tvbrange)
    tlv:add(pf.pf_tlv_wtp_mac_type, tvbrange)
end

function wtpRadioInformationDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.pf_tlv_wtp_radio_information_radio_id, tvb:range(0, 1))
    tlv:add(pf.pf_tlv_wtp_radio_information_radio_type_reserved, tvb:range(1, 3))
    tlv:add(pf.pf_tlv_wtp_radio_information_radio_type_80211n, tvb:range(4, 1))
    tlv:add(pf.pf_tlv_wtp_radio_information_radio_type_80211g, tvb:range(4, 1))
    tlv:add(pf.pf_tlv_wtp_radio_information_radio_type_80211a, tvb:range(4, 1))
    tlv:add(pf.pf_tlv_wtp_radio_information_radio_type_80211b, tvb:range(4, 1))
end

local messageElementDecoder = {
    [TYPE_AC_DESCRIPTOR] = nil,
    [TYPE_AC_IPV4_LIST] = nil,
    [TYPE_AC_IPV6_LIST] = nil,
    [TYPE_AC_NAME] = nil,
    [TYPE_AC_NAME_W_PRIORITY] = nil,
    [TYPE_AC_TIMESTAMP] = nil,
    [TYPE_ADD_MAC_ACL_ENTRY] = nil,
    [TYPE_ADD_STATION] = nil,
    [TYPE_RESERVED_9] = nil,
    [TYPE_CAPWAP_CONTROL_IPV4_ADDRESS] = nil,
    [TYPE_CAPWAP_CONTROL_IPV6_ADDRESS] = nil,
    [TYPE_CAPWAP_TIMERS] = nil,
    [TYPE_DATA_TRANSFER_DATA] = nil,
    [TYPE_DATA_TRANSFER_MODE] = nil,
    [TYPE_DESCRYPTION_ERROR_REPORT] = nil,
    [TYPE_DECRYPTION_ERROR_REPORT_PERIOD] = nil,
    [TYPE_DELETE_MAC_ENTRY] = nil,
    [TYPE_DELETE_STATION] = nil,
    [TYPE_RESERVED_19] = nil,
    [TYPE_DISCOVERY_TYPE] = discoveryTypeDecoder,
    [TYPE_DUPLICATE_IPV4_ADDRESS] = nil,
    [TYPE_DUPLICATE_IPV6_ADDRESS] = nil,
    [TYPE_IDLE_TIMEOUT] = nil,
    [TYPE_IMAGE_DATA] = nil,
    [TYPE_IMAGE_IDENTIFIER] = nil,
    [TYPE_IMAGE_INFORMATION] = nil,
    [TYPE_INITIATE_DOWNLOAD] = nil,
    [TYPE_LOCATION_DATA] = nil,
    [TYPE_MAXIMUM_MESSAGE_LENGTH] = nil,
    [TYPE_CAPWAP_LOCAL_IPV4_ADDRESS] = nil,
    [TYPE_RADIO_ADMINISTRATIVE_STATE] = nil,
    [TYPE_RADIO_OPERATIONAL_STATE] = nil,
    [TYPE_RESULT_CODE] = nil,
    [TYPE_RETURNED_MESSAGE_ELEMENT] = nil,
    [TYPE_SESSION_ID] = nil,
    [TYPE_STATISTICS_TIMER] = nil,
    [TYPE_VENDOR_SPECIFIC_PAYLOAD] = vendorSpecificPayloadDecoder,
    [TYPE_WTP_BOARD_DATA] = wtpBoardDataDecoder,
    [TYPE_WTP_DESCRIPTOR] = wtpDescriptorDecoder,
    [TYPE_WTP_FALLBACK] = nil,
    [TYPE_WTP_FRAME_TUNNEL_MODE] = wtpFrameTunnelModeDecoder,
    [TYPE_RESERVED_42] = nil,
    [TYPE_RESERVED_43] = nil,
    [TYPE_WTP_MAC_TYPE] = wtpMacTypeDecoder,
    [TYPE_WTP_NAME] = nil,
    [TYPE_RESERVED_46] = nil,
    [TYPE_WTP_RADIO_STATISTICS] = nil,
    [TYPE_WTP_REBOOT_STATISTICS] = nil,
    [TYPE_WTP_STATIC_IP_ADDRESS_INFORMATION] = nil,
    [TYPE_CAPWAP_LOCAL_IPV6_ADDRESS] = nil,
    [TYPE_CAPWAP_TRANSPORT_PROTOCOL] = nil,
    [TYPE_MTU_DISCOVERY_PADDING] = nil,
    [TYPE_ECN_SUPPORT] = nil,

    [IEEE80211_ADD_WLAN] = nil,
    [IEEE80211_ANTENNA] = nil,
    [IEEE80211_ASSIGNED_WTP_BSSID] = nil,
    [IEEE80211_DELETE_WLAN] = nil,
    [IEEE80211_DIRECT_SEQUENCE_CONTROL] = nil,
    [IEEE80211_INFORMATION_ELEMENT] = nil,
    [IEEE80211_MAC_OPERATION] = nil,
    [IEEE80211_MIC_COUNTERMEASURES] = nil,
    [IEEE80211_MULTI_DOMAIN_CAPABILITY] = nil,
    [IEEE80211_OFDM_CONTROL] = nil,
    [IEEE80211_RATE_SET] = nil,
    [IEEE80211_RSNA_ERROR_REPORT_FROM_STATION] = nil,
    [IEEE80211_STATION] = nil,
    [IEEE80211_STATION_QOS_PROFILE] = nil,
    [IEEE80211_STATION_SESSION_KEY] = nil,
    [IEEE80211_STATISTICS] = nil,
    [IEEE80211_SUPPORTED_RATES] = nil,
    [IEEE80211_TX_POWER] = nil,
    [IEEE80211_TX_POWER_LEVEL] = nil,
    [IEEE80211_UPDATE_STATION_QOS] = nil,
    [IEEE80211_UPDATE_WLAN] = nil,
    [IEEE80211_WTP_QUALITY_OF_SERVICE] = nil,
    [IEEE80211_WTP_RADIO_CONFIGURATION] = nil,
    [IEEE80211_WTP_RADIO_FAIL_ALARM_INDICATION] = nil,
    [IEEE80211_WTP_RADIO_INFORMATION] = wtpRadioInformationDecoder,
    [IEEE80211_SUPPORTED_MAC_PROFILES] = nil,
    [IEEE80211_MAC_PROFILE] = nil,
}

function capwap.dissector(tvbuf,pktinfo,root)
    pktinfo.cols.protocol:set("FTNT-CAPWAP-Control")
    
    local pktlen = tvbuf:reported_length_remaining()

    local tree = root:add(capwap, tvbuf:range(0,pktlen))

    local preamble_range = tvbuf:range(0,1)
    local preamble_tree = tree:add("Preamble")
    preamble_tree:add(pf.pf_preamble_version, preamble_range)
    preamble_tree:add(pf.pf_preamble_type, preamble_range)

    local ptype = tvbuf:range(0,1):bitfield(4,4)
    if ptype == 1 then
        preamble_tree:add(pf.pf_preamble_reserved, tvbuf:range(1,3))
        local dtls = Dissector.get("dtls")
        dtls:call(tvbuf:range(4):tvb(), pktinfo, root)
        return
    end

    local header_tree = tree:add("Header")
    local header_flags_range = tvbuf:range(1,3)
    header_tree:add(pf.pf_header_length, header_flags_range)
    header_tree:add(pf.pf_header_radio_id, header_flags_range)
    header_tree:add(pf.pf_header_binding_id, header_flags_range)
    header_tree:add(pf.pf_header_flags, header_flags_range)
    header_tree:add(pf.pf_header_fragment_id, tvbuf:range(4,2))
    header_tree:add(pf.pf_header_fragment_offset, tvbuf:range(6,2))
    header_tree:add(pf.pf_header_reserved, tvbuf:range(6,2))

    local control_header = tree:add("Control Header")
    local message_type = control_header:add(pf.pf_control_header_message_type, tvbuf:range(8,4))
    message_type:add(pf.pf_control_header_message_type_enterprise_number, tvbuf:range(8,3))
    message_type:add(pf.pf_control_header_message_type_enterprise_specific, tvbuf:range(11,1))
    control_header:add(pf.pf_control_header_sequence_number, tvbuf:range(12,1))
    control_header:add(pf.pf_control_header_message_element_length, tvbuf:range(13,2))
    control_header:add(pf.pf_control_header_message_flags, tvbuf:range(15,1))

    pktinfo.cols.info:set("FTNT-CAPWAP-Control - "..stypes[tvbuf:range(11,1):uint()])

    local message_element = tree:add("Message Element")

    local pos = CAPWAP_HDR_LEN
    local pktlen_remaining = pktlen - pos

    while pktlen_remaining > 0 do
        -- todo: error length check
        local tlv_type = tvbuf:range(pos,2):uint()
        local tlv_length = tvbuf:range(pos+2,2):uint()
        local tlv_value = tvbuf:range(pos+4,tlv_length)

        local tlv = message_element:add(pf.pf_tlv, tvbuf:range(pos, tlv_length+4))
        tlv:set_text("Type: (t="..tlv_type..",l="..tlv_length..") "..tlvTypes[tlv_type])

        tlv:add(pf.pf_tlv_type, tvbuf:range(pos,2))
        tlv:add(pf.pf_tlv_length, tvbuf:range(pos+2,2))
        tlv:add(pf.pf_tlv_value, tvbuf:range(pos+4,tlv_length))

        if messageElementDecoder[tlv_type] then
            messageElementDecoder[tlv_type](tlv, tvbuf:range(pos+4,tlv_length))
        end

        pos = pos + tlv_length + 4
        pktlen_remaining = pktlen_remaining - tlv_length - 4
    end

end

udp_table = DissectorTable.get("udp.port")
udp_table:add(5246, capwap)
