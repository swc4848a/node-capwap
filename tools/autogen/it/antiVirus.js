let Testcase = require('../testcase.js');

let cloudMap = {
    'AntiVirus': "div.gwt-HTML:contains('AntiVirus')",
    'Comments': "textarea.gwt-TextArea",
    'Detect Viruses Block': "input:radio:eq(0)~label",
    'HTTP': "input:checkbox:eq(0)",
    'SMTP': "input:checkbox:eq(1)",
    'POP3': "input:checkbox:eq(2)",
    'IMAP': "input:checkbox:eq(3)",
    'MAPI': "input:checkbox:eq(4)",
    'FTP': "input:checkbox:eq(5)",
    'Treat Windows Executables in Email Attachments as Viruses': "input:checkbox:eq(6)",
    'Disable': "input:radio:eq(2)~label",
    'Suspicious Files Only': "input:radio:eq(3)~label",
    'Executable Files Only': "input:radio:eq(4)~label",
    'All Supported Files': "input:radio:eq(5)~label",
    'Use FortiSandbox Database': "input:checkbox:eq(7)",
    'Include Mobile Malware Protection': "input:checkbox:eq(8)",
    'Save': "span:contains('Save')",
    'OK': "button:contains('OK')",
}

let gateMap = {
    'AntiVirus': "a[href='page/p/utm/antivirus/profile/edit/default/']",
    'Name': "input[name='name']",
    'Comments': "textarea#comment",
    'Detect Viruses Block': "input#detect-viruses_block",
    'HTTP': "input#proxy_chk_http",
    'SMTP': "input#proxy_chk_smtp",
    'POP3': "input#proxy_chk_pop3",
    'IMAP': "input#proxy_chk_imap",
    'MAPI': "input#proxy_chk_mapi",
    'FTP': "input#proxy_chk_ftp",
    'Treat Windows Executables in Email Attachments as Viruses': "input#executables",
    'Disable': "input#ftgd-analytics_disable",
    'Use FortiSandbox Database': "input#analytics-db",
    'Include Mobile Malware Protection': "input#mobile-malware-db",
}

new Testcase({
    name: 'antivirus edit',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('AntiVirus')
        c.set('Comments', "test comments")
        c.click('Detect Viruses Block')
        c.checked('HTTP')
        c.checked('SMTP')
        c.checked('POP3')
        c.checked('IMAP')
        c.checked('MAPI')
        c.checked('FTP')
        // c.checked('Treat Windows Executables in Email Attachments as Viruses')
        c.click('Disable')
        c.checked('Use FortiSandbox Database')
        c.checked('Include Mobile Malware Protection')
        c.click('Save')
    },
    verify: (g) => {
        g.click('AntiVirus')
        g.isSet('Comments', "test comments")
        g.isChecked('Detect Viruses Block')
        g.isChecked('HTTP')
        g.isChecked('SMTP')
        g.isChecked('POP3')
        g.isChecked('IMAP')
        g.isChecked('MAPI')
        g.isChecked('FTP')
        // g.isChecked('Treat Windows Executables in Email Attachments as Viruses')
        g.isChecked('Suspicious Files Only')
        g.isChecked('Use FortiSandbox Database')
        g.isChecked('Include Mobile Malware Protection')
    }
})
