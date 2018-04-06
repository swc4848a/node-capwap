const config = require('../conf/config')
const cases = require('../src/cases')
const commander = require('../src/commander');

class Testcase {
    constructor(options) {
        this.name = options.name
        this.category = options.category
        this.testcase = options.testcase
        this.verify = options.verify
        this.seq = []

        if (this.category === 'Analysis/Reports') {
            this.analysisReportsSetup()
            cases.report.push(this)
        } else {
            // default category is 'Management'
            this.managementSetup()
            cases.cfg.push(this)
        }
    }
    managementSetup() {
        if (!(commander.skip() && commander.skip().includes(`testcase`))) {
            this.cloudNavigate('Management')
            this.import()
            this.testcase()
        }
        if (!(commander.skip() && commander.skip().includes(`deploy`))) {
            this.cloudDeploy()
        }
        if (!(commander.skip() && commander.skip().includes(`verify`))) {
            this.fosLogin()
            this.verify()
            this.fosLogout()
        }
    }
    analysisReportsSetup() {
        this.cloudNavigate('Analysis')
        this.click(`div:contains('Reports')`)
        this.testcase()
        this.verify()
    }
    cloudNavigate(module) {
        if (config.isMultiTenancy) {
            this.wait(3000)
            this.click(`//label[text()="Including lower level"]`)
            this.wait(1000)
            this.click(`//div[text()="${config.fortigateSN}"]`)
            this.click(`//div[text()="${module}"]`)
            this.wait(3000)
        } else {
            this.click(`//div[text()="${config.fortigateSN}"]`)
            this.click(`//div[text()="${module}"]`)
            this.wait(3000)
        }
    }
    import () {
        this.click(`//button[text()="Import"]`)
        this.click(`//span[text()="YES"]`)
        this.wait(10000)
    }
    cloudDeploy() {
        this.wait(1000)
        this.click(`button:contains('Deploy')`)
        this.click(`//label[text()="Immediately"]`)
        this.click(`//button[text()="Apply"]`)
        this.wait(`//button[text()="OK"]`)
        this.click(`//button[text()="OK"]`)
        this.click(`//span[text()="Close"]`)
    }
    fosLogin() {
        this.goto(config.fortigateUrl)
        this.type(`input#username`, config.fortigateUsername)
        this.type(`input#secretkey`, config.fortigatePassword)
        this.click(`button#login_button`)
        this.wait(1000)
        this.condClick(`button:contains("Later")`, `ifExist`)
        this.wait(3000)
    }
    fosLogout() {
        this.click(`div:contains('admin')`)
        this.click(`span:contains('Logout')`)
    }
    capture(filename) {
        this.seq.push({
            action: `screenshot`,
            filename: filename
        })
    }
    evaluate(script) {
        this.seq.push({
            action: `evaluate`,
            script: script
        })
    }
    click(sel) {
        this.seq.push({
            action: `click`,
            sel: sel
        })
    }
    condClick(sel, cond) {
        this.seq.push({
            action: `condClick`,
            sel: sel,
            cond: cond
        })
    }
    goto(url) {
        this.seq.push({
            action: `goto`,
            url: url
        })
    }
    redirect(url) {
        this.seq.push({
            action: `goto`,
            url: config.fortigateUrl + url
        })
    }
    type(sel, val) {
        this.seq.push({
            action: `type`,
            sel: sel,
            val: val
        })
    }
    set(sel, val) {
        this.seq.push({
            action: `set`,
            sel: sel,
            val: val
        })
    }
    check(sel) {
        this.seq.push({
            action: `check`,
            sel: sel,
            val: true
        })
    }
    uncheck(sel) {
        this.seq.push({
            action: `check`,
            sel: sel,
            val: false
        })
    }
    readApiData(editor, data) {
        for (let prop in data) {
            if (data.hasOwnProperty(prop)) {
                let value = data[prop];
                if (typeof value === 'string') {
                    if (value.startsWith('[') && value.endsWith(']')) {
                        this.evaluate(`FcldUiTest.setUiObjectValue("${editor}-${prop}", ${value})`)
                    } else {
                        this.evaluate(`FcldUiTest.setUiObjectValue("${editor}-${prop}", "${value}")`)
                    }
                } else {
                    this.evaluate(`FcldUiTest.setUiObjectValue("${editor}-${prop}", ${value})`)
                }
            }
        }
    }
    wait(selectorOrTimeout) {
        if (Number.isInteger(selectorOrTimeout)) {
            this.seq.push({
                action: `wait`,
                timeout: selectorOrTimeout
            })
        } else {
            this.seq.push({
                action: `waitFor`,
                sel: selectorOrTimeout,
                timeout: 40000
            })
        }
    }
    isType(sel, expect) {
        this.seq.push({
            action: `isType`,
            sel: sel,
            expect: expect
        })
    }
    isSet(sel, expect) {
        this.seq.push({
            action: `isType`,
            sel: sel,
            expect: expect
        })
    }
    isCheck(sel, expect) {
        this.seq.push({
            action: `isCheck`,
            sel: sel,
            expect: (expect === undefined) ? true : expect
        })
    }
    isUncheck(sel) {
        this.seq.push({
            action: `isCheck`,
            sel: sel,
            expect: false
        })
    }
    isDelete(target) {
        this.seq.push({
            action: `isDelete`,
            target: target
        })
    }
    has(target) {
        this.seq.push({
            action: `has`,
            target: target
        })
    }
}

module.exports = Testcase