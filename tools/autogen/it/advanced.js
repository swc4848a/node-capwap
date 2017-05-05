let Testcase = require('../testcase.js');

let cloudMap = {
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

    'Time Zone': "select",
    'Synchronize with NTP Server': "input:checkbox:eq(1)",
    'Use FortiGuard Server': "input:radio:eq(3)~label",
    'Specify': "input:radio:eq(4)~label",
    'Sync Interval': "input:eq(50)",
    'Server': "input:eq(51)",

    'Save': "span:contains('Save')",
}

let gateMap = {
    'Advanced': "a[ng-href='system/advanced']",
    'SMTP Server': "input#smtp_server",
    'Default Reply To': "input#smtp_rt",
    'Authentication': "input#check-email-auth",
    'Username': "input#smtp_user",
    'Password': "input#smtp_passwd",
    'Security Mode None': "input#radio-email-none",
    'Security Mode SMTPS': "input#radio-email-smtps",
    'Security Mode STARTTLS': "input#radio-email-starttls",
    'Port': "input#smtp_port",

    'Dashboard': "a[href='page/system/status/status']",
    'System Time': "a[href='/ng/system/time']",
    'Time Zone': "select[ng-model='ctrl.systemGlobal.timezone']",
    'Synchronize with NTP Server': "input:radio#sync-ntp",
    'Manual Settings': "input:radio#manual",
    'Use FortiGuard Server': "input:radio#fg-server",
    'Specify': "input:radio#specify-server",
    'Sync Interval': "input#sync-interval",
    'Server': "input[ng-model='ctrl.systemNtp.ntpserver[0].server']",
}

new Testcase({
    name: 'advanced email service edit security mode none',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Advanced')
        c.set('SMTP Server', "192.168.100.100")
        c.set('Default Reply To', "a@gmail.com")
        c.checked('Authentication')
        c.set('Username', "Peter Chen")
        c.set('Password', "12345678")
        c.checked('Security Mode None')
        c.set('Port', 25)
        c.click('Save')
    },
    verify: (g) => {
        g.click('Advanced')
        g.isSet('SMTP Server', "192.168.100.100")
        g.isSet('Default Reply To', "a@gmail.com")
        g.isChecked('Authentication')
        g.isSet('Username', "Peter Chen")
        g.isSet('Password', "ENC XXXX")
        g.isChecked('Security Mode None')
        g.isSet('Port', 25) // must be 25 in gate GUI
    }
})

new Testcase({
    name: 'advanced email service edit security mode smtps',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Advanced')
        // c.set('SMTP Server', "192.168.100.100")
        c.set('Default Reply To', "a@gmail.com")
        c.checked('Authentication')
        c.set('Username', "Peter Chen")
        c.set('Password', "12345678")
        c.checked('Security Mode SMTPS')
        c.set('Port', 465)
        c.click('Save')
    },
    verify: (g) => {
        g.click('Advanced')
        // g.isSet('SMTP Server', "192.168.100.100")
        g.isSet('Default Reply To', "a@gmail.com")
        g.isChecked('Authentication')
        g.isSet('Username', "Peter Chen")
        g.isSet('Password', "ENC XXXX")
        g.isChecked('Security Mode SMTPS')
        g.isSet('Port', 465) // must be 465 in gate GUI
    }
})

new Testcase({
    name: 'advanced email service edit security mode starttls',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Advanced')
        // c.set('SMTP Server', "192.168.100.100")
        c.set('Default Reply To', "a@gmail.com")
        c.checked('Authentication')
        c.set('Username', "Peter Chen")
        c.set('Password', "12345678")
        c.checked('Security Mode STARTTLS')
        c.set('Port', 25)
        c.click('Save')
    },
    verify: (g) => {
        g.click('Advanced')
        // g.isSet('SMTP Server', "192.168.100.100")
        g.isSet('Default Reply To', "a@gmail.com")
        g.isChecked('Authentication')
        g.isSet('Username', "Peter Chen")
        g.isSet('Password', "ENC XXXX")
        g.isChecked('Security Mode STARTTLS')
        g.isSet('Port', 25) // must be 25 in gate GUI
    }
})

//todo: 
new Testcase({
        name: 'advanced time setting use fortiguard',
        cloud: cloudMap,
        gate: gateMap,
        testcase: (c) => {
            c.click('Advanced')

            c.set('Time Zone', "04")
            c.checked('Synchronize with NTP Server')
            c.click('Use FortiGuard Server')
            c.set('Sync Interval', 100)

            c.click('Save')
        },
        verify: (g) => {
            g.click('Dashboard')
            g.click('System Time') // todo: can't navigate to new href
            g.isSet('Time Zone', "string:04")
            g.isChecked('Synchronize with NTP Server')
            g.isChecked('Use FortiGuard Server')
            g.isSet('Sync Interval', 100)
        }
    })
//todo: 
new Testcase({
    name: 'advanced time setting specify',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Advanced')

        c.set('Time Zone', "04")
        c.checked('Synchronize with NTP Server')
        c.click('Specify')
        c.set('Sync Interval', 200)
        c.set('Server', "g.com")

        c.click('Save')
    },
    verify: (g) => {
        g.click('Dashboard')
        g.click('System Time') // todo: can't navigate to new href
        g.isSet('Time Zone', "string:04")
        g.isChecked('Synchronize with NTP Server')
        g.isChecked('Specify')
        g.isSet('Sync Interval', 200)
        g.isSet('Server', "g.com")
    }
})
