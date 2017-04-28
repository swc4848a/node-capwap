let Testcase = require('../testcase.js');

let map = {
    'Routing': "div.gwt-HTML:contains('Routing')",
    'Create New': "button[title='Create New']",
    'Destination IP': "input.gwt-TextBox:eq(0)",
    'Destination Netmask': "input.gwt-TextBox:eq(1)",
    'Gateway': "input.gwt-TextBox:eq(2)",
    'Administrative Distance': "input.gwt-TextBox:eq(3)",
    'Device Interface': "select",
    'Comments': "textarea.gwt-TextArea",
    'Save': "span:contains('Save')",

    'Edit Second Item': "div[title='Edit']:eq(1)",
    'Delete Second Item': "div[title='Delete']:eq(1)",
    'YES': "span:contains('YES')",
}

new Testcase('routing new', map, (t) => {
    t.click('Routing')

    t.click('Create New')
    t.set('Destination IP', "192.168.18.0")
    t.set('Destination Netmask', "255.255.255.0")
    t.set('Gateway', "192.168.1.1")
    t.set('Administrative Distance', 11)
    t.set('Device Interface', "internal")
    t.set('Comments', "test comments")

    t.click('Save')
})

new Testcase('routing edit', map, (t) => {
    t.click('Routing')
    t.click('Edit Second Item')

    t.set('Destination IP', "192.168.18.0")
    t.set('Destination Netmask', "255.255.255.0")
    t.set('Gateway', "192.168.1.1")
    t.set('Administrative Distance', 12)
    t.set('Device Interface', "wan2")
    t.set('Comments', "test comments")

    t.click('Save')
})

new Testcase('routing delete', map, (t) => {
    t.click('Routing')
    t.click('Delete Second Item')
    t.click('YES')
})
