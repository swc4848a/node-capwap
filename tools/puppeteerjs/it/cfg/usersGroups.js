let Testcase = require('../../src/testcase.js');
let userName = "user one"
let groupFirewallName = "group_firewall"
let groupGuestName = "group_guest"
let cloudMap = {
    'Users & Groups': "div.gwt-HTML:contains('Users & Groups')",
    'Create New': "button:contains('Create New')",
    'User': "div.filter_text:contains(User):eq(0)",
    'User Group': "div.filter_text:contains(User):eq(1)",

    'Name': "input.gwt-TextBox:eq(0)",
    'Password': "input[type='password']",
    'Email Address': "input.gwt-TextBox:eq(1)",
    'SMS': "input.gwt-TextBox:eq(2)",
    'Enabled': "input:checkbox",

    'Members': "div.gwt-HTML:contains(' - ')",
    'guest': "div.gwt-DecoratedPopupPanel div.gwt-HTML:contains('guest')",
    'Members Panel': "div.gwt-DecoratedPopupPanel",
    'Remote Groups Add': "div.svg-bg-add",
    'Remote Groups Group Name one': "input.gwt-TextBox:eq(1)",
    'Remote Groups Group Name two': "input.gwt-TextBox:eq(2)",

    'Save': "span:contains('Save')",
    'OK': "button:contains('OK')",

    'Delete user one': `td.left:contains('${userName}')~td.right div[title='Delete']:last()`,
    'Delete group firewall': `td.left:contains('${groupFirewallName}')~td.right div[title='Delete']:last()`,
    'Delete group guest': `td.left:contains('${groupGuestName}')~td.right div[title='Delete']:last()`,
    'YES': "button:contains('YES')"
}

let gateMap = {

    'UsersDevices': "//span[text()='User & Device']",
    'UsersGroups': "a[ng-href='page/p/user/group/']",
    'UsersDefinition': "a[ng-href='page/p/user/local/']",
    'User Name': "input[ng-model='$ctrl.user.name']",
    'Email Address': "input[type='email']",
    'Country Dial Code Canada': "span.entry-value>span:contains('United States/Canada (+1)')",
    'Phone Number': "input[ng-model='$ctrl.entry.$sms.phoneNumber']",
    'User Account Status': "input:radio[ng-model='$ctrl.user.status']",

    'user one': "tr[mkey='user one']",
    'user group one': "tr[mkey='group one']",

    'Group Name': "input[ng-model='$ctrl.userGroup.name']",
    'Guest Members': "span.select-formatted-content:eq(0):contains('guest')",
    'Remote Server windows': "span[title='windows']",
    'Group Name one': "div.cell-collection-member:contains('remote groups one')",
    'Group Name two': "div.cell-collection-member:contains('remote groups two')",

}
/*
Editor: userUserEditor
Key/Id:
	i: "name",
    k: "type",
    i: "passwd",
    k: "radiusServer",
    k: "ldapServer",
    i: "emailTo",
    i: "smsPhone",
    i: "status".
 */


function openUserDefinition(self) {
    self.click(gateMap['UsersDevices'])
    self.wait(1000)
    self.click(gateMap['UsersDefinition'])
    self.wait(1000)
}
function openUserGroups(self) {
    self.click(gateMap['UsersDevices'])
    self.wait(1000)
    self.click(gateMap['UsersGroups'])
    self.wait(1000)
}

new Testcase({
    name: 'radius server new for user one',
    testcase() {
        this.click(`//div[text()="User & Device"]`)
        this.click(`//div[text()="RADIUS Servers"]`)
        this.click(`button:contains("Create New")`)

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
        this.isSet(`input#name`, "radius one")
        this.isSet(`input#server`, "3.3.3.3")
        this.isSet(`input#secondary-server`, "6.6.6.6")
        // todo: not set auth-type so do not verify
        // this.isSet(gateMap['Authentication Method'], true)
        this.isSet(`input#nas-ip`, "2.2.2.2")
        this.isCheck(`input#all-usergroup`)
    }
})

new Testcase({
    name: 'user new',
    testcase() {
        this.click(cloudMap['Users & Groups'])
        this.click(cloudMap['Create New'])
        this.click(cloudMap['User'])
        this.wait(1000)
        this.set('#fcld-userUserEditor-name', userName)
        this.evaluate(`FcldUiTest.setUiObjectValue("userUserEditor-type", "RADIUS User")`)
        //this.set('#fcld-userUserEditor-passwd', '12345678')
        this.set('#fcld-userUserEditor-emailTo', 'a@qq.com')
        this.set('#fcld-userUserEditor-smsPhone', '+16668888888')
        this.evaluate(`FcldUiTest.setUiObjectValue("userUserEditor-status", "false")`)

        this.click(cloudMap['Save'])
        this.wait(1000)
        this.click(cloudMap['OK'])
    },
    verify() {
        openUserDefinition(this)
        this.click(`//td[text()="user one"]`)
        this.click(`//span[text()="Edit User"]`)
        this.wait(1000)
        // todo
        // this.isSet(``, `user one`)
        this.has(`Remote RADIUS User`)
        // this.isSet(`input[type="email"]`, `a@qq.com`)
        // todo:
        // this.isSet(`input[ng-model="$ctrl.entry.$sms.phoneNumber"]`, ``)
    }
})

