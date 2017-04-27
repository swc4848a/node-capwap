let cases = require('./root.js');

// todo: bug
cases['routing new'] = [
    ["div.gwt-HTML:contains('Routing')"],
    ["button[title='Create New']"],
    ["input.gwt-TextBox:eq(0)", "192.168.18.0"],
    ["input.gwt-TextBox:eq(1)", "255.255.255.0"],
    ["input.gwt-TextBox:eq(2)", "192.168.1.1"],
    ["input.gwt-TextBox:eq(3)", 11],
    ["textarea.gwt-TextArea", "test comments"],
    ["span:contains('Save')"],
]

module.exports = cases;
