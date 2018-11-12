const assert = require("assert");
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const Page = require("src/page");
const config = require("conf/config");
const _ = require("lodash");

async function navigateToTemplateConfig(cloud) {
  await cloud.wait(`//td[text()="Group Management"]`);
  await cloud.evaluate(
    `FcldUiTest.setUiObjectValue("MENU:(Group Management->Manage Templates)", "click")`
  );
  await cloud.wait(1000);
  // await cloud.click('#fcld-templateListWidget-createTemplate')
  await cloud.evaluate(
    `FcldUiTest.setUiObjectValue("templateListWidget-${
      config.templateName
    }-edit", "click")`
  );
  // await cloud.evaluate(`FcldUiTest.setUiObjectValue("templateListWidget-${config.templateName}-delete", "click")`)
  await cloud.wait(1000);
  await cloud.wait(`//div[text()="System Settings"]`);
}

async function deployTemplate(cloud) {
  await cloud.click(`button:contains("Back")`);
  await cloud.click("#fcld-templateListWidget-back");
  await cloud.wait(`//label[text()="Including lower level"]`);
  await cloud.evaluate(
    `FcldUiTest.setUiObjectValue("multitenancyList-includingLowerLevel", true)`
  );
  await cloud.wait(`//div[text()="${config.templateSN}"]`);
  await cloud.evaluate(
    `FcldUiTest.setUiObjectValue("multitenancyList-${
      config.templateSN
    }-checkbox", true)`
  );
  await cloud.evaluate(
    `FcldUiTest.setUiObjectValue("MENU:(Group Management->Deploy Config)", "click")`
  );
  await cloud.wait(1000);
  await cloud.click(`label:contains("Immediately")`);
  await cloud.click(`button:contains("Apply")`);
  await cloud.wait(`//button[text()="OK"]`);
  await cloud.click(`button:contains("OK")`);
}

