let Testcase = require('../src/testcase.js');

let cloudMap = {
    'Interfaces': "div.gwt-HTML:contains('Interfaces')",
    'Create New': "button:contains('Create New')",
    'Interface Name': "input.gwt-TextBox:eq(0)",
    'Alias': "input.gwt-TextBox:eq(1)",
    'Type': "select.gwt-ListBox:eq(0)",
    'VLAN ID': "select.gwt-ListBox:eq(2)",
    'Role': "select.gwt-ListBox:eq(3)",
    'Address Mode Manual': "input[value='STATIC']",
    'Address Mode DHCP': "input[value='DHCP']~label",
    'Distance': "td>input:eq(2)",
    'IP/Netmask': "input.gwt-TextBox:eq(2)",
    'Device Detection': "input:checkbox:eq(12)",
    'Device Detection for dhcp mode': "input:checkbox:eq(13)",
    'Miscellaneous Block': "input:radio[value='BLOCK']",
    'Miscellaneous Monitor': "input:radio[value='MONITOR']",
    'Interface Status Disable': "input:radio[value='DOWN']",
    'Comments': "textarea.gwt-TextArea",
    'Save': "button:contains('Save')",

    'Delete for interface manual': "tr.disabled:contains('interface man') div[title='Delete']",
    'Delete for interface dhcp': "tr.disabled:contains('interface dhcp') div[title='Delete']",
    'Delete for interface loopback': "tr.disabled:contains('interface loop') div[title='Delete']",
    'Delete for interface wan': "tr.disabled:contains('interface wan') div[title='Delete']",
    'Delete for interface dmz': "tr.disabled:contains('interface dmz') div[title='Delete']",
    'Delete for interface undef': "tr.disabled:contains('interface undef') div[title='Delete']",
    'YES': "span:contains('YES')",
}

let gateMap = {
    'Interfaces': "a[ng-href='page/p/system/interface/']",
    'Interface Name': "input#name",
    'Type': "input#type",
    'VLAN ID': "input#vlanid",
    'Role': "select#role",
    'Address Mode Manual': "input#addressing_mode_static",
    'Address Mode DHCP': "input#addressing_mode_dhcp",
    'Distance': "input#distance",
    'IP/Netmask': "input#ipmask",
    'Device Detection': "input:checkbox#enable-device-identification",
    'Miscellaneous Block': "input:radio#scan-botnet-connections-block",
    'Miscellaneous Monitor': "input:radio#scan-botnet-connections-monitor",
    'Interface Status Disable': "input:radio#admin_status_down",
    'Comments': "textarea#description",

    'interface man': "td:contains('interface man')",
    'interface dhcp': "tr[mkey='interface dhcp']",
    'interface loop': "tr[mkey='interface loop']",
    'interface wan': "tr[mkey='interface wan']",
    'interface dmz': "tr[mkey='interface dmz']",
    'interface undef': "tr[mkey='interface undef']",
    'Edit': "button span:contains('Edit'):eq(0)",
}

new Testcase({
    name: 'interface manual new',
    testcase() {
        this.click(cloudMap['Interfaces'])
        this.click(cloudMap['Create New'])
        this.set(cloudMap['Interface Name'], "interface man")
        this.set(cloudMap['Alias'], "alias manual")
        this.check('Address Mode Manual')
        this.set(cloudMap['IP/Netmask'], "1.1.1.1/24")
        this.check('Device Detection')
        this.check('Miscellaneous Block')
        this.check('Interface Status Disable')
        this.set(cloudMap['Comments'], "test comments")
        this.click(cloudMap['Save'])
    },
    verify() {
        this.isSet(gateMap['Interface Name'], "interface man")
        this.isSet(gateMap['Alias'], "alias manual")
        // this.isSet(gateMap['Address Mode Manual', "static")
        this.isSet(gateMap['IP/Netmask'], "1.1.1.1/255.255.255.0")
        // this.isCheck('Device Detection')
        // this.isCheck('Miscellaneous Block')
        this.isCheck(gateMap['Interface Status Disable'])
        this.isSet(gateMap['Comments'], "test comments")
    }
})

new Testcase({
    name: 'interface manual delete',
    testcase() {
        this.click(cloudMap['Interfaces'])
        this.click(cloudMap['Delete for interface manual'])
        this.click(cloudMap['YES'])
    },
    verify() {
        this.click(gateMap['Interfaces'])
        this.isDelete(gateMap['interface man'])
    }
})

