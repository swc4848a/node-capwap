let Testcase = require('../../src/testcase.js');

let cloudMap = {
    'FortiGuard': "div.gwt-HTML:contains('FortiGuard')",
    'Accept Push Updates': "#fcld-fortiGuardEditor-acceptPush > input",
    'Scheduled Updates': "#fcld-fortiGuardEditor-scheduledUpdate > input",
    'Improve IPS Quality': "#fcld-fortiGuardEditor-improveIpsQ > input",
    'Use Extended IPS Signature Package': "#fcld-fortiGuardEditor-useExtendedIps > input",
    'Web Filter Cache': "#fcld-fortiGuardEditor-webfilterCache > input",
    'Anti-Spam Cache': "#fcld-fortiGuardEditor-antispamCache > input",
    
    'Scheduled Updates Type': "select.gwt-ListBox:eq(0)",
    'Scheduled Updates Weekday': "select.gwt-ListBox:eq(1)",
    'Scheduled Updates Hour': "select.gwt-ListBox:eq(2)",
    'Scheduled Updates AM/PM Hour': "select.gwt-ListBox:eq(3)",
    'Scheduled Updates AM/PM': "select.gwt-ListBox:eq(4)",
    'Save': "span:contains('Save')",
}

let gateMap = {
    'System': "//span[text()='System']",
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
    
    "Web Filter Cache Mins": "input[ng-model='filter.webFilterCache.ttl']",
    "Anti Spam Cache Mins": "input[ng-model='filter.antispamCache.ttl']",
}

function displayCloudPage(obj) {
    obj.click(cloudMap['FortiGuard'])
    obj.wait(3000)
}

function displayGatePage(obj) {
    obj.click(gateMap['System'])
    obj.wait(500)
    obj.click(gateMap['FortiGuard'])
    obj.wait(2000)
}

let every_hour = 5
let daily_clock = 2
let daily_AMPM = "AM"
let weekly_AMPM = "PM"
let weekly_day = "Monday"
let web_filter_cache = 50
let anti_spam_cache = 40
let weekly_clock = 3

new Testcase({
    name: 'fortigurad edit enable all checkbox',
    testcase() {
        displayCloudPage(this)
        this.check('#fcld-fortiGuardEditor-acceptPush > input')
        this.check('#fcld-fortiGuardEditor-improveIpsQ > input')
        this.check('#fcld-fortiGuardEditor-useExtendedIps > input')
        this.check('#fcld-fortiGuardEditor-scheduledUpdate > input')
        this.check('#fcld-fortiGuardEditor-webfilterCache > input')
        this.check('#fcld-fortiGuardEditor-antispamCache > input')
        this.click('#fcld-fortiGuardEditor-save')
        this.wait(2000)
    },
    verify() {
        displayGatePage(this)
        this.isCheck(gateMap['Accept Push Updates'])
        this.isCheck(gateMap['Scheduled Updates'])
        this.isCheck(gateMap['Improve IPS Quality'])
        this.isCheck(gateMap['Use Extended IPS Signature Package'])
        this.isCheck(gateMap['Web Filter Cache'])
        this.isCheck(gateMap['Anti-Spam Cache'])
    }
})

