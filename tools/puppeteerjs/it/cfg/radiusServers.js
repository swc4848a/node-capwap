let Testcase = require('../../src/testcase.js');

let cloudMap = {
    'RADIUS Servers': "div.gwt-HTML:contains('RADIUS Servers')",
    'Create New': "button:contains('Create New')",

    'Name': "input.gwt-TextBox:eq(0)",
    'Server IP/Name': "input.gwt-TextBox:eq(1)",
    'Server Secret': "input[type='password']:eq(0)",
    'Secondary Server IP/Name': "input.gwt-TextBox:eq(2)",
    'Secondary Server Secret': "input[type='password']:eq(1)",
    'NAS IP / Called Station ID': "input.gwt-TextBox:eq(3)",
    'Include in every User Group': "input:checkbox",

    'Save': "span:contains('Save')",
    'OK': "button:contains('OK')",

    'Delete radius one': "div[title='Delete']:eq(0)",
    'YES': "button:contains('YES')"
}

let gateMap = {
    'RADIUS Servers': "a[ng-href='page/p/user/radius/']",
    'Name': "input#name",
    'Primary Server IP/Name': "input#server",
    'Secondary Server IP/Name': "input#secondary-server",
    'Authentication Method': "input[name='auth-type']",
    'NAS IP': "input#nas-ip",
    'Include in every User Group': "input#all-usergroup",

    'radius one': "tr[mkey='radius one']",
}

// todo: after save, deploy button still disabled
new Testcase({
    name: 'radius server new',
    testcase() {
        this.click(cloudMap['RADIUS Servers'])
        this.click(cloudMap['Create New'])

        this.set('#fcld-userRadiusServersEditor-name', "radius one")
        this.set('#fcld-userRadiusServersEditor-server', "3.3.3.3")
        this.set('#fcld-userRadiusServersEditor-serverSecret', "12345678")
        this.set('#fcld-userRadiusServersEditor-secondServer', "6.6.6.6")
        this.set('#fcld-userRadiusServersEditor-secondServerSecret', "12345678")
        this.evaluate(`FcldUiTest.setUiObjectValue("userRadiusServersEditor-authenticationMethod", "PAP")`)
        this.set('#fcld-userRadiusServersEditor-nasIp', "2.2.2.2")
        this.evaluate(`FcldUiTest.setUiObjectValue("userRadiusServersEditor-everyGroupCheckBox", "true")`)

        this.click(cloudMap['Save'])
        this.wait(1000)
        this.click(cloudMap['OK'])
    },
    verify() {
        this.click(`span:contains("User & Device")`)
        this.click(`span:contains("RADIUS Servers")`)
        this.wait(3000)
        this.click(`//td[text()="radius one"]`)
        this.click(`//span[text()="Edit"]`)
        this.wait(1000)
        this.isSet(gateMap['Name'], "radius one")
        this.isSet(gateMap['Primary Server IP/Name'], "3.3.3.3")
        this.isSet(gateMap['Secondary Server IP/Name'], "6.6.6.6")
        // todo: not set auth-type so do not verify
        // this.isSet(gateMap['Authentication Method'], true)
        this.isSet(gateMap['NAS IP'], "2.2.2.2")
        this.isCheck(gateMap['Include in every User Group'])
    }
})

new Testcase({
    name: 'radius server delete',
    testcase() {
        this.click(cloudMap['RADIUS Servers'])
        this.click(cloudMap['Delete radius one'])
        this.click(cloudMap['YES'])
    },
    verify() {
        this.click(`span:contains("User & Device")`)
        this.click(`span:contains("RADIUS Servers")`)
        this.wait(3000)
        this.isDelete('radius one')
    }
})