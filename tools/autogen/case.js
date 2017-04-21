'use strict';

let cases = {};

// [cloud-selector, {value}, gate-selector, {skip}
cases['login (must be first step)'] = [
    ["input#email", "zqqiang@fortinet.com", "input#username", "admin"],
    ["input[name='password']", "SuperCRM801", "input#secretkey"],
    ["input[type='submit']", undefined, "button#login_button"],
    ["div.img_link:contains('FGT60D4615007833')", undefined, "skip"],
    ["div.cat_link:contains('Management')", undefined, "skip"],
]

cases['admin settings common'] = [
    ["div.gwt-HTML:contains('Admin Settings')", undefined, "a[ng-href='admin/settings']"],
    ["input.gwt-TextBox:eq(0)", 80, "input#admin-port"],
    ["input:checkbox", true, "input#redirect-check"],
    ["input.gwt-TextBox:eq(1)", 443, "input#admin-sport"],
    ["input.gwt-TextBox:eq(2)", 23, "input#admin-telnet-port"],
    ["input.gwt-TextBox:eq(3)", 22, "input#admin-ssh-port"],
    ["input.gwt-TextBox:eq(4)", 480, "input#admintimeout"],
    ["span:contains('Save')", undefined, "skip"],
];

// todo: bug
cases['routing new'] = [
    ["div.gwt-HTML:contains('Routing')"],
    ["button[title='Create New']"],
    ["input.gwt-TextBox:eq(0)", "192.168.18.0"],
    ["input.gwt-TextBox:eq(1)", "255.255.255.0"],
    ["input.gwt-TextBox:eq(2)", "192.168.1.1"],
    ["input.gwt-TextBox:eq(3)", 11],
    ["textarea.gwt-TextArea", "test comments"],
    ["span:contains('Save')"],
]

// todo: gate gui bug
cases['dns edit use fortigurad'] = [
    ["div.gwt-HTML:contains('DNS'):eq(0)", undefined, "a[ng-href='page/p/system/dns/']"],
    ["input[type='radio']:eq(0)", undefined, "input#type_fortiguard", true],
    ["input.gwt-TextBox:eq(2)", "test string", "input#domain"],
    ["span:contains('Save')", undefined, "skip"],
];

// todo: 
cases['dns edit specify'] = [
    ["div.gwt-HTML:contains('DNS'):eq(0)"],
    ["input[type='radio']:eq(1)"],
    ["input.gwt-TextBox:eq(0)", "1.1.1.1"],
    ["input.gwt-TextBox:eq(1)", "2.2.2.2"],
    ["input.gwt-TextBox:eq(2)", "test string"],
    ["span:contains('Save')"],
]

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

cases['advanced email service edit security mode none'] = [
    ["div.gwt-HTML:contains('Advanced')", undefined, "a[ng-href='system/advanced']"],
    ["input.gwt-TextBox:eq(0)", "192.168.100.100", "input#smtp_server"],
    ["input.gwt-TextBox:eq(1)", "a@gmail.com", "input#smtp_rt"],
    ["input:checkbox:eq(0)", true, "input#check-email-auth"],
    ["input.gwt-TextBox:eq(2)", "Peter Chen", "input#smtp_user"],
    ["input.gwt-TextBox:eq(3)", "12345678", "input#smtp_passwd"], // can't analysis passwd from GUI
    ["input:radio:eq(0)", true, "input#radio-email-none"], // security mode None
    ["input[type='text']:eq(40)", 100, "input#smtp_port"],
    ["span:contains('Save')", undefined, "skip"],
]

cases['advanced email service edit security mode smtps'] = [
    ["div.gwt-HTML:contains('Advanced')", undefined, "a[ng-href='system/advanced']"],
    ["input.gwt-TextBox:eq(0)", "192.168.100.100", "input#smtp_server"],
    ["input.gwt-TextBox:eq(1)", "a@gmail.com", "input#smtp_rt"],
    ["input:checkbox:eq(0)", true, "input#check-email-auth"],
    ["input.gwt-TextBox:eq(2)", "Peter Chen", "input#smtp_user"],
    ["input:radio:eq(1)", true, "input#radio-email-smtps"], // security mode SMTPS
    ["input[type='text']:eq(40)", 100, "input#smtp_port"],
    ["span:contains('Save')", undefined, "skip"],
]

