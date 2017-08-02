// let Testcase = require('../testcase.js');

// let map = {
//     'SSL Inspection': "div.gwt-HTML:contains('SSL Inspection')",

//     'Comments': "textarea",
//     'Multiple Clients Connecting to Multiple Servers': "label:contains('Multiple')",
//     'Protecting SSL Server': "label:contains('Protecting')",
//     'SSL Certificate Inspection': "label:contains('Certificate')",
//     'Full SSL Inspection': "label:contains('Full')",
//     'Untrusted SSL Certificates Allow': "label:contains(Allow)",
//     'Untrusted SSL Certificates Block': "label:contains(Block)",
//     'RPC over HTTPS': "input:checkbox:eq(0)",
//     'Inspect All Ports': "input:checkbox:eq(1)~label",
//     'Inspect All Ports checkbox': "input:checkbox:eq(1)",
//     'HTTPS': "input:checkbox:eq(2)~label",
//     'Allow Invalid SSL Certificates': "input:checkbox:eq(42)~label",
//     'Log Invalid Certificates': "input:checkbox:eq(43)~label",

//     'HTTPS checkbox': "input:checkbox:eq(2)",
//     'HTTPS Port': "input:eq(66)",
//     'SMTPS checkbox': "input:checkbox:eq(3)",
//     'SMTPS Port': "input:eq(70)",
//     'POP3S checkbox': "input:checkbox:eq(4)",
//     'POP3S Port': "input:eq(74)",
//     'IMAPS checkbox': "input:checkbox:eq(5)",
//     'IMAPS Port': "input:eq(78)",
//     'FTPS checkbox': "input:checkbox:eq(6)",
//     'FTPS Port': "input:eq(82)",

//     'Reputable Websites': "input:checkbox:eq(7)",
//     'General Interest - Personal Exempt': "div.apFortiGuardCategoryActionYes:eq(48)",
//     'Addresses google': "label:contains('google')",

//     'Save': "span:contains('Save')",
// }

// new Testcase('ssl inspection edit', map, (t) => {
//     t.click('SSL Inspection')

//     t.set('Comments', "test comemnts")
//     t.click('Multiple Clients Connecting to Multiple Servers')
//     t.click('SSL Certificate Inspection')
//     t.click('Untrusted SSL Certificates Allow')
//     t.click('Inspect All Ports')
//     t.click('Allow Invalid SSL Certificates')
//     t.click('Log Invalid Certificates')

//     t.click('Save')
// })

// new Testcase('ssl inspection edit protecting ssl server', map, (t) => {
//     t.click('SSL Inspection')

//     t.click('Protecting SSL Server')
//         // todo: click server certificate select
//     t.click('Inspect All Ports')

//     t.click('Save')
// })

// new Testcase('ssl inspection edit full inspection', map, (t) => {
//     t.click('SSL Inspection')

//     t.click('Multiple Clients Connecting to Multiple Servers')
//     t.click('Full SSL Inspection')
//     t.click('Untrusted SSL Certificates Block')
//     t.checked('RPC over HTTPS')

//     t.set('HTTPS Port', 443)
//     t.set('SMTPS Port', 465)
//     t.set('POP3S Port', 995)
//     t.set('IMAPS Port', 993)
//     t.set('FTPS Port', 990)

//     t.click('Save')
// })

// new Testcase('ssl inspection edit port mapping', map, (t) => {
//     t.click('SSL Inspection')

//     t.click('Multiple Clients Connecting to Multiple Servers')
//     t.click('Full SSL Inspection')
//     t.click('Untrusted SSL Certificates Block')
//     t.checked('RPC over HTTPS')
//     t.checked('Inspect All Ports checkbox')

//     t.checked('HTTPS checkbox')
//     t.set('HTTPS Port', 443)
//     t.checked('SMTPS checkbox')
//     t.set('SMTPS Port', 465)
//     t.checked('POP3S checkbox')
//     t.set('POP3S Port', 995)
//     t.checked('IMAPS checkbox')
//     t.set('IMAPS Port', 993)
//     t.checked('FTPS checkbox')
//     t.set('FTPS Port', 990)

//     t.click('Save')
// })

// new Testcase('ssl inspection edit exempt', map, (t) => {
//     t.click('SSL Inspection')

//     t.click('Multiple Clients Connecting to Multiple Servers')
//     t.click('Full SSL Inspection')
//     t.click('Untrusted SSL Certificates Block')
//     t.checked('RPC over HTTPS')
//     t.checked('Inspect All Ports checkbox')

//     t.checked('HTTPS checkbox')
//     t.set('HTTPS Port', 443)
//     t.checked('SMTPS checkbox')
//     t.set('SMTPS Port', 465)
//     t.checked('POP3S checkbox')
//     t.set('POP3S Port', 995)
//     t.checked('IMAPS checkbox')
//     t.set('IMAPS Port', 993)
//     t.checked('FTPS checkbox')
//     t.set('FTPS Port', 990)

//     t.checked('Reputable Websites')
//     t.click('General Interest - Personal Exempt')
//     t.click('Addresses google')

//     t.click('Save')
// })

let Testcase = require('../testcase.js');

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
    name: 'ssl inspection edit',
        cloud: cloudMap,
        gate: gateMap,
        testcase: (c) => {
            c.click('SSL Inspection')

            c.set('Comments', "test comemnts")
            c.click('Multiple Clients Connecting to Multiple Servers')
            c.click('SSL Certificate Inspection')
            c.click('Untrusted SSL Certificates Allow')
            c.click('Allow Invalid SSL Certificates')
            c.click('Log Invalid Certificates')

            c.click('Save')
        },
        verify: (g) => {
            g.click('SSL Inspection')

        }})