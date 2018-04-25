const assert = require('assert');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const Page = require('../src/page');
const config = require('../conf/config')

describe(`Template Suite`, function() {
    // disable timeouts
    this.timeout(0);
    let page;

    async function cloudLogin() {
        await page.goto(`${config.cloudUrl}`)
        await page.wait(`input#email`)
        await page.type(`input#email`, `${config.cloudUsername}`)
        await page.type(`input[name="password"]`, `${config.cloudPassword}`)
        await page.click(`input[type="submit"]`)
    }

    async function navigation() {
        await page.wait(`//td[text()="Group Management"]`)
        await page.click(`td:contains("Group Management")`)
        await page.click(`div:contains("Manage Templates")`)
        await page.wait(`div[title="Edit"]`)
        // even Edit button appear we still need wait a moment else not work
        await page.wait(1000)
        await page.click(`div[title="Edit"]`)
    }

    async function deploy() {
        await page.click(`button:contains("Back")`)
        await page.click(`button:contains("Back")`)
        await page.wait(`//label[text()="Including lower level"]`)
        await page.click(`label:contains("Including lower level")`)
        await page.wait(`//div[text()="${config.templateSN}"]`)
        await page.click(`tr.data input~label:eq(${config.templateIndex})`)
        await page.click(`td:contains("Group Management")`)
        await page.click(`div:contains("Deploy Config")`)
        await page.wait(1000)
        await page.click(`label:contains("Immediately")`)
        await page.click(`button:contains("Apply")`)
        await page.wait(`//button[text()="OK"]`)
        await page.click(`button:contains("OK")`)
    }

    before(async function() {
        page = new Page()
        await page.setup({headless:true})
        await cloudLogin()
        await navigation()
    });

    after(async function() {
        await deploy()
        await page.close()
    });

    it(`system settings edit`, async function () {
        await page.wait(`//div[text()="System Settings"]`)

        await page.evaluate(`FcldUiTest.setUiObjectValue("adminSettingsEditor-timezone", "(GMT-4:30)Caracas")`)
        await page.evaluate(`FcldUiTest.setUiObjectValue("adminSettingsEditor-ntpsync", true)`)
        await page.evaluate(`FcldUiTest.setUiObjectValue("adminSettingsEditor-type", "Specify")`)
        await page.set('#fcld-adminSettingsEditor-syncinterval', 60)
        await page.set('#fcld-adminSettingsEditor-server', 'test.com')
        await page.set('#fcld-adminSettingsEditor-adminPort', 80)
        await page.set('#fcld-adminSettingsEditor-adminSport', 443)
        await page.set('#fcld-adminSettingsEditor-adminTelnetPort', 23)
        await page.set('#fcld-adminSettingsEditor-adminSshPort', 22)
        await page.set('#fcld-adminSettingsEditor-admintimeout', 480)

        await page.click('#fcld-adminSettingsEditor-save')
    });

    it(`fortiguard edit`, async function() {
        await page.click(`div:contains("FortiGuard")`)
        await page.wait(`//div[text()="Accept Push Updates"]`)

        await page.check('#fcld-fortiGuardEditor-acceptPush > input')
        await page.check('#fcld-fortiGuardEditor-improveIpsQ > input')
        await page.check('#fcld-fortiGuardEditor-useExtendedIps > input')
        await page.check('#fcld-fortiGuardEditor-scheduledUpdate > input')
        await page.check('#fcld-fortiGuardEditor-webfilterCache > input')
        await page.check('#fcld-fortiGuardEditor-antispamCache > input')

        await page.click('#fcld-fortiGuardEditor-save')
    })
});