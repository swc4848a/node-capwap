let Testcase = require('../testcase.js');

let cloudMap = {
    'Interfaces': "div.gwt-HTML:contains('Interfaces')",
    'Create New': "button[title='Create New']",
    'Interface Name': "input.gwt-TextBox:eq(0)",
    'Alias': "input.gwt-TextBox:eq(1)",
    'Type': "select.gwt-ListBox:eq(0)",
    'VLAN ID': "select.gwt-ListBox:eq(2)",
    'Role': "select.gwt-ListBox:eq(3)",
    'Address Mode Manual': "input[value='STATIC']",
    'Address Mode DHCP': "input[value='DHCP']~label",
    'Distance': "td>input:eq(2)",
    'IP/Netmask': "input.gwt-TextBox:eq(2)",
    'Device Detection': "input:checkbox:eq(1)",
    'Device Detection for dhcp mode': "input:checkbox:eq(3)",
    'Miscellaneous Block': "input:radio[value='BLOCK']",
    'Miscellaneous Monitor': "input:radio[value='MONITOR']",
    'Interface Status Disable': "input:radio[value='DOWN']",
    'Comments': "textarea.gwt-TextArea",
    'Save': "span:contains('Save')",

    'Delete for interface manual': "tr.disabled:contains('interface man') div[title='Delete']",
    'Delete for interface dhcp': "tr.disabled:contains('interface dhcp') div[title='Delete']",
    'Delete for interface loopback': "tr.disabled:contains('interface loop') div[title='Delete']",
    'Delete for interface wan': "tr.disabled:contains('interface wan') div[title='Delete']",
    'Delete for interface dmz': "tr.disabled:contains('interface dmz') div[title='Delete']",
    'Delete for interface undefined': "tr.disabled:contains('interface N/A') div[title='Delete']",
    'YES': "span:contains('YES')",
}

let gateMap = {
    'Interfaces': "a[href='page/p/system/interface/']",
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

    'interface man': "tr[mkey='interface man']",
    'interface dhcp': "tr[mkey='interface dhcp']",
    'interface loop': "tr[mkey='interface loop']",
    'interface wan': "tr[mkey='interface wan']",
    'interface dmz': "tr[mkey='interface dmz']",
    'interface N/A': "tr[mkey='interface N/A']",
    'Edit': "button span:contains('Edit'):eq(0)",
}

new Testcase({
    name: 'interface manual new',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Interfaces')
        c.click('Create New')
        c.set('Interface Name', "interface man")
        c.set('Alias', "alias manual")
        c.checked('Address Mode Manual')
        c.set('IP/Netmask', "1.1.1.1/24")
        c.checked('Device Detection')
        c.checked('Miscellaneous Block')
        c.checked('Interface Status Disable')
        c.set('Comments', "test comments")
        c.click('Save')
    },
    verify: (g) => {
        g.click('Interfaces')
        g.click('interface man')
        g.click('Edit')
        g.isSet('Interface Name', "interface man")
        g.isSet('Alias', "alias manual")
        g.isSet('Address Mode Manual', "static")
        g.isSet('IP/Netmask', "1.1.1.1/255.255.255.0")
        g.isChecked('Device Detection')
        g.isChecked('Miscellaneous Block')
        g.isChecked('Interface Status Disable')
        g.isSet('Comments', "test comments")
    }
})

new Testcase({
    name: 'interface manual delete',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Interfaces')
        c.click('Delete for interface manual')
        c.click('YES')
        c.click('YES') // todo: GUI bug, need click twice
    },
    verify: (g) => {
        g.click('Interfaces')
        g.isDelete('interface man')
    }
})

