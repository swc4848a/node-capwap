let Testcase = require('../src/testcase.js');

let cloudMap = {
    'Application Control': "div.gwt-HTML:contains('Application Control'):eq(0)",

    'Comments': "textarea",
    'Allow All': "div.appActionAllow:eq(0)",
    'Add Signature': "div.svg-bg-add",
    'Signature 126.mail': "table.apOverview input:checkbox:eq(0) ~label",
    'Ok': "button:contains('Ok')",
    'Deep Inspection of Cloud Applications': "label:contains('Deep Inspection of Cloud Applications')",
    'Allow and Log DNS Traffic': "label:contains('Allow and Log DNS Traffic')",
    'Replacement Messages for HTTP-based Applications': "label:contains('Replacement Messages for HTTP-based Applications')",

    'Save': "span:contains('Save')",

    'Checkbox All': "input:checkbox",
}

let gateMap = {
    'Security Profiles': "//span[text()='Security Profiles']",
    'Application Control': "//span[text()='Application Control']",
    'Comments': "textarea",
    'Allow Business': "section.categories f-icon.fa-enabled:eq(0)",
    'Signature 126.mail': "section.overrides a.sig-name:contains('126.Mail')",
    'Allow and Log DNS Traffic': "input#allow-dns",
    'Replacement Messages for HTTP-based Applications': "input#app-replacemsg",
}

new Testcase({
    name: 'application control edit',
    testcase() {
        this.click(cloudMap['Application Control'])
        this.set(cloudMap['Comments'], "test comments")
        this.click(cloudMap['Allow All'])
        this.click(cloudMap['Add Signature'])
        this.click(cloudMap['Signature 126.mail'])
        this.click(cloudMap['Ok'])
        this.check(cloudMap['Checkbox All'])
        this.click(cloudMap['Save'])
    },
    verify() {
        this.click(gateMap['Security Profiles'])
        this.click(gateMap['Application Control'])
        this.wait(5000)
        this.isSet(gateMap['Comments'], "test comments")
        // this.has('')
        this.has('126.Mail')
        this.isCheck(gateMap['Allow and Log DNS Traffic'])
        this.isCheck(gateMap['Replacement Messages for HTTP-based Applications'])
    }
})

new Testcase({
    name: 'application control clean',
    testcase() {
        this.click(cloudMap['Application Control'])
        this.uncheck(cloudMap['Checkbox All'])
        this.click(cloudMap['Save'])
    },
    verify() {
        this.click(gateMap['Security Profiles'])
        this.click(gateMap['Application Control'])
        this.wait(5000)
        this.isUncheck(gateMap['Allow and Log DNS Traffic'])
        this.isUncheck(gateMap['Replacement Messages for HTTP-based Applications'])
    }
})