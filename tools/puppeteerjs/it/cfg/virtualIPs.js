let Testcase = require('../../src/testcase.js');

let name = "virtual ip one";
let grpName = "VIP group 1";
let extintf = "wan1";
let extip0 = "1.1.1.1";
let extip1 = "2.2.2.2";
let mappedip0 = "3.3.3.3";
let mappedip1 = "4.4.4.4";
let srcAddr1 = "1.1.1.1";
let srcAddr2 = "2.2.2.2";
let extport0 = 1;
let extport1 = 2;
let portforward = true;
let protocol = "UDP";
let mappedport0 = 3;
let mappedport1 = 4;
let comment = "test comments";
let grpComment = "test group comments";

let cloudMap = {
    'Virtual IPs': "div.gwt-HTML:contains('Virtual IPs')",
    'Create New': "button:contains('Create New')",
    'Create Virtual IP': "div.filter_text:contains('Virtual IP'):eq(0)",
    'Create Virtual IP Group': "div.filter_text:contains('Virtual IP Group')",

    'Source Address Filter Add': "div.svg-bg-add:eq(0)",
    'Source IP/Range/Subset One': "input.gwt-TextBox:eq(5)",
    'Source IP/Range/Subset Two': "input.gwt-TextBox:eq(6)",

    'Save': "span:contains('Save')",
    'OK': "button:contains('OK')",

    'Delete Virtual IP One': "td.left:contains('" + name + "')~td.right div[title='Delete']",
    'Delete Virtual IP Group': "td.left:contains('" + grpName + "')~td.right div[title='Delete']",
    'YES': "span:contains('YES')",
}

let gateMap = {
    'Policy & Objects': "//span[text()='Policy & Objects']",
    'Edit': "//span[text()='Edit']",
    'Virtual IPs': "a[href='page/p/firewall/object/virtualip/']",

    'Name': "input#name",
    'Interface wan1': "div.selected-entry:contains('wan1')",
    'External IP Address/Range Start': "input[data-name='extip1']",
    'External IP Address/Range End': "input[data-name='extip2']",
    'Mapped IP Address/Range Start': "input[data-name='mappedip1']",
    'Mapped IP Address/Range End': "input[data-name='mappedip2']",
    'Source Address Filter Status': "input:checkbox#enable-src-filter",
    'Source IP/Range/Subset One': "input[value='1.1.1.1']",
    'Source IP/Range/Subset Two': "input[value='2.2.2.2']",
    'Port Forwarding': "input:checkbox#portforward",
    'Protocol TCP': "input#protocol-tcp",
    'Protocol UDP': "input#protocol-udp",
    'External Service Port Start': "input#extport1",
    'External Service Port End': "input#extport2",
    'Map to Port Start': "input#mappedport1",
    'Map to Port End': "input#mappedport2",
    'Comments': "textarea#comment",
    'Group Comments': "textarea#comments",

    'Virtual IP One': "tr[mkey='" + name + "']",
    'Virtual IP Group': "tr[mkey='" + grpName + "']",
    'Edit': "button:contains('Edit'):eq(0)",
}

