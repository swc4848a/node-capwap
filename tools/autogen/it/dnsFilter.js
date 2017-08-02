let Testcase = require('../testcase.js');

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
    'Redirect Portal IP Type': "input:radio[name='redirect_portal_type']",
    'Redirect Portal IP': "input#redirect-portal",
}

// new Testcase({
//     name: 'DNS Filter Edit',
//     cloud: cloudMap,
//     gate: gateMap,
//     testcase: (c) => {
//         c.click('DNS Filter')

//         c.click('Block DNS requests to known botnet C&C')
//         c.click('FortiGuard category based filter')
//         c.click('Monitor All')
//         c.click('Domain Filter')
//         c.click('Add Domain Filter')
//         c.set('Domain', "a.com")
//         c.click('Type RegEx')
//         c.click('Action Allow')
//         c.click('Status')
//         c.click('Ok')
//         c.click('Allow DNS requests when a rating error occurs')
//         c.click('Log all Domains')
//         c.click('Redirect')
//         c.set('Redirect Portal IP', "1.1.1.1")

//         c.click('Save')
//     },
//     verify: (g) => {
//         g.click('DNS Filter')
//         g.isChecked('Block DNS requests to known botnet C&C')
//         g.isChecked('FortiGuard category based filter')
//         g.isChecked('Domain Filter')

//         g.isChecked('Allow DNS requests when a rating error occurs')
//         g.isChecked('Log all Domains')
//         g.isChecked('Redirect')

//         g.isSet('Redirect Portal IP Type', "specify")
//         g.isSet('Redirect Portal IP', "1.1.1.1")
//     }
// })

new Testcase({
    name: 'DNS Filter Clean',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('DNS Filter')

        c.unchecked('All Checkbox')

        c.click('Save')
    },
    verify: (g) => {
        g.click('DNS Filter')
    }
})
