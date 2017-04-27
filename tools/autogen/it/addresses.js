let cases = require('./root.js');

// todo: can't dbbclick span:contains('new address') and after click save gui post put twice
cases['address new'] = [
    ["div.gwt-HTML:contains('Addresses')", undefined, "a[ng-href='page/p/firewall/object/address/']"],
    ["button[title='Create New']", undefined, "span:contains('address new')", { action: "dblclick" }],
    ["div.filter_text:contains('Address'):eq(0)", undefined, "span:contains('Address'):eq(0)"],
    ["input.gwt-TextBox:eq(0)", "address new", "input#name"],
    ["input.gwt-TextBox:eq(1)", "192.168.100.100/255.255.255.0", "input#ipmask"],
    ["input:checkbox:eq(0)", true, "input#visibility"],
    ["input:checkbox:eq(1)", true, "input#allow-routing"],
    ["textarea.gwt-TextArea", "test comments", "textarea#comment"],
    ["span:contains('Save')", undefined, "skip"],
    ["button:contains('OK')", undefined, "skip"], // todo: double put, just skip it.
]

let key = 'group one';
cases['address group new'] = [
    ["div.gwt-HTML:contains('Addresses')", undefined, "a[ng-href='page/p/firewall/object/address/']"],
    ["button[title='Create New']", undefined, "tr[mkey='" + key + "']"],
    ["div.filter_text:contains('Address'):eq(1)", undefined, "button:contains('Edit'):eq(0)"],
    ["input.gwt-TextBox:eq(0)", key, "input#name"],
    ["div.gwt-HTML:contains(' - ')", undefined, "skip"], // todo: gate click bug
    ["div.gwt-HTML:contains('address new'):eq(0)", undefined, "skip"],
    ["div.gwt-DecoratedPopupPanel", { action: "hide" }, "skip"],
    ["input:checkbox:eq(0)", true, "input#visibility"], // todo: bug
    ["input:checkbox:eq(1)", true, "input#allow-routing"],
    ["textarea.gwt-TextArea", "comments test", "textarea#comment"],
    ["span:contains('Save')", undefined, "skip"],
    ["button:contains('OK')", undefined, "skip"], // todo: double put, just skip it.
]

module.exports = cases;
