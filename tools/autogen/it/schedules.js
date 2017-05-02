let Testcase = require('../testcase.js');

let cloudMap = {
    'Schedules': "div.gwt-HTML:contains('Schedules')",
    'Create New': "button[title='Create New']",
    'Create One-Time Schedule': "div.filter_text:contains('One-Time Schedule')",
    'Name': "input.gwt-TextBox:eq(0)",
    'Start Date': "img.html-link:eq(0)",
    'Select': "button:contains('Select')",
    'End Date': "img.html-link:eq(1)",
    'Last Day': "select.gwt-ListBox:eq(0)",
    'Pre-expiration Event Log': "input.gwt-TextBox:eq(1)",
    'Save': "span:contains('Save')",
    'OK': "button:contains('OK')",
    'YES': "span:contains('YES')",

    'Delete Onetime one': "td.left:contains('onetime one')~td.right div[title='Delete']",
}

let gateMap = {
    'Schedules': "a[href='page/p/firewall/object/schedule/']",
    'OneTime One': "tr[mkey='onetime one']",
    'Edit': "button:contains('Edit'):eq(0)",
    'Type': "input#type-onetime",
    'Name': "input#name",
    'Start Date': "input#start_date",
    'Start Hour': "input#start_hour",
    'Start Min': "input#start_min",
    'End Date': "input#stop_date",
    'End Hour': "input#stop_hour",
    'End Min': "input#stop_min",
    'Pre-expiration event log': "input:checkbox#generate_log",
    'Number of days before': "input#expiration-days",
}

new Testcase({
    name: 'onetime schedule new',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Schedules')
        c.click('Create New')
        c.click('Create One-Time Schedule')
        c.set('Name', "onetime one")
        c.click('Start Date')
        c.click('Select')
        c.click('End Date')
        c.set('Last Day', 23)
        c.click('Select')
        c.set('Pre-expiration Event Log', 5)
        c.click('Save')
        c.click('OK')
    },
    verify: (g) => {
        g.click('Schedules')
        g.click('OneTime One')
        g.click('Edit')
        g.isChecked('Type')
        g.isSet('Name', "onetime one")
            // todo: specify date
            // g.isSet('Start Date')
            // g.isSet('Start Hour')
            // g.isSet('Start Min')
            // g.isSet('End Date')
            // g.isSet('End Hour')
            // g.isSet('End Min')
        g.isChecked('Pre-expiration event log')
        g.isSet('Number of days before', 5)
    }
})

new Testcase({
    name: 'onetime schedule delete',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Schedules')
        c.click('Delete Onetime one')
        c.click('YES')
    },
    verify: (g) => {
        g.click('Schedules')
        g.isDelete('OneTime One')
    }
})
