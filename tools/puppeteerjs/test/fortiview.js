const Page = require("src/page");
const cases = require("src/cases");
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const config = require("conf/config");

let startTime = `2018-04-01 00:00`;
let endTime = `2018-04-30 23:59`;
let assertName = `Name should be the same.`;
let assertNumber = `Number should be the same.`;

describe(`FortiView Test Suite`, function() {
  this.timeout(0);
  let cloud;

  async function cloudLogin() {
    await cloud.goto(`${config.cloudUrl}`);
    await cloud.wait(`input#email`);
    await cloud.type(`input#email`, `${config.fortiviewModuleCloudUsername}`);
    await cloud.type(
      `input[name="password"]`,
      `${config.fortiviewModuleCloudPassword}`
    );
    await cloud.click(`input[type="submit"]`);
  }

  async function cloudNavigation() {
    if (config.fotiviewIsMultiTenancy) {
      await cloud.wait(1000);
      await cloud.click(`//label[text()="Including lower level"]`);
      await cloud.wait(1000);
      await cloud.click(`//div[text()="${config.fortiviewModuleCloudSN}"]`);
      await cloud.click(`//div[text()="FortiView"]`);
      await cloud.wait(1000);
    } else {
      await cloud.click(`//div[text()="${config.fortiviewModuleCloudSN}"]`);
      await cloud.click(`//div[text()="FortiView"]`);
      await cloud.wait(1000);
    }
  }

  before(async function() {
    let headless = undefined === process.env.HEADLESS ? true : false;
    console.log(`  headless mode is ${headless}`);
    cloud = new Page();
    await cloud.setup({
      headless: headless
    });
    await cloudLogin();
    await cloudNavigation();
  });

  after(async function() {
    await cloud.close();
  });

  // npm run debug -- --grep "fortiview_threats_topThreats"
  it(`fortiview_threats_topThreats`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(Top Threats)", "click", "click")`
    );
    await cloud.wait(1000);

    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("GLOBAL(datePicker)-rangeDropdown", "Specify")`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("GLOBAL(datePicker)-dateTimeSelection", "${startTime} ~ ${endTime}")`
    );
    await cloud.wait(1000);
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("GLOBAL(datePicker)-refresh", "Refresh Now")`
    );
    await cloud.wait(`tr.data`);

    //row one and row last
    let rowOneName = await cloud.text(`tr.data:eq(0)>td:eq(1)`);
    let rowOneNumber = await cloud.text(`tr.data:eq(0)>td:eq(4)`);
    let rowLastName = await cloud.text(`tr.data:eq(19)>td:eq(1)`);
    let rowLastNumber = await cloud.text(`tr.data:eq(19)>td:eq(4)`);
    assert.equal(rowOneName, `JS/Runfile.B!tr`, `"${assertName}"`);
    assert.equal(rowOneNumber, `647,250`, `${assertNumber}`);
    assert.equal(
      rowLastName,
      `Bash.Function.Definitions.Remote.Code.Execution`,
      `"${assertName}"`
    );
    assert.equal(rowLastNumber, `2,400`, `${assertNumber}`);
  });

  // npm run debug -- --grep "fortiview_threats_ips"
  it(`fortiview_threats_ips`, async function() {
    await cloud.evaluate(`FcldUiTest.setUiObjectValue("MENU:(IPS)", "click")`);
    await cloud.wait(1000);

    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("GLOBAL(datePicker)-rangeDropdown", "Specify")`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("GLOBAL(datePicker)-dateTimeSelection", "${startTime} ~ ${endTime}")`
    );
    await cloud.wait(1000);
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("GLOBAL(datePicker)-refresh", "Refresh Now")`
    );
    await cloud.wait(`tr.data`);
    //row one and row last
    let rowOneName = await cloud.text(
      `tr.data:eq(0)>td:eq(1)>div:eq(0)>span:eq(1)`
    );
    let rowOneNumber = await cloud.text(`tr.data:eq(0)>td:eq(3)>div:eq(0)`);
    let rowLastNumber = await cloud.text(`tr.data:eq(12)>td:eq(3)>div:eq(0)`);
    let rowLastName = await cloud.text(
      `tr.data:eq(12)>td:eq(1)>div:eq(0)>span:eq(1)`
    );
    assert.equal(
      rowOneName,
      `SSLv3.POODLE.Information.Disclosure`,
      `"${assertName}"`
    );
    assert.equal(rowOneNumber, `24,224`, `${assertNumber}`);
    assert.equal(rowLastName, `FTP.Text.Line.Too.Long`, `"${assertName}"`);
    assert.equal(rowLastNumber, `24`, `${assertNumber}`);
  });

  // npm run debug -- --grep "fortiview_threats_antivirus"
  it(`fortiview_threats_antivirus`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(AntiVirus)", "click")`
    );
    await cloud.wait(1000);

    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("GLOBAL(datePicker)-rangeDropdown", "Specify")`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("GLOBAL(datePicker)-dateTimeSelection", "${startTime} ~ ${endTime}")`
    );
    await cloud.wait(1000);
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("GLOBAL(datePicker)-refresh", "Refresh Now")`
    );
    await cloud.wait(`tr.data`);
    //row one and row last
    let rowOneName = await cloud.text(`tr.data:eq(0)>td:eq(1)`);
    let rowOneNumber = await cloud.text(`tr.data:eq(0)>td:eq(3)`);
    let rowLastName = await cloud.text(`tr.data:eq(1)>td:eq(1)`);
    let rowLastNumber = await cloud.text(`tr.data:eq(1)>td:eq(3)`);
    assert.equal(rowOneName, `JS/Runfile.B!tr`, `"${assertName}"`);
    assert.equal(rowOneNumber, `12,945`, `${assertNumber}`);
    assert.equal(rowLastName, `VBS/Ramnit.4D5`, `"${assertName}"`);
    assert.equal(rowLastNumber, `1,569`, `${assertNumber}`);
  });

  // npm run debug -- --grep "fortiview_threats_antispam"
  it(`fortiview_threats_antispam`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(AntiSpam)", "click")`
    );
    await cloud.wait(1000);

    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("GLOBAL(datePicker)-rangeDropdown", "Specify")`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("GLOBAL(datePicker)-dateTimeSelection", "${startTime} ~ ${endTime}")`
    );
    await cloud.wait(1000);
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("GLOBAL(datePicker)-refresh", "Refresh Now")`
    );
    await cloud.wait(`tr.data`);
    //row one and row last
    let rowOneName = await cloud.text(`tr.data:eq(0)>td:eq(1)`);
    let rowOneNumber = await cloud.text(`tr.data:eq(0)>td:eq(2)`);
    let rowLastName = await cloud.text(`tr.data:eq(4)>td:eq(1)`);
    let rowLastNumber = await cloud.text(`tr.data:eq(4)>td:eq(2)`);
    assert.equal(rowOneName, `172.16.68.101(Snow)`, `"${assertName}"`);
    assert.equal(rowOneNumber, `214`, `"${assertNumber}"`);
    assert.equal(rowLastName, `172.16.68.115(Bee)`, `"${assertName}"`);
    assert.equal(rowLastNumber, `18`, `"${assertNumber}"`);
  });

  // npm run debug -- --grep "fortiview_threats_dlpAndArchives"
  it(`fortiview_threats_dlpAndArchives`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(DLP & Archives)", "click")`
    );
    await cloud.wait(1000);

    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("GLOBAL(datePicker)-rangeDropdown", "Specify")`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("GLOBAL(datePicker)-dateTimeSelection", "${startTime} ~ ${endTime}")`
    );
    await cloud.wait(1000);
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("GLOBAL(datePicker)-refresh", "Refresh Now")`
    );
    await cloud.wait(`tr.data`);
    //row one and row last
    let rowOneName = await cloud.text(`tr.data:eq(0)>td:eq(1)`);
    let rowOneNumber = await cloud.text(`tr.data:eq(0)>td:eq(2)`);
    let rowLastName = await cloud.text(`tr.data:eq(19)>td:eq(1)`);
    let rowLastNumber = await cloud.text(`tr.data:eq(19)>td:eq(2)`);
    assert.equal(rowOneName, `172.16.26.100`, `"${assertName}"`);
    assert.equal(rowOneNumber, `760`, `"${assertNumber}"`);
    assert.equal(rowLastName, `172.16.150.109`, `"${assertName}"`);
    assert.equal(rowLastNumber, `24`, `"${assertNumber}"`);
  });

  // npm run debug -- --grep "fortiview_threats_anomaly"
  it(`fortiview_threats_anomaly`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(Anomaly)", "click")`
    );
    await cloud.wait(1000);

    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("GLOBAL(datePicker)-rangeDropdown", "Specify")`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("GLOBAL(datePicker)-dateTimeSelection", "${startTime} ~ ${endTime}")`
    );
    await cloud.wait(1000);
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("GLOBAL(datePicker)-refresh", "Refresh Now")`
    );
    await cloud.wait(`tr.data`);
    //row one and row last
    let rowOneName = await cloud.text(
      `tr.data:eq(0)>td:eq(1)>div:eq(0)>span:eq(1)`
    );
    let rowOneNumber = await cloud.text(`tr.data:eq(0)>td:eq(3)>div:eq(0)`);
    let rowLastName = await cloud.text(
      `tr.data:eq(1)>td:eq(1)>div:eq(0)>span:eq(1)`
    );
    let rowLastNumber = await cloud.text(`tr.data:eq(1)>td:eq(3)>div:eq(0)`);
    assert.equal(rowOneName, `tcp_src_session`, `"${assertName}"`);
    assert.equal(rowOneNumber, `349`, `"${assertNumber}"`);
    assert.equal(rowLastName, `ip_src_session`, `"${assertName}"`);
    assert.equal(rowLastNumber, `316`, `"${assertNumber}"`);
  });

  // npm run debug -- --grep "fortiview_traffic_application"
  it(`fortiview_traffic_application`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(Application)", "click")`
    );
    await cloud.wait(1000);

    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("GLOBAL(datePicker)-rangeDropdown", "Specify")`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("GLOBAL(datePicker)-dateTimeSelection", "${startTime} ~ ${endTime}")`
    );
    await cloud.wait(1000);
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("GLOBAL(datePicker)-refresh", "Refresh Now")`
    );
    await cloud.wait(`tr.data`);
    //row one and row last
    let rowOneName = await cloud.text(
      `tr.data:eq(0)>td:eq(1)>div:eq(0)>span:eq(1)`
    );
    let rowOneNumber = await cloud.text(
      `tr.data:eq(0)>td:eq(5)>table:eq(0)>tbody:eq(0)>tr:eq(0)>td:eq(0)>div:eq(0)`
    );
    let rowLastName = await cloud.text(
      `tr.data:eq(19)>td:eq(1)>div:eq(0)>span:eq(1)`
    );
    let rowLastNumber = await cloud.text(
      `tr.data:eq(19)>td:eq(5)>table:eq(0)>tbody:eq(0)>tr:eq(0)>td:eq(0)>div:eq(0)`
    );
    assert.equal(rowOneName, `youtube`, `"${assertName}"`);
    assert.equal(rowOneNumber, `13,801`, `"${assertNumber}"`);
    assert.equal(rowLastName, `dns`, `"${assertName}"`);
    assert.equal(rowLastNumber, `231,867`, `"${assertNumber}"`);
  });

  // npm run debug -- --grep "fortiview_traffic_source"
  it(`fortiview_traffic_source`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(Source)", "click")`
    );
    await cloud.wait(1000);

    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("GLOBAL(datePicker)-rangeDropdown", "Specify")`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("GLOBAL(datePicker)-dateTimeSelection", "${startTime} ~ ${endTime}")`
    );
    await cloud.wait(1000);
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("GLOBAL(datePicker)-refresh", "Refresh Now")`
    );
    await cloud.wait(`tr.data`);
    //row one and row last
    let rowOneName = await cloud.text(`tr.data:eq(0)>td:eq(1)>div:eq(0)`);
    let rowOneNumber = await cloud.text(
      `tr.data:eq(0)>td:eq(5)>table:eq(0)>tbody:eq(0)>tr:eq(0)>td:eq(0)>div:eq(0)`
    );
    let rowLastName = await cloud.text(`tr.data:eq(19)>td:eq(1)>div:eq(0)`);
    let rowLastNumber = await cloud.text(
      `tr.data:eq(19)>td:eq(5)>table:eq(0)>tbody:eq(0)>tr:eq(0)>td:eq(0)>div:eq(0)`
    );
    assert.equal(rowOneName, `172.16.68.32(Tommy)`, `"${assertName}"`);
    assert.equal(rowOneNumber, `83,826`, `"${assertNumber}"`);
    assert.equal(rowLastName, `172.16.68.242`, `"${assertName}"`);
    assert.equal(rowLastNumber, `111,198`, `"${assertNumber}"`);
  });

  // npm run debug -- --grep "fortiview_traffic_user"
  it(`fortiview_traffic_user`, async function() {
    await cloud.evaluate(`FcldUiTest.setUiObjectValue("MENU:(User)", "click")`);
    await cloud.wait(1000);

    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("GLOBAL(datePicker)-rangeDropdown", "Specify")`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("GLOBAL(datePicker)-dateTimeSelection", "${startTime} ~ ${endTime}")`
    );
    await cloud.wait(1000);
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("GLOBAL(datePicker)-refresh", "Refresh Now")`
    );
    await cloud.wait(`tr.data`);
    //row one and row last
    let rowOneName = await cloud.text(`tr.data:eq(0)>td:eq(1)>div:eq(0)`);
    let rowOneNumber = await cloud.text(
      `tr.data:eq(0)>td:eq(4)>table:eq(0)>tbody:eq(0)>tr:eq(0)>td:eq(0)>div:eq(0)`
    );
    let rowLastName = await cloud.text(`tr.data:eq(5)>td:eq(1)>div:eq(0)`);
    let rowLastNumber = await cloud.text(
      `tr.data:eq(5)>td:eq(4)>table:eq(0)>tbody:eq(0)>tr:eq(0)>td:eq(0)>div:eq(0)`
    );
    assert.equal(rowOneName, `Tommy`, `"${assertName}"`);
    assert.equal(rowOneNumber, `83,826`, `"${assertNumber}"`);
    assert.equal(rowLastName, `Mike`, `"${assertName}"`);
    assert.equal(rowLastNumber, `141,423`, `"${assertNumber}"`);
  });

  // npm run debug -- --grep "fortiview_traffic_destination"
  // This api kind of slow, so wait more time than others.
  it(`fortiview_traffic_destination`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(Destination)", "click")`
    );
    await cloud.wait(1000);

    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("GLOBAL(datePicker)-rangeDropdown", "Specify")`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("GLOBAL(datePicker)-dateTimeSelection", "${startTime} ~ ${endTime}")`
    );
    await cloud.wait(1000);
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("GLOBAL(datePicker)-refresh", "Refresh Now")`
    );
    await cloud.wait(`tr.data`);
    //row one and row last
    let rowOneName = await cloud.text(`tr.data:eq(0)>td:eq(1)>div:eq(0)`);
    let rowOneNumber = await cloud.text(
      `tr.data:eq(0)>td:eq(5)>table:eq(0)>tbody:eq(0)>tr:eq(0)>td:eq(0)>div:eq(0)`
    );
    let rowLastName = await cloud.text(`tr.data:eq(19)>td:eq(1)>div:eq(0)`);
    let rowLastNumber = await cloud.text(
      `tr.data:eq(19)>td:eq(5)>table:eq(0)>tbody:eq(0)>tr:eq(0)>td:eq(0)>div:eq(0)`
    );
    assert.equal(rowOneName, `209.52.144.83`, `"${assertName}"`);
    assert.equal(rowOneNumber, `303`, `"${assertNumber}"`);
    assert.equal(rowLastName, `91.189.91.23(ubuntu.com)`, `"${assertName}"`);
    assert.equal(rowLastNumber, `101`, `"${assertNumber}"`);
  });

  // npm run debug -- --grep "fortiview_traffic_interface"
  it(`fortiview_traffic_interface`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(Interface)", "click")`
    );
    await cloud.wait(1000);

    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("GLOBAL(datePicker)-rangeDropdown", "Specify")`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("GLOBAL(datePicker)-dateTimeSelection", "${startTime} ~ ${endTime}")`
    );
    await cloud.wait(1000);
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("GLOBAL(datePicker)-refresh", "Refresh Now")`
    );
    await cloud.wait(`tr.data`);
    //row one and row last
    let rowOneName = await cloud.text(`tr.data:eq(0)>td:eq(1)>div:eq(0)`);
    let rowOneNumber = await cloud.text(`tr.data:eq(0)>td:eq(4)>div:eq(0)`);
    let rowLastName = await cloud.text(`tr.data:eq(8)>td:eq(1)>div:eq(0)`);
    let rowLastNumber = await cloud.text(`tr.data:eq(8)>td:eq(4)>div:eq(0)`);
    assert.equal(rowOneName, `port1`, `"${assertName}"`);
    assert.equal(rowOneNumber, `2,924,770`, `"${assertNumber}"`);
    assert.equal(rowLastName, `63-avap`, `"${assertName}"`);
    assert.equal(rowLastNumber, `18`, `"${assertNumber}"`);
  });

  // npm run debug -- --grep "fortiview_traffic_country"
  it(`fortiview_traffic_country`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(Country)", "click")`
    );
    await cloud.wait(1000);

    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("GLOBAL(datePicker)-rangeDropdown", "Specify")`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("GLOBAL(datePicker)-dateTimeSelection", "${startTime} ~ ${endTime}")`
    );
    await cloud.wait(1000);
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("GLOBAL(datePicker)-refresh", "Refresh Now")`
    );
    await cloud.wait(`tr.data`);
    //row one
    let rowOneName = await cloud.text(`tr.data:eq(0)>td:eq(1)>div:eq(0)`);
    let rowOneNumber = await cloud.text(`tr.data:eq(0)>td:eq(4)>div:eq(0)`);
    assert.equal(rowOneName, `Internal Network`, `"${assertName}"`);
    assert.equal(rowOneNumber, `2,925,094`, `"${assertNumber}"`);
  });

  // npm run debug -- --grep "fortiview_website_website"
  it(`fortiview_website_website`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(Website)", "click")`
    );
    await cloud.wait(1000);

    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("GLOBAL(datePicker)-rangeDropdown", "Specify")`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("GLOBAL(datePicker)-dateTimeSelection", "${startTime} ~ ${endTime}")`
    );
    await cloud.wait(1000);
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("GLOBAL(datePicker)-refresh", "Refresh Now")`
    );
    await cloud.wait(`tr.data`);
    //row one and row last
    let rowOneName = await cloud.text(`tr.data:eq(0)>td:eq(1)>div:eq(0)`);
    let rowOneNumber = await cloud.text(`tr.data:eq(0)>td:eq(4)>div:eq(0)`);
    let rowLastName = await cloud.text(`tr.data:eq(19)>td:eq(1)>div:eq(0)`);
    let rowLastNumber = await cloud.text(`tr.data:eq(19)>td:eq(4)>div:eq(0)`);
    assert.equal(rowOneName, `detectportal.firefox.com`, `"${assertName}"`);
    assert.equal(rowOneNumber, `24,089`, `"${assertNumber}"`);
    assert.equal(rowLastName, `edge.skype.com`, `"${assertName}"`);
    assert.equal(rowLastNumber, `3,712`, `"${assertNumber}"`);
  });

  // npm run debug -- --grep "fortiview_website_websiteCategory"
  it(`fortiview_website_websiteCategory`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(Web Category)", "click")`
    );
    await cloud.wait(1000);

    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("GLOBAL(datePicker)-rangeDropdown", "Specify")`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("GLOBAL(datePicker)-dateTimeSelection", "${startTime} ~ ${endTime}")`
    );
    await cloud.wait(1000);
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("GLOBAL(datePicker)-refresh", "Refresh Now")`
    );
    await cloud.wait(`tr.data`);
    //row one and row last
    let rowOneName = await cloud.text(`tr.data:eq(0)>td:eq(1)>div:eq(0)`);
    let rowOneNumber = await cloud.text(`tr.data:eq(0)>td:eq(3)>div:eq(0)`);
    let rowLastName = await cloud.text(`tr.data:eq(19)>td:eq(1)>div:eq(0)`);
    let rowLastNumber = await cloud.text(`tr.data:eq(19)>td:eq(3)>div:eq(0)`);
    assert.equal(rowOneName, `Information Technology`, `"${assertName}"`);
    assert.equal(rowOneNumber, `160,859`, `"${assertNumber}"`);
    assert.equal(rowLastName, `Instant Messaging`, `"${assertName}"`);
    assert.equal(rowLastNumber, `828`, `"${assertNumber}"`);
  });

  // npm run debug -- --grep "fortiview_website_browsingUserIp"
  it(`fortiview_website_browsingUserIp`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(Browsing User/IP)", "click")`
    );
    await cloud.wait(1000);

    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("GLOBAL(datePicker)-rangeDropdown", "Specify")`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("GLOBAL(datePicker)-dateTimeSelection", "${startTime} ~ ${endTime}")`
    );
    await cloud.wait(1000);
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("GLOBAL(datePicker)-refresh", "Refresh Now")`
    );
    await cloud.wait(`tr.data`);
    //row one and row last
    let rowOneName = await cloud.text(`tr.data:eq(0)>td:eq(1)>div:eq(0)`);
    let rowOneNumber = await cloud.text(`tr.data:eq(0)>td:eq(3)>div:eq(0)`);
    let rowLastName = await cloud.text(`tr.data:eq(19)>td:eq(1)>div:eq(0)`);
    let rowLastNumber = await cloud.text(`tr.data:eq(19)>td:eq(3)>div:eq(0)`);
    assert.equal(rowOneName, `172.16.68.66`, `"${assertName}"`);
    assert.equal(rowOneNumber, `4,605`, `"${assertNumber}"`);
    assert.equal(rowLastName, `172.16.68.215`, `"${assertName}"`);
    assert.equal(rowLastNumber, `7,429`, `"${assertNumber}"`);
  });

  // npm run debug -- --grep "fortiview_system_activity"
  it(`fortiview_system_activity`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(System Activity)", "click")`
    );
    await cloud.wait(1000);

    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("GLOBAL(datePicker)-rangeDropdown", "Specify")`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("GLOBAL(datePicker)-dateTimeSelection", "${startTime} ~ ${endTime}")`
    );
    await cloud.wait(1000);
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("GLOBAL(datePicker)-refresh", "Refresh Now")`
    );
    await cloud.wait(`tr.data`);
    //row one and row last
    let rowOneName = await cloud.text(`tr.data:eq(0)>td:eq(1)>div:eq(0)`);
    let rowOneNumber = await cloud.text(`tr.data:eq(0)>td:eq(3)>div:eq(0)`);
    let rowLastName = await cloud.text(`tr.data:eq(19)>td:eq(1)>div:eq(0)`);
    let rowLastNumber = await cloud.text(`tr.data:eq(19)>td:eq(3)>div:eq(0)`);
    assert.equal(rowOneName, `Admin login failed`, `"${assertName}"`);
    assert.equal(rowOneNumber, `504`, `"${assertNumber}"`);
    assert.equal(rowLastName, `Admin logout successful`, `"${assertName}"`);
    assert.equal(rowLastNumber, `5,787`, `"${assertNumber}"`);
  });

  // npm run debug -- --grep "fortiview_system_admin"
  it(`fortiview_system_admin`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(Admin Session)", "click")`
    );
    await cloud.wait(1000);

    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("GLOBAL(datePicker)-rangeDropdown", "Specify")`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("GLOBAL(datePicker)-dateTimeSelection", "${startTime} ~ ${endTime}")`
    );
    await cloud.wait(1000);
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("GLOBAL(datePicker)-refresh", "Refresh Now")`
    );
    await cloud.wait(`tr.data`);
    //row one and row last
    let rowOneName = await cloud.text(`tr.data:eq(0)>td:eq(1)>div:eq(0)`);
    let rowOneNumber = await cloud.text(`tr.data:eq(0)>td:eq(3)>div:eq(0)`);
    let rowLastName = await cloud.text(`tr.data:eq(6)>td:eq(1)>div:eq(0)`);
    let rowLastNumber = await cloud.text(`tr.data:eq(6)>td:eq(3)>div:eq(0)`);
    assert.equal(rowOneName, `fortiguard-it`, `"${assertName}"`);
    assert.equal(rowOneNumber, `5996`, `"${assertNumber}"`);
    assert.equal(rowLastName, `jamesgu`, `"${assertName}"`);
    assert.equal(rowLastNumber, `18`, `"${assertNumber}"`);
  });

  // npm run debug -- --grep "fortiview_system_loginFailed"
  it(`fortiview_system_loginFailed`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(Failed Login)", "click")`
    );
    await cloud.wait(1000);

    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("GLOBAL(datePicker)-rangeDropdown", "Specify")`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("GLOBAL(datePicker)-dateTimeSelection", "${startTime} ~ ${endTime}")`
    );
    await cloud.wait(1000);
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("GLOBAL(datePicker)-refresh", "Refresh Now")`
    );
    await cloud.wait(`tr.data`);
    //row one and row last
    let rowOneName = await cloud.text(`tr.data:eq(0)>td:eq(1)>div:eq(0)`);
    let rowOneNumber = await cloud.text(`tr.data:eq(0)>td:eq(2)>div:eq(0)`);
    let rowLastName = await cloud.text(`tr.data:eq(1)>td:eq(1)>div:eq(0)`);
    let rowLastNumber = await cloud.text(`tr.data:eq(1)>td:eq(2)>div:eq(0)`);
    assert.equal(rowOneName, `fortiguard-it`, `"${assertName}"`);
    assert.equal(rowOneNumber, `468`, `"${assertNumber}"`);
    assert.equal(rowLastName, `dchao`, `"${assertName}"`);
    assert.equal(rowLastNumber, `36`, `"${assertNumber}"`);
  });

  // npm run debug -- --grep "fortiview_system_wireless"
  it(`fortiview_system_wireless`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(Wireless)", "click")`
    );
    await cloud.wait(1000);

    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("GLOBAL(datePicker)-rangeDropdown", "Specify")`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("GLOBAL(datePicker)-dateTimeSelection", "${startTime} ~ ${endTime}")`
    );
    await cloud.wait(1000);
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("GLOBAL(datePicker)-refresh", "Refresh Now")`
    );
    await cloud.wait(`tr.data`);
    //row one
    let rowOneName = await cloud.text(`tr.data:eq(0)>td:eq(1)>div:eq(0)`);
    let rowOneNumber = await cloud.text(`tr.data:eq(0)>td:eq(3)>div:eq(0)`);
    assert.equal(rowOneName, `Physical AP add`, `"${assertName}"`);
    assert.equal(rowOneNumber, `451`, `"${assertNumber}"`);
  });

  // npm run debug -- --grep "fortiview_vpn_siteToSite"
  it(`fortiview_vpn_siteToSite`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(Site to Site)", "click")`
    );
    await cloud.wait(1000);

    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("GLOBAL(datePicker)-rangeDropdown", "Specify")`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("GLOBAL(datePicker)-dateTimeSelection", "${startTime} ~ ${endTime}")`
    );
    await cloud.wait(1000);
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("GLOBAL(datePicker)-refresh", "Refresh Now")`
    );
    await cloud.wait(`tr.data`);
    //row one and row last
    let rowOneName = await cloud.text(`tr.data:eq(0)>td:eq(1)>div:eq(0)`);
    let rowOneNumber = await cloud.text(`tr.data:eq(0)>td:eq(5)>div:eq(0)`);
    let rowLastName = await cloud.text(`tr.data:eq(11)>td:eq(1)>div:eq(0)`);
    let rowLastNumber = await cloud.text(`tr.data:eq(11)>td:eq(5)>div:eq(0)`);
    assert.equal(rowOneName, `gw_BJ_RD_Off`, `"${assertName}"`);
    assert.equal(rowOneNumber, `18`, `"${assertNumber}"`);
    assert.equal(rowLastName, `wistron-tw`, `"${assertName}"`);
    assert.equal(rowLastNumber, `18`, `"${assertNumber}"`);
  });

  // npm run debug -- --grep "fortiview_vpn_dialup"
  it(`fortiview_vpn_dialup`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(SSL and Dialup)", "click")`
    );
    await cloud.wait(1000);

    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("GLOBAL(datePicker)-rangeDropdown", "Specify")`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("GLOBAL(datePicker)-dateTimeSelection", "${startTime} ~ ${endTime}")`
    );
    await cloud.wait(1000);
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("GLOBAL(datePicker)-refresh", "Refresh Now")`
    );
    await cloud.wait(`tr.data`);
    //row one and row last
    let rowOneName = await cloud.text(`tr.data:eq(0)>td:eq(1)>div:eq(0)`);
    let rowOneNumber = await cloud.text(`tr.data:eq(0)>td:eq(4)>div:eq(0)`);
    let rowLastName = await cloud.text(`tr.data:eq(19)>td:eq(1)>div:eq(0)`);
    let rowLastNumber = await cloud.text(`tr.data:eq(19)>td:eq(4)>div:eq(0)`);
    assert.equal(rowOneName, `jseanor`, `"${assertName}"`);
    assert.equal(rowOneNumber, `95.1 GB/2.24 GB`, `"${assertNumber}"`);
    assert.equal(rowLastName, `rmay`, `"${assertName}"`);
    assert.equal(rowLastNumber, `138.2 MB/37.64 MB`, `"${assertNumber}"`);
  });
});
