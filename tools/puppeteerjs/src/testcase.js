const Config = require('../conf/config')
const Cases = require('../src/cases')
const commander = require('../src/commander');

class Testcase {
    constructor(options) {
        this.name = options.name
        this.testcase = options.testcase
        this.verify = options.verify
        this.seq = []
        this.setup()
        Cases.push(this)
    }
    setup() {
        if (!(commander.skip() && commander.skip().includes(`testcase`))) {
            this.cloudLogin()
            this.cloudNavigate()
            this.testcase()
        }
        if (!(commander.skip() && commander.skip().includes(`deploy`))) {
            this.cloudDeploy()
        }
        if (!(commander.skip() && commander.skip().includes(`verify`))) {
            this.fosLogin()
            this.verify()
        }
    }
    cloudLogin() {
        this.goto(Config.cloudUrl)
        this.type(`input#email`, Config.cloudUsername)
        this.type(`input[name="password"]`, Config.cloudPassword)
        this.click(`input[type="submit"]`)
        this.wait(3000)
    }
    cloudNavigate() {
        if (Config.isMultiTenancy) {
            this.wait(3000)
            this.click(`//label[text()="Including lower level"]`)
            this.wait(1000)
            this.click(`//div[text()="${Config.fortigateSN}"]`)
            this.click(`//div[text()="Management"]`)
            this.wait(3000)
        } else {
            this.click(`//div[text()="${Config.fortigateSN}"]`)
            this.click(`//div[text()="Management"]`)
            this.wait(3000)
        }
    }
    cloudDeploy() {
        this.wait(1000)
        this.click(`//button[text()="Deploy"]`)
        this.click(`//label[text()="Immediately"]`)
        this.click(`//button[text()="Apply"]`)
        this.wait(`//button[text()="OK"]`)
    }
    fosLogin() {
        this.goto(Config.fortigateUrl)
        this.type(`input#username`, Config.fortigateUsername)
        this.type(`input#secretkey`, Config.fortigatePassword)
        this.click(`button#login_button`)
        this.click(`//button[text()="Later"]`)
        this.wait(3000)
    }
    capture(filename) {
        this.seq.push({ action: `screenshot`, filename: filename })
    }
    evaluate(script) {
        this.seq.push({ action: `evaluate`, script: script })
    }
    click(sel) {
        this.seq.push({ action: `click`, sel: sel })
    }
    goto(url) {
        this.seq.push({ action: `goto`, url: url })
    }
    redirect(url) {
        this.seq.push({ action: `goto`, url: Config.fortigateUrl + url })
    }
    type(sel, val) {
        this.seq.push({ action: `type`, sel: sel, val: val })
    }
    set(sel, val) {
        this.seq.push({ action: `set`, sel: sel, val: val })
    }
    check(sel) {
        this.seq.push({ action: `check`, sel: sel, val: true })
    }
    uncheck(sel) {
        this.seq.push({ action: `check`, sel: sel, val: false })
    }
    wait(selectorOrTimeout) {
        if (Number.isInteger(selectorOrTimeout)) {
            this.seq.push({ action: `wait`, timeout: selectorOrTimeout })
        } else {
            this.seq.push({ action: `waitFor`, sel: selectorOrTimeout, timeout: 40000 })
        }
    }
    isType(sel, expect) {
        this.seq.push({ action: `isType`, sel: sel, expect: expect })
    }
    isSet(sel, expect) {
        this.seq.push({ action: `isType`, sel: sel, expect: expect })
    }
    isCheck(sel) {
        this.seq.push({ action: `isCheck`, sel: sel, expect: true })
    }
    isUncheck(sel) {
        this.seq.push({ action: `isCheck`, sel: sel, expect: false })
    }
    isDelete(target) {
        this.seq.push({ action: `isDelete`, target: target })
    }
    has(target) {
        this.seq.push({ action: `has`, target: target })
    }
}

module.exports = Testcase