const config = require('../config.js');

let login = {
    devAlpha : [
        ["input:eq(0)", config.cloudUsername],
        ["input:eq(1)", config.cloudPassword],
        ["button", undefined],
        ["div.img_link:contains('" + config.fortigateSN + "')", undefined],
        ["div.cat_link:contains('Management')", undefined],
    ],
    cloud : [
        ["input#email", config.cloudUsername],
        ["input[name='password']", config.cloudPassword],
        ["input[type='submit']", undefined],
        // ["img[width='113']", undefined],
        ["div.img_link:contains('" + config.fortigateSN + "')", undefined],
        ["div.cat_link:contains('Management')", undefined],
    ],
    cloudMultiTenancy : [
        ["input#email", config.cloudUsername],
        ["input[name='password']", config.cloudPassword],
        ["input[type='submit']", undefined],
        ["img[width='113']", undefined],
        ["div.gwt-HTML:contains('Default')", undefined],
        ["div.img_link:contains('" + config.fortigateSN + "')", undefined],
        ["div.cat_link:contains('Management')", undefined],
    ],
    template: [
        ["input#email", config.cloudUsername],
        ["input[name='password']", config.cloudPassword],
        ["input[type='submit']", undefined],
        ["img[width='113']", undefined],
        ["table.flat_button-blue td:contains('Group Management')", undefined],
        ["div.filter_text:contains('Manage Templates')", undefined],
        ["div[title='Edit']", undefined],
    ],
    gate: [
        ["input#username", "admin"],
        ["input[type='password']", "admin"],
        ["button#login_button", undefined],
        // ["button:contains('Later')", undefined],
    ]
}

module.exports = login;
