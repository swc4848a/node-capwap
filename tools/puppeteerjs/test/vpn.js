const Page = require("src/page");
const cases = require("src/cases");
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const config = require("conf/config");

describe(`VPN Config Test Suite`, function() {
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
    await cloud.navigateToManagement();
    await cloud.import();
  });

  after(async function() {
    // await cloud.deploy()
    await cloud.close();
  });

  it(`vpn ipsec tunnels custom new`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(IPsec Tunnels)", "click")`
    );
    await cloud.wait(500);

    await cloud.click(`//button[text()="Create New"]`);
    await cloud.wait(1000);

    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("IpsecEditor-templateType", "Custom")`
    );
    await cloud.set(`#fcld-ipsecTunnelEditor-name`, "custom vpn");
    await cloud.set(`#fcld-ipsecTunnelEditor-comments`, `test vpn comments`);
    await cloud.set(
      `#fcld-ipsecTunnelEditor-remoteGatewayIpV4`,
      `192.168.100.11`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("ipsecTunnelEditor-intf", "wan")`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("ipsecTunnelEditor-modeCfg", true)`
    );
    await cloud.set(`#fcld-ipsecTunnelEditor-keepalive`, 11);
    await cloud.set(`#fcld-ipsecTunnelEditor-pskSecret`, `12345678`);
    await cloud.set(`#fcld-ipsecTunnelEditor-localId`, `12345678`);

    await cloud.click(`#fcld-ipsecTunnelEditor-save`);
  });

  it(`vpn ipsec tunnels new site to site`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(IPsec Tunnels)", "click")`
    );
    await cloud.wait(500);

    await cloud.click(`//button[text()="Create New"]`);
    await cloud.wait(500);

    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("IpsecEditor-templateType", "Site to Site")`
    );
    await cloud.set(`#fcld-ipsecTemplateSiteEditor-name`, "site vpn tunnel");
    // todo: Remote Device Type
    // todo: NAT Configuration
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("ipsecTemplateSiteEditor-remoteGatewayType", "Static IP Address")`
    );
    await cloud.set(
      `#fcld-ipsecTemplateSiteEditor-remoteGatewayIpV4`,
      `192.168.100.11`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("ipsecTemplateSiteEditor-intf", "wan")`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("ipsecTemplateSiteEditor-authMethod", "Pre-shared Key")`
    );
    await cloud.set(`#fcld-ipsecTemplateSiteEditor-pskSecret`, `12345678`);
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("ipsecTemplateSiteEditor-localIntf", "lan")`
    );
    await cloud.set(
      `#fcld-ipsecTemplateSiteEditor-localSubnet`,
      `192.168.100.0`
    );
    await cloud.set(
      `#fcld-ipsecTemplateSiteEditor-remoteSubnet`,
      `192.168.200.0`
    );
    await cloud.click(`#fcld-ipsecTemplateSiteEditor-save`);
  });

  it(`vpn ssl-vpn portals new address`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(Addresses)", "click")`
    );
    await cloud.wait(500);

    await cloud.click(`//button[text()="Create New"]`);
    await cloud.wait(500);

    await cloud.click(`//div[text()="Address"]`);
    await cloud.wait(500);

    await cloud.set(`#fcld-addressEditor-name`, `address for vpn portal`);
    await cloud.set(`#fcld-addressEditor-subnet`, `3.3.3.0/24`);

    await cloud.click(`#fcld-addressEditor-save`);
  });

  it(`vpn ssl-vpn portals new`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(SSL-VPN Portals)", "click")`
    );
    await cloud.wait(500);

    await cloud.click(`//button[text()="Create New"]`);
    await cloud.wait(`#fcld-sslvpnWebportalEditor-name`);

    await cloud.set(`#fcld-sslvpnWebportalEditor-name`, `vpn portals test`);
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("sslvpnWebportalEditor-limitUserLogins", true)`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("sslvpnWebportalEditor-tunnelMode", true)`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("sslvpnWebportalEditor-splitTunnelRoutingAddr", "address for vpn portal")`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("sslvpnWebportalEditor-srcIpPools", "address for vpn portal")`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("sslvpnWebportalEditor-savePassword", true)`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("sslvpnWebportalEditor-autoConnect", true)`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("sslvpnWebportalEditor-keepalive", true)`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("sslvpnWebportalEditor-webMode", true)`
    );
    await cloud.set(
      `#fcld-sslvpnWebportalEditor-portalMsg`,
      `test portal message`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("sslvpnWebportalEditor-theme", "Red")`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("sslvpnWebportalEditor-showSessionInfo", true)`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("sslvpnWebportalEditor-showConnectionLauncher", true)`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("sslvpnWebportalEditor-showLoginHistory", true)`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("sslvpnWebportalEditor-userBookmarks", true)`
    );
    // todo: Predefined Bookmarks
    await cloud.click(`#fcld-sslvpnWebportalEditor-save`);

    await cloud.wait(5000);
  });

  it(`vpn ssl-vpn setting edit`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(SSL-VPN Settings)", "click")`
    );
    await cloud.wait(500);

    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("fgtSslvpnEditor-srcAddr", "any")`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("fgtSslvpnEditor-srcAddr", "all")`
    );
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("fgtSslvpnEditor-requestClientCert", true)`
    );
    // todo: Address Range missing ID ?
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("fgtSslvpnEditor-tunnelIpPools", "all")`
    );
    // todo: DNS Server missing ID?
    await cloud.set(`#fcld-fgtSslvpnEditor-dnsServer1`, `192.168.100.10`);
    await cloud.set(`#fcld-fgtSslvpnEditor-dnsServer2`, `192.168.200.10`);
    // todo: Specify WINS Servers missing ID?
    await cloud.set(`#fcld-fgtSslvpnEditor-winServer1`, `192.168.100.11`);
    await cloud.set(`#fcld-fgtSslvpnEditor-winServer2`, `192.168.200.11`);
    // await cloud.click(`div[title="Add Authentication/Portal Mapping"]`)
    // todo: Authentication/Portal Mapping
    await cloud.click(`button#fcld-fgtSslvpnEditor-save`);
    await cloud.click(`//button[text()="OK"]`);
  });
});

