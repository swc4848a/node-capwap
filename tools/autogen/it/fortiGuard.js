let cases = require('./root.js');

// todo: select control test
cases['fortigurad edit, enable all checkbox'] = [
    ["div.gwt-HTML:contains('FortiGuard')", undefined, "a[ng-href='system/fortiguard']"],
    ["input:checkbox:eq(0)", true, "input#avips-push-chk"],
    ["input:checkbox:eq(1)", true, "input#avips-schd-chk"],
    ["input:checkbox:eq(2)", true, "input#avips-submit-chk"],
    ["input:checkbox:eq(3)", true, "input#avips-db-chk"],
    ["input:checkbox:eq(4)", true, "input#filter-wfcache-chk"],
    ["input:checkbox:eq(5)", true, "input#filter-ascache-chk"],
    ["span:contains('Save')", undefined, "skip"],
]

module.exports = cases;
