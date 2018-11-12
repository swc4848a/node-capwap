const Page = require("src/page");
const assert = require("assert");
const config = require("conf/config");
const mysql = require("mysql");
const util = require("util");

describe(`QA Demo Suite`, function() {
  // disable timeouts
  this.timeout(0);
  let cloud;

  before(async function() {
    let headless = undefined === process.env.HEADLESS ? true : false;
    console.log(`  headless mode is ${headless}`);
    cloud = new Page();
    await cloud.setup({
      headless: headless,
      type: `cloud`
    });
    await cloud.loginCloud();
    await cloud.navigateToAPNetwork();
  });

  after(async function() {
    await cloud.close();
  });

  beforeEach(async function() {});

  afterEach(async function() {});

  // npm run debug -- --grep "qa testcase demo"
  it(`qa testcase demo`, async function() {
    // do everything you want
    await cloud.click(`div:contains("DEV_APNEWORK")`);
    await cloud.wait(5000);
    let newTab = await cloud.getLastPage();
    await newTab.setViewport({
      width: 1600,
      height: 900
    });
    let elem = await newTab.waitForXPath(`//div[text()="Configure"]`);
    await elem.click(`//div[text()="Configure"]`);
    await newTab.waitFor(5000);
  });
});
