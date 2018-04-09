let Testcase = require('../../src/testcase.js');

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

    'Delete user one': "div[title='Delete']:eq(0)",
    'Delete group one': "div[title='Delete']:eq(0)",
    'YES': "div.gwt-PopupPanel button:contains('YES')"
}

let gateMap = {
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

new Testcase({
    name: 'user new',
    testcase() {
        this.click(cloudMap['Users & Groups'])
        this.click(cloudMap['Create New'])
        this.click(cloudMap['User'])

        this.set(cloudMap['Name'], 'user one')
        this.set(cloudMap['Password'], '12345678')
        this.set(cloudMap['Email Address'], 'a@qq.com')
        this.set(cloudMap['SMS'], '+16668888888')
        this.check(cloudMap['Enabled'])

        this.click(cloudMap['Save'])
        this.click(cloudMap['OK'])
    },
    verify() {
        this.isSet(gateMap['User Name'], "user one")
        this.isSet(gateMap['Email Address'], "a@qq.com")
        this.has(gateMap['Country Dial Code Canada'])
        this.isSet(gateMap['Phone Number'], '(666) 888-8888_____')
        this.isSet(gateMap['User Account Status'], "enable")
    }
})

new Testcase({
    name: 'user group new',
    testcase() {
        this.click(cloudMap['Users & Groups'])
        this.click(cloudMap['Create New'])
        this.click(cloudMap['User Group'])

        this.set(cloudMap['Name'], 'group one')
        this.click(cloudMap['Members'])
        this.click(cloudMap['guest'])
        // this.hide('Members Panel')
        this.click(cloudMap['Remote Groups Add'])
        this.set(cloudMap['Remote Groups Group Name one'], 'remote groups one')
        this.click(cloudMap['Remote Groups Add'])
        this.set(cloudMap['Remote Groups Group Name two'], 'remote groups two')

        this.click(cloudMap['Save'])
        this.click(cloudMap['OK'])
    },
    verify() {
        this.isSet(gateMap['Group Name'], "group one")
        this.has(gateMap['Guest Members'])
        this.has(gateMap['Remote Server windows'])
        this.has(gateMap['Group Name one'])
        this.has(gateMap['Group Name two'])
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
        this.isDelete(gateMap['user one'])
    }
})

new Testcase({
    name: 'user group delete',
    testcase() {
        this.click(cloudMap['Users & Groups'])
        this.click(cloudMap['Delete group one'])
        this.click(cloudMap['YES'])
    },
    verify() {
        this.isDelete(gateMap['user group one'])
    }
})