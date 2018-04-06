let Testcase = require('../../src/testcase.js');

let cloudMap = {
    'Schedules': "div.gwt-HTML:contains('Schedules')",
    'Create New': "button:contains('Create New')",

    'Create One-Time Schedule': "div.filter_text:contains('One-Time Schedule')",
    'Name': "input.gwt-TextBox:eq(0)",
    'Start Date': "img.html-link:eq(0)",
    'Select': "button:contains('Select')",
    'End Date': "img.html-link:eq(1)",
    'Last Day': "select.gwt-ListBox:eq(0)",
    'Pre-expiration Event Log': "input.gwt-TextBox:eq(3)",
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
    'Members Always': "div.selected-entry>span:contains('always')",
    'Members None': "div.selected-entry>span:contains('none')",

}

new Testcase({
    name: 'onetime schedule new',
    testcase() {
        this.click(cloudMap['Schedules'])
        this.click(cloudMap['Create New'])
        this.click(cloudMap['Create One-Time Schedule'])
        this.set(cloudMap['Name'], "onetime one")
        this.click(cloudMap['Start Date'])
        this.click(cloudMap['Select'])
        this.click(cloudMap['End Date'])
        this.set(cloudMap['Last Day'], 22)
        this.click(cloudMap['Select'])
        this.set(cloudMap['Pre-expiration Event Log'], 5)
        this.click(cloudMap['Save'])
        this.click(cloudMap['OK'])
    },
    verify() {
        this.isCheck(gateMap['Type Onetime'])
        this.isSet(gateMap['Name'], "onetime one")

        this.isCheck(gateMap['Pre-expiration event log'])
        this.isSet(gateMap['Number of days before'], 5)
    }
})

new Testcase({
    name: 'onetime schedule delete',
    testcase() {
        this.click(cloudMap['Schedules'])
        this.click(cloudMap['Delete Onetime one'])
        this.click(cloudMap['YES'])
    },
    verify() {
        this.click(gateMap['Schedules'])
        this.isDelete(gateMap['OneTime One'])
    }
})

new Testcase({
    name: 'recurring schedule new',
    testcase() {
        this.click(cloudMap['Schedules'])
        this.click(cloudMap['Create New'])
        this.click(cloudMap['Create Recurring Schedule'])
        this.set('Name', "recurring one")
        this.check(cloudMap['Monday'])
        this.check(cloudMap['Tuesday'])
        this.check(cloudMap['Wednesday'])
        this.check(cloudMap['Thursday'])
        this.check(cloudMap['Friday'])
        this.check(cloudMap['Saturday'])
        this.set('Time', 10) // todo: can't set by call val(), when click add success
        this.click(cloudMap['Save'])
        this.click(cloudMap['OK'])
    },
    verify() {
        this.isCheck(gateMap['Type Recurring'])
        this.isSet(gateMap['Name'], "recurring one")
        this.isUncheck(gateMap['Sunday'])
        this.isCheck(gateMap['Monday'])
        this.isCheck(gateMap['Tuesday'])
        this.isCheck(gateMap['Wednesday'])
        this.isCheck(gateMap['Thursday'])
        this.isCheck(gateMap['Friday'])
        this.isCheck(gateMap['Saturday'])
        this.isCheck(gateMap['All Day'])
        this.isSet(gateMap['Start Hour'], 10)
        this.isSet(gateMap['Start Min'], 10)
        this.isSet(gateMap['Stop Hour'], 10)
        this.isSet(gateMap['Stop Min'], 10)
    }
})

new Testcase({
    name: 'recurring schedule delete',
    testcase() {
        this.click(cloudMap['Schedules'])
        this.click(cloudMap['Delete Recurring One'])
        this.click(cloudMap['YES'])
    },
    verify() {
        this.click(gateMap['Schedules'])
        this.isDelete(gateMap['Recurring One'])
    }
})

new Testcase({
    name: 'schedule group new',
    testcase() {
        this.click(cloudMap['Schedules'])
        this.click(cloudMap['Create New'])
        this.click(cloudMap['Create Schedule Group'])
        this.set(cloudMap['Name'], "schedule group one")
        this.click(cloudMap['Members'])
        this.click(cloudMap['Members Always'])
        this.click(cloudMap['Members None'])
        this.click(cloudMap['Save'])
        this.click(cloudMap['OK'])
    },
    verify() {
        this.isSet(gateMap['Name'], "schedule group one")
        this.has(gateMap['Members Always'])
        this.has(gateMap['Members None'])
    }
})

new Testcase({
    name: 'schedule group delete',
    testcase() {
        this.click(cloudMap['Schedules'])
        this.click(cloudMap['Delete Schedule Group One'])
        this.click(cloudMap['YES'])
    },
    verify() {
        this.click(gateMap['Schedules'])
        this.isDelete(gateMap['Schedule Group One'])
    }
})