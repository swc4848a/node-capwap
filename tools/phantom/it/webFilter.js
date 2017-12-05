let Testcase = require('../testcase.js');

let cloudMap = {
    'Web Filter': "div.gwt-HTML:contains('Web Filter')",

    'FortiGuard category based filter': "label:contains('FortiGuard category based filter')",
    'Allow users to override blocked categories': "label:contains('Allow users to override blocked categories')",
    'Enforce Safe Search on Google, Yahoo!, Bing, Yandex': "label:contains('Enforce Safe Search on Google, Yahoo!, Bing, Yandex')",
    'Log all search keywords': "label:contains('Log all search keywords')",
    'Block invalid URLs': "label:contains('Block invalid URLs')",
    'URL Filter': "label:contains('URL Filter')",
    'Block malicious URLs discovered by FortiSandbox': "label:contains('Block malicious URLs discovered by FortiSandbox')",
    'Web Content Filter': "label:contains('Web Content Filter')",
    'Allow websites when a rating error occurs': "label:contains('Allow websites when a rating error occurs')",
    'Rate URLs by domain and IP Address': "label:contains('Rate URLs by domain and IP Address')",
    'Block HTTP redirects by rating': "label:contains('Block HTTP redirects by rating')",
    'Rate images by URL': "label:contains('Rate images by URL')",
    'Restrict Google account usage to specific domains': "label:contains('Restrict Google account usage to specific domains')",
    'Provide details for blocked HTTP 4xx and 5xx errors': "label:contains('Provide details for blocked HTTP 4xx and 5xx errors')",
    'HTTP POST Action Allow': "label:contains('Allow'):eq(2)",
    'HTTP POST Action Block': "label:contains('Block'):eq(3)",
    'Remove Java Applets': "label:contains('Remove Java Applets')",
    'Remove ActiveX': "label:contains('Remove ActiveX')",
    'Remove Cookies': "label:contains('Remove Cookies')",

    'Checkbox All': "input:checkbox",
    'Allow All': "div.apFortiGuardCategoryActionAllow:contains('Allow')",
    'Monitor All': "div.apFortiGuardCategoryActionMonitor:contains('Monitor')",
    'SSO_Guest_Users': "label:contains('SSO_Guest_Users')",
    'Guest-group': "label:contains('Guest-group')",
    'monitor-all': "label:contains('monitor-all')",
    'sniffer-profile': "label:contains('sniffer-profile')",

    'Add Category Usage Quota': "div.tool_new:eq(0)",
    'Delete Category Usage Quota': "div.tool_delete",
    'Choose Categories Select': "div.apFortiGuardCategoryActionYes:contains('Select')",
    'Ok': "button:contains('Ok')",

    'Radio Ask': "label:contains('Ask')",

    'Save': "span:contains('Save')",
    'OK': "button:contains('OK')",
}

let gateMap = {
    'Web Filter': "a[ng-href='page/p/utm/wf/profile/edit/default/']",

    'FortiGuard category based filter': "input#ftgd_ftgd_cats",
    'Allow users to override blocked categories': "input#override_checked",
    'Enforce Safe Search on Google, Yahoo!, Bing, Yandex': "input#safe_search",
    'Log all search keywords': "input#web_log-search",
    'Block invalid URLs': "input#options_block-invalid-url",
    'URL Filter': "input#web_urlfilter-table",
    'Block malicious URLs discovered by FortiSandbox': "input#enable_blacklist",
    'Web Content Filter': "input#wfcontent-table",
    'Allow websites when a rating error occurs': "input#ftgd-wf_options_error-allow",
    'Rate URLs by domain and IP Address': "input#ftgd-wf_options_rate-server-ip",
    'Block HTTP redirects by rating': "",
    'Rate images by URL': "input#rate-image-urls",
    'Restrict Google account usage to specific domains': "input#restrict_google_accounts",
    'Provide details for blocked HTTP 4xx and 5xx errors': "input#ftgd-wf_options_http-err-detail",
    'HTTP POST Action Allow': "input#post-action-normal",
    'HTTP POST Action Block': "input#post-action-block",
    'Remove Java Applets': "input#options_javafilter",
    'Remove ActiveX': "input#options_activexfilter",
    'Remove Cookies': "input#options_cookiefilter",

    'SSO_Guest_Users': "span.entry-value:contains('SSO_Guest_Users')",
    'Guest-group': "span.entry-value:contains('Guest-group')",
    'monitor-all': "span.entry-value:contains('monitor-all')",
    'sniffer-profile': "span.entry-value:contains('sniffer-profile')",
    'Category Usage Quota With Discrimination': "td.category:contains('Discrimination')",

    'Switch applies to': "input:radio[name='override.ovrd-scope']:checked",
    'Switch Duration': "input:radio[name='override.ovrd-dur-mode']:checked",
}

