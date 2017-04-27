let cases = require('./root.js');

let key = 'service one';
cases['service new'] = [
    ["div.gwt-HTML:contains('Services')", undefined, "a[ng-href='page/p/firewall/object/service/']"],
    ["button[title='Create New']", undefined, "tr[mkey='" + key + "']"],
    ["div.filter_text:contains('Service'):eq(0)", undefined, "button:contains('Edit'):eq(0)"],
    ["input.gwt-TextBox:eq(0)", key, "input#name"],
    ["input.gwt-TextBox:eq(1)", "3.3.3.3", "input#addr"],
    ["input.gwt-TextBox:eq(2)", "111", "input.dlow"],
    ["input.gwt-TextBox:eq(3)", "222", "input.dhigh"],
    ["textarea.gwt-TextArea", "test comments", "textarea#comment"],
    ["span:contains('Save')", undefined, "skip"],
    ["button:contains('OK')", undefined, "skip"], // todo: double put, just skip it.
]

key = 'service group one';
cases['service group new'] = [
    ["div.gwt-HTML:contains('Services')", undefined, "a[ng-href='page/p/firewall/object/service/']"],
    ["button[title='Create New']", undefined, "tr[mkey='" + key + "']"],
    ["div.filter_text:contains('Service'):eq(1)", undefined, "button:contains('Edit'):eq(0)"],
    ["input.gwt-TextBox:eq(0)", key, "input#name"],
    ["div.gwt-HTML:contains(' - ')", undefined, "skip"], // todo: gate: skip members check
    ["div.gwt-HTML:contains('HTTP')", undefined, "skip"],
    ["div.gwt-HTML:contains('FTP')", undefined, "skip"],
    ["div.gwt-DecoratedPopupPanel", { action: "hide" }, "skip"],
    ["textarea.gwt-TextArea", "test comments", "textarea#comment"],
    ["span:contains('Save')", undefined, "skip"],
    ["button:contains('OK')", undefined, "skip"], // todo: double put, just skip it.
]

key = 'category test one';
cases['category new'] = [
    ["div.gwt-HTML:contains('Services')", undefined, "a[ng-href='page/p/firewall/object/service/']"],
    ["button[title='Create New']", undefined, "skip"],
    ["div.filter_text:contains('Category')", undefined, "skip"],
    ["input.gwt-TextBox:eq(0)", key, "skip"],
    ["textarea.gwt-TextArea", "test comments", "skip"],
    ["span:contains('Save')", undefined, "skip"],
    ["button:contains('OK')", undefined, "skip"], // todo: double put, just skip it.
]

module.exports = cases;
