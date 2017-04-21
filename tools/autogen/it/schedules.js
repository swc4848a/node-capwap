let cases = require('./root.js');

let key = 'onetime one';
cases['one time schedule new'] = [
    ["div.gwt-HTML:contains('Schedules')", undefined, "a[ng-href='page/p/firewall/object/schedule/']"],
    ["button[title='Create New']", undefined, "tr[mkey='" + key + "']"],
    ["div.filter_text:contains('One-Time Schedule')", undefined, "button:contains('Edit'):eq(0)"],
    ["input.gwt-TextBox:eq(0)", key, "input#name"],
    ["img.html-link:eq(0)", undefined, "skip"], // click start day
    ["button:contains('Select')", undefined, "skip"],
    ["img.html-link:eq(1)", undefined, "skip"], // click end date
    ["select.gwt-ListBox:eq(0)", 23, "skip"], // select last day of that month
    ["button:contains('Select')", undefined, "skip"],
    ["input.gwt-TextBox:eq(1)", 5, "input#expiration-days"],
    ["span:contains('Save')", undefined, "skip"],
    ["button:contains('OK')", undefined, "skip"], // todo: double put, just skip it.
]

delete cases['one time schedule new'];

module.exports = cases;
