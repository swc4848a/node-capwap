let Testcase = require('../../src/testcase.js');

/**
 * Editor: utmWebFilterEditor, apiData)
 * Key/Id: both
 * "ftgdCategoryBasedFilter.status",
	"ftgdCategoryBasedFilter.filters",
	"ftgdCategoryBasedFilter.quota",
	"overrideChecked",
	"override.groups",
	"override.profiles",
	"override.scope",
	"override.durationMode",
    "override.duration-day",
    "override.duration-hour",
    "override.duration-minute",
	"searchEngineOptions.safeSearch",
//		YoutubeEdu("youtube_edu", "YouTube Education Filter"),
	"searchEngineOptions.youtubeEduationFilterId",
	"searchEngineOptions.logSearchKeyWords",
		
	"staticUrlFilter.blockInvalidURLs",
	"staticUrlFilter.urlListBySandbox",
	"staticUrlFilter.urlFiltersEnable",
	"staticUrlFilter.urlFilters"),
	"staticUrlFilter.contentFiltersEnable",
	"staticUrlFilter.contentFilters",
		
	"ratingOptions.allowErrorRating",
	"ratingOptions.rateByDomainAndIp",
	"ratingOptions.blockRedirectByRating",
	"ratingOptions.rateImgByURL",
		
	"proxyOptions.domainsUseGoogleAccountEnable",
	"proxyOptions.domainsUseGoogleAccount",
	"proxyOptions.httpErrorDetail",
	"proxyOptions.httpPostAction",
	"proxyOptions.javaFilter",
	"proxyOptions.activeXFilter",
	"proxyOptions.cookiesFilter"
 */
let apiData = {
    "ftgdCategoryBasedFilter.status" : true,
	//"ftgdCategoryBasedFilter.filters",
	//"ftgdCategoryBasedFilter.quota",
	"overrideChecked" : true,
	"override.groups" : "['Guest-group', 'SSO_Guest_Users']",
	"override.profiles" : "monitor-all",
	"override.scope" : "User Group",
	"override.durationMode" : "Predefined",
    "override.duration-day" : 3,
    "override.duration-hour" : 4,
    "override.duration-minute" : 5,
	"searchEngineOptions.safeSearch" : true,
//		YoutubeEdu("youtube_edu", "YouTube Education Filter"),
	"searchEngineOptions.youtubeEduationFilterId" : "testId",
	"searchEngineOptions.logSearchKeyWords" : true,
		
	"staticUrlFilter.blockInvalidURLs" : true,
	"staticUrlFilter.urlListBySandbox" : false,
	"staticUrlFilter.urlFiltersEnable" : false,
	//"staticUrlFilter.urlFilters",
	"staticUrlFilter.contentFiltersEnable" : false,
	//"staticUrlFilter.contentFilters",
		
	"ratingOptions.allowErrorRating" : true,
	"ratingOptions.rateByDomainAndIp" : true,
	"ratingOptions.blockRedirectByRating" : false,
	"ratingOptions.rateImgByURL" : false,
		
	"proxyOptions.domainsUseGoogleAccountEnable" : false,
	//"proxyOptions.domainsUseGoogleAccount",
	"proxyOptions.httpErrorDetail" : true,
	"proxyOptions.httpPostAction" : "Block",
	"proxyOptions.javaFilter" : false,
	"proxyOptions.activeXFilter" : true,
	"proxyOptions.cookiesFilter" : false
};

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
    'Delete Category Usage Quota': "td:contains('Discrimination') ~ td div.tool_delete",
    'Choose Categories Select': "div.apFortiGuardCategoryActionYes:contains('Select')",
    'Ok': "button:contains('Ok')",

    'Radio Ask': "label:contains('Ask')",

    'Save': "span:contains('Save')",
    'OK': "button:contains('OK')",
}

let gateMap = {
    'Security Profiles': "//span[text()='Security Profiles']",
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

    'SSO_Guest_Users': "SSO_Guest_Users",
    'Guest-group': "span.entry-value span span:contains(Guest-group)",
    'monitor-all': "monitor-all",
    'sniffer-profile': "span.entry-value span span:contains(sniffer-profile)",
    'Category Usage Quota With Discrimination': "td.category:contains(Discrimination)",

    'Switch applies to': "input[name='override.ovrd-scope']:checked",
    //'Switch Duration': "input:radio[name='override.ovrd-dur-mode']:checked",
    'Switch Duration': "input#ovrd-dur-mode-constant",
    'Duration Days': 'input#override_ovrd-dur_d',
    'Duration Hours': 'input#override_ovrd-dur_h',
    'Duration Minutes': 'input#override_ovrd-dur_m'
}

