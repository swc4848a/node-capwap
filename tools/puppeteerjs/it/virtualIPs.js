let Testcase = require('../src/testcase.js');

let cloudMap = {
    'Virtual IPs': "div.gwt-HTML:contains('Virtual IPs')",
    'Create New': "button:contains('Create New')",
    'Create Virtual IP': "div.filter_text:contains('Virtual IP'):eq(0)",
    'Create Virtual IP Group': "div.filter_text:contains('Virtual IP Group')",

    'Name': "input.gwt-TextBox:eq(0)",
    'Interface': "", // todo: can't click
    'External IP Address/Range Start': "input.gwt-TextBox:eq(1)",
    'External IP Address/Range End': "input.gwt-TextBox:eq(2)",
    'Mapped IP Address/Range Start': "input.gwt-TextBox:eq(3)",
    'Mapped IP Address/Range End': "input.gwt-TextBox:eq(4)",
    'Source Address Filter Add': "div.svg-bg-add",
    'Source IP/Range/Subset One': "input.gwt-TextBox:eq(5)",
    'Source IP/Range/Subset Two': "input.gwt-TextBox:eq(6)",
    'Port Forwarding': "input:checkbox",
    'Protocol': "", // todo: can't click
    'External Service Port Start': "input.gwt-TextBox:eq(7)",
    'External Service Port End': "input.gwt-TextBox:eq(8)",
    'Map to Port Start': "input.gwt-TextBox:eq(9)",
    'Map to Port End': "input.gwt-TextBox:eq(10)",
    'Comments': "textarea.gwt-TextArea",

    'Save': "span:contains('Save')",
    'OK': "button:contains('OK')",

    'Delete Virtual IP One': "td.left:contains('virtual ip one')~td.right div[title='Delete']",
    'YES': "span:contains('YES')",
}

let gateMap = {
    'Virtual IPs': "a[href='page/p/firewall/object/virtualip/']",

    'Name': "input#name",
    'Interface any': "div.selected-entry:contains('any')",
    'External IP Address/Range Start': "input[data-name='extip1']",
    'External IP Address/Range End': "input[data-name='extip2']",
    'Mapped IP Address/Range Start': "input[data-name='mappedip1']",
    'Mapped IP Address/Range End': "input[data-name='mappedip2']",
    'Source Address Filter Status': "input:checkbox#enable-src-filter",
    'Source IP/Range/Subset One': "input[value='1.1.1.1']",
    'Source IP/Range/Subset Two': "input[value='2.2.2.2']",
    'Port Forwarding': "input:checkbox#portforward",
    'Protocol TCP': "input#protocol-tcp",
    'External Service Port Start': "input#extport1",
    'External Service Port End': "input#extport2",
    'Map to Port Start': "input#mappedport1",
    'Map to Port End': "input#mappedport2",
    'Comments': "textarea#comment",

    'Virtual IP One': "tr[mkey='virtual ip one']",
    'Edit': "button:contains('Edit'):eq(0)",
}

new Testcase({
    name: 'virtual ip new',
    testcase() {
        this.click(cloudMap['Virtual IPs'])
        this.click(cloudMap['Create New'])
        this.click(cloudMap['Create Virtual IP'])

        this.set(cloudMap['Name'], "virtual ip one")

        this.set(cloudMap['External IP Address/Range Start'], "1.1.1.1")
        this.set(cloudMap['External IP Address/Range End'], "2.2.2.2")
        this.set(cloudMap['Mapped IP Address/Range Start'], "3.3.3.3")
        this.set(cloudMap['Mapped IP Address/Range End'], "4.4.4.4")
        this.click(cloudMap['Source Address Filter Add'])
        this.click(cloudMap['Source Address Filter Add'])
        this.set(cloudMap['Source IP/Range/Subset One'], "1.1.1.1")
        this.set(cloudMap['Source IP/Range/Subset Two'], "2.2.2.2")
        this.check(cloudMap['Port Forwarding'])
        this.set(cloudMap['External Service Port Start'], 1)
        this.set(cloudMap['External Service Port End'], 2)
        this.set(cloudMap['Map to Port Start'], 3)
        this.set(cloudMap['Map to Port End'], 4)
        this.set(cloudMap['Comments'], "test comments")

        this.click(cloudMap['Save'])
        this.click(cloudMap['OK']) // todo: GUI send two json put when trigger click() event
    },
    verify() {
        this.isSet(gateMap['Name'], "virtual ip one")
        this.has(gateMap['Interface any'])
        this.isSet(gateMap['External IP Address/Range Start'], "1.1.1.1")
        this.isSet(gateMap['External IP Address/Range End'], "2.2.2.2")
        this.isSet(gateMap['Mapped IP Address/Range Start'], "3.3.3.3")
        this.isSet(gateMap['Mapped IP Address/Range End'], "4.4.4.4")
        this.isCheck(gateMap['Port Forwarding'])
        this.isCheck(gateMap['Protocol TCP'])
        this.isSet(gateMap['External Service Port Start'], 1)
        this.isSet(gateMap['External Service Port End'], 2)
        this.isSet(gateMap['Map to Port Start'], 3)
        this.isSet(gateMap['Map to Port End'], 4)
        this.isSet(gateMap['Comments'], "test comments")
    }
})

new Testcase({
    name: 'virtual ip delete',
    testcase() {
        this.click(cloudMap['Virtual IPs'])
        this.click(cloudMap['Delete Virtual IP One'])
        this.click(cloudMap['YES'])
    },
    verify() {
        this.click(gateMap['Virtual IPs'])
        this.isDelete(gateMap['Virtual IP One'])
    }
})