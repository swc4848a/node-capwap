let Testcase = require('../../src/testcase.js');
/**
 * Editor: utmIpsEditor
 * Key/Id: both
 * 	   // "name",
		"comment",
		//"entries",
		//"deepAppInspection",
		//"allowDNS",
		//"appReplaceMsg",
 */

 let apiData = {
    // "name",
		"comment" : "IPS comments"
		//"entries",
		//"deepAppInspection",
		//"allowDNS",
		//"appReplaceMsg"
};

let cloudMap = {
    'Intrusion Protection': "div.gwt-HTML:contains('Intrusion Protection'):eq(0)",
    'Comments': "textarea",
    'IPS Signatures Add': "div.tool_new:eq(0)",
    '3Com.Intelligent.Management.Center.Information.Disclosure': "div.tk-ModalDialog input:checkbox:eq(2)~label",
    'Ok': "div.tk-ModalDialog button:contains('Ok')",
    'IPS Filters Add': "div.tool_new:eq(1)",
    'Signatures Delete': "div.appActionDelete",
    'Save': "span:contains('Save')",
}

let gateMap = {
    'Security Profiles': "//span[text()='Security Profiles']",
    'Intrusion Protection': "a[ng-href='page/p/utm/ips/sensor/edit/default/']",
    'Comments': "textarea",
    '3Com.Intelligent.Management.Center.Information.Disclosure': '3Com.Intelligent.Management.Center.Information.Disclosure',
}

new Testcase({
    name: 'IPS sensor edit',
    testcase() {
        this.click(cloudMap['Intrusion Protection'])
        this.wait(1000)

        this.readApiData('utmIpsEditor', apiData)

        this.click(cloudMap['IPS Signatures Add'])
        this.wait(4000)
        this.click(cloudMap['3Com.Intelligent.Management.Center.Information.Disclosure'])
        this.click(cloudMap['Ok'])

        /*
        this.click(cloudMap['IPS Filters Add'])
        this.click(cloudMap['Set Filter'])
        this.click(cloudMap['Ok'])
        */

        this.click('#fcld-utmIpsEditor-save');
    },
    verify() {
        this.click(gateMap['Security Profiles'])
        this.wait(500)
        this.click(gateMap['Intrusion Protection'])
        // this.wait("div.section-title:contains(IPS Signatures)")
        this.wait(20000)

        this.isSet(gateMap['Comments'], apiData['comment'])
        this.has(gateMap['3Com.Intelligent.Management.Center.Information.Disclosure'])
    }
})

new Testcase({
    name: 'IPS sensor clean',
    testcase() {
        this.click(cloudMap['Intrusion Protection'])
        this.wait(500)
        this.set(cloudMap['Comments'], "")
        this.click(cloudMap['Signatures Delete'])

        this.click(cloudMap['Save'])
    },
    verify() {
        this.click(gateMap['Security Profiles'])
        this.wait(500)
        this.click(gateMap['Intrusion Protection'])
        this.wait(20000)

        this.isSet(gateMap['Comments'], "")
        this.isDelete(gateMap['3Com.Intelligent.Management.Center.Information.Disclosure'])
    }
})