describe(`Template Config Suite`, function() {
  this.timeout(0);
  let cloud;

  before(async function() {
    let headless = undefined === process.env.HEADLESS ? true : false;
    console.log(`  headless mode is ${headless}`);
    cloud = new Page();
    await cloud.setup({
      headless: headless
    });
    await cloud.loginCloud();
    await navigateToTemplateConfig(cloud);
  });

  after(async function() {
    // await deployTemplate(cloud)
    await cloud.close();
  });

  afterEach(async function() {
    if (`failed` === this.currentTest.state) {
      await cloud.screenshot(
        `${_.camelCase(this.currentTest.title)}Failed.png`
      );
    }
  });

  /*
     // create template
     #fcld-templateMetaEditDialog-name
     #fcld-templateMetaEditDialog-desc
     FcldUiTest.setUiObjectValue("templateMetaEditDialog-basedOnPlatform", "true")
     FcldUiTest.setUiObjectValue("templateMetaEditDialog-basedOnSamplingDevice", "true")
     FcldUiTest.setUiObjectValue("templateMetaEditDialog-platform", "FG110C")
     FcldUiTest.setUiObjectValue("templateMetaEditDialog-firmwareVersion", "5.22")
     FcldUiTest.setUiObjectValue("templateMetaEditDialog-samplingDevice", "FGT30E3U17023830 (v5.6.3, build 1547)")
     FcldUiTest.setUiObjectValue("templateMetaEditDialog-featureSet-System Setting", "true")
     FcldUiTest.setUiObjectValue("templateMetaEditDialog-featureSet-Administrator", "true")
     FcldUiTest.setUiObjectValue("templateMetaEditDialog-featureSet-Settings", "true")
     FcldUiTest.setUiObjectValue("templateMetaEditDialog-featureSet-FortiGuard", "true")
     FcldUiTest.setUiObjectValue("templateMetaEditDialog-featureSet-DNS", "true")
     FcldUiTest.setUiObjectValue("templateMetaEditDialog-featureSet-DNS Servers", "true")
     FcldUiTest.setUiObjectValue("templateMetaEditDialog-featureSet-Policy Package", "true")
     #fcld-templateMetaEditDialog-apply
     #fcld-templateMetaEditDialog-cancel
    */
  // await cloud.click(`#fcld-templateConfigWidget-back`)

  it(`template system settings edit`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(Settings)", "click")`
    );

    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("adminSettingsEditor-timezone", "(GMT-4:30)Caracas")`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("adminSettingsEditor-ntpsync", true)`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("adminSettingsEditor-type", "Specify")`
    );
    await cloud.set("#fcld-adminSettingsEditor-syncinterval", 60);
    await cloud.set("#fcld-adminSettingsEditor-server", "test.com");
    await cloud.set("#fcld-adminSettingsEditor-adminPort", 80);
    await cloud.set("#fcld-adminSettingsEditor-adminSport", 443);
    await cloud.set("#fcld-adminSettingsEditor-adminTelnetPort", 23);
    await cloud.set("#fcld-adminSettingsEditor-adminSshPort", 22);
    await cloud.set("#fcld-adminSettingsEditor-admintimeout", 480);

    await cloud.click("#fcld-adminSettingsEditor-save");
  });

  it(`template fortiguard edit`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(FortiGuard)", "click")`
    );
    await cloud.wait(`//div[text()="Accept Push Updates"]`);

    await cloud.check("#fcld-fortiGuardEditor-acceptPush > input");
    await cloud.check("#fcld-fortiGuardEditor-improveIpsQ > input");
    await cloud.check("#fcld-fortiGuardEditor-useExtendedIps > input");
    await cloud.check("#fcld-fortiGuardEditor-scheduledUpdate > input");
    await cloud.check("#fcld-fortiGuardEditor-webfilterCache > input");
    await cloud.check("#fcld-fortiGuardEditor-antispamCache > input");

    await cloud.click("#fcld-fortiGuardEditor-save");
  });

  it(`template advanced edit`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(Advanced)", "click")`
    );
    await cloud.wait(`//div[text()="SMTP Server"]`);

    await cloud.set(`input#fcld-alertEmailEditor-server`, `192.168.200.30`);
    await cloud.set(`input#fcld-alertEmailEditor-reply_to`, `a@gmail.com`);

    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("alertEmailEditor-authenticate", false)`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("alertEmailEditor-security", 'SMTPS')`
    );

    // todo

    await cloud.click("#fcld-advancedSettingsEditor-save");
  });

  it(`template interface create new`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(Interfaces)", "click")`
    );

    await cloud.wait(`//button[text()="Create New"]`);
    await cloud.click(`button:contains("Create New")`);

    await cloud.wait(`#fcld-interfaceEditor-name`);
    await cloud.set("#fcld-interfaceEditor-name", `temp-intf`);
    await cloud.set("#fcld-interfaceEditor-alias", `template-intf-alias`);
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("interfaceEditor-type", "VLAN")`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("interfaceEditor-physIntf", "wan1")`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("interfaceEditor-role", "WAN")`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("interfaceEditor-vlanid", "2048")`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("interfaceEditor-addrModeGroup", "DHCP")`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("interfaceEditor-dhcpDefaultgw", "false")`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("interfaceEditor-dhcpDnsServerOverride", "false")`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("interfaceEditor-miscScanGroup", "Monitor")`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("interfaceEditor-intfStateGroup", "Disable")`
    );
    await cloud.set("#fcld-interfaceEditor-comments", "test comments");

    await cloud.click(`#fcld-interfaceEditor-save`);
    await cloud.wait(`//button[text()="Create New"]`);
  });

  it(`template dns edit`, async function() {
    await cloud.evaluate(`FcldUiTest.setUiObjectValue("MENU:(DNS)", "click")`);
    await cloud.wait(`#fcld-dnsEditor-localDomain`);
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("dnsEditor-dnsModeGroup", "Use FortiGuard Servers")`
    );
    await cloud.set("#fcld-dnsEditor-localDomain", "");
    await cloud.click("#fcld-dnsEditor-save");
  });

  it(`template dns server new`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(DNS Servers)", "click")`
    );

    await cloud.wait(`//button[text()="Create New"]`);
    await cloud.click(`button:contains("Create New")`);

    await cloud.wait(1000);
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("dnsServiceEditor-intfCombo", "temp-intf")`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("dnsServiceEditor-modeCombo", "NON_RECURSIVE")`
    );

    await cloud.click(`button#fcld-dnsServiceEditor-save`);
    await cloud.wait(`//button[text()="Create New"]`);
  });

  it(`template static route new`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(Static Routes)", "click")`
    );

    await cloud.wait(`//button[text()="Create New"]`);
    await cloud.click(`button:contains("Create New")`);

    await cloud.wait(`#fcld-routingEditor-destIp`);
    await cloud.set(`#fcld-routingEditor-destIp`, `192.168.200.0`);
    await cloud.set(`#fcld-routingEditor-destMask`, `255.255.255.0`);
    await cloud.set(`#fcld-routingEditor-gateway`, `192.168.200.1`);
    await cloud.set(`#fcld-routingEditor-comment`, `template test comments`);
    await cloud.set(`#fcld-routingEditor-priority`, 1);

    await cloud.click(`#fcld-routingEditor-save`);
    await cloud.wait(`//button[text()="Create New"]`);
  });

  it(`template policy routes new`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(Policy Routes)", "click")`
    );

    await cloud.wait(`//button[text()="Create New"]`);
    await cloud.click(`button:contains("Create New")`);

    await cloud.wait(`#fcld-routingPolicyEditor-protocol`);
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("routingPolicyEditor-protocol", "TCP")`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("routingPolicyEditor-inIntf", ["internal"])`
    );
    await cloud.set("#fcld-routingPolicyEditor-srcAddr", "192.168.18.0/24");
    await cloud.set("#fcld-routingPolicyEditor-dstAddr", "192.168.19.0/24");
    await cloud.set("#fcld-routingPolicyEditor-service", "0xff");
    await cloud.set("#fcld-routingPolicyEditor-serviceMask", "0xff");
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("routingPolicyEditor-action", "Forward Traffic")`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("routingPolicyEditor-outIntf", "internal")`
    );
    await cloud.set("#fcld-routingPolicyEditor-gatewayAddr", "192.168.18.1");
    await cloud.set(
      "#fcld-routingPolicyEditor-comments",
      "template test comments"
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("routingPolicyEditor-status", "Enabled")`
    );

    await cloud.click(`#fcld-routingPolicyEditor-save`);
    await cloud.wait(`//button[text()="Create New"]`);
  });

  it(`template multicast new`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(Multicast)", "click")`
    );

    await cloud.wait(`//div[text()="Enable Multicast Routing"]`);
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("multicastEditor-Enable Multicast Routing", true)`
    );
    await cloud.click(`button#fcld-multicastEditor-save`);

    await cloud.click(`button:contains("Create New")`);
    await cloud.wait(`#fcld-multicastInterfaceEditor-rpCandidateCheckBox`);

    await cloud.check(`#fcld-multicastInterfaceEditor-rpCandidateCheckBox`);
    await cloud.click(`button#fcld-multicastInterfaceEditor-save`);

    await cloud.wait(`//div[text()="Enable Multicast Routing"]`);
  });

  it(`template addresses new`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(Addresses)", "click")`
    );
    await cloud.wait(`//button[text()="Create New"]`);

    await cloud.click(`button:contains("Create New")`);
    await cloud.click(`//div[text()="Address"]`);

    await cloud.wait(`#fcld-addressEditor-name`);
    await cloud.set(`#fcld-addressEditor-name`, `addr-template`);
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("addressEditor-type", "Wildcard FQDN")`
    );
    await cloud.set(`#fcld-addressEditor-wildcardFqdn`, `*.com`);
    await cloud.set(`#fcld-addressEditor-comment`, `test template comments`);

    await cloud.click(`button#fcld-addressEditor-save`);
    await cloud.wait(`//button[text()="Create New"]`);
  });

  it(`template address group new`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(Addresses)", "click")`
    );
    await cloud.wait(`//button[text()="Create New"]`);

    await cloud.click(`button:contains("Create New")`);
    await cloud.click(`//div[text()="Address Group"]`);

    await cloud.wait(`#fcld-addrgrpEditor-name`);
    await cloud.set("#fcld-addrgrpEditor-name", "addrgrp-template");
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("addrgrpEditor-members", ["all"])`
    );
    await cloud.check("#fcld-addrgrpEditor-visibility > input");
    await cloud.set("#fcld-addrgrpEditor-comment", "test template comments");

    await cloud.click(`button#fcld-addrgrpEditor-save`);
    await cloud.wait(`//button[text()="Create New"]`);
  });

  it(`template service new`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(Services)", "click")`
    );
    await cloud.wait(`//button[text()="Create New"]`);
    await cloud.click(`button:contains("Create New")`);
    await cloud.click(`div.filter_text:contains("Service"):eq(0)`);
    await cloud.wait(`#fcld-serviceEditor-name`);
    await cloud.set("#fcld-serviceEditor-name", "template service");
    await cloud.set("#fcld-serviceEditor-ipFqdn", "1.1.1.1");
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("serviceEditor-category", "General")`
    );
    await cloud.set("input.gwt-TextBox:eq(2)", "111");
    await cloud.set("input.gwt-TextBox:eq(3)", "222");
    await cloud.set("#fcld-serviceEditor-comments", "test comments");
    await cloud.click("#fcld-serviceEditor-save");
    await cloud.wait(`//button[text()="Create New"]`);
  });

  it(`template service group new`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(Services)", "click")`
    );
    await cloud.wait(`//button[text()="Create New"]`);
    await cloud.click(`button:contains("Create New")`);
    await cloud.wait(100);
    await cloud.click(`div.filter_text:contains("Service"):eq(1)`);
    await cloud.set("#fcld-serviceGroupEditor-name", "template service group");
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("serviceGroupEditor-member", ["HTTP","AFS3"])`
    );
    await cloud.set("#fcld-serviceGroupEditor-comments", "test comments");
    await cloud.click("#fcld-serviceGroupEditor-save");
    await cloud.wait(`//button[text()="Create New"]`);
  });

  it(`template service category new`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(Services)", "click")`
    );
    await cloud.wait(`//button[text()="Create New"]`);
    await cloud.click(`button:contains("Create New")`);
    await cloud.wait(100);
    await cloud.click(`div.filter_text:contains("Category")`);
    await cloud.wait(`#fcld-serviceCategoryEditor-name`);
    await cloud.set(`#fcld-serviceCategoryEditor-name`, `template category`);
    await cloud.set(
      `#fcld-serviceCategoryEditor-comments`,
      `template test comments`
    );
    await cloud.click(`#fcld-serviceCategoryEditor-save`);
    await cloud.wait(`//button[text()="Create New"]`);
  });

  it(`template onetime schedule new`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(Schedules)", "click")`
    );
    await cloud.wait(`//button[text()="Create New"]`);
    await cloud.click(`button:contains("Create New")`);
    await cloud.wait(100);
    await cloud.click(`div.filter_text:contains("One-Time Schedule")`);
    await cloud.set(
      `#fcld-scheduleOnetimeEditor-name`,
      `template onetime schedule`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("scheduleOnetimeEditor-start", "2018/05/18 06:07")`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("scheduleOnetimeEditor-end", "2018/06/18 06:07")`
    );
    await cloud.set("#fcld-scheduleOnetimeEditor-expirationDays", 5);
    await cloud.click("#fcld-scheduleOnetimeEditor-save");
    await cloud.wait(`//button[text()="Create New"]`);
  });

  it(`template recurring schedule new`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(Schedules)", "click")`
    );
    await cloud.wait(`//button[text()="Create New"]`);
    await cloud.click(`button:contains("Create New")`);
    await cloud.wait(100);
    await cloud.click(`div.filter_text:contains("Recurring Schedule")`);
    await cloud.wait(`#fcld-scheduleRecurringEditor-name`);
    await cloud.set(
      `#fcld-scheduleRecurringEditor-name`,
      `template recurring schedule`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("scheduleRecurringEditor-day", ["Monday", "Friday"])`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("scheduleRecurringEditor-startHour", "01")`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("scheduleRecurringEditor-startMinute", "01")`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("scheduleRecurringEditor-endHour", "02")`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("scheduleRecurringEditor-endMinute", "02")`
    );
    await cloud.click("#fcld-scheduleRecurringEditor-save");
    await cloud.wait(`//button[text()="Create New"]`);
  });

  // todo: more

  // User & Device => zqqiang
  it(`template user new`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(Users & Groups)", "click")`
    );
    await cloud.wait(`//button[text()="Create New"]`);
    await cloud.click(`button:contains("Create New")`);
    await cloud.wait(100);
    // todo: create new sub menu missing ID
    await cloud.click(`//div[text()="User"]`);
    await cloud.wait(`#fcld-userUserEditor-name`);

    // todo: Type missing ID ?
    await cloud.wait(1000);
    await cloud.set(`#fcld-userUserEditor-name`, `template user`);
    await cloud.set(`#fcld-userUserEditor-passwd`, `12345678`);
    await cloud.set(`#fcld-userUserEditor-emailTo`, `test@gmail.com`);
    await cloud.set(`#fcld-userUserEditor-smsPhone`, `6046661234`);
    // todo: return false ?
    // await cloud.evaluate(`FcldUiTest.setUiObjectValue("userUserEditor-status", true)`)
    await cloud.click(`#fcld-userUserEditor-save`);
    await cloud.wait(`//button[text()="Create New"]`);
  });

  it(`template user group new`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(Users & Groups)", "click")`
    );
    await cloud.wait(`//button[text()="Create New"]`);
    await cloud.click(`button:contains("Create New")`);
    await cloud.wait(100);
    // todo: create new sub menu missing ID
    await cloud.click(`//div[text()="User Group"]`);
    await cloud.wait(`#fcld-userUserGroupEditor-name`);

    // todo: Type missing ID ?
    await cloud.wait(1000);
    await cloud.set(`#fcld-userUserGroupEditor-name`, `template group`);
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("userUserGroupEditor-member", ["template user"])`
    );
    // todo: remote group api ?

    await cloud.click(`#fcld-userUserGroupEditor-save`);
    await cloud.wait(`//button[text()="Create New"]`);
  });

  it(`template device new`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(Custom Devices & Groups)", "click")`
    );
    await cloud.wait(`//button[text()="Create New"]`);
    await cloud.click(`button:contains("Create New")`);
    await cloud.wait(100);
    await cloud.click(`//div[text()="Device"]`);
    await cloud.wait(`#fcld-userDeviceEditor-alias`);

    await cloud.set(`#fcld-userDeviceEditor-alias`, `template device`);
    await cloud.set(`#fcld-userDeviceEditor-mac`, `11:22:33:44:55:66`);
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("userDeviceEditor-type", "Windows Tablet")`
    );
    await cloud.set(`#fcld-userDeviceEditor-comment`, `tempalte test comments`);
    await cloud.click(`#fcld-userDeviceEditor-save`);
    await cloud.wait(`//button[text()="Create New"]`);
  });

  it(`template device group new`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(Custom Devices & Groups)", "click")`
    );
    await cloud.wait(`//button[text()="Create New"]`);
    await cloud.click(`button:contains("Create New")`);
    await cloud.wait(100);
    await cloud.click(`//div[text()="Device Group"]`);
    await cloud.wait(`#fcld-userDeviceGroupEditor-name`);

    await cloud.set(`#fcld-userDeviceGroupEditor-name`, `template group`);
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("userDeviceGroupEditor-member", ["All"])`
    );
    await cloud.set(
      `#fcld-userDeviceGroupEditor-comment`,
      `template test comments`
    );

    await cloud.click(`#fcld-userDeviceGroupEditor-save`);
    await cloud.wait(`//button[text()="Create New"]`);
  });

  it.skip(`template ldap server new`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(LDAP Servers)", "click")`
    );
    await cloud.wait(`//button[text()="Create New"]`);
    await cloud.click(`button:contains("Create New")`);
    await cloud.wait(`#fcld-userLdapServersEditor-name`);

    await cloud.set(`#fcld-userLdapServersEditor-name`, `template ldap`);
    await cloud.set(`#fcld-userLdapServersEditor-serverIp`, `192.168.100.100`);
    await cloud.set(`#fcld-userLdapServersEditor-serverPort`, `8080`);
    await cloud.set(`#fcld-userLdapServersEditor-cnid`, `com`);
    await cloud.set(`#fcld-userLdapServersEditor-dn`, `ca`);
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("userLdapServersEditor-type", "Regular")`
    );
    await cloud.set(`#fcld-userLdapServersEditor-userDn`, `test-dn`);
    // todo: id error
    // await cloud.evaluate(`FcldUiTest.setUiObjectValue("userLdapServersEditor-password", "12345678")`)
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("userLdapServersEditor-secureConnection", "true")`
    );
    // Protocol missing ID ?
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("userLdapServersEditor-certificate", "AffirmTrust_Premium_ECC")`
    );

    await cloud.click(`#fcld-userLdapServersEditor-save`);
    await cloud.wait(`//button[text()="Create New"]`);
  });

  it(`template radius server new`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(RADIUS Servers)", "click")`
    );
    await cloud.wait(`//button[text()="Create New"]`);
    await cloud.click(`button:contains("Create New")`);
    await cloud.wait(`#fcld-userRadiusServersEditor-name`);

    await cloud.set(`#fcld-userRadiusServersEditor-name`, `template radius`);
    await cloud.set(`#fcld-userRadiusServersEditor-server`, `192.168.100.100`);
    await cloud.set(`#fcld-userRadiusServersEditor-serverSecret`, `12345678`);
    await cloud.set(
      `#fcld-userRadiusServersEditor-secondServer`,
      `192.168.100.200`
    );
    await cloud.set(
      `#fcld-userRadiusServersEditor-secondServerSecret`,
      `87654321`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("userRadiusServersEditor-authenticationMethod", "Default")`
    );
    await cloud.set(`#fcld-userRadiusServersEditor-nasIp`, `3.3.3.3`);
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("userRadiusServersEditor-everyGroupCheckBox", "true")`
    );

    await cloud.click(`#fcld-userRadiusServersEditor-save`);
    await cloud.wait(`//button[text()="Create New"]`);
  });

  it.skip(`template authentication settings`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(Authentication Settings)", "click")`
    );
    await cloud.wait(`#fcld-userSettingsEditor-authTimeout`);

    await cloud.set(`#fcld-userSettingsEditor-authTimeout`, 24);
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("userSettingsEditor-authType-HTTP", true)`
    );
    // todo: always return false
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("userSettingsEditor-authSecureHttp", true)`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("userSettingsEditor-authType-HTTPS", true)`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("userSettingsEditor-authType-FTP", false)`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("userSettingsEditor-authType-TELNET", false)`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("userSettingsEditor-authCert", "Fortinet_SSL")`
    );

    await cloud.click(`#fcld-userSettingsEditor-save`);
  });

  // Security Profiles
  it(`template antivirus edit`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(AntiVirus)", "click")`
    );
    await cloud.wait(`#fcld-utmAntiVirusEditor-name`);

    await cloud.set(
      `#fcld-utmAntiVirusEditor-comment`,
      `template comments edit`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmAntiVirusEditor-avmonitor", "Monitor")`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmAntiVirusEditor-http", true)`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmAntiVirusEditor-smtp", true)`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmAntiVirusEditor-pop3", true)`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmAntiVirusEditor-imap", true)`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmAntiVirusEditor-ftp", true)`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmAntiVirusEditor-executableAsVirus", true)`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmAntiVirusEditor-ftgdAnalytics", "All Supported Files")`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmAntiVirusEditor-analyticsDb", true)`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmAntiVirusEditor-mobileMalwareDb", true)`
    );

    await cloud.click(`button#fcld-utmAntiVirusEditor-save`);
  });

  it(`template web filter edit`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(Web Filter)", "click")`
    );
    await cloud.wait(1000);

    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmWebFilterEditor-ftgdCategoryBasedFilter.status", true)`
    );
    await cloud.click(`div.apFortiGuardCategoryActionMonitor`);
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmWebFilterEditor-overrideChecked", false)`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmWebFilterEditor-searchEngineOptions.safeSearch", true)`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmWebFilterEditor-searchEngineOptions.logSearchKeyWords", true)`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmWebFilterEditor-staticUrlFilter.blockInvalidURLs", true)`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmWebFilterEditor-staticUrlFilter.urlFiltersEnable", true)`
    );
    // await cloud.click(`div[titl="Add URL Filter"]`)
    // todo: URL Filter mising ID ?
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmWebFilterEditor-staticUrlFilter.urlListBySandbox", true)`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmWebFilterEditor-staticUrlFilter.contentFiltersEnable", true)`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmWebFilterEditor-ratingOptions.allowErrorRating", true)`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmWebFilterEditor-ratingOptions.rateByDomainAndIp", true)`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmWebFilterEditor-ratingOptions.blockRedirectByRating", true)`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmWebFilterEditor-ratingOptions.rateImgByURL", true)`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmWebFilterEditor-proxyOptions.domainsUseGoogleAccountEnable", true)`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmWebFilterEditor-proxyOptions.httpErrorDetail", true)`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmWebFilterEditor-proxyOptions.httpPostAction", "Block")`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmWebFilterEditor-proxyOptions.javaFilter", true)`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmWebFilterEditor-proxyOptions.cookiesFilter", true)`
    );
    await cloud.click(`#fcld-utmWebFilterEditor-save`);
  });

  it(`template dns filter edit`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(DNS Filter)", "click")`
    );
    await cloud.wait(1000);

    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmDnsFilterEditor-blockBotnet", true)`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmDnsFilterEditor-ftgdDisable", true)`
    );
    await cloud.click(`div.apFortiGuardCategoryActionMonitor`);
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmDnsFilterEditor-urlfilter", true)`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmDnsFilterEditor-errorAllow", true)`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmDnsFilterEditor-logAllUrl", true)`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmDnsFilterEditor-logAllUrl", true)`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmDnsFilterEditor-blockAction", "Redirect")`
    );
    await cloud.set(`#fcld-utmDnsFilterEditor-redirectPortal`, `3.3.3.3`);

    await cloud.click(`#fcld-utmDnsFilterEditor-save`);
  });

  it(`template application control edit`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(Application Control)", "click")`
    );
    await cloud.wait(`#fcld-utmApplicationControlEditor-comment`);

    await cloud.set(
      `#fcld-utmApplicationControlEditor-comment`,
      `template test comments`
    );
    await cloud.click(`div.appActionMonitor`);
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmApplicationControlEditor-deepAppInspection", true)`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmApplicationControlEditor-allowDNS", true)`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmApplicationControlEditor-appReplaceMsg", true)`
    );

    await cloud.click(`#fcld-utmApplicationControlEditor-save`);
  });

  it(`template intrusion prevention edit`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(Intrusion Prevention)", "click")`
    );
    await cloud.wait(`#fcld-utmIpsEditor-comment`);

    await cloud.set(`#fcld-utmIpsEditor-comment`, `template test comments`);
    // todo: signatures and filters

    await cloud.click(`#fcld-utmIpsEditor-save`);
  });

  it(`template proxy options edit`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(Proxy Options)", "click")`
    );
    await cloud.wait(`#fcld-utmProxyOptionsEditor-oversizeLog`);

    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmProxyOptionsEditor-oversizeLog", true)`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmProxyOptionsEditor-rpcOverHttp", true)`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmProxyOptionsEditor-httpStatus", true)`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmProxyOptionsEditor-httpInspectAll", "Specify")`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmProxyOptionsEditor-httpPorts", "80")`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmProxyOptionsEditor-smtpStatus", true)`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmProxyOptionsEditor-smtpInspectAll", "Specify")`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmProxyOptionsEditor-smtpPorts", "25")`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmProxyOptionsEditor-pop3Status", true)`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmProxyOptionsEditor-pop3InspectAll", "Specify")`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmProxyOptionsEditor-pop3Ports", "110")`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmProxyOptionsEditor-imapStatus", true)`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmProxyOptionsEditor-imapInspectAll", "Specify")`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmProxyOptionsEditor-imapPorts", "143")`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmProxyOptionsEditor-ftpStatus", true)`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmProxyOptionsEditor-ftpInspectAll", "Specify")`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmProxyOptionsEditor-ftpPorts", "21")`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmProxyOptionsEditor-nntpStatus", true)`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmProxyOptionsEditor-nntpInspectAll", "Specify")`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmProxyOptionsEditor-nntpPorts", "119")`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmProxyOptionsEditor-mapiStatus", true)`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmProxyOptionsEditor-mapiPorts", "135")`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmProxyOptionsEditor-dnsStatus", true)`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmProxyOptionsEditor-dnsPorts", "53")`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmProxyOptionsEditor-clientcomfort", true)`
    );
    await cloud.set(`#fcld-utmProxyOptionsEditor-comfortInterval`, `100`);
    await cloud.set(`#fcld-utmProxyOptionsEditor-comfortAmount`, `1024`);
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmProxyOptionsEditor-oversize", true)`
    );
    await cloud.set(`#fcld-utmProxyOptionsEditor-oversizeLimit`, `10`);
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmProxyOptionsEditor-chunkedbypass", true)`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmProxyOptionsEditor-fortinetBar", true)`
    );
    await cloud.set(`#fcld-utmProxyOptionsEditor-fortinetBarPort`, `8080`);
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmProxyOptionsEditor-fragmail", true)`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmProxyOptionsEditor-mailSignature", true)`
    );
    await cloud.set(
      `#fcld-utmProxyOptionsEditor-signature`,
      `template test email signature`
    );

    await cloud.click(`#fcld-utmProxyOptionsEditor-save`);
  });

  it(`template web rating overrides new`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(Web Rating Overrides)", "click")`
    );
    await cloud.wait(`//button[text()="Create New"]`);

    await cloud.click(`button:contains("Create New")`);
    await cloud.wait(`#fcld-utmWebRatingEditor-url`);

    await cloud.set(`#fcld-utmWebRatingEditor-url`, `www.google.com`);
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmWebRatingEditor-category", "Security Risk")`
    );
    // todo: Sub-Category missing ID

    await cloud.click(`#fcld-utmWebRatingEditor-save`);
    await cloud.wait(`//button[text()="Create New"]`);
  });

  it(`template web profile user new`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(Users & Groups)", "click")`
    );
    await cloud.wait(`//button[text()="Create New"]`);
    await cloud.click(`button:contains("Create New")`);
    await cloud.wait(100);
    await cloud.click(`//div[text()="User"]`);
    await cloud.wait(`#fcld-userUserEditor-name`);

    await cloud.wait(1000);
    await cloud.set(`#fcld-userUserEditor-name`, `webprofile user`);
    await cloud.set(`#fcld-userUserEditor-passwd`, `12345678`);
    await cloud.set(`#fcld-userUserEditor-emailTo`, `test@gmail.com`);
    await cloud.set(`#fcld-userUserEditor-smsPhone`, `6046661234`);

    await cloud.click(`#fcld-userUserEditor-save`);
    await cloud.wait(`//button[text()="Create New"]`);
  });

  it(`template web profile overrides`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(Web Profile Overrides)", "click")`
    );
    await cloud.wait(`//button[text()="Create New"]`);

    await cloud.click(`button:contains("Create New")`);
    await cloud.wait(`#fcld-utmWebProfileEditor-scope`);

    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("utmWebProfileEditor-scope", "User")`
    );
    // todo: expires ?

    await cloud.click(`#fcld-utmWebProfileEditor-save`);
    await cloud.wait(`//button[text()="Create New"]`);
  });

  // VPN => zhaoqing
  it.skip(`template vpn ipsec tunnels new`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(IPsec Tunnels)", "click")`
    );
    await cloud.wait(`//button[text()="Create New"]`);

    await cloud.click(`button:contains("Create New")`);
    // todo: missing ID
  });

  it.skip(`template ipv4 policy new`, async function() {});
});

