const puppeteer = require("puppeteer");
const path = require("path");
const assert = require("chai").assert;
const chalk = require("chalk");
const Config = require("conf/config");
const _ = require("lodash");

function selectorType(selector) {
  if (Number.isInteger(selector)) {
    return `integer`;
  }
  if (selector.includes(`//`)) {
    return `xpath`;
  } else if (selector.includes(`:`)) {
    return `jquery`;
  } else {
    return `dom`;
  }
}

class Page {
  constructor() {
    this.browser = undefined;
    this.page = undefined;
    this.launchOptions = undefined;
    this.url = undefined;
  }
  async setup(options) {
    const width = 1600;
    const height = 900;

    this.launchOptions = {
      headless: options.headless,
      slowMo: options.slowMo,
      ignoreHTTPSErrors: true,
      args: [`--window-size=${width},${height}`]
    };

    if (process.platform === `win32`) {
    } else if (process.platform === `linux`) {
      this.launchOptions.executablePath = `/usr/bin/google-chrome`;
      this.launchOptions.args.push(`--no-sandbox`);
    } else {
      console.error(`${chalk.red("unsupport")} os ${process.platform}`);
    }

    this.browser = await puppeteer.launch(this.launchOptions);

    this.page = await this.browser.newPage();
    this.page.on("console", msg => {
      const message = msg.text();
      if (
        !(
          message.includes(`Google Maps API warning`) ||
          message.includes(`WANIPBlacklist`) ||
          message.includes(
            `Synchronous XMLHttpRequest on the main thread is deprecated`
          )
        )
      ) {
        console.log(`  ${chalk.blue("page log:")}`, message);
      }
    });

    this.page.setViewport({
      width: width,
      height: height
    });

    this.page.setDefaultNavigationTimeout(10000);
  }
  async goto(url) {
    console.log(`  ${chalk.blue("goto")} ${url}`);
    await this.page.goto(url);
    this.url = url;
  }
  async wait(selectorOrTimeout) {
    console.log(`  ${chalk.blue("wait")} ${selectorOrTimeout}`);
    let gui = this.page;
    let stype = selectorType(selectorOrTimeout);
    if (!this.url.includes(`forticloud`) && stype !== "integer") {
      let frame = this.page
        .frames()
        .find(frame => frame.name().includes("embedded-iframe"));
      gui = frame ? frame : this.page;
    }
    switch (stype) {
      case `xpath`:
        await gui.waitForXPath(selectorOrTimeout, {
          timeout: 60000
        });
        break;
      case `dom`:
      case `integer`:
        await gui.waitFor(selectorOrTimeout);
        break;
      default:
        console.log(`unknowned selector type : ${stype}`);
    }
  }
  async type(selector, text) {
    console.log(`  ${chalk.blue("type")} ${selector} ${text}`);
    if (Number.isInteger(text)) {
      text = text.toString();
    }
    await this.page.type(selector, text);
  }
  async set(selector, text) {
    console.log(`  ${chalk.blue("set")} ${selector} ${text}`);
    await this.page.evaluate(`$("${selector}").val("${text}")`);
  }
  async click(selector) {
    console.log(`  ${chalk.blue("click")} ${selector}`);
    let gui = this.page;
    if (!this.url.includes(`forticloud`)) {
      let frame = this.page
        .frames()
        .find(frame => frame.name().includes("embedded-iframe"));
      gui = frame ? frame : this.page;
    }
    switch (selectorType(selector)) {
      case `jquery`:
        const disabled = await gui.evaluate(
          `$('${selector}').prop("disabled")`
        );
        if (disabled) {
          throw new Error(`disabled failed: editor ${selector} disabled`);
        } else {
          await gui.evaluate(`$('${selector}').click()`);
        }
        break;
      case `xpath`:
        const elem = await gui.waitFor(selector, {
          timeout: 20000
        });
        await elem.click();
        break;
      case `dom`:
        await gui.click(selector);
        break;
      default:
        console.log(`unknowned selector type`);
    }
  }
  async clickNavigation(selector) {
    console.log(`  ${chalk.blue("waiting navigation ...")}`);
    return await Promise.all([
      this.page.waitForNavigation({
        waitUntil: `networkidle0`
      }),
      this.click(selector)
    ]);
  }
  // lclick if exist only support jquery selector now
  async clickIfExist(selector) {
    console.log(`  ${chalk.blue("click")} ${selector} if exist`);
    switch (selectorType(selector)) {
      case `jquery`:
        if (await this.page.evaluate(`$('${selector}').length`)) {
          await this.page.evaluate(`$('${selector}').click()`);
        }
        break;
      default:
        console.log(`unknowned selector type`);
    }
  }
  async has(selector) {
    let len = 0;
    console.log(`  ${chalk.blue("has")} ${selector}`);
    switch (selectorType(selector)) {
      case `jquery`:
        len = await this.page.evaluate(`$('${selector}').length`);
        break;
      default:
        console.log(`unknowned selector type`);
    }
    return 0 !== len;
  }
  async text(selector) {
    let val = ``;
    console.log(`  get ${chalk.blue("text()")} of ${selector}`);
    switch (selectorType(selector)) {
      case `jquery`:
        val = await this.page.evaluate(`$('${selector}').text()`);
        break;
      default:
        console.log(`unknowned selector type`);
    }
    return val;
  }
  async evaluate(pageFunction) {
    console.log(`  ${chalk.blue("evaluate")} ${pageFunction}`);
    let result = await this.page.evaluate(pageFunction);
    assert.equal(
      result.code,
      0,
      `${pageFunction} return code ${result.code}, message ${
        result.message
      }, input ${result.inputData}`
    );
  }
  async check(selector) {
    console.log(`  ${chalk.blue("check")} ${selector}`);
    await this.page.evaluate(`$("${selector}").prop("checked", true)`);
  }
  async uncheck(selector) {
    console.log(`  ${chalk.blue("uncheck")} ${selector}`);
    await this.page.evaluate(`$("${selector}").prop("checked", false)`);
  }
  async isSet(selector, expect) {
    let result = undefined;
    let frame = this.page
      .frames()
      .find(frame => frame.name().includes("embedded-iframe"));
    if (frame) {
      result = await frame.evaluate(`$("${selector}").val()`);
    } else {
      result = await this.page.evaluate(`$("${selector}").val()`);
    }
    console.log(
      `  ${chalk.blue("result:")} [${result}] expect: [${expect}] => ${
        result == expect ? chalk.green("success") : chalk.red("failed")
      }`
    );
    assert.equal(result, expect, `${selector} should be ${expect}`);
  }
  async isCheck(selector) {
    let result = undefined;
    let frame = this.page
      .frames()
      .find(frame => frame.name().includes("embedded-iframe"));
    if (frame) {
      result = await frame.evaluate(`$("${selector}").prop("checked")`);
    } else {
      result = await this.page.evaluate(`$("${selector}").prop("checked")`);
    }
    console.log(
      `  ${chalk.blue("result:")} [${result}] expect: [${true}] => ${
        result === true ? chalk.green("success") : chalk.red("failed")
      }`
    );
    assert.equal(result, true, `${selector} should be ${true}`);
  }
  async login() {
    await this.page.waitFor(3000);
    if (await this.page.$(`input#email`)) {
      await this.page.type(`input#email`, Config.cloudUsername);
      await this.page.type(`input[name="password"]`, Config.cloudPassword);
      await this.page.click(`input[type="submit"]`);
      await this.page.waitFor(3000);
    }
  }
  async close() {
    await this.browser.close();
  }
  async screenshot(filename) {
    console.log(`  ${chalk.blue("screenshot")} ./out/${filename}`);
    await this.page.screenshot({
      path: path.join(__dirname, `../out/${filename}`)
    });
  }
  async isDelete(target, container) {
    if (container) {
      await this.page.waitFor(container);
    } else {
      container = `div.row`;
      await this.page.waitFor(container);
    }
    let result;
    let frame = this.page
      .frames()
      .find(frame => frame.name().includes("embedded-iframe"));
    if (frame) {
      result = await frame.evaluate(
        `$('${container}:contains("${target}")').length`
      );
      if (0 === result) {
        result = await frame.evaluate(`$('tr[mkey="${target}"]').length`);
      }
    } else {
      result = await this.page.evaluate(
        `$('${container}:contains("${target}")').length`
      );
      if (0 === result) {
        result = await this.page.evaluate(`$('tr[mkey="${target}"]').length`);
      }
    }
    console.log(
      `  ${chalk.blue("result:")} [${result}] expect: [${0}] => ${
        result === 0 ? chalk.green("success") : chalk.red("failed")
      }`
    );
    assert.equal(result, 0, `${target} should be ${0}`);
  }
  async action(item) {
    let frame = undefined;
    let result = undefined;
    if (item.sel && !item.sel.startsWith(`//`)) {
      item.sel = item.sel.replace(/"/g, '\\"');
    }
    switch (item.action) {
      case `screenshot`:
        console.log(`  ${chalk.blue("screenshot")} ./out/${item.filename}`);
        await this.page.screenshot({
          path: path.join(__dirname, `../out/${item.filename}`)
        });
        break;
      case `evaluate`:
        console.log(`  ${chalk.blue("evaluate")} ${item.script}`);
        await this.page.evaluate(`${item.script}`);
        break;
      case `goto`:
        console.log(`  ${chalk.blue("goto")} ${item.url}`);
        await this.page.goto(item.url);
        break;
      case `set`:
        console.log(`  ${chalk.blue("set")} ${item.sel} '${item.val}'`);
        await this.page.evaluate(`$("${item.sel}").val("${item.val}")`);
        break;
      case `type`:
        console.log(`  ${chalk.blue("type")} ${item.sel} '${item.val}'`);
        await this.page.waitFor(item.sel, {
          timeout: 10000
        });
        await this.page.type(item.sel, item.val);
        break;
      case `click`:
        console.log(`  ${chalk.blue("click")} ${item.sel}`);
        if (!item.tag) {
          frame = this.page
            .frames()
            .find(frame => frame.name().includes("embedded-iframe"));
        }
        const gui = frame ? frame : this.page;
        if (item.sel.startsWith(`//`)) {
          const elem = await gui.waitFor(item.sel, {
            timeout: 20000
          });
          await elem.click();
        } else if (item.sel.includes(`:`)) {
          const disabled = await gui.evaluate(
            `$("${item.sel}").prop("disabled")`
          );
          if (disabled) {
            throw new Error(`disabled failed: editor ${item.sel} disabled`);
          } else {
            await gui.evaluate(`$("${item.sel}").click()`);
          }
        } else {
          await gui.waitFor(item.sel);
          await gui.click(item.sel);
        }
        break;
      case `condClick`:
        await this.page.waitFor(2000);
        if (item.cond == `ifExist`) {
          if (await this.page.evaluate(`$("${item.sel}").length`)) {
            await this.page.evaluate(`$("${item.sel}").click()`);
          }
        } else {
          console.error(
            `  ${chalk.red("unknown condition")} ${item.cond} for ${item.sel}`
          );
        }
        break;
      case `wait`:
        console.log(`  ${chalk.blue("wait")} ${item.timeout}ms`);
        await this.page.waitFor(item.timeout);
        break;
      case `waitFor`:
        // wait embedded-iframe render when context change
        this.page.waitFor(1000);
        frame = this.page
          .frames()
          .find(frame => frame.name().includes("embedded-iframe"));
        if (frame) {
          await frame.waitFor(item.sel, {
            timeout: item.timeout
          });
        } else {
          await this.page.waitFor(item.sel, {
            timeout: item.timeout
          });
        }
        console.log(
          `  ${chalk.blue("waitFor")} ${item.sel} timeout ${item.timeout}`
        );
        break;
      case `check`:
        console.log(`  ${chalk.blue("check")} ${item.sel} "${item.val}"`);
        await this.page.evaluate(
          `$("${item.sel}").prop("checked", ${item.val})`
        );
        break;
      case `isType`:
        frame = this.page
          .frames()
          .find(frame => frame.name().includes("embedded-iframe"));
        if (frame) {
          result = await frame.evaluate(`$("${item.sel}").val()`);
        } else {
          result = await this.page.evaluate(`$("${item.sel}").val()`);
        }
        console.log(
          `  ${chalk.blue("result:")} [${result}] expect: [${item.expect}] => ${
            result == item.expect ? chalk.green("success") : chalk.red("failed")
          }`
        );
        assert.equal(
          result,
          item.expect,
          `${item.sel} should be ${item.expect}`
        );
        break;
      case `isCheck`:
        frame = this.page
          .frames()
          .find(frame => frame.name().includes("embedded-iframe"));
        if (frame) {
          result = await frame.evaluate(`$("${item.sel}").prop("checked")`);
        } else {
          result = await this.page.evaluate(`$("${item.sel}").prop("checked")`);
        }
        console.log(
          `  ${chalk.blue("result:")} [${result}] expect: [${item.expect}] => ${
            result === item.expect
              ? chalk.green("success")
              : chalk.red("failed")
          }`
        );
        assert.equal(
          result,
          item.expect,
          `${item.sel} should be ${item.expect}`
        );
        break;
      case `isDelete`:
        if (item.container) {
          await this.page.waitFor(item.container);
        } else {
          await this.page.waitFor(`div.table-container, div.content`);
        }
        frame = this.page
          .frames()
          .find(frame => frame.name().includes("embedded-iframe"));
        if (frame) {
          result = await frame.evaluate(
            `$('${item.container}:contains("${item.target}")').length`
          );
          if (0 === result) {
            result = await frame.evaluate(
              `$('tr[mkey="${item.target}"]').length`
            );
          }
        } else {
          result = await this.page.evaluate(
            `$('${item.container}:contains("${item.target}")').length`
          );
          if (0 === result) {
            result = await this.page.evaluate(
              `$('tr[mkey="${item.target}"]').length`
            );
          }
        }
        console.log(
          `  ${chalk.blue("result:")} [${result}] expect: [${0}] => ${
            result === 0 ? chalk.green("success") : chalk.red("failed")
          }`
        );
        assert.equal(result, 0, `${item.sel} should be ${0}`);
        break;
      case `has`:
        frame = this.page
          .frames()
          .find(frame => frame.name().includes("embedded-iframe"));
        if (frame) {
          let sub_frame = this.page
            .frames()
            .find(frame => frame.name().includes(`slide-iframe`));
          if (sub_frame) {
            result = await sub_frame.evaluate(
              `$(':contains("${item.target}")').length`
            );
          } else {
            result = await frame.evaluate(
              `$(':contains("${item.target}")').length`
            );
          }
        } else {
          result = await this.page.evaluate(
            `$(':contains("${item.target}")').length`
          );
        }
        console.log(
          `  ${chalk.blue("result:")} [${result}] expect: [${1}] => ${
            result !== 0 ? chalk.green("success") : chalk.red("failed")
          }`
        );
        assert(result !== 0, `${item.sel} should not eq 0`);
        break;
      default:
        console.error(`  ${chalk.red("unsupport action:")} ${action}`);
    }
  }
  async run(testcase, start, restart) {
    for (let pos = start ? start : 0; pos < testcase.seq.length; ++pos) {
      let item = testcase.seq[pos];
      if (
        !restart &&
        item.action === "goto" &&
        !item.url.includes("forticloud")
      ) {
        await this.restart(testcase, pos);
        break;
      }
      try {
        await this.action(item);
      } catch (error) {
        console.error(`  ${chalk.red("catch:")} ${item.sel} `, error);
        let out = path.join(
          __dirname,
          `..//out//` + testcase.name.replace(/ /g, `_`) + `.png`
        );
        this.page.screenshot({
          path: out
        });
        console.log(`  ${chalk.red("screenshot")} in ${out}`);
        if (
          error.message.includes(`waiting failed`) ||
          error.message.includes(`disabled failed`)
        ) {
          assert(false, `${item.sel}: ${error.message}`);
          break;
        }
        if (error.message.includes(`Navigation Timeout`)) {
          await this.restart(testcase, pos);
          break;
        }
        if (
          error.message.includes(`Protocol error`) &&
          item.sel.includes(`Logout`)
        ) {
          console.log(`  skip logout exception...`);
          break;
        }
        assert(false, `${item.sel}: ${error.message}`);
        break;
      }
    }
  }
  async restart(testcase, start) {
    await this.close();
    await this.setup(this.launchOptions);
    await this.run(testcase, start, true);
  }
  async loginCloud() {
    await this.goto(`${Config.cloudUrl}`);
    await this.wait(`input#email`);
    await this.type(`input#email`, `${Config.cloudUsername}`);
    await this.type(`input[name="password"]`, `${Config.cloudPassword}`);
    await this.click(`input[type="submit"]`);
  }
  async loginFos() {
    await this.goto(`${Config.fortigateUrl}`);
    await this.wait(`#username`);
    await this.type(`input#username`, `${Config.fortigateUsername}`);
    await this.type(`input#secretkey`, `${Config.fortigatePassword}`);
    await this.click(`button#login_button`);
    await this.wait(3000);
    await this.clickIfExist(`button:contains("Later")`);
    await this.wait(`//td[text()="Hostname"]`);
  }
  async logoutFos() {
    await this.wait(500);
    await this.click(`div.small-hide:contains("admin")`);
    await this.wait(`//span[text()="Change Password"]`);
    await this.click(`button:contains("Logout"):first`);
    await this.wait(`#username`);
  }
  async navigateToManagement() {
    await this.wait(`//label[text()="Including lower level"]`);
    if (Config.isMultiTenancy) {
      await this.wait(1000);
      await this.click(`//label[text()="Including lower level"]`);
      await this.wait(1000);
      await this.click(`//div[text()="${Config.fortigateSN}"]`);
      await this.click(`//div[text()="Management"]`);
      await this.wait(1000);
    } else {
      await this.click(`//div[text()="${Config.fortigateSN}"]`);
      await this.click(`//div[text()="Management"]`);
      await this.wait(1000);
    }
  }
  async navigateToAPNetwork() {
    await this.wait(`//div[text()="FortiAP Network"]`);
    await this.click(`//div[text()="FortiAP Network"]`);
    await this.wait(`//div[text()="AP Status"]`);
  }
  async import() {
    await this.click(`//button[text()="Import"]`);
    await this.wait(`//span[text()="YES"]`);
    await this.click(`//span[text()="YES"]`);
    await this.wait(5000);
  }
  async deploy() {
    await this.click(`//button[text()="Deploy"]`);
    await this.wait(`//div[text()="Deploy Config to Device"]`);
    await this.click(`//label[text()="Immediately"]`);
    await this.click(`#fcld-deployConfigDialog-apply`);
    await this.wait(`//div[text()="Deployment was successful."]`);
    await this.click(`//button[text()="OK"]`);
    await this.wait(`//div[text()="Deployment Log"]`);
    await this.click(`//span[text()="Close"]`);
  }
  async afterEach() {}
  async newPage() {
    return this.browser.newPage();
  }
  async bringToFront() {
    return this.page.bringToFront();
  }
  async getLastPage() {
    let pages = await this.browser.pages();
    return pages[pages.length - 1];
  }
}

module.exports = Page;
