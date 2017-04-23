let cases = require('./root.js');

cases['dns filter edit block'] = [
    ["div.gwt-HTML:contains('DNS Filter')", undefined, "skip"],

    ["input:checkbox:eq(0)", true, "skip"], // Block DNS requests to known botnet C&C
    ["input:checkbox:eq(1)", true, "skip"], // FortiGuard category based filter
    ["div.apFortiGuardCategoryActionAllow", undefined, "skip"], // click all allow
    ["input:checkbox:eq(2)", true, "skip"], // Domain Filter
    ["div.tool_new", undefined, "skip"],
    ["input.gwt-TextBox", "new.com", "skip"],
    ["label:contains('RegEx')", undefined, "skip"], // type: RegExp
    ["label:contains('Allow')", undefined, "skip"], // action: allow
    ["div.tk-ModalDialog input:checkbox", true, "skip"], //Status
    ["div.tk-ModalDialog button:contains('Ok')", undefined, "skip"], //Status
    ["input:checkbox:eq(3)", true, "skip"], // Allow DNS requests when a rating error occurs
    ["input:checkbox:eq(4)", true, "skip"], // Log all Domains

    ["label:contains('Block')", undefined, "skip"],

    ["span:contains('Save')", undefined, "skip"],
];

cases['dns filter edit redirect'] = [
    ["div.gwt-HTML:contains('DNS Filter')", undefined, "skip"],

    ["input:checkbox:eq(0)", true, "skip"], // Block DNS requests to known botnet C&C
    ["input:checkbox:eq(1)", true, "skip"], // FortiGuard category based filter
    ["div.apFortiGuardCategoryActionAllow", undefined, "skip"], // click all allow
    ["input:checkbox:eq(2)", true, "skip"], // Domain Filter
    ["div.tool_new", undefined, "skip"],
    ["input.gwt-TextBox", "new.com", "skip"],
    ["label:contains('RegEx')", undefined, "skip"], // type: RegExp
    ["label:contains('Allow')", undefined, "skip"], // action: allow
    ["div.tk-ModalDialog input:checkbox", true, "skip"], //Status
    ["div.tk-ModalDialog button:contains('Ok')", undefined, "skip"], //Status
    ["input:checkbox:eq(3)", true, "skip"], // Allow DNS requests when a rating error occurs
    ["input:checkbox:eq(4)", true, "skip"], // Log all Domains

    ["label:contains('Redirect')", undefined, "skip"],
    ["input:eq(57)", "2.3.3.3", "skip"],

    ["span:contains('Save')", undefined, "skip"],
];

delete cases['dns filter edit block'];

module.exports = cases;