describe(`Template Verify Suite`, function() {
  this.timeout(0);
  let fos;

  before(async function() {
    let headless = undefined === process.env.HEADLESS ? true : false;
    console.log(`  headless mode is ${headless}`);
    fos = new Page();
    await fos.setup({
      headless: headless
    });
    await fosLogin();
  });

  after(async function() {
    await fos.close();
  });

  afterEach(async function() {
    if (`failed` === this.currentTest.state) {
      await cloud.screenshot(
        `${_.camelCase(this.currentTest.title)}Failed.png`
      );
    }
  });

  async function fosLogin() {
    await fos.goto(`${config.templateFosUrl}`);
    await fos.wait(`input#username`);
    await fos.type(`input#username`, `${config.fortigateUsername}`);
    await fos.type(`input#secretkey`, `${config.fortigatePassword}`);
    await fos.click(`button#login_button`);
    await fos.wait(3000);
    if (await fos.has(`button:contains("Later")`)) {
      await fos.click(`button:contains("Later")`);
    }
    await fos.wait(`//widget-title[text()="System Information"]`);
  }

  it(`fos system settings verify`, async function() {
    await fos.click(`//span[text()="System"]`);
    await fos.wait(`//span[text()="Settings"]`);
    await fos.click(`span:contains("Settings"):eq(1)`);
    await fos.wait(`input#admin-port`);

    await fos.isSet(`input#admin-port`, 80);
    await fos.isSet(`input#admin-sport`, 443);
    await fos.isSet(`input#admin-telnet-port`, 23);
    await fos.isSet(`input#admin-ssh-port`, 22);
    await fos.isSet(`input#admintimeout`, 480);
  });

  it(`fos fortiguard verify`, async function() {
    await fos.click(`//span[text()="System"]`);
    await fos.wait(`//span[text()="FortiGuard"]`);
    await fos.click(`span:contains("FortiGuard")`);
    await fos.wait(`input#avips-push-chk`);

    await fos.isCheck(`input#avips-push-chk`);
    await fos.isCheck(`input#avips-submit-chk`);
    await fos.isCheck(`input#avips-db-chk`);
    await fos.isCheck(`input#avips-schd-chk`);
    await fos.isCheck(`input#filter-wfcache-chk`);
    await fos.isCheck(`input#filter-ascache-chk`);
  });

  it.skip(`fos advanced verify`, async function() {
    await fos.click(`//span[text()="System"]`);
    await fos.wait(`//span[text()="Advanced"]`);
    await fos.click(`span:contains("Advanced")`);
    await fos.wait(`input#smtp_server`);

    await fos.isSet(`input#smtp_server`, `192.168.200.30`);
    await fos.isSet(`input#smtp_rt`, `a@gmail.com`);
  });

  it.skip(`fos interface new verify`, async function() {
    await fos.click(`//span[text()="Network"]`);
    await fos.wait(`//span[text()="Interfaces"]`);
    await fos.click(`a[ng-href='page/p/system/interface/']`);
    await fos.wait(3000);

    await fos.click(`td.name:contains("tempalte-intf")`);
    await fos.click(`button:contains("Edit")`);
    await fos.wait(2000);

    // await cloud.evaluate(`FcldUiTest.setUiObjectValue("interfaceEditor-vlanid", "2048")`)
    // await cloud.evaluate(`FcldUiTest.setUiObjectValue("interfaceEditor-addrModeGroup", "DHCP")`)
    // await cloud.evaluate(`FcldUiTest.setUiObjectValue("interfaceEditor-dhcpDefaultgw", "false")`)
    // await cloud.evaluate(`FcldUiTest.setUiObjectValue("interfaceEditor-dhcpDnsServerOverride", "false")`)
    // await cloud.evaluate(`FcldUiTest.setUiObjectValue("interfaceEditor-deviceDetect", "true")`)
    // await cloud.evaluate(`FcldUiTest.setUiObjectValue("interfaceEditor-miscScanGroup", "Monitor")`)
    // await cloud.evaluate(`FcldUiTest.setUiObjectValue("interfaceEditor-intfStateGroup", "Disable")`)
    // await cloud.set('#fcld-interfaceEditor-comments', "test comments")

    await fos.isSet(`input#alias`, `template-intf-alias`);
    await fos.isSet(`select#role`, `wan`);

    // todo
  });
});

