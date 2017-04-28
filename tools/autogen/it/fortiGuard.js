let Testcase = require('../testcase.js');

let map = {
    'FortiGuard': "div.gwt-HTML:contains('FortiGuard')",
    'Accept Push Updates': "input:checkbox:eq(0)~label",
    'Scheduled Updates': "input:checkbox:eq(1)~label",
    'Improve IPS Quality': "input:checkbox:eq(2)~label",
    'Use Extended IPS Signature Package': "input:checkbox:eq(3)~label",
    'Web Filter Cache': "input:checkbox:eq(4)~label",
    'Anti-Spam Cache': "input:checkbox:eq(5)~label",
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
