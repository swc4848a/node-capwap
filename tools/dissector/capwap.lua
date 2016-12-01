local capwap = Proto("FTNT-CAPWAP-Control", "Fortinet Control And Provisioning of Wireless Access Points - Control")

local ptypes = {
        [0] = "CAPWAP Header"
}

local pf_preamble = ProtoField.new   ("Preamble", "ftnt.capwap.preamble", ftypes.UINT8)
local pf_preamble_version = ProtoField.new   ("Version", "ftnt.capwap.preamble.version", ftypes.UINT8, nil, base.DEC, 0xf0)
local pf_preamble_type = ProtoField.new   ("Type", "ftnt.capwap.preamble.type", ftypes.UINT8, ptypes, base.DEC, 0x0f)

local pf_header = ProtoField.new   ("Header", "ftnt.capwap.header", ftypes.UINT64)
local pf_header_length = ProtoField.new   ("Header Length", "ftnt.capwap.header.length", ftypes.UINT24, nil, base.DEC, 0xf80000)
local pf_radio_id = ProtoField.new   ("Radio ID", "ftnt.capwap.header.radio.id", ftypes.UINT24, nil, base.DEC, 0x07C000)

capwap.fields = { 
    pf_preamble, pf_preamble_version, pf_preamble_type,
    pf_header, pf_header_length, pf_radio_id
}

function capwap.dissector(tvbuf,pktinfo,root)
    pktinfo.cols.protocol:set("FTNT-CAPWAP-Control")
    
    local pktlen = tvbuf:reported_length_remaining()

    local tree = root:add(capwap, tvbuf:range(0,pktlen))

    local preamble_range = tvbuf:range(0,1)
    local preamble_tree = tree:add(pf_preamble, preamble_range)
    preamble_tree:add(pf_preamble_version, preamble_range)
    preamble_tree:add(pf_preamble_type, preamble_range)

    local header_range = tvbuf:range(1,7)
    local header_tree = tree:add(pf_header, header_range)
    header_tree:add(pf_header_length, header_range)
    header_tree:add(pf_radio_id, header_range)

end

udp_table = DissectorTable.get("udp.port")
udp_table:add(5246, capwap)