cases['advanced email service edit security mode starttls'] = [
    ["div.gwt-HTML:contains('Advanced')", undefined, "a[ng-href='system/advanced']"],
    ["input.gwt-TextBox:eq(0)", "192.168.100.100", "input#smtp_server"],
    ["input.gwt-TextBox:eq(1)", "a@gmail.com", "input#smtp_rt"],
    ["input:checkbox:eq(0)", true, "input#check-email-auth"],
    ["input.gwt-TextBox:eq(2)", "Peter Chen", "input#smtp_user"],
    ["input:radio:eq(2)", true, "input#radio-email-starttls"], // security mode STARTTLS
    ["input[type='text']:eq(40)", 100, "input#smtp_port"],
    ["span:contains('Save')", undefined, "skip"],
]

// todo: need click two place to navigate to time setting
cases['advanced time settings'] = [
    ["div.gwt-HTML:contains('Advanced')", undefined, ""],
]

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

// key = 'service one';
// cases['service new'] = [
//     ["div.gwt-HTML:contains('Services')", undefined, "a[ng-href='page/p/firewall/object/service/']"],
//     ["button[title='Create New']", undefined, "tr[mkey='" + key + "']"],
//     ["div.filter_text:contains('Service'):eq(0)", undefined, "button:contains('Edit'):eq(0)"],
//     ["input.gwt-TextBox:eq(0)", key, "input#name"],

//     ["span:contains('Save')", undefined, "skip"],
//     ["button:contains('OK')", undefined, "skip"], // todo: double put, just skip it.
// ]

cases['interface new'] = [
    ["div.gwt-HTML:contains('Interfaces')", undefined, "skip"],
    ["button[title='Create New']", undefined, "skip"],
    ["input.gwt-TextBox:eq(0)", "interface one", "skip"],
    ["input.gwt-TextBox:eq(1)", "alias one", "skip"],
    ["input:radio:eq(0)", true, "skip"], // address mode: manual
    ["input.gwt-TextBox:eq(2)", "1.1.1.1/24", "skip"],
    ["input:checkbox:eq(1)", true, "skip"], // device dection enable
    ["input:radio[value='BLOCK']", true, "skip"], // block
    ["input:radio[value='DOWN']", true, "skip"], // diable
    ["textarea.gwt-TextArea", "test comments", "skip"],
    ["span:contains('Save')", undefined, "skip"],
]

cases['interface new dhcp mode'] = [
    ["div.gwt-HTML:contains('Interfaces')", undefined, "skip"],
    ["button[title='Create New']", undefined, "skip"],
    ["input.gwt-TextBox:eq(0)", "interface dhcp", "skip"],
    ["input.gwt-TextBox:eq(1)", "alias one", "skip"],
    ["select.gwt-ListBox:eq(2)", 2, "skip"], // vlan: 2
    ["input:radio:eq(1)", true, "skip"], // address mode: dhcp
    ["input:checkbox:eq(1)", true, "skip"], // device dection enable
    ["input:radio[value='MONITOR']", true, "skip"], // monitor
    ["input:radio[value='DOWN']", true, "skip"], // diable
    ["textarea.gwt-TextArea", "test comments", "skip"],
    ["span:contains('Save')", undefined, "skip"],
]

cases['interface new loopback'] = [
    ["div.gwt-HTML:contains('Interfaces')", undefined, "skip"],
    ["button[title='Create New']", undefined, "skip"],
    ["input.gwt-TextBox:eq(0)", "interface loop", "skip"],
    ["input.gwt-TextBox:eq(1)", "alias one", "skip"],
    ["select.gwt-ListBox:eq(0)", "LOOPBACK", "skip"],
    ["input:checkbox:eq(1)", true, "skip"], // device dection enable
    ["input:radio[value='MONITOR']", true, "skip"], // monitor
    ["input:radio[value='DOWN']", true, "skip"], // diable
    ["textarea.gwt-TextArea", "test comments", "skip"],
    ["span:contains('Save')", undefined, "skip"],
]

cases['interface new hardswitch'] = [
    ["div.gwt-HTML:contains('Interfaces')", undefined, "skip"],
    ["button[title='Create New']", undefined, "skip"],
    ["input.gwt-TextBox:eq(0)", "interface hard", "skip"],
    ["input.gwt-TextBox:eq(1)", "alias one", "skip"],
    ["select.gwt-ListBox:eq(0)", "HARD_SWITCH", "skip"],
    ["input:radio:eq(1)", true, "skip"], // address mode: dhcp
    ["input:checkbox:eq(1)", true, "skip"], // device dection enable
    ["input:radio[value='MONITOR']", true, "skip"], // monitor
    ["input:radio[value='DOWN']", true, "skip"], // diable
    ["textarea.gwt-TextArea", "test comments", "skip"],
    ["span:contains('Save')", undefined, "skip"],
]

