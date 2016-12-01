local capwap = Proto("FTNT-CAPWAP-Control", "Fortinet Control And Provisioning of Wireless Access Points - Control")

local ptypes = {
        [0] = "CAPWAP Header"
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

local pf_preamble_version = ProtoField.new   ("Version", "ftnt.capwap.preamble.version", ftypes.UINT8, nil, base.DEC, 0xf0)
local pf_preamble_type = ProtoField.new   ("Type", "ftnt.capwap.preamble.type", ftypes.UINT8, ptypes, base.DEC, 0x0f)

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

capwap.fields = {
    pf_preamble_version, pf_preamble_type,
    pf_header_length, pf_header_radio_id, pf_header_binding_id, pf_header_flags, pf_header_fragment_id, pf_header_fragment_offset, pf_header_reserved,
    pf_control_header_message_type, pf_control_header_message_type_enterprise_number, pf_control_header_message_type_enterprise_specific, 
    pf_control_header_sequence_number, pf_control_header_message_element_length, pf_control_header_message_flags,
    pf_tlv
}

function capwap.dissector(tvbuf,pktinfo,root)
    pktinfo.cols.protocol:set("FTNT-CAPWAP-Control")
    
    local pktlen = tvbuf:reported_length_remaining()

    local tree = root:add(capwap, tvbuf:range(0,pktlen))

    local preamble_range = tvbuf:range(0,1)
    local preamble_tree = tree:add("Preamble")
    preamble_tree:add(pf_preamble_version, preamble_range)
    preamble_tree:add(pf_preamble_type, preamble_range)

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
    local tlv = message_element:add(pf_tlv, tvbuf:range(16))

end

udp_table = DissectorTable.get("udp.port")
udp_table:add(5246, capwap)