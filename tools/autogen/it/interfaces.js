let Testcase = require('../testcase.js');

let map = {
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
    'YES': "span:contains('YES')",
}

new Testcase('interface new manual', map, (t) => {
    t.click('Interfaces')
    t.click('Create New')
    t.set('Interface Name', "interface one")
    t.set('Alias', "alias one")
    t.checked('Address Mode Manual')
    t.set('IP/Netmask', "1.1.1.1/24")
    t.checked('Device Detection')
    t.checked('Miscellaneous Block')
    t.checked('Interface Status Disable')
    t.set('Comments', "test comments")
    t.click('Save')
})

new Testcase('interface delete manual', map, (t) => {
    t.click('Interfaces')
    t.click('Delete for interface one')
    t.click('YES')
})

new Testcase('interface new dhcp mode', map, (t) => {
    t.click('Interfaces')
    t.click('Create New')
    t.set('Interface Name', "interface dhcp")
    t.set('Alias', "alias one")
    t.set('VLAN ID', 2)
    t.checked('Address Mode DHCP')
    t.checked('Address Mode DHCP') // second click trigger below three params render
    t.set('Distance', 100) // todo: Distance: 100 (not working)
    t.checked('Device Detection')
    t.checked('Miscellaneous Monitor')
    t.checked('Interface Status Disable')
    t.set('Comments', "test comments")
    t.click('Save')
})

new Testcase('interface delete dhcp', map, (t) => {
    t.click('Interfaces')
    t.click('Delete for interface dhcp')
    t.click('YES')
})

new Testcase('interface new loopback', map, (t) => {
    t.click('Interfaces')
    t.click('Create New')
    t.set('Interface Name', "interface loop")
    t.set('Alias', "alias loop")
    t.set('Type', "LOOPBACK")
    t.checked('Device Detection')
    t.checked('Miscellaneous Monitor')
    t.checked('Interface Status Disable')
    t.set('Comments', "test comments")
    t.click('Save')
})

new Testcase('interface delete loopback', map, (t) => {
    t.click('Interfaces')
    t.click('Delete for interface loopback')
    t.click('YES')
})

// todo: Physical Interface Members need validataion
new Testcase('interface new hardswitch', map, (t) => {
    t.click('Interfaces')
    t.click('Create New')
    t.set('Interface Name', "interface hard")
    t.set('Alias', "alias hard")
    t.set('Type', "HARD_SWITCH")
    t.checked('Address Mode DHCP')
    t.checked('Device Detection')
    t.checked('Miscellaneous Monitor')
    t.checked('Interface Status Disable')
    t.set('Comments', "test comments")
    t.click('Save')
})

// todo: Attribute 'interface' MUST be set.
new Testcase('interface new softswitch', map, (t) => {
    t.click('Interfaces')
    t.click('Create New')
    t.set('Interface Name', "interface soft")
    t.set('Alias', "alias soft")
    t.set('Type', "SWITCH")
    t.checked('Address Mode DHCP')
    t.checked('Device Detection')
    t.checked('Miscellaneous Monitor')
    t.checked('Interface Status Disable')
    t.set('Comments', "test comments")
    t.click('Save')
})

new Testcase('interface new wan', map, (t) => {
    t.click('Interfaces')
    t.click('Create New')
    t.set('Interface Name', "interface wan")
    t.set('Alias', "alias wan")
    t.set('VLAN ID', 5)
    t.set('Role', "WAN")
    t.checked('Miscellaneous Monitor')
    t.checked('Interface Status Disable')
    t.set('Comments', "test comments")
    t.click('Save')
})

new Testcase('interface new dmz', map, (t) => {
    t.click('Interfaces')
    t.click('Create New')
    t.set('Interface Name', "interface dmz")
    t.set('Alias', "alias dmz")
    t.set('VLAN ID', 3)
    t.set('Role', "DMZ")
    t.checked('Device Detection')
    t.checked('Miscellaneous Monitor')
    t.checked('Interface Status Disable')
    t.set('Comments', "test comments")
    t.click('Save')
})

new Testcase('interface new undefined', map, (t) => {
    t.click('Interfaces')
    t.click('Create New')
    t.set('Interface Name', "interface undefined")
    t.set('Alias', "alias undefined")
    t.set('VLAN ID', 4)
    t.set('Role', "UNDEFINED")
    t.checked('Device Detection')
    t.checked('Miscellaneous Monitor')
    t.checked('Interface Status Disable')
    t.set('Comments', "test comments")
    t.click('Save')
})
