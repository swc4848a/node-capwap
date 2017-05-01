// let cases = require('./root.js');

// // todo: can't dbbclick span:contains('new address') and after click save gui post put twice
// cases['address new'] = [
//     ["div.gwt-HTML:contains('Addresses')", undefined, "a[ng-href='page/p/firewall/object/address/']"],
//     ["button[title='Create New']", undefined, "span:contains('address new')", { action: "dblclick" }],
//     ["div.filter_text:contains('Address'):eq(0)", undefined, "span:contains('Address'):eq(0)"],
//     ["input.gwt-TextBox:eq(0)", "address new", "input#name"],
//     ["input.gwt-TextBox:eq(1)", "192.168.100.100/255.255.255.0", "input#ipmask"],
//     ["input:checkbox:eq(0)", true, "input#visibility"],
//     ["input:checkbox:eq(1)", true, "input#allow-routing"],
//     ["textarea.gwt-TextArea", "test comments", "textarea#comment"],
//     ["span:contains('Save')", undefined, "skip"],
//     ["button:contains('OK')", undefined, "skip"], // todo: double put, just skip it.
// ]

// let key = 'group one';
// cases['address group new'] = [
//     ["div.gwt-HTML:contains('Addresses')", undefined, "a[ng-href='page/p/firewall/object/address/']"],
//     ["button[title='Create New']", undefined, "tr[mkey='" + key + "']"],
//     ["div.filter_text:contains('Address'):eq(1)", undefined, "button:contains('Edit'):eq(0)"],
//     ["input.gwt-TextBox:eq(0)", key, "input#name"],
//     ["div.gwt-HTML:contains(' - ')", undefined, "skip"], // todo: gate click bug
//     ["div.gwt-HTML:contains('address new'):eq(0)", undefined, "skip"],
//     ["div.gwt-DecoratedPopupPanel", { action: "hide" }, "skip"],
//     ["input:checkbox:eq(0)", true, "input#visibility"], // todo: bug
//     ["input:checkbox:eq(1)", true, "input#allow-routing"],
//     ["textarea.gwt-TextArea", "comments test", "textarea#comment"],
//     ["span:contains('Save')", undefined, "skip"],
//     ["button:contains('OK')", undefined, "skip"], // todo: double put, just skip it.
// ]

// module.exports = cases;


let Testcase = require('../testcase.js');

let cloudMap = {
    'Addresses': "div.gwt-HTML:contains('Addresses')",
    'Create New': "button[title='Create New']",
    'Create Address': "div.filter_text:contains('Address'):eq(0)",
    'Name': "input.gwt-TextBox:eq(0)",
    'IP/Netmask': "input.gwt-TextBox:eq(1)",
    'Visibility': "input:checkbox:eq(0)",
    'Static Route': "input:checkbox:eq(1)",
    'Comments': "textarea.gwt-TextArea",
    'Save': "span:contains('Save')",
    'OK': "button:contains('OK')",

    'Create Address Group': "div.filter_text:contains('Address'):eq(1)",
    'Members': "div.gwt-HTML:contains(' - ')",
    'address new': "div.gwt-HTML:contains('address new'):eq(0)",
    'Popup Pannel': "div.gwt-DecoratedPopupPanel",
}

let gateMap = {
    'Addresses': "a[ng-href='page/p/firewall/object/address/']",
    'Name': "input#name",
    'IP/Netmask': "input#ipmask",
    'Visibility': "input#visibility",
    'Static Route': "input#allow-routing",
    'Comments': "textarea#comment",
}

new Testcase({
    name: 'address new',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Addresses')
        c.click('Create New')
        c.click('Create Address')
        c.set('Name', "address new")
        c.set('IP/Netmask', "192.168.100.100/255.255.255.0")
        c.checked('Visibility')
        c.checked('Static Route')
        c.set('Comments', "test comments")
        c.click('Save')
        c.click('OK')
    },
    verify: (g) => {
        g.click('Addresses')
        g.isSet('Name', "address new")
        g.isSet('IP/Netmask', "192.168.100.100/255.255.255.0")
        g.isChecked('Visibility')
        g.isChecked('Static Route')
        g.isSet('Comments', "test comments")
    }
})

new Testcase({
    name: 'address group new',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Addresses')
        c.click('Create New')
        c.click('Create Address Group')
        c.set('Name', "group new")
        c.click('Members')
        c.click('address new')
        c.hide('Popup Pannel')
        c.checked('Visibility')
        c.checked('Static Route')
        c.set('Comments', "test comments")
        c.click('Save')
        c.click('OK')
    },
    verify: (g) => {
        g.click('Addresses')
        g.isSet('Name', "group new")
        g.isChecked('Visibility')
        g.isChecked('Static Route')
        g.isSet('Comments', "test comments")
        g.click('Save')
        g.click('OK')
    }
})
