const _ = require("lodash");
const assert = require("assert");

const Page = require("src/page");

describe.skip(`Management`, function() {
  // disable timeouts
  this.timeout(0);
  let cloud;
  let fos;

  before(async function() {
    let headless = undefined === process.env.HEADLESS ? true : false;
    console.log(`  headless mode is ${headless}`);
    cloud = new Page();
    await cloud.setup({
      headless: headless,
      type: `cloud`
    });
    await cloud.loginCloud();
    await cloud.navigateToManagement();
    await cloud.import();

    fos = new Page();
    await fos.setup({
      headless: headless,
      type: `fos`
    });
    await fos.loginFos();
  });

  after(async function() {
    await fos.logoutFos();
    await cloud.close();
    await fos.close();
  });

  afterEach(async function() {
    const fileName = _.camelCase(
      this.currentTest.parent.title +
        this.currentTest.title +
        " " +
        this.currentTest.state
    );
    if (`failed` === this.currentTest.state) {
      await cloud.screenshot(`${fileName}Cloud.png`);
      await fos.screenshot(`${fileName}Fos.png`);
    }
  });

  // npm run debug -- --grep "Management Policy&Objects Addresses New"
  describe(`Policy&Objects Addresses New`, function() {
    // npm run debug -- --grep "Management Policy&Objects Addresses New Config"
    it(`Config`, async function() {
      await cloud.evaluate(
        `FcldUiTest.setUiObjectValue("MENU:(Addresses)", "click")`
      );
      await cloud.wait(`//button[text()="Create New"]`);
      await cloud.click(`//button[text()="Create New"]`);
      await cloud.wait(`//div[text()="Address"]`);
      await cloud.click(`//div[text()="Address"]`);

      await cloud.wait(`#fcld-addressEditor-name`);
      await cloud.set("#fcld-addressEditor-name", "address new");
      await cloud.evaluate(
        `FcldUiTest.setUiObjectValue("addressEditor-type", "IP/Netmask")`
      );
      await cloud.set(
        "#fcld-addressEditor-subnet",
        "192.168.102.0/255.255.255.0"
      );
      await cloud.check("#fcld-addressEditor-visibility > input");
      await cloud.check("#fcld-addressEditor-allowRouting > input");
      await cloud.set("#fcld-addressEditor-comment", "test comments");
      await cloud.click(`#fcld-addressEditor-save`);
      await cloud.wait(`//button[text()="Create New"]`);

      await cloud.deploy();
    });

    // npm run debug -- --grep "Management Policy&Objects Addresses New Verify"
    it(`Verify`, async function() {
      await fos.click(`span:contains("Policy & Objects")`);
      await fos.wait(`//span[text()="Addresses"]`);
      await fos.click(`//span[text()="Addresses"]`);
      await fos.wait(`//span[text()="FIREWALL_AUTH_PORTAL_ADDRESS"]`);
      await fos.click(`//span[text()='address new']`);
      await fos.wait(500);
      await fos.click(`button:contains("Edit"):first`);
      await fos.wait(500);
      await fos.wait(`#name`);
      await fos.isSet(`#name`, "address new");
      await fos.isSet(`#addr_type`, "ipmask");
      await fos.isSet(`#ipmask`, "192.168.102.0/255.255.255.0");
      await fos.isCheck(`#visibility`);
      await fos.isCheck(`#allow-routing`);
      await fos.isSet(`#comment`, "test comments");
      await fos.click(`button#submit_cancel`);
    });
  });
  // npm run debug -- --grep "Management Policy&Objects Addresses Delete"
  describe(`Policy&Objects Addresses Delete`, function() {
    // npm run debug -- --grep "Management Policy&Objects Addresses Delete Config"
    it(`Config`, async function() {
      await cloud.evaluate(
        `FcldUiTest.setUiObjectValue("MENU:(Addresses)", "click")`
      );
      await cloud.wait(`//button[text()="Create New"]`);
      await cloud.click(
        `td.left:contains("address new")\~td.right div[title="Delete"]`
      );
      await cloud.click(`span:contains("YES")`);

      await cloud.deploy();
    });

    // npm run debug-- --grep "Management Policy&Objects Addresses Delete Verify"
    it(`Verify`, async function() {
      await fos.click(`span:contains("Policy & Objects")`);
      await fos.wait(`//span[text()="Addresses"]`);
      await fos.click(`//span[text()="Addresses"]`);
      await fos.wait(`//span[text()="FIREWALL_AUTH_PORTAL_ADDRESS"]`);
      await fos.isDelete(`address new`);
    });
  });

  // npm run debug -- --grep "Management Policy&Objects Addresses Group New"
  describe(`Policy&Objects Addresses Group New`, function() {
    // npm run debug -- --grep "Management Policy&Objects Addresses Group New Config"
    it(`Config`, async function() {
      await cloud.evaluate(
        `FcldUiTest.setUiObjectValue("MENU:(Addresses)", "click")`
      );
      await cloud.wait(`//button[text()="Create New"]`);
      await cloud.click(`//button[text()="Create New"]`);
      await cloud.wait(`//div[text()="Address Group"]`);
      await cloud.click(`//div[text()="Address Group"]`);

      await cloud.wait(`#fcld-addrgrpEditor-name`);
      await cloud.set("#fcld-addrgrpEditor-name", "group new");
      await cloud.evaluate(
        `FcldUiTest.setUiObjectValue("addrgrpEditor-members", ["all"])`
      );
      await cloud.check("#fcld-addrgrpEditor-visibility > input");
      await cloud.set("#fcld-addrgrpEditor-comment", "test comments");
      await cloud.click(`#fcld-addrgrpEditor-save`);
      await cloud.wait(`//button[text()="Create New"]`);

      await cloud.deploy();
    });

    // npm run debug -- --grep "Management Policy&Objects Addresses New Verify"
    it(`Verify`, async function() {
      await fos.click(`span:contains("Policy & Objects")`);
      await fos.wait(`//span[text()="Addresses"]`);
      await fos.click(`//span[text()="Addresses"]`);
      await fos.wait(`//span[text()="group new"]`);
      await fos.click(`//span[text()='group new']`);
      await fos.wait(500);
      await fos.click(`button:contains("Edit"):first`);
      await fos.wait(500);
      await fos.wait(`#name`);
      await fos.isSet(`#name`, "group new");
      await fos.has("all");
      await fos.isCheck(`#visibility`);
      await fos.isSet(`#comment`, "test comments");
      await fos.click(`button#submit_cancel`);
    });
  });
});