new Testcase({
    name: 'virtual ip new',
    testcase() {
        
        this.click(cloudMap['Virtual IPs'])
        this.wait(1000)
        this.click(cloudMap['Create New'])
        this.click(cloudMap['Create Virtual IP'])

        this.set('#fcld-vipEditor-name', name)
        this.evaluate(`FcldUiTest.setUiObjectValue("vipEditor-extintf", "${extintf}")`)
        this.evaluate(`FcldUiTest.setUiObjectValue("vipEditor-extip0", "${extip0}")`)
        this.evaluate(`FcldUiTest.setUiObjectValue("vipEditor-extip1", "${extip1}")`)
        this.evaluate(`FcldUiTest.setUiObjectValue("vipEditor-mappedip0", "${mappedip0}")`)
        this.click(cloudMap['Source Address Filter Add'])
        this.click(cloudMap['Source Address Filter Add'])
        this.set(cloudMap['Source IP/Range/Subset One'], srcAddr1)
        this.set(cloudMap['Source IP/Range/Subset Two'], srcAddr2)
        this.check('#fcld-vipEditor-portforward > input');
        this.evaluate(`FcldUiTest.setUiObjectValue("vipEditor-protocol", "${protocol}")`)
        this.evaluate(`FcldUiTest.setUiObjectValue("vipEditor-extport0", "${extport0}")`)
        this.evaluate(`FcldUiTest.setUiObjectValue("vipEditor-extport1", "${extport1}")`)
        this.evaluate(`FcldUiTest.setUiObjectValue("vipEditor-mappedport0", "${mappedport0}")`) 
        this.set('#fcld-vipEditor-comment', comment)

        this.capture('debugVIP.png')
        this.click(cloudMap['Save'])
        this.wait(1000)
        this.click(cloudMap['OK']) // todo: GUI send two json put when trigger click() event
        
    },
    verify() {
        this.click(gateMap['Policy & Objects'])
        this.wait(2000)
        this.click(gateMap['Virtual IPs'])
        this.wait(5000)
        this.click(gateMap['Virtual IP One'])
        this.click(gateMap['Edit'])
        this.wait(3000)
        this.isSet(gateMap['Name'], name)
        this.has(`${extintf}`)
        this.isSet(gateMap['External IP Address/Range Start'], extip0)
        this.isSet(gateMap['External IP Address/Range End'], extip1)
        this.isSet(gateMap['Mapped IP Address/Range Start'], mappedip0)
        this.isSet(gateMap['Mapped IP Address/Range End'], mappedip1)
        this.has(`${protocol}`);
        this.isCheck(gateMap['Port Forwarding'])
        this.isCheck(gateMap['Protocol UDP'])
        this.isSet(gateMap['External Service Port Start'], extport0)
        this.isSet(gateMap['External Service Port End'], extport1)
        this.isSet(gateMap['Map to Port Start'], mappedport0)
        this.isSet(gateMap['Map to Port End'], mappedport1)
        this.isSet(gateMap['Comments'], comment)
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
        this.click(gateMap['Policy & Objects'])
        this.wait(1000)
        this.click(gateMap['Virtual IPs'])
        this.wait(5000)
        this.isDelete(name)
    }
})

new Testcase({
    name: 'virtual ip group new',
    testcase() {
        
        this.click(cloudMap['Virtual IPs'])
        this.wait(1000)
        this.click(cloudMap['Create New'])
        this.click(cloudMap['Create Virtual IP Group'])

        this.set('#fcld-vipgrpEditor-name', grpName)
        this.evaluate(`FcldUiTest.setUiObjectValue("vipgrpEditor-interface", "${extintf}")`)
        this.evaluate(`FcldUiTest.setUiObjectValue("vipgrpEditor-member", ["${name}"])`)
        this.set('#fcld-vipgrpEditor-comment', grpComment)

        this.capture('debugVIPGrp.png')
        this.click(cloudMap['Save'])
        this.wait(1000)
        this.click(cloudMap['OK']) // todo: GUI send two json put when trigger click() event
        
    },
    verify() {
        this.click(gateMap['Policy & Objects'])
        this.wait(2000)
        this.click(gateMap['Virtual IPs'])
        this.wait(5000)
        this.click(gateMap['Virtual IP Group'])
        this.click(gateMap['Edit'])
        this.wait(3000)
        this.isSet(gateMap['Name'], grpName)
        this.has(`${extintf}`)
        this.has(name)
        this.isSet(gateMap['Group Comments'], grpComment)
    }
})

new Testcase({
    name: 'virtual ip group delete',
    testcase() {
        this.click(cloudMap['Virtual IPs'])
        this.click(cloudMap['Delete Virtual IP Group'])
        this.click(cloudMap['YES'])
    },
    verify() {
        this.click(gateMap['Policy & Objects'])
        this.wait(1000)
        this.click(gateMap['Virtual IPs'])
        this.wait(5000)
        this.isDelete(grpName)
    }
})