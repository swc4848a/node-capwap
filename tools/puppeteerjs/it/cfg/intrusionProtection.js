let Testcase = require('../../src/testcase.js');

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
    'Intrusion Protection': "a[ng-href='page/p/utm/ips/sensor/edit/default/']",
    'Comments': "textarea",
    '3Com.Intelligent.Management.Center.Information.Disclosure': "section#sig_section tr[mkey='3Com.Intelligent.Management.Center.Information.Disclosure']",
}

new Testcase({
    name: 'IPS sensor edit',
    testcase() {
        this.click(cloudMap['Intrusion Protection'])

        this.set(cloudMap['Comments'], "test comments")

        this.click(cloudMap['IPS Signatures Add'])
        this.click(cloudMap['3Com.Intelligent.Management.Center.Information.Disclosure'])
        this.click(cloudMap['Ok'])

        this.click(cloudMap['IPS Filters Add'])
        this.click(cloudMap['Set Filter'])
        this.click(cloudMap['Ok'])

        this.click(cloudMap['Save'])
    },
    verify() {
        this.click(gateMap['Intrusion Protection'])

        this.isSet(gateMap['Comments'], "test comments")
        this.has(gateMap['3Com.Intelligent.Management.Center.Information.Disclosure'])
    }
})

new Testcase({
    name: 'IPS sensor clean',
    testcase() {
        this.click(cloudMap['Intrusion Protection'])

        this.set(cloudMap['Comments'], "")
        this.click(cloudMap['Signatures Delete'])

        this.click(cloudMap['Save'])
    },
    verify() {
        this.click('Intrusion Protection')

        this.isSet('Comments', "")
        this.isDelete(gateMap['3Com.Intelligent.Management.Center.Information.Disclosure'])
    }
})