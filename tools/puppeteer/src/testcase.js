const Config = require('../conf/config')
const Cases = require('../src/cases')

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
        this.cloudLogin()
        this.cloudNavigate()
        this.testcase()
        this.cloudDeploy()
        this.fosLogin()
        this.verify()
    }
    cloudLogin() {
        this.goto(Config.cloudUrl)
        this.type(`input#email`, Config.cloudUsername)
        this.type(`input[name="password"]`, Config.cloudPassword)
        this.click(`input[type="submit"]`)
        this.wait(3000)
    }
    cloudNavigate() {
        this.click(`//div[text()="${Config.fortigateSN}"]`)
        this.click(`//div[text()="Management"]`)
        this.wait(3000)
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
        this.seq.push({ action: `type`, sel: sel, val: val })
    }
    checked(sel) {
        this.seq.push({ action: `checked`, sel: sel, val: true })
    }
    wait(selectorOrTimeout) {
        if (Number.isInteger(selectorOrTimeout)) {
            this.seq.push({ action: `wait`, timeout: selectorOrTimeout })
        } else {
            this.seq.push({ action: `waitFor`, sel: selectorOrTimeout, timeout: 35000 })
        }
    }
    isType(sel, expect) {
        this.seq.push({ action: `isType`, sel: sel, expect: expect })
    }
    isSet(sel, expect) {
        this.seq.push({ action: `isType`, sel: sel, expect: expect })
    }
    isChecked(sel) {
        this.seq.push({ action: `isChecked`, sel: sel, expect: true })
    }
    isDelete(sel) {
        this.seq.push({ action: `isDelete`, sel: sel })
    }
}

module.exports = Testcase