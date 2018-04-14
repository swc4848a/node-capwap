let Testcase = require('../../src/testcase.js');
let userName = "user one"
let groupName = "group one"
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
    'Delete group one': `td.left:contains('${groupName}')~td.right div[title='Delete']:last()`,
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
        this.click(cloudMap['OK'])
    },
    verify() {
        openUserDefinition(this)
        this.has(userName)
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
        this.set('#fcld-userUserGroupEditor-name', groupName)
        this.evaluate(`FcldUiTest.setUiObjectValue("userUserGroupEditor-groupType", "Firewall User Group")`)
        this.evaluate(`FcldUiTest.setUiObjectValue("userUserGroupEditor-member", ["guest"])`)
        // this.hide('Members Panel')
        // this.click(cloudMap['Remote Groups Add'])
        // this.set(cloudMap['Remote Groups Group Name one'], 'remote groups one')
        // this.click(cloudMap['Remote Groups Add'])
        // this.set(cloudMap['Remote Groups Group Name two'], 'remote groups two')
        this.wait(1000)
        this.click(cloudMap['Save'])
        this.click(cloudMap['OK'])
    },
    verify() {
        openUserGroups(this)
        this.has(groupName)
    }
})


new Testcase({
    name: 'user_group_firewall delete',
    testcase() {
        this.click(cloudMap['Users & Groups'])
        this.wait(1000)
        this.click(cloudMap['Delete group one'])
        this.wait(1000)
        this.click(cloudMap['YES'])
        this.wait(1000)
    },
    verify() {
        openUserGroups(this)
        this.isDelete(groupName)
    }
})




new Testcase({
    name: 'user_group_guest new',
    testcase() {
        this.click(cloudMap['Users & Groups'])
        this.click(cloudMap['Create New'])
        this.click(cloudMap['User Group'])
        this.wait(1000)
        this.set('#fcld-userUserGroupEditor-name', groupName)
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
        this.evaluate(`FcldUiTest.setUiObjectValue("userUserGroupEditor-email", "false")`)
        this.evaluate(`FcldUiTest.setUiObjectValue("userUserGroupEditor-mobilePhone", "false")`)


        // this.click(cloudMap['guest'])
        // // this.hide('Members Panel')
        // this.click(cloudMap['Remote Groups Add'])
        // this.set(cloudMap['Remote Groups Group Name one'], 'remote groups one')
        // this.click(cloudMap['Remote Groups Add'])
        // this.set(cloudMap['Remote Groups Group Name two'], 'remote groups two')
        this.wait(1000)
        this.click(cloudMap['Save'])
        this.click(cloudMap['OK'])
    },
    verify() {
        openUserGroups(this)
        this.has(groupName)
    }
})


new Testcase({
    name: 'user_group_guest delete',
    testcase() {
        this.click(cloudMap['Users & Groups'])
        this.click(cloudMap['Delete group one'])
        this.click(cloudMap['YES'])
    },
    verify() {
        openUserGroups(this)
        this.isDelete(groupName)
    }
})