let Testcase = require("src/testcase.js");
/**
 * Editor: utmWebRatingEditor
 * Key/Id: both
 	    "url",
        "category",
	    "sub_category"
 */

let apiData = {
  url: "test.com",
  category: "Bandwidth Consuming",
  sub_category: "Peer-to-peer File Sharing"
};

let cloudMap = {
  "Web Rating Overrides": "div.gwt-HTML:contains('Web Rating Overrides')",

  "Create New": "button:contains('Create New')",
  URL: "input.gwt-TextBox",

  Save: "span:contains('Save')",
  OK: "button:contains('OK')",

  Delete: "div[title='Delete']",
  YES: "button:contains('YES')"
};

let gateMap = {
  "Security Profiles": "//span[text()='Security Profiles']",
  "Web Rating Overrides": "a[ng-href='page/p/utm/wf/local_rating/']",

  "a.com": "tr[mkey='a.com']"
};

new Testcase({
  name: "Web Rating Overrides edit",
  testcase() {
    this.click(cloudMap["Web Rating Overrides"]);
    this.wait(1000);
    this.click(cloudMap["Create New"]);
    this.wait(1000);
    this.readApiData("utmWebRatingEditor", apiData);
    this.click("#fcld-utmWebRatingEditor-save");
    this.click(cloudMap["OK"]);
  },
  verify() {
    this.click(gateMap["Security Profiles"]);
    this.wait(500);
    this.click(gateMap["Web Rating Overrides"]);
    this.wait(8000);

    this.has(apiData["url"]);
    this.has(apiData["sub_category"]);
  }
});

new Testcase({
  name: "Web Rating Overrides delete",
  testcase() {
    this.click(cloudMap["Web Rating Overrides"]);

    this.click(cloudMap["Delete"]);
    this.click(cloudMap["YES"]);
  },
  verify() {
    this.click(gateMap["Security Profiles"]);
    this.wait(500);
    this.click(gateMap["Web Rating Overrides"]);
    this.wait(8000);

    this.isDelete(apiData["url"]);
    this.isDelete(apiData["sub_category"]);
  }
});
