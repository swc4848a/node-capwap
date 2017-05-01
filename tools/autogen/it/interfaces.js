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
    'Address Mode DHCP': "input[value='DHCP']",
    'Distance': "td>input:eq(2)",
    'IP/Netmask': "input.gwt-TextBox:eq(2)",
    'Device Detection': "input:checkbox:eq(1)",
    'Miscellaneous Block': "input:radio[value='BLOCK']",
    'Miscellaneous Monitor': "input:radio[value='MONITOR']",
    'Interface Status Disable': "input:radio[value='DOWN']",
    'Comments': "textarea.gwt-TextArea",
    'Save': "span:contains('Save')",

    'Delete for interface one': "tr.disabled:contains('interface one') div[title='Delete']",
    'Delete for interface dhcp': "tr.disabled:contains('interface dhcp') div[title='Delete']",
    'Delete for interface loopback': "tr.disabled:contains('interface loop') div[title='Delete']",
    'Delete for interface wan': "tr.disabled:contains('interface wan') div[title='Delete']",
    'Delete for interface dmz': "tr.disabled:contains('interface dmz') div[title='Delete']",
    'Delete for interface undefined': "tr.disabled:contains('interface N/A') div[title='Delete']",
    'YES': "span:contains('YES')",
}

let gateMap = {
    'Interfaces': "",
    'Create New': "",
    'Interface Name': "",
    'Alias': "",
    'Type': "",
    'VLAN ID': "",
    'Role': "",
    'Address Mode Manual': "",
    'Address Mode DHCP': "",
    'Distance': "",
    'IP/Netmask': "",
    'Device Detection': "",
    'Miscellaneous Block': "",
    'Miscellaneous Monitor': "",
    'Interface Status Disable': "",
    'Comments': "",
    'Save': "",

    'interface one': "",
}

new Testcase({
    name: 'interface new manual',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Interfaces')
        c.click('Create New')
        c.set('Interface Name', "interface one")
        c.set('Alias', "alias one")
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
        g.click('interface one')
        g.isSet('Interface Name', "interface one")
        g.isSet('Alias', "alias one")
        g.isChecked('Address Mode Manual')
        g.isSet('IP/Netmask', "1.1.1.1/24")
        g.isChecked('Device Detection')
        g.isChecked('Miscellaneous Block')
        g.isChecked('Interface Status Disable')
        g.isSet('Comments', "test comments")
    }
})

new Testcase({
    name: 'interface delete manual',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Interfaces')
        c.click('Delete for interface one')
        c.click('YES')
    },
    verify: (g) => {
        g.click('Interfaces')
        g.isDelete('interface one')
    }
})

new Testcase({
    name: 'interface new dhcp mode',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Interfaces')
        c.click('Create New')
        c.set('Interface Name', "interface dhcp")
        c.set('Alias', "alias one")
        c.set('VLAN ID', 2)
        c.checked('Address Mode DHCP')
        c.checked('Address Mode DHCP') // second click trigger below three params render
        c.set('Distance', 100) // todo: Distance: 100 (not working)
        c.checked('Device Detection')
        c.checked('Miscellaneous Monitor')
        c.checked('Interface Status Disable')
        c.set('Comments', "test comments")
        c.click('Save')
    },
    verify: (g) => {
        g.click('Interfaces')
        g.click('interface dhcp')
        g.isSet('Interface Name', "interface dhcp")
        g.isSet('Alias', "alias one")
        g.isSet('VLAN ID', 2)
        g.isChecked('Address Mode DHCP')
        g.isChecked('Address Mode DHCP') // second click trigger below three params render
        g.isSet('Distance', 100) // todo: Distance: 100 (not working)
        g.isChecked('Device Detection')
        g.isChecked('Miscellaneous Monitor')
        g.isChecked('Interface Status Disable')
        g.isSet('Comments', "test comments")
    }
})

new Testcase({
    name: 'interface delete dhcp',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Interfaces')
        c.click('Delete for interface dhcp')
        c.click('YES')
    },
    verify: (g) => {
        g.click('Interfaces')
        g.isDelete('interface dhcp')
    }
})

new Testcase({
    name: 'interface new loopback',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Interfaces')
        c.click('Create New')
        c.set('Interface Name', "interface loop")
        c.set('Alias', "alias loop")
        c.set('Type', "LOOPBACK")
        c.checked('Device Detection')
        c.checked('Miscellaneous Monitor')
        c.checked('Interface Status Disable')
        c.set('Comments', "test comments")
        c.click('Save')
    },
    verify: (g) => {
        g.click('Interfaces')
        g.click('interface loop')
        g.isSet('Interface Name', "interface loop")
        g.isSet('Alias', "alias loop")
        g.isSet('Type', "LOOPBACK")
        g.isChecked('Device Detection')
        g.isChecked('Miscellaneous Monitor')
        g.isChecked('Interface Status Disable')
        g.isSet('Comments', "test comments")
    }
})

new Testcase({
    name: 'interface delete loopback',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Interfaces')
        c.click('Delete for interface loopback')
        c.click('YES')
    },
    verify: (g) => {
        g.click('Interfaces')
        g.isDelete('interface loopback')
    }
})

// todo: Physical Interface Members need validataion
new Testcase({
    name: 'interface new hardswitch',
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
    name: 'interface new softswitch',
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
    name: 'interface new wan',
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
        g.isSet('Interface Name', "interface wan")
        g.isSet('Alias', "alias wan")
        g.isSet('VLAN ID', 5)
        g.isSet('Role', "WAN")
        g.isChecked('Miscellaneous Monitor')
        g.isChecked('Interface Status Disable')
        g.isSet('Comments', "test comments")
    }
})

new Testcase({
    name: 'interface delete wan',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Interfaces')
        c.click('Delete for interface wan')
        c.click('YES')
    },
    verify: (g) => {
        g.click('Interfaces')
        g.isDelete('interface wan')
    }
})

new Testcase({
    name: 'interface new dmz',
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
        g.isSet('Interface Name', "interface dmz")
        g.isSet('Alias', "alias dmz")
        g.isSet('VLAN ID', 3)
        g.isSet('Role', "DMZ")
        g.isChecked('Device Detection')
        g.isChecked('Miscellaneous Monitor')
        g.isChecked('Interface Status Disable')
        g.isSet('Comments', "test comments")
    }
})

new Testcase({
    name: 'interface delete dmz',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Interfaces')
        c.click('Delete for interface dmz')
        c.click('YES')
    },
    verify: (g) => {
        g.click('Interfaces')
        g.isDelete('interface dmz')
    }
})

new Testcase({
    name: 'interface new undefined',
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
        g.isSet('Interface Name', "interface N/A")
        g.isSet('Alias', "alias undefined")
        g.isSet('VLAN ID', 4)
        g.isSet('Role', "UNDEFINED")
        g.isChecked('Device Detection')
        g.isChecked('Miscellaneous Monitor')
        g.isChecked('Interface Status Disable')
        g.isSet('Comments', "test comments")
    }
})

new Testcase({
    name: 'interface delete undefined',
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
        g.isDelete('interface undefined')
    }
})
