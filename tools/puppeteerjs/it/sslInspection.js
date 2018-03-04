let Testcase = require('../src/testcase.js');

let cloudMap = {
    'SSL Inspection': "div.gwt-HTML:contains('SSL Inspection')",

    'Comments': "textarea",
    'Multiple Clients Connecting to Multiple Servers': "label:contains('Multiple')",
    'Protecting SSL Server': "label:contains('Protecting')",
    'SSL Certificate Inspection': "label:contains('Certificate')",
    'Full SSL Inspection': "label:contains('Full')",
    'Untrusted SSL Certificates Allow': "label:contains(Allow)",
    'Untrusted SSL Certificates Block': "label:contains(Block)",
    'RPC over HTTPS': "input:checkbox:eq(0)",
    'Inspect All Ports': "input:checkbox:eq(1)~label",
    'Inspect All Ports checkbox': "input:checkbox:eq(1)",
    'HTTPS': "input:checkbox:eq(2)~label",
    'Allow Invalid SSL Certificates': "input:checkbox:eq(39)~label",
    'Log Invalid Certificates': "input:checkbox:eq(40)~label",

    'HTTPS checkbox': "input:checkbox:eq(2)",
    'HTTPS Port': "input:eq(66)",
    'SMTPS checkbox': "input:checkbox:eq(3)",
    'SMTPS Port': "input:eq(70)",
    'POP3S checkbox': "input:checkbox:eq(4)",
    'POP3S Port': "input:eq(74)",
    'IMAPS checkbox': "input:checkbox:eq(5)",
    'IMAPS Port': "input:eq(78)",
    'FTPS checkbox': "input:checkbox:eq(6)",
    'FTPS Port': "input:eq(82)",

    'Reputable Websites': "input:checkbox:eq(7)",
    'General Interest - Personal Exempt': "div.apFortiGuardCategoryActionYes:eq(48)",
    'Addresses google': "label:contains('google')",

    'Save': "span:contains('Save')",
}

let gateMap = {
    'SSL Inspection': "a[ng-href='page/p/firewall/deep_inspection/edit/certificate-inspection/']",

}

new Testcase({
    name: 'template: ssl inspection edit',
    testcase() {
        this.click(cloudMap['SSL Inspection'])

        this.set(cloudMap['Comments'], "test comemnts")
        this.click(cloudMap['Multiple Clients Connecting to Multiple Servers'])
        this.click(cloudMap['SSL Certificate Inspection'])
        this.click(cloudMap['Untrusted SSL Certificates Allow'])
        this.click(cloudMap['Allow Invalid SSL Certificates'])
        this.click(cloudMap['Log Invalid Certificates'])

        this.click(cloudMap['Save'])
    },
    verify() {
        this.click(gateMap['SSL Inspection'])
    }
})