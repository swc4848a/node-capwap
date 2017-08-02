let Testcase = require('../testcase.js');

let cloudMap = {
    'Intrusion Protection': "div.gwt-HTML:contains('Intrusion Protection'):eq(0)",
    'Comments': "textarea",
    'IPS Signatures Add': "div.tool_new:eq(0)",
    '3Com.3CDaemon.FTP.Server.Buffer.Overflow': "div.tk-ModalDialog input:checkbox:eq(2)~label",
    'Ok': "div.tk-ModalDialog button:contains('Ok')",
    'IPS Filters Add': "div.tool_new:eq(1)",
    'Signatures Delete': "div.appActionDelete",
    // 'Set Filter': "", todo: hard to select by jquery
    // '': "",

    'Save': "span:contains('Save')",
}

let gateMap = {
    'Intrusion Protection': "a[ng-href='page/p/utm/ips/sensor/edit/default/']",
    'Comments': "textarea",
    '3Com.3CDaemon.FTP.Server.Buffer.Overflow':"section#sig_section tr[mkey='3Com.3CDaemon.FTP.Server.Buffer.Overflow']",
}

new Testcase({
    name: 'IPS sensor edit',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Intrusion Protection')

        c.set('Comments', "test comments")
        
        c.click('IPS Signatures Add')
        c.click('3Com.3CDaemon.FTP.Server.Buffer.Overflow')
        c.click('Ok')
        
        // c.click('IPS Filters Add')
        // c.click('Set Filter')
        // c.click('Ok')

        c.click('Save')
    },
    verify: (g) => {
        g.click('Intrusion Protection')

        g.isSet('Comments', "test comments")
        g.has('3Com.3CDaemon.FTP.Server.Buffer.Overflow')
    }
})

new Testcase({
    name: 'IPS sensor clean',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Intrusion Protection')

        c.set('Comments', "")
        c.click('Signatures Delete')

        c.click('Save')
    },
    verify: (g) => {
        g.click('Intrusion Protection')

        g.isSet('Comments', "")
        g.isDelete('3Com.3CDaemon.FTP.Server.Buffer.Overflow')
    }
})
