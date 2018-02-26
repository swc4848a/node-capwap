const Testcase = require('../src/testcase')

new Testcase({
    name: 'address new',
    testcase() {
        this.click(`//div[text()="FGT60D4615007833"]`)
        this.click(`//div[text()="Management"]`)
        this.wait(3000)
    },
    verify() {
        this.goto(`http://172.16.95.49/ng/page/p/system/interface/edit/internal/`)
        this.wait(5000)
        this.isType(`input#ipmask`, `192.168.1.99/255.255.255.0`)
    }
})