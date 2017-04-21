let cases = require('./root.js');

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
    ["input[value='DHCP']", true, "skip"], // address mode: dhcp
    ["input[value='DHCP']", true, "skip"], // second click trigger below three params render
    ["td>input:eq(2)", 100, "skip"], // todo: Distance: 100 (not working)
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

delete cases['interface new'];
delete cases['interface new dhcp mode'];
delete cases['interface new loopback'];
delete cases['interface new hardswitch'];
delete cases['interface new softswitch'];
delete cases['interface new wan'];
delete cases['interface new dmz'];
delete cases['interface new undefined'];

module.exports = cases;