/*
Editor: userUserGroupEditor
Key/Id:
    i: "name",
    k: "groupType",
    k: "member",
    k: "multipleGuestAdd",
    k: "userId",
    k: "password",
    k: "expireType",
    i: "expire",
    k: "expireTimeUnit",
    i: "maxAccounts",
    k: "userName",
    k: "sponsorEnable",
    k: "sponsorRequired",
    k: "companyEnable",
    k: "companyRequired",
    k: "email",
    k: "mobilePhone"
 */
new Testcase({
    name: 'user_group_firewall new',
    testcase() {
        this.click(cloudMap['Users & Groups'])
        this.click(cloudMap['Create New'])
        this.click(cloudMap['User Group'])
        this.wait(1000)
        this.set('#fcld-userUserGroupEditor-name', groupFirewallName)
        this.evaluate(`FcldUiTest.setUiObjectValue("userUserGroupEditor-groupType", "Firewall User Group")`)
        this.evaluate(`FcldUiTest.setUiObjectValue("userUserGroupEditor-member", ["guest"])`)
        // this.hide('Members Panel')
        // this.click(cloudMap['Remote Groups Add'])
        // this.set(cloudMap['Remote Groups Group Name one'], 'remote groups one')
        // this.click(cloudMap['Remote Groups Add'])
        // this.set(cloudMap['Remote Groups Group Name two'], 'remote groups two')
        this.wait(1000)
        this.click(cloudMap['Save'])
        this.wait(1000)
        this.click(cloudMap['OK'])
    },
    verify() {
        openUserGroups(this)
        this.wait(1000)
        this.click(`//td[text()="${groupFirewallName} (0 Members)"]`)
        this.click(`//span[text()="Edit"]`)
        this.wait(1000)
        this.isSet(gateMap['Group Name'], groupFirewallName)
    }
})


new Testcase({
    name: 'user_group_firewall delete',
    testcase() {
        this.click(cloudMap['Users & Groups'])
        this.wait(1000)
        this.click(cloudMap['Delete group firewall'])
        this.wait(1000)
        this.click(cloudMap['YES'])
        this.wait(1000)
    },
    verify() {
        openUserGroups(this)
        this.isDelete(groupFirewallName)
    }
})

new Testcase({
    name: 'user delete',
    testcase() {
        this.click(cloudMap['Users & Groups'])
        this.click(cloudMap['Delete user one'])
        this.click(cloudMap['YES'])
    },
    verify() {
        openUserDefinition(this)
        this.isDelete(userName)
    }
})

// todo:
new Testcase({
    name: 'radius server delete for user one',
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

new Testcase({
    name: 'user_group_guest new',
    testcase() {
        this.click(cloudMap['Users & Groups'])
        this.click(cloudMap['Create New'])
        this.click(cloudMap['User Group'])
        this.wait(1000)
        this.set('#fcld-userUserGroupEditor-name', groupGuestName)
        this.evaluate(`FcldUiTest.setUiObjectValue("userUserGroupEditor-groupType", "Guest User Group")`)
        this.evaluate(`FcldUiTest.setUiObjectValue("userUserGroupEditor-multipleGuestAdd", "false")`)

        this.evaluate(`FcldUiTest.setUiObjectValue("userUserGroupEditor-userId", "Email")`)
        this.evaluate(`FcldUiTest.setUiObjectValue("userUserGroupEditor-password", "Specify")`)
        this.evaluate(`FcldUiTest.setUiObjectValue("userUserGroupEditor-expireType", "After First Login")`)
        this.set('#fcld-userUserGroupEditor-expire', '5')
        this.evaluate(`FcldUiTest.setUiObjectValue("userUserGroupEditor-expireTimeUnit", "days")`)
        this.set('#fcld-userUserGroupEditor-maxAccounts', '5')
        this.wait(1000)
        this.evaluate(`FcldUiTest.setUiObjectValue("userUserGroupEditor-userName", "true")`)
        this.evaluate(`FcldUiTest.setUiObjectValue("userUserGroupEditor-sponsorEnable", "false")`)
        this.evaluate(`FcldUiTest.setUiObjectValue("userUserGroupEditor-companyEnable", "false")`)
        this.evaluate(`FcldUiTest.setUiObjectValue("userUserGroupEditor-email", "true")`)
        this.evaluate(`FcldUiTest.setUiObjectValue("userUserGroupEditor-mobilePhone", "false")`)


        // this.click(cloudMap['guest'])
        // // this.hide('Members Panel')
        // this.click(cloudMap['Remote Groups Add'])
        // this.set(cloudMap['Remote Groups Group Name one'], 'remote groups one')
        // this.click(cloudMap['Remote Groups Add'])
        // this.set(cloudMap['Remote Groups Group Name two'], 'remote groups two')
        this.wait(1000)
        this.click(cloudMap['Save'])
        this.wait(1000)
        this.click(cloudMap['OK'])
    },
    verify() {
        openUserGroups(this)
        this.wait(1000)
        this.click(`//td[text()="${groupGuestName} (0 Members)"]`)
        this.click(`//span[text()="Edit"]`)
        this.wait(1000)
        this.isSet(gateMap['Group Name'], groupGuestName)
    }
})


new Testcase({
    name: 'user_group_guest delete',
    testcase() {
        this.click(cloudMap['Users & Groups'])
        this.click(cloudMap['Delete group guest'])
        this.click(cloudMap['YES'])
    },
    verify() {
        openUserGroups(this)
        this.isDelete(groupGuestName)
    }
})