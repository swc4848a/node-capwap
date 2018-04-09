let Testcase = require('../../src/testcase.js');
/* 
    Editor: "utmAntiVirusEditor"
    Key/Id: (both)
 		"name",
		"comment",
		"avmonitor",
		"http",
		"smtp",
		"pop3",
		"imap",
		"mapi",
		"ftp",
		"executableAsVirus",
		"ftgdAnalytics",
		"analyticsDb",
		"mobileMalwareDb";
*/
let comment = "my comment";
let avmonitor = "Monitor";
let http = false;
let smtp = false;
let pop3 = false;
let imap = false;
let mapi = false;
let ftp = true;
let executableAsVirus = false;
let ftgdAnalytics = "All Supported Files";
let analyticsDb = false;
let mobileMalwareDb = false;
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
        this.wait(1000)
        this.evaluate(`FcldUiTest.setUiObjectValue("utmAntiVirusEditor-comment", "${comment}")`)
        this.evaluate(`FcldUiTest.setUiObjectValue("utmAntiVirusEditor-avmonitor", "${avmonitor}")`)
        this.evaluate(`FcldUiTest.setUiObjectValue("utmAntiVirusEditor-http", "${http}")`)
        this.evaluate(`FcldUiTest.setUiObjectValue("utmAntiVirusEditor-smtp", "${smtp}")`)
        this.evaluate(`FcldUiTest.setUiObjectValue("utmAntiVirusEditor-pop3", "${pop3}")`)
        this.evaluate(`FcldUiTest.setUiObjectValue("utmAntiVirusEditor-imap", "${imap}")`)
        this.evaluate(`FcldUiTest.setUiObjectValue("utmAntiVirusEditor-mapi", "${mapi}")`)
        this.evaluate(`FcldUiTest.setUiObjectValue("utmAntiVirusEditor-ftp", "${ftp}")`)
        this.evaluate(`FcldUiTest.setUiObjectValue("utmAntiVirusEditor-executableAsVirus", "${executableAsVirus}")`)
        this.evaluate(`FcldUiTest.setUiObjectValue("utmAntiVirusEditor-ftgdAnalytics", "${ftgdAnalytics}")`)
        this.evaluate(`FcldUiTest.setUiObjectValue("utmAntiVirusEditor-analyticsDb", "${analyticsDb}")`)
        this.evaluate(`FcldUiTest.setUiObjectValue("utmAntiVirusEditor-mobileMalwareDb", "${mobileMalwareDb}")`)
        this.click(cloudMap['Save'])
    },
    verify() {
        this.click(gateMap['Security Profiles'])
        this.wait(500)
        this.click(gateMap['AntiVirus'])
        this.wait(1000)
        this.isSet(gateMap['Comments'], comment)
        this.isCheck(gateMap['Detect Viruses Block'], avmonitor == 'Block')
        this.isCheck(gateMap['HTTP'], http)
        this.isCheck(gateMap['SMTP'], smtp)
        this.isCheck(gateMap['POP3'], pop3)
        this.isCheck(gateMap['IMAP'], imap)
        this.isCheck(gateMap['MAPI'], mapi)
        this.isCheck(gateMap['FTP'], ftp)
        this.isCheck(gateMap['Treat Windows Executables in Email Attachments as Viruses'], executableAsVirus)
        this.isCheck(gateMap['Disable'], ftgdAnalytics == 'None')
        this.isCheck(gateMap['Use FortiSandbox Database'], analyticsDb)
        this.isCheck(gateMap['Include Mobile Malware Protection'], mobileMalwareDb)
    }
})

new Testcase({
    name: 'antivirus clean',
    testcase() {
        this.click(cloudMap['AntiVirus'])
        this.wait(1000)
        this.evaluate(`FcldUiTest.setUiObjectValue("utmAntiVirusEditor-comment", "")`)
        this.click(cloudMap['Save'])
    },
    verify() {
        this.click(gateMap['Security Profiles'])
        this.wait(500)
        this.click(gateMap['AntiVirus'])
        this.wait(1000)
        this.isSet(gateMap['Comments'], "")
    }
})