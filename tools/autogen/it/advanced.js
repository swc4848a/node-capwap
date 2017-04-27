let cases = require('./root.js');


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

module.exports = cases;