new Testcase({
    name: 'template: web filter edit',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Web Filter')
        c.unchecked('Checkbox All')
        c.click('FortiGuard category based filter')
        c.click('Allow All')
        c.click('Allow users to override blocked categories')
        c.click('SSO_Guest_Users')
        c.click('monitor-all')
        c.click('Enforce Safe Search on Google, Yahoo!, Bing, Yandex')
        c.click('Log all search keywords')
        c.click('Block invalid URLs')
        c.click('Block malicious URLs discovered by FortiSandbox')
        c.click('Allow websites when a rating error occurs')
        c.click('Rate URLs by domain and IP Address')
        c.click('Rate images by URL')
        c.click('Provide details for blocked HTTP 4xx and 5xx errors')
        c.click('HTTP POST Action Allow')
        c.click('Remove Java Applets')
        c.click('Remove ActiveX')
        c.click('Remove Cookies')
        c.click('Save')
    },
    verify: (g) => {
        g.click('Web Filter')
        g.isChecked('FortiGuard category based filter')
        g.isChecked('Allow users to override blocked categories')
        g.has('SSO_Guest_Users')
        g.has('monitor-all')
        g.isChecked('Enforce Safe Search on Google, Yahoo!, Bing, Yandex')
        g.isChecked('Log all search keywords')
        g.isChecked('Block invalid URLs')
        g.isChecked('Block malicious URLs discovered by FortiSandbox')
        g.isChecked('Allow websites when a rating error occurs')
        g.isChecked('Rate URLs by domain and IP Address')
        g.isChecked('Rate images by URL')
        g.isChecked('Provide details for blocked HTTP 4xx and 5xx errors')
        g.isChecked('HTTP POST Action Allow')
        g.isChecked('Remove Java Applets')
        g.isChecked('Remove ActiveX')
        g.isChecked('Remove Cookies')
    }
})

new Testcase({
    name: 'template: web filter edit category usage quota',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Web Filter')
        c.click('Monitor All')
        c.click('Add Category Usage Quota')
        c.click('Choose Categories Select')
        c.click('Ok')
        c.click('Save')
    },
    verify: (g) => {
        g.click('Web Filter')
        g.has('Category Usage Quota With Discrimination')
    }
})

new Testcase({
    name: 'template: web filter delete category usage quota',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Web Filter')
        c.click('Delete Category Usage Quota')
        c.click('Save')
    },
    verify: (g) => {
        g.click('Web Filter')
        g.isDelete('Category Usage Quota With Discrimination')
    }
})

new Testcase({
    name: 'template: web filter edit Allow users to override blocked categories',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Web Filter')
        c.click('Radio Ask')
        c.click('Save')
    },
    verify: (g) => {
        g.click('Web Filter')
        g.isSet('Switch applies to', "ask")
        g.isSet('Switch Duration', "ask")
    }
})

new Testcase({
    name: 'template: web filter edit url filter',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Web Filter')
        c.click('URL Filter')

        c.click('Save')
    },
    verify: (g) => {
        g.click('Web Filter')
    }
})

new Testcase({
    name: 'template: web filter clean',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Web Filter')
        c.unchecked('Checkbox All')
        c.click('Save')
    },
    verify: (g) => {
        g.click('Web Filter')
        g.isUnchecked('Checkbox All')
    }
})
