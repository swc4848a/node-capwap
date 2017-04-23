let cases = require('./root.js');

cases['web filter edit'] = [
    ["div.gwt-HTML:contains('Web Filter')", undefined, "a[page/p/utm/wf/profile/edit/default/']"],

    ["input:checkbox:eq(1)", true, "skip"], // Allow users to override blocked categories: enable
    ["input:checkbox:eq(2)", true, "skip"], // SSO_Guest_Users
    ["input:checkbox:eq(3)", true, "skip"], // Guest-group
    ["input:checkbox:eq(4)", true, "skip"], // monitor-all
    ["input:checkbox:eq(5)", true, "skip"], // sniffer-profile

    ["table.fgtWebFilterDuration>tbody>tr>td>input:eq(0)", 5, "skip"], // day
    ["table.fgtWebFilterDuration>tbody>tr>td>input:eq(1)", 5, "skip"], // hour
    ["table.fgtWebFilterDuration>tbody>tr>td>input:eq(2)", 5, "skip"], // minute

    ["input:checkbox:eq(6)", true, "skip"], // Enforce Safe Search on Google, Yahoo!, Bing, Yandex
    ["input.gwt-TextBox", "youtube id", "skip"],
    ["input:checkbox:eq(7)", true, "skip"], // Log all search keywords
    
    ["input:checkbox:eq(8)", true, "skip"], // Block invalid URLs
    ["input:checkbox:eq(10)", true, "skip"], // Block malicious URLs discovered by FortiSandbox

    ["input:checkbox:eq(12)", true, "skip"], // Allow websites when a rating error occurs
    ["input:checkbox:eq(13)", true, "skip"], // Rate URLs by domain and IP Address
    ["input:checkbox:eq(14)", true, "skip"], // Block HTTP redirects by rating
    ["input:checkbox:eq(15)", true, "skip"], // Rate images by URL

    ["input:checkbox:eq(17)", true, "skip"], // Provide details for blocked HTTP 4xx and 5xx errors
    
    ["input:checkbox:eq(18)", true, "skip"], // Remove Java Applets
    ["input:checkbox:eq(19)", true, "skip"], // Remove ActiveX
    ["input:checkbox:eq(20)", true, "skip"], // Remove Cookies

    ["span:contains('Save')", undefined, "skip"],
];

delete cases['web filter edit'];

module.exports = cases;