// todo: Attribute 'interface' MUST be set.
cases['interface new softswitch'] = [
    ["div.gwt-HTML:contains('Interfaces')", undefined, "skip"],
    ["button[title='Create New']", undefined, "skip"],
    ["input.gwt-TextBox:eq(0)", "interface soft", "skip"],
    ["input.gwt-TextBox:eq(1)", "alias one", "skip"],
    ["select.gwt-ListBox:eq(0)", "SWITCH", "skip"], // type: soft switch
    ["input:radio:eq(1)", true, "skip"], // address mode: dhcp
    ["input:checkbox:eq(1)", true, "skip"], // device dection enable
    ["input:radio[value='MONITOR']", true, "skip"], // monitor
    ["input:radio[value='DOWN']", true, "skip"], // diable
    ["textarea.gwt-TextArea", "test comments", "skip"],
    ["span:contains('Save')", undefined, "skip"],
]

cases['interface new wan'] = [
    ["div.gwt-HTML:contains('Interfaces')", undefined, "skip"],
    ["button[title='Create New']", undefined, "skip"],
    ["input.gwt-TextBox:eq(0)", "interface wan", "skip"],
    ["input.gwt-TextBox:eq(1)", "alias one", "skip"],
    ["select.gwt-ListBox:eq(2)", 5, "skip"], // vlan: 5
    ["select.gwt-ListBox:eq(3)", "WAN", "skip"], // role: wan
    ["input:radio[value='MONITOR']", true, "skip"], // monitor
    ["input:radio[value='DOWN']", true, "skip"], // diable
    ["textarea.gwt-TextArea", "test comments", "skip"],
    ["span:contains('Save')", undefined, "skip"],
]

cases['interface new dmz'] = [
    ["div.gwt-HTML:contains('Interfaces')", undefined, "skip"],
    ["button[title='Create New']", undefined, "skip"],
    ["input.gwt-TextBox:eq(0)", "interface dmz", "skip"],
    ["input.gwt-TextBox:eq(1)", "alias one", "skip"],
    ["select.gwt-ListBox:eq(2)", 3, "skip"], // vlan: 3
    ["select.gwt-ListBox:eq(3)", "DMZ", "skip"], // role: dmz
    ["input:checkbox:eq(1)", true, "skip"], // device dection enable
    ["input:radio[value='MONITOR']", true, "skip"], // monitor
    ["input:radio[value='DOWN']", true, "skip"], // diable
    ["textarea.gwt-TextArea", "test comments", "skip"],
    ["span:contains('Save')", undefined, "skip"],
]

cases['interface new undefined'] = [
    ["div.gwt-HTML:contains('Interfaces')", undefined, "skip"],
    ["button[title='Create New']", undefined, "skip"],
    ["input.gwt-TextBox:eq(0)", "interface no", "skip"],
    ["input.gwt-TextBox:eq(1)", "alias one", "skip"],
    ["select.gwt-ListBox:eq(2)", 4, "skip"], // vlan: 4
    ["select.gwt-ListBox:eq(3)", "UNDEFINED", "skip"], // role: undefined
    ["input:checkbox:eq(1)", true, "skip"], // device dection enable
    ["input:radio[value='MONITOR']", true, "skip"], // monitor
    ["input:radio[value='DOWN']", true, "skip"], // diable
    ["textarea.gwt-TextArea", "test comments", "skip"],
    ["span:contains('Save')", undefined, "skip"],
]

cases['deploy'] = [
    ["button[title='Deploy']"],
    ["span:contains('YES')"],
    ["button:contains('OK')"],
    ["span:contains('Close')"],
]

delete cases['admin settings common'];
delete cases['routing new'];
delete cases['dns edit use fortigurad'];
delete cases['dns edit specify'];
delete cases['fortigurad edit, enable all checkbox'];
delete cases['advanced email service edit security mode none'];
delete cases['advanced email service edit security mode smtps'];
delete cases['advanced email service edit security mode starttls'];
delete cases['advanced time settings'];
delete cases['address new'];
delete cases['address group new'];

delete cases['interface new'];
delete cases['interface new dhcp mode'];
delete cases['interface new loopback'];
delete cases['interface new hardswitch'];
delete cases['interface new softswitch'];
delete cases['interface new wan'];
delete cases['interface new dmz'];
delete cases['interface new undefined'];

// delete cases['deploy'];
// delete cases[];


module.exports = cases;