new Testcase({
    name: 'interface dhcp new',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Interfaces')
        c.click('Create New')
        c.set('Interface Name', "interface dhcp")
        c.set('Alias', "alias dhcp")
        c.set('VLAN ID', 2)
        c.click('Address Mode DHCP')
        c.set('Distance', 100)
        c.checked('Device Detection for dhcp mode')
        c.checked('Miscellaneous Monitor')
        c.checked('Interface Status Disable')
        c.set('Comments', "test comments")
        c.click('Save')
    },
    verify: (g) => {
        g.click('Interfaces')
        g.click('interface dhcp')
        g.click('Edit')
        g.isSet('Interface Name', "interface dhcp")
        g.isSet('Alias', "alias dhcp")
        g.isSet('VLAN ID', 2)
        g.isSet('Address Mode DHCP', "dhcp")
        g.isSet('Distance', 100)
        g.isChecked('Device Detection')
        g.isChecked('Miscellaneous Monitor')
        g.isChecked('Interface Status Disable')
        g.isSet('Comments', "test comments")
    }
})

new Testcase({
    name: 'interface dhcp delete',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Interfaces')
        c.click('Delete for interface dhcp')
        c.click('YES')
        c.click('YES') // todo: GUI bug, need click twice
    },
    verify: (g) => {
        g.click('Interfaces')
        g.isDelete('interface dhcp')
    }
})

new Testcase({
    name: 'interface loopback new',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Interfaces')
        c.click('Create New')
        c.set('Interface Name', "interface loop")
        c.set('Alias', "alias loop")
        c.set('Type', "LOOPBACK")
            // c.checked('Device Detection') // todo: GUI bug, no device detection
        c.checked('Miscellaneous Monitor')
        c.checked('Interface Status Disable')
        c.set('Comments', "test comments")
        c.click('Save')
    },
    verify: (g) => {
        g.click('Interfaces')
        g.click('interface loop')
        g.click('Edit')
        g.isSet('Interface Name', "interface loop")
        g.isSet('Alias', "alias loop")
        g.isSet('Type', "loopback")
        g.isChecked('Miscellaneous Monitor')
        g.isChecked('Interface Status Disable')
        g.isSet('Comments', "test comments")
    }
})

new Testcase({
    name: 'interface loopback delete',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Interfaces')
        c.click('Delete for interface loopback')
        c.click('YES')
        c.click('YES') // todo: GUI bug, need click twice
    },
    verify: (g) => {
        g.click('Interfaces')
        g.isDelete('interface loop')
    }
})

// todo: Physical Interface Members need validataion
new Testcase({
    name: 'interface hardswitch new',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Interfaces')
        c.click('Create New')
        c.set('Interface Name', "interface hard")
        c.set('Alias', "alias hard")
        c.set('Type', "HARD_SWITCH")
        c.checked('Address Mode DHCP')
        c.checked('Device Detection')
        c.checked('Miscellaneous Monitor')
        c.checked('Interface Status Disable')
        c.set('Comments', "test comments")
        c.click('Save')
    },
    verify: (g) => {
        g.click('Interfaces')
        g.click('interface hard')
        g.click('Edit')
        g.isSet('Interface Name', "interface hard")
        g.isSet('Alias', "alias hard")
        g.isSet('Type', "HARD_SWITCH")
        g.isChecked('Address Mode DHCP')
        g.isChecked('Device Detection')
        g.isChecked('Miscellaneous Monitor')
        g.isChecked('Interface Status Disable')
        g.isSet('Comments', "test comments")
    }
})

// todo: Attribute 'interface' MUST be set.
new Testcase({
    name: 'interface softswitch new',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Interfaces')
        c.click('Create New')
        c.set('Interface Name', "interface soft")
        c.set('Alias', "alias soft")
        c.set('Type', "SWITCH")
        c.checked('Address Mode DHCP')
        c.checked('Device Detection')
        c.checked('Miscellaneous Monitor')
        c.checked('Interface Status Disable')
        c.set('Comments', "test comments")
        c.click('Save')
    },
    verify: (g) => {
        g.click('Interfaces')
        g.click('interface soft')
        g.click('Edit')
        g.isSet('Interface Name', "interface soft")
        g.isSet('Alias', "alias soft")
        g.isSet('Type', "SWITCH")
        g.isChecked('Address Mode DHCP')
        g.isChecked('Device Detection')
        g.isChecked('Miscellaneous Monitor')
        g.isChecked('Interface Status Disable')
        g.isSet('Comments', "test comments")
    }
})

