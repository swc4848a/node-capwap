let Testcase = require('../testcase.js');

let cloudMap = {
    'AntiVirus': "div.gwt-HTML:contains('AntiVirus')",
    'Comments': "textarea.gwt-TextArea",
    'Detect Viruses Block': "input:radio:eq(0)~label",
    'HTTP': "input:checkbox:eq(0)~label",
    'SMTP': "input:checkbox:eq(1)~label",
    'POP3': "input:checkbox:eq(2)~label",
    'IMAP': "input:checkbox:eq(3)~label",
    'MAPI': "input:checkbox:eq(4)~label",
    'FTP': "input:checkbox:eq(5)~label",
    'Treat Windows Executables in Email Attachments as Viruses': "input:checkbox:eq(6)~label",
    'Disable': "input:radio:eq(2)~label",
    'Suspicious Files Only': "input:radio:eq(3)~label",
    'Executable Files Only': "input:radio:eq(4)~label",
    'All Supported Files': "input:radio:eq(5)~label",
    'Use FortiSandbox Database': "input:checkbox:eq(6)~label",
    'Include Mobile Malware Protection': "input:checkbox:eq(7)~label",
}

let gateMap = {
    'Fortigate Label': "jquery selector",
}

new Testcase({
    name: 'antivirus edit',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('AntiVirus')
        c.set('Comments', "test comments")
        c.click('Detect Viruses Block')
        c.click('HTTP')
        c.click('SMTP')
        c.click('POP3')
        c.click('IMAP')
        c.click('MAPI')
        c.click('FTP')

        // todo:

        c.click('Save')
    },
    verify: (g) => {
        g.click('menu label')
        g.click('new item')
        g.click('Edit')

        g.isSet('Cloud Label', "input value")
    }
})
