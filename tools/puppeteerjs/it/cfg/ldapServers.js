let Testcase = require('../../src/testcase.js');

let cloudMap = {
    'LDAP Servers': "div.gwt-HTML:contains('LDAP Servers')",
    'Create New': "button:contains('Create New')",

    'Name': "input.gwt-TextBox:eq(0)",
    'Server IP/Name': "input.gwt-TextBox:eq(1)",
    'Server Port': "input.gwt-TextBox:eq(2)",
    'Common Name Identifier': "input.gwt-TextBox:eq(3)",
    'Distinguished Name': "input.gwt-TextBox:eq(4)",
    'Secure Connection': "input:checkbox",

    'Save': "span:contains('Save')",
    'OK': "button:contains('OK')",
    'Delete server one': "div[title='Delete']:eq(0)",
    'YES': "div.gwt-PopupPanel button:contains('YES')"
}

let gateMap = {
    'LDAP Servers': "a[ng-href='page/p/user/ldap/']",
    'Name': "input[ng-model='$ctrl.ldapServer.name']",
    'Server IP/Name': "input[ng-model='$ctrl.ldapServer.server']",
    'Server Port': "input[ng-model='$ctrl.ldapServer.port']",
    'Common Name Identifier': "input[ng-model='$ctrl.ldapServer.cnid']",
    'Distinguished Name': "input[ng-model='$ctrl.ldapServer.dn']",
    'Secure Connection': "input#secure-connection",
    'Protocol': "",
    'Certificate': "",

    'server one': "tr[mkey='server one']",
}

new Testcase({
    name: 'ldap server new',
    testcase() {
        this.click(cloudMap['LDAP Servers'])
        this.click(cloudMap['Create New'])

        this.set(cloudMap['Name'], "server one")
        this.set(cloudMap['Server IP/Name'], "3.3.3.3")
        this.set(cloudMap['Server Port'], 100)
        this.set(cloudMap['Common Name Identifier'], "ldap id")
        this.set(cloudMap['Distinguished Name'], "ldap dis")
        this.check(cloudMap['Secure Connection'])

        this.click(cloudMap['Save'])
        this.wait(2000)
        this.click(cloudMap['OK'])
    },
    verify() {
        this.isSet(gateMap['Name'], "server one")
        this.isSet(gateMap['Server IP/Name'], "3.3.3.3")
        this.isSet(gateMap['Server Port'], 636) // if enable secure connection port must be 636
        this.isSet(gateMap['Common Name Identifier'], "ldap id")
        this.isSet(gateMap['Distinguished Name'], "ldap dis")
        this.isCheck(gateMap['Secure Connection'])
    }
})

new Testcase({
    name: 'ldap server delete',
    testcase() {
        this.click(cloudMap['LDAP Servers'])
        this.click(cloudMap['Delete server one'])
        this.click(cloudMap['YES'])

    },
    verify() {
        this.click(gateMap['LDAP Servers'])
        this.isDelete(gateMap['server one'])
    }
})