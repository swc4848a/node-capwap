let Testcase = require('../src/testcase.js');

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
    name: 'web filter edit common',
    testcase() {
        this.click(cloudMap['Web Filter'])
        this.uncheck(cloudMap['Checkbox All'])
        this.click(cloudMap['FortiGuard category based filter'])
        this.click(cloudMap['Allow All'])
        this.click(cloudMap['Allow users to override blocked categories'])
        this.click(cloudMap['SSO_Guest_Users'])
        this.click(cloudMap['monitor-all'])
        this.click(cloudMap['Enforce Safe Search on Google, Yahoo!, Bing, Yandex'])
        this.click(cloudMap['Log all search keywords'])
        this.click(cloudMap['Block invalid URLs'])
        this.click(cloudMap['Block malicious URLs discovered by FortiSandbox'])
        this.click(cloudMap['Allow websites when a rating error occurs'])
        this.click(cloudMap['Rate URLs by domain and IP Address'])
        this.click(cloudMap['Rate images by URL'])
        this.click(cloudMap['Provide details for blocked HTTP 4xx and 5xx errors'])
        this.click(cloudMap['HTTP POST Action Allow'])
        this.click(cloudMap['Remove Java Applets'])
        this.click(cloudMap['Remove ActiveX'])
        this.click(cloudMap['Remove Cookies'])
        this.click(cloudMap['Save'])
    },
    verify() {
        this.click(gateMap['Web Filter'])
        this.isCheck(gateMap['FortiGuard category based filter'])
        this.isCheck(gateMap['Allow users to override blocked categories'])
        this.has(gateMap['SSO_Guest_Users'])
        this.has(gateMap['monitor-all'])
        this.isCheck(gateMap['Enforce Safe Search on Google, Yahoo!, Bing, Yandex'])
        this.isCheck(gateMap['Log all search keywords'])
        this.isCheck(gateMap['Block invalid URLs'])
        this.isCheck(gateMap['Block malicious URLs discovered by FortiSandbox'])
        this.isCheck(gateMap['Allow websites when a rating error occurs'])
        this.isCheck(gateMap['Rate URLs by domain and IP Address'])
        this.isCheck(gateMap['Rate images by URL'])
        this.isCheck(gateMap['Provide details for blocked HTTP 4xx and 5xx errors'])
        this.isCheck(gateMap['HTTP POST Action Allow'])
        this.isCheck(gateMap['Remove Java Applets'])
        this.isCheck(gateMap['Remove ActiveX'])
        this.isCheck(gateMap['Remove Cookies'])
    }
})

new Testcase({
    name: 'web filter edit category usage quota',
    testcase() {
        this.click(cloudMap['Web Filter'])
        this.click(cloudMap['Monitor All'])
        this.click(cloudMap['Add Category Usage Quota'])
        this.click(cloudMap['Choose Categories Select'])
        this.click(cloudMap['Ok'])
        this.click(cloudMap['Save'])
    },
    verify() {
        this.click(gateMap['Web Filter'])
        this.has(gateMap['Category Usage Quota With Discrimination'])
    }
})

new Testcase({
    name: 'web filter delete category usage quota',
    testcase() {
        this.click(cloudMap['Web Filter'])
        this.click(cloudMap['Delete Category Usage Quota'])
        this.click(cloudMap['Save'])
    },
    verify() {
        this.click(gateMap['Web Filter'])
        this.isDelete(gateMap['Category Usage Quota With Discrimination'])
    }
})

new Testcase({
    name: 'web filter edit Allow users to override blocked categories',
    testcase() {
        this.click(cloudMap['Web Filter'])
        this.click(cloudMap['Radio Ask'])
        this.click(cloudMap['Save'])
    },
    verify() {
        this.click(gateMap['Web Filter'])
        this.isSet(gateMap['Switch applies to'], "ask")
        this.isSet(gateMap['Switch Duration'], "ask")
    }
})

new Testcase({
    name: 'web filter edit url filter',
    testcase() {
        this.click(cloudMap['Web Filter'])
        this.click(cloudMap['URL Filter'])

        this.click(cloudMap['Save'])
    },
    verify() {
        this.click(gateMap['Web Filter'])
    }
})

new Testcase({
    name: 'web filter clean',
    testcase() {
        this.click(cloudMap['Web Filter'])
        this.uncheck('Checkbox All')
        this.click(cloudMap['Save'])
    },
    verify() {
        this.click(gateMap['Web Filter'])
        this.isUncheck(gateMap['Checkbox All'])
    }
})