describe(`VPN Verify Test Suite`, function() {});

describe(`VPN Clean Test Suite`, function() {
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
    await cloud.navigateToManagement();
    // await cloud.import()
  });

  after(async function() {
    // await cloud.deploy()
    await cloud.close();
  });

  it(`vpn ipsec tunnels clean`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(Static Routes)", "click")`
    );
    await cloud.wait(500);
    await cloud.click(
      `td.left:contains("(Created by VPN wizard)")~td div[title="Delete"]:eq(0)`
    );
    await cloud.wait(
      `//td[text()="Are you sure you want to delete this item?"]`
    );
    await cloud.click(`//span[text()="YES"]`);
    // await cloud.click(`td.left:contains("(Created by VPN wizard)")~td div[title="Delete"]:eq(1)`)
    // await cloud.wait(`//td[text()="Are you sure you want to delete this item?"]`)
    // await cloud.click(`//span[text()="YES"]`)

    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(IPv4 Policy)", "click")`
    );
    await cloud.wait(500);
    await cloud.click(
      `td.left:contains("site vpn tunnel_local")~td.last div[title="Delete"]:eq(0)`
    );
    await cloud.wait(
      `//td[text()="Are you sure you want to delete this item?"]`
    );
    await cloud.click(`//span[text()="YES"]`);
    await cloud.click(
      `td.left:contains("site vpn tunnel_local")~td.last div[title="Delete"]:eq(1)`
    );
    await cloud.wait(
      `//td[text()="Are you sure you want to delete this item?"]`
    );
    await cloud.click(`//span[text()="YES"]`);

    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(IPsec Tunnels)", "click")`
    );
    await cloud.wait(500);
    await cloud.click(`div[title="Delete"]`);
    await cloud.wait(
      `//td[text()="Are you sure you want to delete this item?"]`
    );
    await cloud.click(`//span[text()="YES"]`);
  });

  it(`vpn ipsec tunnels custom clean`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(IPsec Tunnels)", "click")`
    );
    await cloud.wait(`div[title='Delete']`);
    await cloud.click(
      `td.left:contains("custom vpn")~td.right div[title="Delete"]`
    );
    await cloud.wait(
      `//td[text()="Are you sure you want to delete this item?"]`
    );
    await cloud.click(`//span[text()="YES"]`);
  });

  it(`vpn ssl-vpn portals clean`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(SSL-VPN Portals)", "click")`
    );
    await cloud.wait(500);
    await cloud.click(`div[title="Delete"]`);
    await cloud.wait(
      `//td[text()="Are you sure you want to delete this item?"]`
    );
    await cloud.click(`//span[text()="YES"]`);
  });

  it(`vpn ssl-vpn setting clean`, async function() {});

  it(`address for vpn portal clean`, async function() {
    await cloud.evaluate(
      `FcldUiTest.setUiObjectValue("MENU:(Addresses)", "click")`
    );
    await cloud.wait(500);

    await cloud.click(
      `td.left:contains("address for vpn portal")~td.right div[title="Delete"]`
    );
    await cloud.click(`//span[text()="YES"]`);
  });
});
