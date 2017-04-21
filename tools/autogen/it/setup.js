let cases = require('./root.js');

// [cloud-selector, {value}, gate-selector, {skip}
cases['login (must be first step)'] = [
    ["input#email", "zqqiang@fortinet.com", "input#username", "admin"],
    ["input[name='password']", "SuperCRM801", "input#secretkey"],
    ["input[type='submit']", undefined, "button#login_button"],
    ["div.img_link:contains('FGT60D4615007833')", undefined, "skip"],
    ["div.cat_link:contains('Management')", undefined, "skip"],
]

module.exports = cases;
