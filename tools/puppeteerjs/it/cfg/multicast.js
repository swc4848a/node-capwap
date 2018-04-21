let Testcase = require('../../src/testcase.js');

let sparseModeKeyword="777"
let denseModeKeyword="lan"

let cloudMap = {
    'MultiCast': "div.gwt-HTML:contains('Multicast')",
    'Create New': "button:contains('Create New')",
    'Save': "span:contains('Save')",

    'Edit first Item': "td.left:contains('wan2') ~td.right div[title='Edit']:eq(0)",
    'Delete Sparse Item': `td.left:contains('${sparseModeKeyword}') ~td.right div[title='Delete']:eq(0)`,
    'Delete Dense Item': `td.left:contains('${denseModeKeyword}') ~td.right div[title='Delete']:eq(0)`,
    'YES': "span:contains('YES')",
}

let gateMap = {
    'Network': "//span[text()='Network']",
    'MultiCast': `//span[text()="Multicast"]`,
    '192.168.18.0 routing': "tr>td>span:contains('192.168.18.0')",
    'Destination IPMask': "input#dst",
    'Gateway': "input#gateway",
    'Administrative Distance': "input#distance",
    'Device Interface': "div.selected-entry>span>span>span",
    'Comments': "textarea#comment",

    'Edit': "button span:contains('Edit'):eq(0)",
}


function openMulticast(self) {
    self.click(gateMap['Network'])
    self.wait(500)
    self.click(gateMap['MultiCast'])
    self.wait(1000)
}

// after save deploy button still disabled
new Testcase({
    name: 'multicast_sparse_mode new',
    testcase() {
        this.click(cloudMap['MultiCast'])
        this.wait(1000)
        this.check(`input:checkbox`)
        this.click(`span:contains('Save')`)
        this.click(cloudMap['Create New'])
        this.wait(2000)
        this.evaluate(`FcldUiTest.setUiObjectValue("multicastInterfaceEditor-intfCombo", "wan")`)
        this.evaluate(`FcldUiTest.setUiObjectValue("multicastInterfaceEditor-pimModeCombo", "SPARSE_MODE")`)
        this.set('#fcld-multicastInterfaceEditor-drPriorityTextBox', sparseModeKeyword)
        this.evaluate(`FcldUiTest.setUiObjectValue("multicastInterfaceEditor-rpCandidateCheckBox", "true")`)
        this.set('#fcld-multicastInterfaceEditor-rpCandidatePriorityTextBox', "200")

        this.wait(2000)
        this.click(cloudMap['Save'])
    },
    verify() {
        openMulticast(this)
        this.has(sparseModeKeyword)
        // this.isSet(gateMap['Destination IP'], "192.168.18.0")
        // this.isSet(gateMap['Destination Netmask'], "255.255.255.0")
        // this.isSet(gateMap['Gateway'], "192.168.1.1")
        // this.isSet(gateMap['Administrative Distance'], 11)
        // this.isSet(gateMap['Device Interface'], "internal")
        // this.isSet(gateMap['Comments'], "test comments")
    }
})

new Testcase({
    name: 'multicast_sparse_mode delete',
    testcase() {
        this.wait(2000)
        this.click(cloudMap['MultiCast'])
        this.wait(1000)
        this.click(cloudMap['Delete Sparse Item'])
        this.click(cloudMap['YES'])
        this.click(cloudMap['YES']) // still need double click
    },
    verify() {
        openMulticast(this)
        this.isDelete(sparseModeKeyword)
    }
})

// after save deploy button still disabled
new Testcase({
    name: 'multicast_dense_mode new',
    testcase() {
        this.click(cloudMap['MultiCast'])
        this.wait(1000)
        this.click(cloudMap['Create New'])
        this.wait(2000)
        // 
        this.evaluate(`FcldUiTest.setUiObjectValue("multicastInterfaceEditor-intfCombo", "${denseModeKeyword}")`)
        this.evaluate(`FcldUiTest.setUiObjectValue("multicastInterfaceEditor-pimModeCombo", "DENSE_MODE")`)

        this.wait(2000)
        this.click(cloudMap['Save'])
    },
    verify() {
        openMulticast(this)
        this.has(denseModeKeyword)
        // this.isSet(gateMap['Destination IP'], "192.168.18.0")
        // this.isSet(gateMap['Destination Netmask'], "255.255.255.0")
        // this.isSet(gateMap['Gateway'], "192.168.1.1")
        // this.isSet(gateMap['Administrative Distance'], 11)
        // this.isSet(gateMap['Device Interface'], "internal")
        // this.isSet(gateMap['Comments'], "test comments")
    }
})


new Testcase({
    name: 'multicast_dense_mode delete',
    testcase() {
        this.wait(2000)
        this.click(cloudMap['MultiCast'])
        this.wait(1000)
        this.click(cloudMap['Delete Dense Item'])
        this.click(cloudMap['YES'])
        this.click(cloudMap['YES']) // still need double click
    },
    verify() {
        openMulticast(this)
        this.isDelete(denseModeKeyword)
    }
})

new Testcase({
    name: 'multiCast sparse edit',
    testcase() {
        //sparse mode
        this.click(cloudMap['MultiCast'])
        this.wait(1000)
        this.click(cloudMap['Edit first Item'])
        this.wait(2000)

        // this.evaluate(`FcldUiTest.setUiObjectValue("multicastInterfaceEditor-intfCombo", "wan2")`)
        // this.evaluate(`FcldUiTest.setUiObjectValue("multicastInterfaceEditor-pimModeCombo", "SPARSE_MODE")`)
        // this.set('#fcld-multicastInterfaceEditor-drPriorityTextBox', "666")
        // this.evaluate(`FcldUiTest.setUiObjectValue("multicastInterfaceEditor-rpCandidateCheckBox", "false")`)
        // this.set('#fcld-multicastInterfaceEditor-rpCandidatePriorityTextBox', "200")

        this.wait(2000)
        this.click(cloudMap['Save'])
    },
    verify() {
        openMulticast(this)
        // this.isSet(gateMap['Destination IP'], "192.168.18.0")
        // this.isSet(gateMap['Destination Netmask'], "255.255.255.0")
        // this.isSet(gateMap['Gateway'], "192.168.1.1")
        // this.isSet(gateMap['Administrative Distance'], 12)
        // this.isSet(gateMap['Device Interface'], "wan2")
        // this.isSet(gateMap['Comments'], "test comments")
    }
})

