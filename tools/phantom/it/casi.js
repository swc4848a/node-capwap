let cases = require('./root.js');

cases['cloud access security inspection edit'] = [
    ["div.gwt-HTML:contains('Cloud Access Security Inspection')", undefined, "skip"],

    ["textarea.gwt-TextArea", "test comments", "skip"],
    ["div.apFortiGuardCategoryActionAllow", undefined, "skip"], // click all allow

    ["span:contains('Save')", undefined, "skip"],
];

module.exports = cases;
