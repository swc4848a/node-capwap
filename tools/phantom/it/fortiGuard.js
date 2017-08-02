let Testcase = require('../testcase.js');

let cloudMap = {
    'FortiGuard': "div.gwt-HTML:contains('FortiGuard')",
    'Accept Push Updates': "input:checkbox:eq(0)~label",
    'Scheduled Updates': "input:checkbox:eq(1)~label",
    'Improve IPS Quality': "input:checkbox:eq(2)~label",
    'Use Extended IPS Signature Package': "input:checkbox:eq(3)~label",
    'Web Filter Cache': "input:checkbox:eq(4)~label",
    'Anti-Spam Cache': "input:checkbox:eq(5)~label",
    'Disable All Checkbox': "input:checkbox",

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
    name: 'fortigurad edit, enable all checkbox',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('FortiGuard')
        c.click('Accept Push Updates')
        c.click('Scheduled Updates')
        c.click('Improve IPS Quality')
        c.click('Use Extended IPS Signature Package')
        c.click('Web Filter Cache')
        c.click('Anti-Spam Cache')
        c.click('Save')
    },
    verify: (g) => {
        g.click('FortiGuard')
        g.isChecked('Accept Push Updates')
        g.isChecked('Scheduled Updates')
        g.isChecked('Improve IPS Quality')
        g.isChecked('Use Extended IPS Signature Package')
        g.isChecked('Web Filter Cache')
        g.isChecked('Anti-Spam Cache')
    }
})

new Testcase({
    name: 'fortigurad edit every',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('FortiGuard')

        c.set('Scheduled Updates Type', "EVERY")
        c.set('Scheduled Updates Hour', 20)

        c.click('Save')
    },
    verify: (g) => {
        g.click('FortiGuard')
        g.isSet('Scheduled Updates Type', "every")
        g.isSet('Scheduled Updates Every Hour', 20)
    }
})

new Testcase({
    name: 'fortigurad edit daily',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('FortiGuard')

        c.set('Scheduled Updates Type', "DAILY")
        c.set('Scheduled Updates AM/PM Hour', 12)
        c.set('Scheduled Updates AM/PM', "PM")

        c.click('Save')
    },
    verify: (g) => {
        g.click('FortiGuard')
        g.isSet('Scheduled Updates Type', "daily")
        g.isSet('Scheduled Updates Daily Hour', 12)
        g.isSet('Scheduled Updates Daily Period', "string:pm")
    }
})

new Testcase({
    name: 'fortigurad edit weekly',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('FortiGuard')

        c.set('Scheduled Updates Type', "WEEKLY")
        c.set('Scheduled Updates Weekday', "FRIDAY")
        c.set('Scheduled Updates AM/PM Hour', 12)
        c.set('Scheduled Updates AM/PM', "PM") // todo: GUI bug, 12:00 errror

        c.click('Save')
    },
    verify: (g) => {
        g.click('FortiGuard')
        g.isSet('Scheduled Updates Type', "weekly")
        g.isSet('Scheduled Updates Weekday', "string:Friday")
        g.isSet('Scheduled Updates AM/PM Hour', 12)
        g.isSet('Scheduled Updates AM/PM', "string:pm")
    }
})

new Testcase({
    name: 'fortigurad edit, disable all checkbox',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('FortiGuard')
        c.unchecked('Disable All Checkbox')
        c.click('Save')
    },
    verify: (g) => {
        g.click('FortiGuard')
        g.isUnchecked('Accept Push Updates')
        g.isUnchecked('Scheduled Updates')
        g.isUnchecked('Improve IPS Quality')
        g.isUnchecked('Use Extended IPS Signature Package')
        g.isUnchecked('Web Filter Cache')
        g.isUnchecked('Anti-Spam Cache')
    }
})
