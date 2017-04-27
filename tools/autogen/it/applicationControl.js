let cases = require('./root.js');

cases['application control edit'] = [
    ["div.gwt-HTML:contains('Application Control')", undefined, "skip"],

    ["textarea.gwt-TextArea", "test comments", "skip"], // todo: bug
    ["div.appActionMonitor", undefined, "skip"], // click all monitor
    ["div.appActionQuarantine:eq(18)", undefined, "skip"], // web others

    ["div.tk-ModalDialog input", 11, "skip"], // set all 11
    ["div.tk-ModalDialog button:contains('Ok')", undefined, "skip"],

    ["div.tool_new", undefined, "skip"], // create new signature
    ["div.tk-ModalDialog input:checkbox:eq(0)", true, "skip"], // choose first two signature
    ["div.tk-ModalDialog input:checkbox:eq(1)", true, "skip"],
    ["div.tk-ModalDialog button:contains('Ok')", undefined, "skip"],
    
    ["input:checkbox", true, "skip"], // click all checkbox

    ["span:contains('Save')", undefined, "skip"],
];

module.exports = cases;