new Testcase({
    name: 'interface dhcp new',
    testcase() {
        this.click(cloudMap['Interfaces'])
        this.click(cloudMap['Create New'])
        this.set(cloudMap['Interface Name'], "interface dhcp")
        this.set(cloudMap['Alias'], "alias dhcp")
        this.set(cloudMap['VLAN ID'], 2)
        this.click(cloudMap['Address Mode DHCP'])
        this.set(cloudMap['Distance'], 100)
        this.check('Device Detection for dhcp mode')
        this.check('Miscellaneous Monitor')
        this.check('Interface Status Disable')
        this.set(cloudMap['Comments'], "test comments")
        this.click(cloudMap['Save'])
    },
    verify() {
        this.isSet(gateMap['Interface Name'], "interface dhcp")
        this.isSet(gateMap['Alias'], "alias dhcp")
        this.isSet(gateMap['VLAN ID'], 2)
        this.isSet(gateMap['Address Mode DHCP'], "dhcp")
        this.isSet(gateMap['Distance'], 100)
        this.isCheck('Device Detection')
        this.isCheck('Miscellaneous Monitor')
        this.isCheck('Interface Status Disable')
        this.isSet(gateMap['Comments'], "test comments")
    }
})

new Testcase({
    name: 'interface dhcp delete',
    testcase() {
        this.click(cloudMap['Interfaces'])
        this.click(cloudMap['Delete for interface dhcp'])
        this.click(cloudMap['YES'])
    },
    verify() {
        this.click(gateMap['Interfaces'])
        this.isDelete(gateMap['interface dhcp'])
    }
})

new Testcase({
    name: 'interface loopback new',
    testcase() {
        this.click(cloudMap['Interfaces'])
        this.click(cloudMap['Create New'])
        this.set(cloudMap['Interface Name'], "interface loop")
        this.set(cloudMap['Alias'], "alias loop")
        this.set(cloudMap['Type'], "LOOPBACK")
        // this.check('Device Detection') // todo: GUI bug, no device detection
        this.check('Miscellaneous Monitor')
        this.check('Interface Status Disable')
        this.set(cloudMap['Comments'], "test comments")
        this.click(cloudMap['Save'])
    },
    verify() {
        this.isSet(gateMap['Interface Name'], "interface loop")
        this.isSet(gateMap['Alias'], "alias loop")
        this.isSet(gateMap['Type'], "loopback")
        this.isCheck('Miscellaneous Monitor')
        this.isCheck('Interface Status Disable')
        this.isSet(gateMap['Comments'], "test comments")
    }
})

new Testcase({
    name: 'interface loopback delete',
    testcase() {
        this.click(cloudMap['Interfaces'])
        this.click(cloudMap['Delete for interface loopback'])
        this.click(cloudMap['YES'])
    },
    verify() {
        this.click(gateMap['Interfaces'])
        this.isDelete(gateMap['interface loop'])
    }
})

// todo: Physical Interface Members need validataion
new Testcase({
    name: 'interface hardswitch new',
    testcase() {
        this.click(cloudMap['Interfaces'])
        this.click(cloudMap['Create New'])
        this.set(cloudMap['Interface Name'], "interface hard")
        this.set(cloudMap['Alias'], "alias hard")
        this.set(cloudMap['Type'], "HARD_SWITCH")
        this.check(cloudMap['Address Mode DHCP'])
        this.check(cloudMap['Device Detection'])
        this.check(cloudMap['Miscellaneous Monitor'])
        this.check(cloudMap['Interface Status Disable'])
        this.set(cloudMap['Comments'], "test comments")
        this.click(cloudMap['Save'])
    },
    verify() {
        this.isSet(gateMap['Interface Name'], "interface hard")
        this.isSet(gateMap['Alias'], "alias hard")
        this.isSet(gateMap['Type'], "HARD_SWITCH")
        this.isCheck('Address Mode DHCP')
        this.isCheck('Device Detection')
        this.isCheck('Miscellaneous Monitor')
        this.isCheck('Interface Status Disable')
        this.isSet(gateMap['Comments'], "test comments")
    }
})

// todo: Attribute 'interface' MUST be set.
new Testcase({
    name: 'interface softswitch new',
    testcase() {
        this.click(cloudMap['Interfaces'])
        this.click(cloudMap['Create New'])
        this.set(cloudMap['Interface Name'], "interface soft")
        this.set(cloudMap['Alias'], "alias soft")
        this.set(cloudMap['Type'], "SWITCH")
        this.check('Address Mode DHCP')
        this.check('Device Detection')
        this.check('Miscellaneous Monitor')
        this.check('Interface Status Disable')
        this.set(cloudMap['Comments'], "test comments")
        this.click(cloudMap['Save'])
    },
    verify() {
        this.isSet(gateMap['Interface Name'], "interface soft")
        this.isSet(gateMap['Alias'], "alias soft")
        this.isSet(gateMap['Type'], "SWITCH")
        this.isCheck('Address Mode DHCP')
        this.isCheck('Device Detection')
        this.isCheck('Miscellaneous Monitor')
        this.isCheck('Interface Status Disable')
        this.isSet(gateMap['Comments'], "test comments")
    }
})

