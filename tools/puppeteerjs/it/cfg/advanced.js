let Testcase = require('../../src/testcase.js');

let cloudMap = {
    'Settings': "//div[text()='Settings']",
    'Advanced': "div.gwt-HTML:contains('Advanced')",
    'SMTP Server': "input.gwt-TextBox:eq(0)",
    'Default Reply To': "input.gwt-TextBox:eq(1)",
    'Authentication': "input:checkbox:eq(0)",
    'Username': "input.gwt-TextBox:eq(2)",
    'Password': "input.gwt-TextBox:eq(3)",
    'Security Mode None': "input:radio:eq(0)",
    'Security Mode SMTPS': "input:radio:eq(1)",
    'Security Mode STARTTLS': "input:radio:eq(2)",
    'Port': "input[type='text']:eq(41)",

    'Time Zone': "select",
    'Synchronize with NTP Server': "input:checkbox:eq(1)",
    'Use FortiGuard Server': "input:radio:eq(3)~label",
    'Specify': "input:radio:eq(1)~label",
    'Sync Interval': "input:eq(57)",
    'Server': "input:eq(51)",

    'Save': "span:contains('Save')",
}

let gateMap = {
    'System': "//span[text()='System']",
    'Settings': "a[ng-href='system/settings']",
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

    'System Time': "a[href='/ng/system/time']",
    'Time Zone': "select[ng-model='$ctrl.systemGlobal.timezone']",
    'Synchronize with NTP Server': "input#sync-ntp",
    'Manual Settings': "input#manual",
    'Use FortiGuard Server': "input#fg-server",
    'Specify': "input#specify-server",
    'Sync Interval': "input#sync-interval",
    'Server': "input[ng-model='ctrl.systemNtp.ntpserver[0].server']",
}

new Testcase({
    name: 'advanced email service edit security mode none',
    testcase() {
        this.click(cloudMap['Advanced'])
        this.wait(1000)
        this.set(cloudMap['SMTP Server'], "192.168.100.100")
        this.set(cloudMap['Default Reply To'], "a@gmail.com")
        this.check(cloudMap['Authentication'])
        this.set(cloudMap['Username'], "Peter Chen")
        this.set(cloudMap['Password'], "12345678")
        this.check(cloudMap['Security Mode None'])
        this.set(cloudMap['Port'], 25)
        this.click(cloudMap['Save'])
    },
    verify() {
        this.click(gateMap['System'])
        this.click(gateMap['Advanced'])
        this.wait(3000)
        this.isSet(gateMap['SMTP Server'], "192.168.100.100")
        this.isSet(gateMap['Default Reply To'], "a@gmail.com")
        this.isCheck(gateMap['Authentication'])
        this.isSet(gateMap['Username'], "Peter Chen")
        this.isSet(gateMap['Password'], "ENC XXXX")
        this.isCheck(gateMap['Security Mode None'])
        this.isSet(gateMap['Port'], 25) // must be 25 in gate GUI
    }
})

new Testcase({
    name: 'advanced email service edit security mode smtps',
    testcase() {
        this.click(cloudMap['Advanced'])
        this.set(cloudMap['SMTP Server'], "192.168.100.100")
        this.set(cloudMap['Default Reply To'], "a@gmail.com")
        this.check(cloudMap['Authentication'])
        this.set(cloudMap['Username'], "Peter Chen")
        this.set(cloudMap['Password'], "12345678")
        this.check(cloudMap['Security Mode SMTPS'])
        this.set(cloudMap['Port'], 465)
        this.click(cloudMap['Save'])
    },
    verify() {
        this.click(gateMap['System'])
        this.click(gateMap['Advanced'])
        this.wait(3000)
        this.isSet(gateMap['SMTP Server'], "192.168.100.100")
        this.isSet(gateMap['Default Reply To'], "a@gmail.com")
        this.isCheck(gateMap['Authentication'])
        this.isSet(gateMap['Username'], "Peter Chen")
        this.isSet(gateMap['Password'], "ENC XXXX")
        this.isCheck(gateMap['Security Mode SMTPS'])
        this.isSet(gateMap['Port'], 465) // must be 465 in gate GUI
    }
})

new Testcase({
    name: 'advanced email service edit security mode starttls',
    testcase() {
        this.click(cloudMap['Advanced'])
        this.set(cloudMap['SMTP Server'], "192.168.100.100")
        this.set(cloudMap['Default Reply To'], "a@gmail.com")
        this.check(cloudMap['Authentication'])
        this.set(cloudMap['Username'], "Peter Chen")
        this.set(cloudMap['Password'], "12345678")
        this.check(cloudMap['Security Mode STARTTLS'])
        this.set(cloudMap['Port'], 25)
        this.click(cloudMap['Save'])
    },
    verify() {
        this.click(gateMap['System'])
        this.click(gateMap['Advanced'])
        this.wait(3000)
        this.isSet(gateMap['SMTP Server'], "192.168.100.100")
        this.isSet(gateMap['Default Reply To'], "a@gmail.com")
        this.isCheck(gateMap['Authentication'])
        this.isSet(gateMap['Username'], "Peter Chen")
        this.isSet(gateMap['Password'], "ENC XXXX")
        this.isCheck(gateMap['Security Mode STARTTLS'])
        this.isSet(gateMap['Port'], 25) // must be 25 in gate GUI
    }
})

new Testcase({
    name: 'advanced time setting use fortiguard',
    testcase() {
        this.click(cloudMap['Settings'])

        this.set(cloudMap['Time Zone'], "04")
        this.check(cloudMap['Synchronize with NTP Server'])
        this.click(cloudMap['Use FortiGuard Server'])
        this.set(cloudMap['Sync Interval'], 100)

        this.click(cloudMap['Save'])
    },
    verify() {
        this.click(gateMap['System'])
        this.click(gateMap['Settings'])
        this.wait(3000)
        this.isSet(gateMap['Time Zone'], "string:04")
        this.isCheck(gateMap['Synchronize with NTP Server'])
        this.isCheck(gateMap['Use FortiGuard Server'])
        this.isSet(gateMap['Sync Interval'], 100)
    }
})

new Testcase({
    name: 'advanced time setting specify',
    testcase() {
        this.click(cloudMap['Settings'])

        this.set(cloudMap['Time Zone'], "04")
        this.check(cloudMap['Synchronize with NTP Server'])
        this.click(cloudMap['Specify'])
        this.set(cloudMap['Sync Interval'], 200)
        this.set(cloudMap['Server'], "g.com")

        this.click(cloudMap['Save'])
    },
    verify() {
        this.click(gateMap['System'])
        this.click(gateMap['Settings'])
        this.wait(3000)
        this.isSet(gateMap['Time Zone'], "string:04")
        this.isCheck(gateMap['Synchronize with NTP Server'])
        this.isCheck(gateMap['Specify'])
        this.isSet(gateMap['Sync Interval'], 200)
        this.isSet(gateMap['Server'], "g.com")
    }
})