describe(`Template Clean Suite`, function() {
  this.timeout(0);
  let cloud;

  before(async function() {
    let headless = undefined === process.env.HEADLESS ? true : false;
    console.log(`  headless mode is ${headless}`);
    cloud = new Page();
    await cloud.setup({
      headless: headless
    });
    await cloud.loginCloud();
    await navigateToTemplateConfig(cloud);
  });

  after(async function() {
    // await deployTemplate(cloud)
    await cloud.close();
  });

  afterEach(async function() {
    if (`failed` === this.currentTest.state) {
      await cloud.screenshot(
        `${_.camelCase(this.currentTest.title)}Failed.png`
      );
    }
  });

  it(`template dns server clean`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(DNS Servers)", "click")`
    );
    await cloud.wait(`div[title='Delete']`);
    await cloud.click(
      `td.left:contains("temp-intf")~td.right div[title="Delete"]`
    );
    await cloud.wait(
      `//td[text()="Are you sure you want to delete this item?"]`
    );
    await cloud.click(`//span[text()="YES"]`);

    await cloud.wait(1000);
  });

  it(`template interface clean`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(Interfaces)", "click")`
    );
    await cloud.wait(`div[title='Delete']`);
    await cloud.click(
      `td.left:contains("temp-intf")~td.right div[title="Delete"]`
    );
    await cloud.wait(
      `//td[text()="Are you sure you want to delete this item?"]`
    );
    await cloud.click(`//span[text()="YES"]`);
  });

  it(`template static route clean`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(Static Routes)", "click")`
    );
    await cloud.wait(`div[title='Delete']`);
    await cloud.click(
      `td.left:contains("192.168.200.0/255.255.255.0")~td[style="text-align: right;"] div[title="Delete"]`
    );
    await cloud.wait(
      `//td[text()="Are you sure you want to delete this item?"]`
    );
    await cloud.click(`//span[text()="YES"]`);
  });

  it(`template policy routes clean`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(Policy Routes)", "click")`
    );
    await cloud.wait(`div[title='Delete']`);
    await cloud.click(
      `td.left:contains("192.168.18.0")~td.right div[title="Delete"]`
    );
    await cloud.wait(
      `//td[text()="Are you sure you want to delete this item?"]`
    );
    await cloud.click(`//span[text()="YES"]`);
  });

  it(`template multicast clean`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(Multicast)", "click")`
    );
    await cloud.wait(`//div[text()="Enable Multicast Routing"]`);
    await cloud.click(`div[title="Delete"]`);
    await cloud.wait(
      `//td[text()="Are you sure you want to delete this item?"]`
    );
    await cloud.click(`//span[text()="YES"]`);
    // await cloud.wait(`//div[text()="Enable Multicast Routing"]`);
    await cloud.wait(1000);
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("multicastEditor-Enable Multicast Routing", false)`
    );
    // await cloud.wait(`#fcld-multicastEditor-save`);
    await cloud.wait(1000);
    await cloud.click(`button#fcld-multicastEditor-save`);
  });

  it(`template addresses clean`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(Addresses)", "click")`
    );
    await cloud.wait(`div[title='Delete']`);
    await cloud.click(
      `td.left:contains("addr-template")~td.right div[title="Delete"]`
    );
    await cloud.wait(
      `//td[text()="Are you sure you want to delete this item?"]`
    );
    await cloud.click(`//span[text()="YES"]`);
  });

  it(`template address group clean`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(Addresses)", "click")`
    );
    await cloud.wait(`div[title='Delete']`);
    await cloud.click(`img[src="images/160/simplePagerLastPage.png"]`);
    await cloud.click(
      `td.left:contains("addrgrp-template")~td.right div[title="Delete"]`
    );
    await cloud.wait(
      `//td[text()="Are you sure you want to delete this item?"]`
    );
    await cloud.click(`//span[text()="YES"]`);
  });

  it(`template service clean`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(Services)", "click")`
    );
    await cloud.wait(`div[title='Delete']`);
    await cloud.click(
      `td.left:contains("template service")~td.right div[title="Delete"]`
    );
    await cloud.wait(
      `//td[text()="Are you sure you want to delete this item?"]`
    );
    await cloud.click(`//span[text()="YES"]`);
  });

  it(`template service group clean`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(Services)", "click")`
    );
    await cloud.wait(500);
    await cloud.click(`img[src="images/160/simplePagerLastPage.png"]`);
    await cloud.click(
      `td.left:contains("template service group")~td.right div[title="Delete"]`
    );
    await cloud.wait(
      `//td[text()="Are you sure you want to delete this item?"]`
    );
    await cloud.click(`//span[text()="YES"]`);
  });

  it(`template service category clean`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(Services)", "click")`
    );
    await cloud.wait(`//button[text()="Categories"]`);
    await cloud.click(`//button[text()="Categories"]`);
    await cloud.click(
      `td.left:contains("template category")~td div[title="Delete"]`
    );
    await cloud.click(`#fcld-serviceCategoriesDialog-apply`);
  });

  it(`template onetime schedule clean`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(Schedules)", "click")`
    );
    await cloud.wait(`div[title='Delete']`);
    await cloud.click(
      `td.left:contains("template onetime schedule")~td.right div[title="Delete"]`
    );
    await cloud.wait(
      `//td[text()="Are you sure you want to delete this item?"]`
    );
    await cloud.click(`//span[text()="YES"]`);
  });

  it(`template recurring schedule clean`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(Schedules)", "click")`
    );
    await cloud.wait(`div[title='Delete']`);
    await cloud.click(
      `td.left:contains("template recurring schedule")~td.right div[title="Delete"]`
    );
    await cloud.wait(
      `//td[text()="Are you sure you want to delete this item?"]`
    );
    await cloud.click(`//span[text()="YES"]`);
  });

  it.skip(`template ldap server clean`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(LDAP Servers)", "click")`
    );
    await cloud.wait(`div[title='Delete']`);
    await cloud.click(
      `td.left:contains("template ldap")~td.right div[title="Delete"]`
    );
    await cloud.wait(
      `//td[text()="Are you sure you want to delete this item?"]`
    );
    await cloud.click(`//span[text()="YES"]`);
  });

  it(`template user group clean`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(Users & Groups)", "click")`
    );
    await cloud.wait(`div[title='Delete']`);
    await cloud.click(
      `td.left:contains("template group")~td.right div[title="Delete"]`
    );
    await cloud.wait(
      `//td[text()="Are you sure you want to delete this item?"]`
    );
    await cloud.click(`//span[text()="YES"]`);
  });

  it(`template web profile overrides clean`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(Web Profile Overrides)", "click")`
    );
    await cloud.wait(`div[title='Delete']`);
    await cloud.click(`td.left:contains("User:")~td.right div[title="Delete"]`);
    await cloud.wait(
      `//td[text()="Are you sure you want to delete this item?"]`
    );
    await cloud.click(`//span[text()="YES"]`);
  });

  it(`template user clean`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(Users & Groups)", "click")`
    );
    await cloud.wait(`div[title='Delete']`);
    await cloud.click(
      `td.left:contains("template user")~td.right div[title="Delete"]`
    );
    await cloud.wait(
      `//td[text()="Are you sure you want to delete this item?"]`
    );
    await cloud.click(`//span[text()="YES"]`);
  });

  it(`template web profile user clean`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(Users & Groups)", "click")`
    );
    await cloud.wait(`div[title='Delete']`);
    await cloud.click(
      `td.left:contains("webprofile user")~td.right div[title="Delete"]`
    );
    await cloud.wait(
      `//td[text()="Are you sure you want to delete this item?"]`
    );
    await cloud.click(`//span[text()="YES"]`);
  });

  it(`template device clean`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(Custom Devices & Groups)", "click")`
    );
    await cloud.wait(`div[title='Delete']`);
    await cloud.click(
      `td.left:contains("template device")~td.right div[title="Delete"]`
    );
    await cloud.wait(
      `//td[text()="Are you sure you want to delete this item?"]`
    );
    await cloud.click(`//span[text()="YES"]`);
  });

  it(`template device group clean`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(Custom Devices & Groups)", "click")`
    );
    await cloud.wait(`div[title='Delete']`);
    await cloud.click(
      `td.left:contains("template group")~td.right div[title="Delete"]`
    );
    await cloud.wait(
      `//td[text()="Are you sure you want to delete this item?"]`
    );
    await cloud.click(`//span[text()="YES"]`);
  });

  it(`template radius server clean`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(RADIUS Servers)", "click")`
    );
    await cloud.wait(`div[title='Delete']`);
    await cloud.click(
      `td.left:contains("template radius")~td.right div[title="Delete"]`
    );
    await cloud.wait(
      `//td[text()="Are you sure you want to delete this item?"]`
    );
    await cloud.click(`//span[text()="YES"]`);
  });

  it(`template web rating overrides clean`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(Web Rating Overrides)", "click")`
    );
    await cloud.wait(`div[title='Delete']`);
    await cloud.click(
      `td.left:contains("www.google.com")~td.right div[title="Delete"]`
    );
    await cloud.wait(
      `//td[text()="Are you sure you want to delete this item?"]`
    );
    await cloud.click(`//span[text()="YES"]`);
  });
});
