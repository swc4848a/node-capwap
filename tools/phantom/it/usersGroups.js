let Testcase = require('../testcase.js');

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
    'Phone Number': "input[ng-model='$ctrl.user.$sms.phoneNumber']",
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
    name: 'template: user new',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Users & Groups')
        c.click('Create New')
        c.click('User')

        c.set('Name', 'user one')
        c.set('Password', '12345678')
        c.set('Email Address', 'a@qq.com')
        c.set('SMS', '+16668888888')
        c.checked('Enabled')

        c.click('Save')
        c.click('OK')
    },
    verify: (g) => {
        g.redirect('/ng/user/local/edit/user%20one')
        g.isSet('User Name', "user one")
        g.isSet('Email Address', "a@qq.com")
        g.has('Country Dial Code Canada')
        g.isSet('Phone Number', '(666) 888-8888_____')
        g.isSet('User Account Status', "enable")
    }
})

new Testcase({
    name: 'template: user group new',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Users & Groups')
        c.click('Create New')
        c.click('User Group')

        c.set('Name', 'group one')
        c.click('Members')
        c.click('guest')
        c.hide('Members Panel')
        c.click('Remote Groups Add')
        c.set('Remote Groups Group Name one', 'remote groups one')
        c.click('Remote Groups Add')
        c.set('Remote Groups Group Name two', 'remote groups two')

        c.click('Save')
        c.click('OK')
    },
    verify: (g) => {
        g.redirect('/ng/user/group/edit/group%2520one?vdom=root')
        g.isSet('Group Name', "group one")
        g.has('Guest Members')
        // g.has('Remote Server windows')
        // g.has('Group Name one')
        // g.has('Group Name two')
    }
})

new Testcase({
    name: 'template: user delete',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Users & Groups')
        c.click('Delete user one')
        c.click('YES')
    },
    verify: (g) => {
        g.isDelete('user one')
    }
})

new Testcase({
    name: 'template: user group delete',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Users & Groups')
        c.click('Delete group one')
        c.click('YES')
    },
    verify: (g) => {
        g.isDelete('user group one')
    }
})