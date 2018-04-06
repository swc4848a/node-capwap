let Testcase = require('../../src/testcase.js');

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
    'None': "input:radio:eq(2)~label",
    'All Supported Files': "input:radio:eq(3)~label",
    // 'Suspicious Files Only': "input:radio:eq(3)~label",
    // 'Executable Files Only': "input:radio:eq(4)~label",
    'Use FortiSandbox Database': "input:checkbox:eq(7)",
    'Include Mobile Malware Protection': "input:checkbox:eq(8)",

    'Checkbox All': "input:checkbox",

    'Save': "span:contains('Save')",
    'OK': "button:contains('OK')",
}

let gateMap = {
    'Security Profiles': "//span[text()='Security Profiles']",
    'AntiVirus': "//span[text()='AntiVirus']",
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
    testcase() {
        this.click(cloudMap['AntiVirus'])
        this.set(cloudMap['Comments'], "test comments")
        this.click(cloudMap['Detect Viruses Block'])
        this.click(cloudMap['All Supported Files'])
        this.check(cloudMap['Checkbox All'])
        this.click(cloudMap['Save'])
    },
    verify() {
        this.click(gateMap['Security Profiles'])
        this.click(gateMap['AntiVirus'])
        this.wait(1000)
        this.isSet(gateMap['Comments'], "test comments")
        this.isCheck(gateMap['Detect Viruses Block'])
        // this.isCheck(gateMap['HTTP'])
        // this.isCheck(gateMap['SMTP'])
        // this.isCheck(gateMap['POP3'])
        // this.isCheck(gateMap['IMAP'])
        // this.isCheck(gateMap['MAPI'])
        // this.isCheck(gateMap['FTP'])
        // this.isCheck(gateMap['Treat Windows Executables in Email Attachments as Viruses'])
        // this.isCheck(gateMap['Suspicious Files Only'])
        this.isCheck(gateMap['Use FortiSandbox Database'])
        this.isCheck(gateMap['Include Mobile Malware Protection'])
    }
})