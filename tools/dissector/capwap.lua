local capwap = Proto("FTNT-CAPWAP-Control", "Fortinet Control And Provisioning of Wireless Access Points - Control")

local ptypes = {
    [0] = "CAPWAP Header",
    [1] = "CAPWAP DTLS Header"
}

local btypes = {
    [1] = "IEEE 802.11"
}

local ntypes = {
    [0] = "Reserved"
}

local stypes = {
    [13] = "Echo Request",
    [14] = "Echo Response"
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

local CAPWAP_HDR_LEN = 16

local pf_preamble_version = ProtoField.new   ("Version", "ftnt.capwap.preamble.version", ftypes.UINT8, nil, base.DEC, 0xf0)
local pf_preamble_type = ProtoField.new   ("Type", "ftnt.capwap.preamble.type", ftypes.UINT8, ptypes, base.DEC, 0x0f)
local pf_preamble_reserved = ProtoField.new   ("Reserved", "ftnt.capwap.preamble.reserved", ftypes.UINT24)

local pf_header_length = ProtoField.new   ("Header Length", "ftnt.capwap.header.length", ftypes.UINT24, nil, base.DEC, 0xf80000)
local pf_header_radio_id = ProtoField.new   ("Radio ID", "ftnt.capwap.header.radio.id", ftypes.UINT24, nil, base.DEC, 0x07c000)
local pf_header_binding_id = ProtoField.new   ("Wireless Binding ID", "ftnt.capwap.header.binding.id", ftypes.UINT24, btypes, base.DEC, 0x003e00)
local pf_header_flags = ProtoField.new   ("Header Flags", "ftnt.capwap.header.flags", ftypes.UINT24, nil, base.HEX, 0x0001ff)
local pf_header_fragment_id = ProtoField.new   ("Fragment ID", "ftnt.capwap.header.fragment.id", ftypes.UINT16, nil, base.DEC)
local pf_header_fragment_offset = ProtoField.new   ("Fragment Offset", "ftnt.capwap.header.fragment.offset", ftypes.UINT16, nil, base.DEC, 0xfff8)
local pf_header_reserved = ProtoField.new   ("Reserved", "ftnt.capwap.header.reserved", ftypes.UINT16, nil, base.DEC, 0x0007)

local pf_control_header_message_type = ProtoField.new("Message Type", "ftnt.capwap.control.header.message.type", ftypes.UINT32)
local pf_control_header_message_type_enterprise_number = ProtoField.new("Message Type (Enterprise Number)", "ftnt.capwap.control.header.message.type.enterprise.number", ftypes.UINT24, ntypes)
local pf_control_header_message_type_enterprise_specific = ProtoField.new("Message Type (Enterprise Specific)", "ftnt.capwap.control.header.message.type.enterprise.specific", ftypes.UINT8, stypes)
local pf_control_header_sequence_number = ProtoField.new("Sequence Number", "ftnt.capwap.control.header.sequence.number", ftypes.UINT8)
local pf_control_header_message_element_length = ProtoField.new("Message Element Length", "ftnt.capwap.control.header.message.element.length", ftypes.UINT16)
local pf_control_header_message_flags = ProtoField.new("Flags", "ftnt.capwap.control.header.flags", ftypes.UINT8)

local pf_tlv = ProtoField.new("Type", "ftnt.capwap.message.element.tlv", ftypes.NONE)
local pf_tlv_type = ProtoField.new("Type", "ftnt.capwap.message.element.tlv.type", ftypes.UINT16, tlvTypes)
local pf_tlv_length = ProtoField.new("Length", "ftnt.capwap.message.element.tlv.length", ftypes.UINT16)

capwap.fields = {
    pf_preamble_version, pf_preamble_type, pf_preamble_reserved,
    pf_header_length, pf_header_radio_id, pf_header_binding_id, pf_header_flags, pf_header_fragment_id, pf_header_fragment_offset, pf_header_reserved,
    pf_control_header_message_type, pf_control_header_message_type_enterprise_number, pf_control_header_message_type_enterprise_specific, 
    pf_control_header_sequence_number, pf_control_header_message_element_length, pf_control_header_message_flags,
    pf_tlv, pf_tlv_type, pf_tlv_length
}

function capwap.dissector(tvbuf,pktinfo,root)
    pktinfo.cols.protocol:set("FTNT-CAPWAP-Control")
    
    local pktlen = tvbuf:reported_length_remaining()

    local tree = root:add(capwap, tvbuf:range(0,pktlen))

    local preamble_range = tvbuf:range(0,1)
    local preamble_tree = tree:add("Preamble")
    preamble_tree:add(pf_preamble_version, preamble_range)
    preamble_tree:add(pf_preamble_type, preamble_range)

    local ptype = tvbuf:range(0,1):bitfield(4,4)
    if ptype == 1 then
        preamble_tree:add(pf_preamble_reserved, tvbuf:range(1,3))
        local dtls = Dissector.get("dtls")
        dtls:call(tvbuf:range(4):tvb(), pktinfo, root)
        return
    end

    local header_tree = tree:add("Header")
    local header_flags_range = tvbuf:range(1,3)
    header_tree:add(pf_header_length, header_flags_range)
    header_tree:add(pf_header_radio_id, header_flags_range)
    header_tree:add(pf_header_binding_id, header_flags_range)
    header_tree:add(pf_header_flags, header_flags_range)
    header_tree:add(pf_header_fragment_id, tvbuf:range(4,2))
    header_tree:add(pf_header_fragment_offset, tvbuf:range(6,2))
    header_tree:add(pf_header_reserved, tvbuf:range(6,2))

    local control_header = tree:add("Control Header")
    local message_type = control_header:add(pf_control_header_message_type, tvbuf:range(8,4))
    message_type:add(pf_control_header_message_type_enterprise_number, tvbuf:range(8,3))
    message_type:add(pf_control_header_message_type_enterprise_specific, tvbuf:range(11,1))
    control_header:add(pf_control_header_sequence_number, tvbuf:range(12,1))
    control_header:add(pf_control_header_message_element_length, tvbuf:range(13,2))
    control_header:add(pf_control_header_message_flags, tvbuf:range(15,1))

    local message_element = tree:add("Message Element")

    local pos = CAPWAP_HDR_LEN
    local pktlen_remaining = pktlen - pos

    while pktlen_remaining > 0 do
        -- todo: error length check
        local tlv_type = tvbuf:range(pos,2):uint()
        local tlv_length = tvbuf:range(pos+2,2):uint()
        local tlv_value = tvbuf:range(pos+4,tlv_length)

        local tlv = message_element:add(pf_tlv, tvbuf:range(pos, tlv_length+4))
        tlv:set_text("Type: (t="..tlv_type..",l="..tlv_length..") "..tlvTypes[tlv_type])

        tlv:add(pf_tlv_type, tvbuf:range(pos,2))
        tlv:add(pf_tlv_length, tvbuf:range(pos+2,2))

        pos = pos + tlv_length + 4
        pktlen_remaining = pktlen_remaining - tlv_length - 4
    end

end

udp_table = DissectorTable.get("udp.port")
udp_table:add(5246, capwap)