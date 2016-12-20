local capwap = Proto("FTNT-CAPWAP-Control", "Fortinet Control And Provisioning of Wireless Access Points - Control")

local udp_dissector_table = DissectorTable.get("udp.port")
local original_capwap_dissector = udp_dissector_table:get_dissector(5246)

local element = Field.new("capwap.message_element")
local element_id = Field.new("capwap.control.fortinet.element_id")
local unknown = Field.new("capwap.control.fortinet.unknown")

local pf = {}

pf.ip_frag_enable = ProtoField.new("IP Frag Enable", "ftnt.capwap.message.element.fortinet.ip.frag.enable", ftypes.UINT8)
pf.tun_mtu_uplink = ProtoField.new("Tun Mtu Uplink", "ftnt.capwap.message.element.fortinet.tun.mtu.uplink", ftypes.UINT16)
pf.tun_mtu_downlink = ProtoField.new("Tun Mtu Downlink", "ftnt.capwap.message.element.fortinet.tun.mtu.downlink", ftypes.UINT16)

capwap.fields = pf

local VSP_FORTINET_IP_FRAG = 170

local ftntElementDecoder = {
    [VSP_FORTINET_IP_FRAG] = ipFragDecoder,
}

function ipFragDecoder(tlv, tvbrange)
    local tvb = tvbrange:tvb()
    tlv:add(pf.ip_frag_enable, tvb:range(0, 1))
    tlv:add(pf.tun_mtu_uplink, tvb:range(1, 2))
    tlv:add(pf.tun_mtu_downlink, tvb:range(3, 2))
end

function capwap.dissector(tvbuf,pktinfo,root)
    original_capwap_dissector:call(tvbuf,pktinfo,root)

    local pktlen = tvbuf:reported_length_remaining()
    local tree = root:add(capwap, tvbuf:range(0,pktlen))

    local i = 1
    while true do
        local item = select(i, unknown())
        if item then
            debug(i..": "..pktinfo.number.." => "..item.offset.." => "..tvbuf:range(item.offset, 2):uint())
            i = i + 1
        else
            break
        end
    end
end

udp_dissector_table:add(5246, capwap)