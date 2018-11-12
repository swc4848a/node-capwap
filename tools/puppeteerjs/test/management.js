const Page = require("src/page");
const cases = require("src/cases");
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const config = require("conf/config");

(() => {
  const it = fs.readdirSync(path.join(__dirname, "../it"));
  for (const module of it) {
    if (module.includes(`.svn`)) continue;
    const files = fs.readdirSync(path.join(__dirname, `../it/${module}/`));
    for (const file of files) {
      if (file.includes(`.svn`)) continue;
      require(`../it/${module}/${file}`);
      // console.log(`  load ${module}/${file}`);
    }
  }
})();

describe("FortiGate Network Management Suite", function() {
  this.timeout(0);
  let page;

  before(async function() {
    let headless = undefined === process.env.HEADLESS ? true : false;
    console.log(`  headless mode is ${headless}`);
    page = new Page();
    await page.setup({
      headless: headless
    });
  });

  after(async function() {
    await page.close();
  });

  for (const testcase of cases.cfg) {
    it(testcase.name, async function() {
      console.log(`  ==> run testcase: ${testcase.name}`);
      this.timeout(5 * 60 * 1000);
      await page.goto(config.cloudUrl);
      await page.login();
      await page.run(testcase);
    });
  }
});

describe("Report Schedule Suite", function() {
  this.timeout(0);
  let page;

  before(async function() {
    let headless = undefined === process.env.HEADLESS ? true : false;
    console.log(`  headless mode is ${headless}`);
    page = new Page();
    await page.setup({
      headless: headless
    });
  });

  after(async function() {
    await page.close();
  });

  for (const testcase of cases.report) {
    it(testcase.name, async function() {
      console.log(`  ==> run testcase: ${testcase.name}`);
      this.timeout(5 * 60 * 1000);
      await page.goto(config.cloudUrl);
      await page.login();
      await page.run(testcase);
    });
  }
});