new Testcase({
    name: 'interface wan new',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Interfaces')
        c.click('Create New')
        c.set('Interface Name', "interface wan")
        c.set('Alias', "alias wan")
        c.set('VLAN ID', 5)
        c.set('Role', "WAN")
        c.checked('Miscellaneous Monitor')
        c.checked('Interface Status Disable')
        c.set('Comments', "test comments")
        c.click('Save')
    },
    verify: (g) => {
        g.click('Interfaces')
        g.click('interface wan')
        g.click('Edit')
        g.isSet('Interface Name', "interface wan")
        g.isSet('Alias', "alias wan")
        g.isSet('VLAN ID', 5)
        g.isSet('Role', "wan")
        g.isChecked('Miscellaneous Monitor')
        g.isChecked('Interface Status Disable')
        g.isSet('Comments', "test comments")
    }
})

new Testcase({
    name: 'interface wan delete',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Interfaces')
        c.click('Delete for interface wan')
        c.click('YES')
        c.click('YES')
    },
    verify: (g) => {
        g.click('Interfaces')
        g.isDelete('interface wan')
    }
})

new Testcase({
    name: 'interface dmz new',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Interfaces')
        c.click('Create New')
        c.set('Interface Name', "interface dmz")
        c.set('Alias', "alias dmz")
        c.set('VLAN ID', 3)
        c.set('Role', "DMZ")
        c.checked('Device Detection')
        c.checked('Miscellaneous Monitor')
        c.checked('Interface Status Disable')
        c.set('Comments', "test comments")
        c.click('Save')
    },
    verify: (g) => {
        g.click('Interfaces')
        g.click('interface dmz')
        g.click('Edit')
        g.isSet('Interface Name', "interface dmz")
        g.isSet('Alias', "alias dmz")
        g.isSet('VLAN ID', 3)
        g.isSet('Role', "dmz")
        g.isChecked('Device Detection')
        g.isChecked('Miscellaneous Monitor')
        g.isChecked('Interface Status Disable')
        g.isSet('Comments', "test comments")
    }
})

new Testcase({
    name: 'interface dmz delete',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Interfaces')
        c.click('Delete for interface dmz')
        c.click('YES')
        c.click('YES')
    },
    verify: (g) => {
        g.click('Interfaces')
        g.isDelete('interface dmz')
    }
})

new Testcase({
    name: 'interface undefined new',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Interfaces')
        c.click('Create New')
        c.set('Interface Name', "interface N/A")
        c.set('Alias', "alias undefined")
        c.set('VLAN ID', 4)
        c.set('Role', "UNDEFINED")
        c.checked('Device Detection')
        c.checked('Miscellaneous Monitor')
        c.checked('Interface Status Disable')
        c.set('Comments', "test comments")
        c.click('Save')
    },
    verify: (g) => {
        g.click('Interfaces')
        g.click('interface N/A')
        g.click('Edit')
        g.isSet('Interface Name', "interface N/A")
        g.isSet('Alias', "alias undefined")
        g.isSet('VLAN ID', 4)
        g.isSet('Role', "undefined")
        g.isChecked('Device Detection')
        g.isChecked('Miscellaneous Monitor')
        g.isChecked('Interface Status Disable')
        g.isSet('Comments', "test comments")
    }
})

new Testcase({
    name: 'interface undefined delete',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Interfaces')
        c.click('Delete for interface undefined')
        c.click('YES')
        c.click('YES') //todo: GUI bug, need click yes twice to delete undefined interface
    },
    verify: (g) => {
        g.click('Interfaces')
        g.isDelete('interface N/A')
    }
})
