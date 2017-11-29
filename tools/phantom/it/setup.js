const config = require('../config.js');

let login = {
    cloud: [
        ["input#email", "zqqiang@fortinet.com"],
        ["input[name='password']", "SuperCRM801"],
        ["input[type='submit']", undefined],
        ["img[width='113']", undefined],
        ["div.gwt-HTML:contains('Default')", undefined],
        ["div.img_link:contains('" + config.fortigateSN + "')", undefined],
        ["div.cat_link:contains('Management')", undefined],
    ],
    gate: [
        ["input#username", "admin"],
        ["button#login_button", undefined],
        ["button:contains('Later')", undefined],
    ]
}

module.exports = login;
