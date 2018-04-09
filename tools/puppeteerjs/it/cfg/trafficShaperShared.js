let Testcase = require('../../src/testcase.js');

let name = "trafficShaperShared auto-test"
let priority = "LOW"
let maximumBandwidth = "10000"
let guaranteedBandwidth = "5000"
let diffservcode = "000000"

let cloudMap = {
    'Traffic Shapers': "div.gwt-HTML:contains('Traffic Shapers')",
    'Create New': "button:contains('Create New')",
    'Shared': "div.filter_text:contains('Shared'):eq(0)",
    'Delete for': "td.left:contains(" + name + ")~td.right div[title='Delete']",
    'YES': "span:contains('YES')",
}

let gateMap = {
    'Policy & Objects': "//span[text()='Policy & Objects']",
    'Traffic Shapers': "//span[text()='Traffic Shapers']",
    'objectRow': "//td[text()='" + name + "']",
    'Edit': "//span[text()='Edit']",
    'Name': "input#name",
    'diffservcode': "input[name='diffservcode']"
}

new Testcase({
    name: 'trafficShaperShared new', 
    testcase() {
        this.click(cloudMap['Traffic Shapers'])
        this.click(cloudMap['Create New'])
        this.click(cloudMap['Shared'])
        this.set("#fcld-trafficShaperSharedEditor-name", name)
        this.check("#fcld-trafficShaperSharedEditor-perPolicy")
        this.evaluate(`FcldUiTest.setUiObjectValue("trafficShaperSharedEditor-priority", "${priority}")`)
        this.set("#fcld-trafficShaperSharedEditor-maximumBandwidth", maximumBandwidth)
        this.set("#fcld-trafficShaperSharedEditor-guaranteedBandwidth", guaranteedBandwidth)
        this.check("#fcld-trafficShaperSharedEditor-diffserv>input:checkbox")
        // this.capture('DSCP_checkbox.png')
        this.set("#fcld-trafficShaperSharedEditor-diffservcode", diffservcode)
        this.click("#fcld-save")
    },
    verify() {
        this.click(gateMap['Policy & Objects'])
        this.click(gateMap['Traffic Shapers'])
        this.wait(3000)
        this.click(gateMap['objectRow'])
        this.click(gateMap['Edit'])
        this.wait(3000)
        this.isSet(gateMap['Name'], name)
        this.isSet("#priority", priority.toLowerCase())
        this.isCheck("#enable_maximum-bandwidth")
        this.isSet("#maximum-bandwidth", maximumBandwidth) 
        this.isCheck("#enable_guaranteed-bandwidth")
        this.isSet("#guaranteed-bandwidth", guaranteedBandwidth)
        this.isCheck("#diffserv")
        this.isSet(gateMap['diffservcode'], diffservcode)
    }
})

new Testcase({
    name: 'trafficShaperShared delete',
    testcase() {
        this.click(cloudMap['Traffic Shapers'])
        this.wait(1000)
        this.click(cloudMap['Delete for'])
        this.click(cloudMap['YES'])
    },
    verify() {
        this.click(gateMap['Policy & Objects'])
        this.click(gateMap['Traffic Shapers'])
        this.wait(3000)
        this.isDelete(name)
    }
})

