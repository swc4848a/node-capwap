let Testcase = require('../testcase.js');

let cloudMap = {
    'Schedules': "div.gwt-HTML:contains('Schedules')",
    'Create New': "button[title='Create New']",
    'Create One-Time Schedule': "div.filter_text:contains('One-Time Schedule')",
    'Create Recurring Schedule': "div.filter_text:contains('Recurring Schedule')",
    'Name': "input.gwt-TextBox:eq(0)",
    'Start Date': "img.html-link:eq(0)",
    'Select': "button:contains('Select')",
    'End Date': "img.html-link:eq(1)",
    'Last Day': "select.gwt-ListBox:eq(0)",
    'Pre-expiration Event Log': "input.gwt-TextBox:eq(1)",
    'Save': "span:contains('Save')",
    'OK': "button:contains('OK')",
    'YES': "span:contains('YES')",

    'Days': "input:checkbox",
    'Time': "td>input.textBox",

    'Delete Onetime one': "td.left:contains('onetime one')~td.right div[title='Delete']",
    'Delete Recurring One': "td.left:contains('recurring one')~td.right div[title='Delete']",
}

let gateMap = {
    'Schedules': "a[href='page/p/firewall/object/schedule/']",
    'OneTime One': "tr[mkey='onetime one']",
    'Edit': "button:contains('Edit'):eq(0)",
    'Type Onetime': "input#type-onetime",
    'Name': "input#name",
    'Start Date': "input#start_date",
    'Start Hour': "input#start_hour",
    'Start Min': "input#start_min",
    'End Date': "input#stop_date",
    'End Hour': "input#stop_hour",
    'End Min': "input#stop_min",
    'Pre-expiration event log': "input:checkbox#generate_log",
    'Number of days before': "input#expiration-days",

    'Recurring One': "tr[mkey='recurring one']",
    'Type Recurring': "input#type-recurring",
    'Sunday': "input#days-sunday",
    'Monday': "input#days-monday",
    'Tuesday': "input#days-tuesday",
    'Wednesday': "input#days-wednesday",
    'Thursday': "input#days-thursday",
    'Friday': "input#days-friday",
    'Saturday': "input#days-saturday",
    'All Day': "input#allday",
    'Start Hour': "input#start_hour",
    'Start Min': "input#start_min",
    'Stop Hour': "input#stop_hour",
    'Stop Min': "input#stop_min",
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
        g.isChecked('Type Onetime')
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

new Testcase({
    name: 'recurring schedule new',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Schedules')
        c.click('Create New')
        c.click('Create Recurring Schedule')
        c.set('Name', "recurring one")
        c.checked('Days')
        c.set('Time', 1)
        c.click('Save')
        c.click('OK')
    },
    verify: (g) => {
        g.click('Schedules')
        g.click('Recurring One')
        g.click('Edit')
        g.isChecked('Type Recurring')
        g.isSet('Name', "recurring one")
        g.isChecked('Sunday')
        g.isChecked('Monday')
        g.isChecked('Tuesday')
        g.isChecked('Wednesday')
        g.isChecked('Thursday')
        g.isChecked('Friday')
        g.isChecked('Saturday')
        g.isUnchecked('All Day')
        g.isSet('Start Hour', 1)
        g.isSet('Start Min', 1)
        g.isSet('Stop Hour', 1)
        g.isSet('Stop Min', 1)
    }
})

new Testcase({
    name: 'recurring schedule delete',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Schedules')
        c.click('Delete Recurring One')
        c.click('YES')
    },
    verify: (g) => {
        g.click('Schedules')
        g.isDelete('Recurring One')
    }
})
