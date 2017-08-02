let Testcase = require('../testcase.js');

let cloudMap = {
    'Application Control': "div.gwt-HTML:contains('Application Control'):eq(0)",

    'Comments': "textarea",
    'Allow All': "div.appActionAllow:eq(0)",
    'Add Signature': "div.svg-bg-add",
    'Signature 126.mail': "table.apOverview input:checkbox:eq(0)",
    'Ok': "button:contains('Ok')",
    'Deep Inspection of Cloud Applications': "label:contains('Deep Inspection of Cloud Applications')",
    'Allow and Log DNS Traffic': "label:contains('Allow and Log DNS Traffic')",
    'Replacement Messages for HTTP-based Applications': "label:contains('Replacement Messages for HTTP-based Applications')",

    'Save': "span:contains('Save')",

    'Options': "input:checkbox",
}

let gateMap = {
    'Application Control': "a[ng-href='utm/appctrl/sensor/edit/default']",

    'Comments': "textarea",
    'Allow Business': "section.categories f-icon.fa-enabled:eq(0)",
    'Signature 126.mail': "section.overrides a.sig-name:contains('126.mail')",
    'Allow and Log DNS Traffic': "input#allow-dns",
    'Replacement Messages for HTTP-based Applications': "input#app-replacemsg",
}

new Testcase({
    name: 'application control edit',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Application Control')

        c.set('Comments', "test comments")
        c.click('Allow All')
        // c.click('Add Signature')
        // c.checked('Signature 126.mail')
        // c.click('Ok')
        c.click('Allow and Log DNS Traffic')
        c.click('Replacement Messages for HTTP-based Applications')

        c.click('Save')
    },
    verify: (g) => {
        g.click('Application Control')
        // g.isSet('Comments', "test comments")
        g.has('Allow Business')
        // g.has('Signature 126.mail')
        g.isChecked('Allow and Log DNS Traffic')
        g.isChecked('Replacement Messages for HTTP-based Applications')
    }
})

new Testcase({
    name: 'application control clean',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Application Control')
        c.unchecked('Options')
        c.click('Save')
    },
    verify: (g) => {
        g.click('Application Control')

        g.isUnchecked('Allow and Log DNS Traffic')
        g.isUnchecked('Replacement Messages for HTTP-based Applications')
    }
})