let Testcase = require('../src/testcase.js');

let cloudMap = {
    'DNS Filter': "div.gwt-HTML:contains('DNS Filter'):eq(0)",

    'Block DNS requests to known botnet C&C': "label:contains(Block DNS requests to known botnet C&C)",
    'FortiGuard category based filter': "label:contains('FortiGuard category based filter')",
    'Monitor All': "div.apFortiGuardCategoryActionMonitor",
    'Domain Filter': "label:contains('Domain Filter')",
    'Add Domain Filter': "div.tool_new",

    'Domain': "div.tk-ModalDialog input.gwt-TextBox",
    'Type RegEx': "div.tk-ModalDialog label:contains('RegEx')",
    'Action Allow': "div.tk-ModalDialog label:contains('Allow')",
    'Status': "div.tk-ModalDialog input:checkbox",
    'Ok': "button:contains('Ok')",

    'Allow DNS requests when a rating error occurs': "label:contains('Allow DNS requests when a rating error occurs')",
    'Log all Domains': "label:contains('Log all Domains')",
    'Block': "label:contains('Block'):last()",
    'Redirect': "label:contains('Redirect')",
    'Redirect Portal IP': "input:last()",

    'All Checkbox': "input:checkbox",

    'Save': "span:contains('Save')",
}

let gateMap = {
    'DNS Filter': "a[ng-href='page/p/utm/dns/profile/edit/default/']",

    'Block DNS requests to known botnet C&C': "input#block-botnet",
    'FortiGuard category based filter': "input#ftgd_ftgd_cats",
    'Domain Filter': "input#web_urlfilter-table",

    'Domain': "",
    'Type RegEx': "",
    'Action Allow': "",
    'Status': "",

    'Allow DNS requests when a rating error occurs': "input#ftgd-dns_options",
    'Log all Domains': "input#log-all-domain",
    'Redirect': "input#block-action",
    'Redirect Portal IP Type': "input:radio[name='redirect_portal_type']:checked",
    'Redirect Portal IP': "input#redirect-portal",
}

new Testcase({
    name: 'DNS Filter Edit',
    testcase() {
        this.click(cloudMap['DNS Filter'])

        this.click(cloudMap['Block DNS requests to known botnet C&C'])
        this.click(cloudMap['FortiGuard category based filter'])
        this.click(cloudMap['Monitor All'])
        this.click(cloudMap['Domain Filter'])
        this.click(cloudMap['Add Domain Filter'])
        this.set(cloudMap['Domain'], "a.com")
        this.click(cloudMap['Type RegEx'])
        this.click(cloudMap['Action Allow'])
        this.click(cloudMap['Status'])
        this.click(cloudMap['Ok'])
        this.click(cloudMap['Allow DNS requests when a rating error occurs'])
        this.click(cloudMap['Log all Domains'])
        this.click(cloudMap['Redirect'])
        this.set(cloudMap['Redirect Portal IP'], "1.1.1.1")

        this.click(cloudMap['Save'])
    },
    verify() {
        this.click(gateMap['DNS Filter'])
        this.isCheck(gateMap['Block DNS requests to known botnet C&C'])
        this.isCheck(gateMap['FortiGuard category based filter'])
        this.isCheck(gateMap['Domain Filter'])

        this.isCheck(gateMap['Allow DNS requests when a rating error occurs'])
        this.isCheck(gateMap['Log all Domains'])
        this.isCheck(gateMap['Redirect'])

        this.isSet(gateMap['Redirect Portal IP Type'], "specify")
        this.isSet(gateMap['Redirect Portal IP'], "1.1.1.1")
    }
})

new Testcase({
    name: 'DNS Filter Clean',
    testcase() {
        this.click(cloudMap['DNS Filter'])
        this.uncheck(cloudMap['All Checkbox'])
        this.click(cloudMap['Block'])
        this.click(cloudMap['Save'])
    },
    verify() {
        this.click(gateMap['DNS Filter'])
    }
})