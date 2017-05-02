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

    'Create Recurring Schedule': "div.filter_text:contains('Recurring Schedule')",
    'Sunday': "input:checkbox:eq(0)",
    'Monday': "input:checkbox:eq(1)",
    'Tuesday': "input:checkbox:eq(2)",
    'Wednesday': "input:checkbox:eq(3)",
    'Thursday': "input:checkbox:eq(4)",
    'Friday': "input:checkbox:eq(5)",
    'Saturday': "input:checkbox:eq(6)",
    'Time': "td>input.textBox",

    'Create Schedule Group': "div.filter_text:contains('Schedule Group')",
    'Members': "div.gwt-HTML:contains(' - ')",
    'Members Always': "div.gwt-HTML:contains('always')",
    'Members None': "div.gwt-HTML:contains('none')",
    'Popup Panel': "div.gwt-DecoratedPopupPanel",

    'Delete Onetime one': "td.left:contains('onetime one')~td.right div[title='Delete']",
    'Delete Recurring One': "td.left:contains('recurring one')~td.right div[title='Delete']",
    'Delete Schedule Group One': "td.left:contains('schedule group one')~td.right div[title='Delete']",
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

    'Schedule Group One': "tr[mkey='schedule group one']",
    'Members Always': "div.formatted-content>span:contains('always')",
    'Members None': "div.formatted-content>span:contains('none')",

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
        c.checked('Monday')
        c.checked('Tuesday')
        c.checked('Wednesday')
        c.checked('Thursday')
        c.checked('Friday')
        c.checked('Saturday')
        c.set('Time', 10)
        c.click('Save')
        c.click('OK')
    },
    verify: (g) => {
        g.click('Schedules')
        g.click('Recurring One')
        g.click('Edit')
        g.isChecked('Type Recurring')
        g.isSet('Name', "recurring one")
        g.isUnchecked('Sunday')
        g.isChecked('Monday')
        g.isChecked('Tuesday')
        g.isChecked('Wednesday')
        g.isChecked('Thursday')
        g.isChecked('Friday')
        g.isChecked('Saturday')
        g.isUnchecked('All Day')
        g.isSet('Start Hour', 10)
        g.isSet('Start Min', 10)
        g.isSet('Stop Hour', 10)
        g.isSet('Stop Min', 10)
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

new Testcase({
    name: 'schedule group new',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Schedules')
        c.click('Create New')
        c.click('Create Schedule Group')
        c.set('Name', "schedule group one")
        c.click('Members')
        c.click('Members Always')
        c.click('Members None')
        c.hide('Popup Panel')
        c.click('Save')
        c.click('OK')
    },
    verify: (g) => {
        g.click('Schedules')
        g.click('Schedule Group One')
        g.click('Edit')
        g.isSet('Name', "schedule group one")
        g.has('Members Always')
        g.has('Members None')
    }
})

new Testcase({
    name: 'schedule group delete',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Schedules')
        c.click('Delete Schedule Group One')
        c.click('YES')
    },
    verify: (g) => {
        g.click('Schedules')
        g.isDelete('Schedule Group One')
    }
})
