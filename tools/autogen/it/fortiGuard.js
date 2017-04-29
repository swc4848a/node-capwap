let Testcase = require('../testcase.js');

let map = {
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

new Testcase('fortigurad edit, enable all checkbox', map, (t) => {
    t.click('FortiGuard')
    t.click('Accept Push Updates')
    t.click('Scheduled Updates')
    t.click('Improve IPS Quality')
    t.click('Use Extended IPS Signature Package')
    t.click('Web Filter Cache')
    t.click('Anti-Spam Cache')
    t.click('Save')
})

new Testcase('fortigurad edit every', map, (t) => {
    t.click('FortiGuard')

    t.set('Scheduled Updates Type', "EVERY")
    t.set('Scheduled Updates Hour', 20)

    t.click('Save')
})

new Testcase('fortigurad edit daily', map, (t) => {
    t.click('FortiGuard')

    t.set('Scheduled Updates Type', "DAILY")
    t.set('Scheduled Updates AM/PM Hour', 12)
    t.set('Scheduled Updates AM/PM', "PM")

    t.click('Save')
})

new Testcase('fortigurad edit weekly', map, (t) => {
    t.click('FortiGuard')

    t.set('Scheduled Updates Type', "WEEKLY")
    t.set('Scheduled Updates Weekday', "FRIDAY")
    t.set('Scheduled Updates AM/PM Hour', 12)
    t.set('Scheduled Updates AM/PM', "PM") // todo: GUI bug, 12:00 errror

    t.click('Save')
})

new Testcase('fortigurad edit, disable all checkbox', map, (t) => {
    t.click('FortiGuard')
    t.unchecked('Disable All Checkbox')
    t.click('Save')
})


// // todo: select control test
// cases['fortigurad edit, enable all checkbox'] = [
//     ["div.gwt-HTML:contains('FortiGuard')", undefined, "a[ng-href='system/fortiguard']"],
//     ["input:checkbox:eq(0)", true, "input#avips-push-chk"],
//     ["input:checkbox:eq(1)", true, "input#avips-schd-chk"],
//     ["input:checkbox:eq(2)", true, "input#avips-submit-chk"],
//     ["input:checkbox:eq(3)", true, "input#avips-db-chk"],
//     ["input:checkbox:eq(4)", true, "input#filter-wfcache-chk"],
//     ["input:checkbox:eq(5)", true, "input#filter-ascache-chk"],
//     ["span:contains('Save')", undefined, "skip"],
// ]