new Testcase({
    name: 'fortigurad edit disable all checkbox',
    testcase() {
        displayCloudPage(this)
        this.uncheck('#fcld-fortiGuardEditor-acceptPush > input')
        this.uncheck('#fcld-fortiGuardEditor-improveIpsQ > input')
        this.uncheck('#fcld-fortiGuardEditor-useExtendedIps > input')
        this.uncheck('#fcld-fortiGuardEditor-scheduledUpdate > input')
        this.uncheck('#fcld-fortiGuardEditor-webfilterCache > input')
        this.uncheck('#fcld-fortiGuardEditor-antispamCache > input')
        this.click('#fcld-fortiGuardEditor-save')
        this.wait(2000)
    },
    verify() {
        displayGatePage(this)
        this.isUncheck(gateMap['Accept Push Updates'])
        this.isUncheck(gateMap['Scheduled Updates'])
        this.isUncheck(gateMap['Improve IPS Quality'])
        this.isUncheck(gateMap['Use Extended IPS Signature Package'])
        this.isUncheck(gateMap['Web Filter Cache'])
        this.isUncheck(gateMap['Anti-Spam Cache'])
    }
})
/*
new Testcase({
    name: 'fortigurad edit every',
    testcase() {
        this.click(cloudMap['FortiGuard'])
        this.wait(3000)
        this.click('#fcld-fortiGuardEditor-scheduledUpdate > input')
        this.evaluate(`FcldUiTest.setUiObjectValue("fortiGuardEditor-frequency", "Every")`)
        this.evaluate(`FcldUiTest.setUiObjectValue("fortiGuardEditor-timeHours24", "${every_hour}")`)
        this.wait(1000)
        this.click(cloudMap['Save'])
    },
    verify() {
        displayGatePage(this)
        this.isSet(gateMap['Scheduled Updates Type'], "every")
        this.isSet(gateMap['Scheduled Updates Every Hour'], every_hour)
    }
})

new Testcase({
    name: 'fortigurad edit daily',
    testcase() {
        this.click(cloudMap['FortiGuard'])
        this.wait(2000)
        this.click(cloudMap['Scheduled Updates'])
        this.evaluate(`FcldUiTest.setUiObjectValue("fortiGuardEditor-frequency", "Daily")`)
        this.evaluate(`FcldUiTest.setUiObjectValue("fortiGuardEditor-timeClock12", "${daily_clock}")`)
        this.evaluate(`FcldUiTest.setUiObjectValue("fortiGuardEditor-amPm", "${daily_AMPM}")`)
        this.click(cloudMap['Save']
    },
    verify() {
        this.click(gateMap['FortiGuard'])
        this.isSet(gateMap['Scheduled Updates Type'], "daily")
        this.isSet(gateMap['Scheduled Updates Daily Hour'], daily_clock)
        this.isSet(gateMap['Scheduled Updates Daily Period'], "string:pm")
    }
})

new Testcase({
    name: 'fortigurad edit weekly',
    testcase() {
        this.click(cloudMap['FortiGuard'])
        this.click(cloudMap['Scheduled Updates'])
        this.evaluate(`FcldUiTest.setUiObjectValue("fortiGuardEditor-frequency", "Weekly")`)
        this.evaluate(`FcldUiTest.setUiObjectValue("fortiGuardEditor-day", "${weekly_day}")`)
        this.evaluate(`FcldUiTest.setUiObjectValue("fortiGuardEditor-timeClock12", "${weekly_clock}")`)
        this.evaluate(`FcldUiTest.setUiObjectValue("fortiGuardEditor-amPm", "${weekly_AMPM}")`)
        this.click(cloudMap['Save'])
    },
    verify() {
        this.click(gateMap['FortiGuard'])
        this.isSet(gateMap['Scheduled Updates Type'], "weekly")
        this.isSet(gateMap['Scheduled Updates Weekday'], "string:Friday")
        this.isSet(gateMap['Scheduled Updates AM/PM Hour'], weekly_clock)
        this.isSet(gateMap['Scheduled Updates AM/PM'], "string:am")
    }
})

new Testcase({
    name: 'fortigurad edit Web Filter Cache',
    testcase() {
        this.click(cloudMap['FortiGuard'])
        this.click(cloudMap['Web Filter Cache'])
        this.set("#fcld-fortiGuardEditor-webfilterCacheTtl", ${web_filter_cache})
        this.click(cloudMap['Save'])
    },
    verify() {
        this.click(gateMap['FortiGuard'])
        this.isSet(gateMap['Web Filter Cache Mins'], "web_filter_cache")
    }
})

new Testcase({
    name: 'fortigurad edit Anti Spam Cache',
    testcase() {
        this.click(cloudMap['FortiGuard'])
        this.click(cloudMap['Anti-Spam Cache'])
        this.evaluate(`FcldUiTest.setUiObjectValue("fortiGuardEditor-antispamCacheTtl", "${anti_spam_cache}")`)
        this.click(cloudMap['Save'])
    },
    verify() {
        this.click(gateMap['FortiGuard'])
        this.isSet(gateMap['Anti Spam Cache Mins'], "anti_spam_cache")
    }
})
*/