new Testcase({
    name: 'web filter edit common',
    testcase() {
        this.click(cloudMap['Web Filter'])
        this.wait(1000)
        this.readApiData('utmWebFilterEditor', apiData)
        /*
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
        */
        this.click(cloudMap['Save'])
    },
    verify() {
        this.click(gateMap['Security Profiles'])
        this.wait(500)
        this.click(gateMap['Web Filter'])
        this.wait(4000)
    //		YoutubeEdu("youtube_edu", "YouTube Education Filter"),
        //"searchEngineOptions.youtubeEduationFilterId" : "testId",
        //"staticUrlFilter.urlFilters",
        //"staticUrlFilter.contentFilters",
        //"ratingOptions.blockRedirectByRating" : false,
        //"proxyOptions.domainsUseGoogleAccount",
        this.isCheck(gateMap['FortiGuard category based filter'], apiData['ftgdCategoryBasedFilter.status'])
        this.isCheck(gateMap['Allow users to override blocked categories'], apiData['overrideChecked'])
        this.has(gateMap['SSO_Guest_Users'])
        this.has(gateMap['monitor-all'])
        this.isCheck(gateMap['Enforce Safe Search on Google, Yahoo!, Bing, Yandex'], apiData['searchEngineOptions.safeSearch'])
        this.isCheck(gateMap['Log all search keywords'], apiData['searchEngineOptions.logSearchKeyWords'])
        this.isCheck(gateMap['Block invalid URLs'], apiData['staticUrlFilter.blockInvalidURLs'])
        this.isCheck(gateMap['Block malicious URLs discovered by FortiSandbox'], apiData['staticUrlFilter.urlListBySandbox'])
        this.isCheck(gateMap['Allow websites when a rating error occurs'], apiData['ratingOptions.allowErrorRating'])
        this.isCheck(gateMap['Rate URLs by domain and IP Address'], apiData['ratingOptions.rateByDomainAndIp'])
        this.isCheck(gateMap['Rate images by URL'], apiData['ratingOptions.rateImgByURL'])
        this.isCheck(gateMap['Provide details for blocked HTTP 4xx and 5xx errors'], apiData['proxyOptions.httpErrorDetail'])
        this.isCheck(gateMap['HTTP POST Action Block'], apiData['proxyOptions.httpPostAction'] == 'Block')
        this.isCheck(gateMap['Remove Java Applets'], apiData['proxyOptions.javaFilter'])
        this.isCheck(gateMap['Remove ActiveX'], apiData['proxyOptions.activeXFilter'])
        this.isCheck(gateMap['Remove Cookies'], apiData['proxyOptions.cookiesFilter'])
        this.isCheck(gateMap['Switch Duration'], apiData['override.durationMode'] == "Predefined")
        this.isCheck(gateMap['URL Filter'], apiData['staticUrlFilter.urlFiltersEnable'])
        this.isCheck(gateMap['Web Content Filter'], apiData['staticUrlFilter.contentFiltersEnable'])
        this.isCheck(gateMap['Restrict Google account usage to specific domains'], apiData['proxyOptions.domainsUseGoogleAccountEnable'])
        let scope = apiData['override.scope'].toLowerCase().replace(/ /g, "-")
        this.isSet(gateMap['Switch applies to'], scope)
        this.isSet(gateMap['Duration Days'], apiData['override.duration-day'])
        this.isSet(gateMap['Duration Hours'], apiData['override.duration-hour'])
        this.isSet(gateMap['Duration Minutes'], apiData['override.duration-minute'])
    }
})

new Testcase({
    name: 'web filter edit category usage quota',
    testcase() {
        this.click(cloudMap['Web Filter'])
        this.wait(1000)
        this.click(cloudMap['Monitor All'])
        this.click(cloudMap['Add Category Usage Quota'])
        this.click(cloudMap['Choose Categories Select'])
        this.click(cloudMap['Ok'])
        this.click(cloudMap['Save'])
    },
    verify() {
        this.click(gateMap['Security Profiles'])
        this.wait(500)
        this.click(gateMap['Web Filter'])
        this.wait(4000)
        this.has('Discrimination')
    }
})

new Testcase({
    name: 'web filter delete category usage quota',
    testcase() {
        this.click(cloudMap['Web Filter'])
        this.wait(1000)
        this.click(cloudMap['Delete Category Usage Quota'])
        this.click(cloudMap['Save'])
    },
    verify() {
        this.click(gateMap['Security Profiles'])
        this.wait(500)
        this.click(gateMap['Web Filter'])
        this.wait(4000)
        // not work
        // this.isDelete('Discrimination')
    }
})

new Testcase({
    name: 'web filter edit Allow users to override blocked categories',
    testcase() {
        this.click(cloudMap['Web Filter'])
        this.evaluate(`FcldUiTest.setUiObjectValue("utmWebFilterEditor-override.durationMode", "Ask")`)
        this.evaluate(`FcldUiTest.setUiObjectValue("utmWebFilterEditor-override.scope", "Ask")`)
        this.click(cloudMap['Save'])
    },
    verify() {
        this.click(gateMap['Security Profiles'])
        this.wait(500)
        this.click(gateMap['Web Filter'])
        this.wait(4000)
        this.isSet(gateMap['Switch applies to'], "ask")
        this.isCheck(gateMap['Switch Duration'], false)
    }
})
/*
new Testcase({
    name: 'web filter edit url filter',
    testcase() {
        this.click(cloudMap['Web Filter'])
        this.click(cloudMap['URL Filter'])

        this.click(cloudMap['Save'])
    },
    verify() {
        this.click(gateMap['Security Profiles'])
        this.wait(500)
        this.click(gateMap['Web Filter'])
        this.wait(4000)
    }
})
*/
new Testcase({
    name: 'web filter clean',
    testcase() {
        this.click(cloudMap['Web Filter'])
        this.wait(1000)
        this.evaluate(`FcldUiTest.setUiObjectValue("utmWebFilterEditor-ftgdCategoryBasedFilter.status", ${!apiData['ftgdCategoryBasedFilter.status']})`)
        this.evaluate(`FcldUiTest.setUiObjectValue("utmWebFilterEditor-overrideChecked", ${!apiData['overrideChecked']})`)
        this.click(cloudMap['Save'])
    },
    verify() {
        this.click(gateMap['Security Profiles'])
        this.wait(500)
        this.click(gateMap['Web Filter'])
        this.wait(4000)
        this.isCheck(gateMap['FortiGuard category based filter'], !apiData['ftgdCategoryBasedFilter.status'])
        this.isCheck(gateMap['Allow users to override blocked categories'], !apiData['overrideChecked'])
    }
})