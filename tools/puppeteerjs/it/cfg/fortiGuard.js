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

let every_hour = undefined
let daily_clock = undefined
let daily_AMPM = undefined
let weekly_AMPM = undefined
let weekly_day = undefined
let web_filter_cache = undefined
let anti_spam_cache = undefined
let weekly_clock = undefined

new Testcase({
    name: 'fortigurad edit enable all checkbox',
    testcase() {
        this.click(cloudMap['FortiGuard'])
        this.wait(3000)
        this.check('#fcld-fortiGuardEditor-acceptPush > input')
        this.check('#fcld-fortiGuardEditor-improveIpsQ > input')
        this.check('#fcld-fortiGuardEditor-useExtendedIps > input')
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
    name: 'fortigurad edit disable all checkbox',
    testcase() {
        this.click(cloudMap['FortiGuard'])
        this.uncheck(cloudMap['Accept Push Updates'])
        this.uncheck(cloudMap['Scheduled Updates'])
        this.uncheck(cloudMap['Improve IPS Quality'])
        this.uncheck(cloudMap['Use Extended IPS Signature Package'])
        this.uncheck(cloudMap['Web Filter Cache'])
        this.uncheck(cloudMap['Anti-Spam Cache'])
        this.click(cloudMap['Save'])
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

new Testcase({
    name: 'fortigurad edit every',
    testcase() {
        this.click(cloudMap['FortiGuard'])
        this.wait(2000)
        this.click(cloudMap['Scheduled Updates'])
        this.evaluate(`FcldUiTest.setUiObjectValue("FortiGuardEditor-frequency", "Every")`)
        this.evaluate(`FcldUiTest.setUiObjectValue("FortiGuardEditor-timeHours24", "${every_hour}")`)
        this.wait(1000)
        this.click(cloudMap['Save'])
    },
    verify() {
        this.click(gateMap['FortiGuard'])
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
        this.evaluate(`FcldUiTest.setUiObjectValue("FortiGuardEditor-frequency", "Daily")`)
        this.evaluate(`FcldUiTest.setUiObjectValue("FortiGuardEditor-timeClock12", "${daily_clock}")`)
        this.evaluate(`FcldUiTest.setUiObjectValue("FortiGuardEditor-amPm", "${daily_AMPM}")`)
        this.click(cloudMap['Save'])
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
        this.evaluate(`FcldUiTest.setUiObjectValue("FortiGuardEditor-frequency", "weekly")`)
        this.evaluate(`FcldUiTest.setUiObjectValue("FortiGuardEditor-day", "${weekly_day}")`)
        this.evaluate(`FcldUiTest.setUiObjectValue("FortiGuardEditor-timeClock12", "${weekly_clock}")`)
        this.evaluate(`FcldUiTest.setUiObjectValue("FortiGuardEditor-amPm", "${weekly_AMPM}")`)
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
        this.evaluate(`FcldUiTest.setUiObjectValue("FortiGuardEditor-webfilterCacheTtl", "${web_filter_cache}")`)
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
        this.evaluate(`FcldUiTest.setUiObjectValue("FortiGuardEditor-antispamCacheTtl", "${anti_spam_cache}")`)
        this.click(cloudMap['Save'])
    },
    verify() {
        this.click(gateMap['FortiGuard'])
        this.isSet(gateMap['Anti Spam Cache Mins'], "anti_spam_cache")
    }
})
