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
    'YES': "div.gwt-PopupPanel button:contains('YES')"
}

let gateMap = {
    'RADIUS Servers': "a[ng-href='page/p/user/radius/']",
    'Name': "input#name",
    'Primary Server IP/Name': "input#server",
    'Secondary Server IP/Name': "input#secondary-server",
    'Authentication Method': "input:radio[name='auth-type']",
    'NAS IP': "input#nas-ip",
    'Include in every User Group': "input#all-usergroup",

    'radius one': "tr[mkey='radius one']",
}

new Testcase({
    name: 'radius server new',
    testcase() {
        this.click(cloudMap['RADIUS Servers'])
        this.click(cloudMap['Create New'])

        this.set(cloudMap['Name'], "radius one")
        this.set(cloudMap['Server IP/Name'], "3.3.3.3")
        this.set(cloudMap['Server Secret'], "12345678")
        this.set(cloudMap['Secondary Server IP/Name'], "6.6.6.6")
        this.set(cloudMap['Secondary Server Secret'], "12345678")
        this.set(cloudMap['NAS IP / Called Station ID'], "2.2.2.2")
        this.check(cloudMap['Include in every User Group'])

        this.click(cloudMap['Save'])
        this.click(cloudMap['OK'])
    },
    verify() {
        this.isSet(gateMap['Name'], "radius one")
        this.isSet(gateMap['Primary Server IP/Name'], "3.3.3.3")
        this.isSet(gateMap['Secondary Server IP/Name'], "6.6.6.6")
        this.isSet(gateMap['Authentication Method'], true)
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
        this.click(gateMap['RADIUS Servers'])
        this.isDelete(gateMap['radius one'])
    }
})