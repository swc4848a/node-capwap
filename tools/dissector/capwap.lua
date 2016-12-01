local capwap = Proto("FTNT-CAPWAP-Control", "Fortinet Control And Provisioning of Wireless Access Points - Control")

local pf_preamble = ProtoField.new   ("Preamble", "ftnt.capwap.preamble", ftypes.UINT8)

local ptypes = {
        [0] = "CAPWAP Header"
}

local pf_preamble_version = ProtoField.new   ("Version", "ftnt.capwap.preamble.version", ftypes.UINT8, nil, base.DEC, 0xf0)
local pf_preamble_type = ProtoField.new   ("Type", "ftnt.capwap.preamble.type", ftypes.UINT8, ptypes, base.DEC, 0x0f)

capwap.fields = { pf_preamble, pf_preamble_version, pf_preamble_type }

function capwap.dissector(tvbuf,pktinfo,root)
    pktinfo.cols.protocol:set("FTNT-CAPWAP-Control")
    
    local pktlen = tvbuf:reported_length_remaining()

    local tree = root:add(capwap, tvbuf:range(0,pktlen))

    local preamble_range = tvbuf:range(0,1)

    local preamble_tree = tree:add(pf_preamble, preamble_range)

    preamble_tree:add(pf_preamble_version, preamble_range)

    preamble_tree:add(pf_preamble_type, preamble_range)

end

udp_table = DissectorTable.get("udp.port")
udp_table:add(5246, capwap)