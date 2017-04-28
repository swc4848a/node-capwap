let Testcase = require('../testcase.js');

let map = {
    'Advanced': "div.gwt-HTML:contains('Advanced')",
    'SMTP Server': "input.gwt-TextBox:eq(0)",
    'Default Reply To': "input.gwt-TextBox:eq(1)",
    'Authentication': "input:checkbox:eq(0)",
    'Username': "input.gwt-TextBox:eq(2)",
    'Password': "input.gwt-TextBox:eq(3)",
    'Security Mode None': "input:radio:eq(0)",
    'Security Mode SMTPS': "input:radio:eq(1)",
    'Security Mode STARTTLS': "input:radio:eq(2)",
    'Port': "input[type='text']:eq(40)",
    'Save': "span:contains('Save')",
}

new Testcase('advanced email service edit security mode none', map, (t) => {
    t.click('Advanced')
    t.set('SMTP Server', "192.168.100.100")
    t.set('Default Reply To', "a@gmail.com")
    t.checked('Authentication')
    t.set('Username', "Peter Chen")
    t.set('Password', "12345678")
    t.checked('Security Mode None')
    t.set('Port', 100)
    t.click('Save')
})

// cases['advanced email service edit security mode none'] = [
//     ["div.gwt-HTML:contains('Advanced')", undefined, "a[ng-href='system/advanced']"],
//     ["input.gwt-TextBox:eq(0)", "192.168.100.100", "input#smtp_server"],
//     ["input.gwt-TextBox:eq(1)", "a@gmail.com", "input#smtp_rt"],
//     ["input:checkbox:eq(0)", true, "input#check-email-auth"],
//     ["input.gwt-TextBox:eq(2)", "Peter Chen", "input#smtp_user"],
//     ["input.gwt-TextBox:eq(3)", "12345678", "input#smtp_passwd"], // can't analysis passwd from GUI
//     ["input:radio:eq(0)", true, "input#radio-email-none"], // security mode None
//     ["input[type='text']:eq(40)", 100, "input#smtp_port"],
//     ["span:contains('Save')", undefined, "skip"],
// ]

new Testcase('advanced email service edit security mode smtps', map, (t) => {
    t.click('Advanced')
    t.set('SMTP Server', "192.168.100.100")
    t.set('Default Reply To', "a@gmail.com")
    t.checked('Authentication')
    t.set('Username', "Peter Chen")
    t.set('Password', "12345678")
    t.checked('Security Mode SMTPS')
    t.set('Port', 100)
    t.click('Save')
})

// cases['advanced email service edit security mode smtps'] = [
//     ["div.gwt-HTML:contains('Advanced')", undefined, "a[ng-href='system/advanced']"],
//     ["input.gwt-TextBox:eq(0)", "192.168.100.100", "input#smtp_server"],
//     ["input.gwt-TextBox:eq(1)", "a@gmail.com", "input#smtp_rt"],
//     ["input:checkbox:eq(0)", true, "input#check-email-auth"],
//     ["input.gwt-TextBox:eq(2)", "Peter Chen", "input#smtp_user"],
//     ["input:radio:eq(1)", true, "input#radio-email-smtps"], // security mode SMTPS
//     ["input[type='text']:eq(40)", 100, "input#smtp_port"],
//     ["span:contains('Save')", undefined, "skip"],
// ]

new Testcase('advanced email service edit security mode starttls', map, (t) => {
    t.click('Advanced')
    t.set('SMTP Server', "192.168.100.100")
    t.set('Default Reply To', "a@gmail.com")
    t.checked('Authentication')
    t.set('Username', "Peter Chen")
    t.set('Password', "12345678")
    t.checked('Security Mode STARTTLS')
    t.set('Port', 100)
    t.click('Save')
})

// cases['advanced email service edit security mode starttls'] = [
//     ["div.gwt-HTML:contains('Advanced')", undefined, "a[ng-href='system/advanced']"],
//     ["input.gwt-TextBox:eq(0)", "192.168.100.100", "input#smtp_server"],
//     ["input.gwt-TextBox:eq(1)", "a@gmail.com", "input#smtp_rt"],
//     ["input:checkbox:eq(0)", true, "input#check-email-auth"],
//     ["input.gwt-TextBox:eq(2)", "Peter Chen", "input#smtp_user"],
//     ["input:radio:eq(2)", true, "input#radio-email-starttls"], // security mode STARTTLS
//     ["input[type='text']:eq(40)", 100, "input#smtp_port"],
//     ["span:contains('Save')", undefined, "skip"],
// ]
