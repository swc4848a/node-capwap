let Testcase = require('../../src/testcase.js');

let cloudMap = {
    'FortiGuard': "div.gwt-HTML:contains('FortiGuard')",
    'Accept Push Updates': "input:checkbox:eq(0)",
    'Scheduled Updates': "input:checkbox:eq(1)",
    'Improve IPS Quality': "input:checkbox:eq(2)",
    'Use Extended IPS Signature Package': "input:checkbox:eq(3)",
    'Web Filter Cache': "input:checkbox:eq(4)",
    'Anti-Spam Cache': "input:checkbox:eq(5)",
    'All Checkbox': "input:checkbox",

    'Scheduled Updates Type': "select.gwt-ListBox:eq(0)",
    'Scheduled Updates Weekday': "select.gwt-ListBox:eq(1)",
    'Scheduled Updates Hour': "select.gwt-ListBox:eq(2)",
    'Scheduled Updates AM/PM Hour': "select.gwt-ListBox:eq(3)",
    'Scheduled Updates AM/PM': "select.gwt-ListBox:eq(4)",

    'Save': "span:contains('Save')",
}

let gateMap = {
    'FortiGuard': "a[ng-href='system/fortiguard']",
    'Accept Push Updates': "input#avips-push-chk",
    'Scheduled Updates': "input#avips-schd-chk",
    'Improve IPS Quality': "input#avips-submit-chk",
    'Use Extended IPS Signature Package': "input#avips-db-chk",
    'Web Filter Cache': "input#filter-wfcache-chk",
    'Anti-Spam Cache': "input#filter-ascache-chk",

    'Scheduled Updates Type': "select#schd-upd-method",
    'Scheduled Updates Weekday': "select[ng-model='avIps.scheduledUpdate.weekly.day']",
    'Scheduled Updates Every Hour': "input[ng-model='avIps.scheduledUpdate.every.hour']",
    'Scheduled Updates Daily Hour': "input[ng-model='avIps.scheduledUpdate.daily.hour']",
    'Scheduled Updates AM/PM Hour': "input[ng-model='avIps.scheduledUpdate.weekly.hour']",
    'Scheduled Updates Daily Period': "select[ng-model='avIps.scheduledUpdate.daily.period']",
    'Scheduled Updates AM/PM': "select[ng-model='avIps.scheduledUpdate.weekly.period']",
}

new Testcase({
    name: 'fortigurad edit enable all checkbox',
    testcase() {
        this.click(cloudMap['FortiGuard'])
        this.wait(2000)
        this.check(cloudMap['Accept Push Updates'])
        this.check(cloudMap['Scheduled Updates'])
        this.check(cloudMap['Improve IPS Quality'])
        this.check(cloudMap['Use Extended IPS Signature Package'])
        this.check(cloudMap['Web Filter Cache'])
        this.check(cloudMap['Anti-Spam Cache'])
        this.click(cloudMap['Save'])
        this.wait(2000)
    },
    verify() {
        this.click(gateMap['FortiGuard'])
        this.isCheck(gateMap['Accept Push Updates'])
        this.isCheck(gateMap['Scheduled Updates'])
        this.isCheck(gateMap['Improve IPS Quality'])
        this.isCheck(gateMap['Use Extended IPS Signature Package'])
        this.isCheck(gateMap['Web Filter Cache'])
        this.isCheck(gateMap['Anti-Spam Cache'])
    }
})

new Testcase({
    name: 'fortigurad edit every',
    testcase() {
        this.click(cloudMap['FortiGuard'])
        this.wait(2000)
        this.set(cloudMap['Scheduled Updates Type'], "EVERY")
        this.set(cloudMap['Scheduled Updates Hour'], 20)
        this.wait(1000)
        this.click(cloudMap['Save'])
    },
    verify() {
        this.click(gateMap['FortiGuard'])
        this.isSet(gateMap['Scheduled Updates Type'], "every")
        this.isSet(gateMap['Scheduled Updates Every Hour'], 20)
    }
})

new Testcase({
    name: 'fortigurad edit daily',
    testcase() {
        this.click(cloudMap['FortiGuard'])
        this.wait(2000)
        this.set(cloudMap['Scheduled Updates Type'], "DAILY")
        this.set(cloudMap['Scheduled Updates AM/PM Hour'], 12)
        this.set(cloudMap['Scheduled Updates AM/PM'], "PM")
        this.click(cloudMap['Save'])
    },
    verify() {
        this.click(gateMap['FortiGuard'])
        this.isSet(gateMap['Scheduled Updates Type'], "daily")
        this.isSet(gateMap['Scheduled Updates Daily Hour'], 12)
        this.isSet(gateMap['Scheduled Updates Daily Period'], "string:pm")
    }
})

new Testcase({
    name: 'fortigurad edit weekly',
    testcase() {
        this.click(cloudMap['FortiGuard'])
        this.set(cloudMap['Scheduled Updates Type'], "WEEKLY")
        this.set(cloudMap['Scheduled Updates Weekday'], "FRIDAY")
        this.set(cloudMap['Scheduled Updates AM/PM Hour'], 12)
        this.set(cloudMap['Scheduled Updates AM/PM'], "PM") // todo: GUI bug, 12:00 error
        this.click(cloudMap['Save'])
    },
    verify() {
        this.click(gateMap['FortiGuard'])
        this.isSet(gateMap['Scheduled Updates Type'], "weekly")
        this.isSet(gateMap['Scheduled Updates Weekday'], "string:Friday")
        this.isSet(gateMap['Scheduled Updates AM/PM Hour'], 12)
        this.isSet(gateMap['Scheduled Updates AM/PM'], "string:pm")
    }
})

new Testcase({
    name: 'fortigurad edit disable all checkbox',
    testcase() {
        this.click(cloudMap['FortiGuard'])
        this.wait(2000)
        this.uncheck(cloudMap['Accept Push Updates'])
        this.uncheck(cloudMap['Scheduled Updates'])
        this.uncheck(cloudMap['Improve IPS Quality'])
        this.uncheck(cloudMap['Use Extended IPS Signature Package'])
        this.uncheck(cloudMap['Web Filter Cache'])
        this.uncheck(cloudMap['Anti-Spam Cache'])
        this.uncheck(cloudMap['Save'])
        this.wait(2000)
    },
    verify() {
        this.click(gateMap['FortiGuard'])
        this.isUncheck(gateMap['Accept Push Updates'])
        this.isUncheck(gateMap['Scheduled Updates'])
        this.isUncheck(gateMap['Improve IPS Quality'])
        this.isUncheck(gateMap['Use Extended IPS Signature Package'])
        this.isUncheck(gateMap['Web Filter Cache'])
        this.isUncheck(gateMap['Anti-Spam Cache'])
    }
})