new Testcase({
    name: 'interface wan new',
    testcase() {
        this.click(cloudMap['Interfaces'])
        this.click(cloudMap['Create New'])
        this.set(cloudMap['Interface Name'], "interface wan")
        this.set(cloudMap['Alias'], "alias wan")
        this.set(cloudMap['VLAN ID'], 5)
        this.set(cloudMap['Role'], "WAN")
        this.check('Miscellaneous Monitor')
        this.check('Interface Status Disable')
        this.set(cloudMap['Comments'], "test comments")
        this.click(cloudMap['Save'])
    },
    verify() {
        this.isSet(gateMap['Interface Name'], "interface wan")
        this.isSet(gateMap['Alias'], "alias wan")
        this.isSet(gateMap['VLAN ID'], 5)
        this.isSet(gateMap['Role'], "wan")
        this.isCheck('Miscellaneous Monitor')
        this.isCheck('Interface Status Disable')
        this.isSet(gateMap['Comments'], "test comments")
    }
})

new Testcase({
    name: 'interface wan delete',
    testcase() {
        this.click(cloudMap['Interfaces'])
        this.click(cloudMap['Delete for interface wan'])
        this.click(cloudMap['YES'])
    },
    verify() {
        this.click(gateMap['Interfaces'])
        this.isDelete(gateMap['interface wan'])
    }
})

new Testcase({
    name: 'interface dmz new',
    testcase() {
        this.click(cloudMap['Interfaces'])
        this.click(cloudMap['Create New'])
        this.set(cloudMap['Interface Name'], "interface dmz")
        this.set(cloudMap['Alias'], "alias dmz")
        this.set(cloudMap['VLAN ID'], 3)
        this.set(cloudMap['Role'], "DMZ")
        this.check('Device Detection')
        this.check('Miscellaneous Monitor')
        this.check('Interface Status Disable')
        this.set(cloudMap['Comments'], "test comments")
        this.click(cloudMap['Save'])
    },
    verify() {
        this.isSet(gateMap['Interface Name'], "interface dmz")
        this.isSet(gateMap['Alias'], "alias dmz")
        this.isSet(gateMap['VLAN ID'], 3)
        this.isSet(gateMap['Role'], "dmz")
        this.isCheck('Device Detection')
        this.isCheck('Miscellaneous Monitor')
        this.isCheck('Interface Status Disable')
        this.isSet(gateMap['Comments'], "test comments")
    }
})

new Testcase({
    name: 'interface dmz delete',
    testcase() {
        this.click(cloudMap['Interfaces'])
        this.click(cloudMap['Delete for interface dmz'])
        this.click(cloudMap['YES'])
    },
    verify() {
        this.click(gateMap['Interfaces'])
        this.isDelete(gateMap['interface dmz'])
    }
})

new Testcase({
    name: 'interface undef new',
    testcase() {
        this.click(cloudMap['Interfaces'])
        this.click(cloudMap['Create New'])
        this.set(cloudMap['Interface Name'], "interface undef")
        this.set(cloudMap['Alias'], "alias undefined")
        this.set(cloudMap['VLAN ID'], 4)
        this.set(cloudMap['Role'], "UNDEFINED")
        this.check('Device Detection')
        this.check('Miscellaneous Monitor')
        this.check('Interface Status Disable')
        this.set(cloudMap['Comments'], "test comments")
        this.click(cloudMap['Save'])
    },
    verify() {
        this.isSet(gateMap['Interface Name'], "interface undef")
        this.isSet(gateMap['Alias'], "alias undefined")
        this.isSet(gateMap['VLAN ID'], 4)
        this.isSet(gateMap['Role'], "undefined")
        this.isCheck('Device Detection')
        this.isCheck('Miscellaneous Monitor')
        this.isCheck('Interface Status Disable')
        this.isSet(gateMap['Comments'], "test comments")
    }
})

new Testcase({
    name: 'interface undef delete',
    testcase() {
        this.click(cloudMap['Interfaces'])
        this.click(cloudMap['Delete for interface undef'])
        this.click(cloudMap['YES'])
    },
    verify() {
        this.click(gateMap['Interfaces'])
        this.isDelete(gateMap['interface undef'])
    }
})