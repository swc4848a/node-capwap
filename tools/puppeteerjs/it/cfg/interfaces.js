let Testcase = require("src/testcase.js");

let interfaceNameVlan = "vantest";
let interfaceNameLookBack = "lookbacktest";
let interfaceNameHardWare = "hardwareInf";
let interfaceNameAlias = "alias manual";

let cloudMap = {
  Interfaces: "div.gwt-HTML:contains('Interfaces')",
  "Create New": "button:contains('Create New')",
  Save: "button:contains('Save')",
  YES: "span:contains('YES')",

  "Delete for interface van": `td.left:contains('${interfaceNameVlan}')~td.right div[title='Delete']`,
  "Delete for interface lookBack": `td.left:contains('${interfaceNameLookBack}')~td.right div[title='Delete']`,
  "Delete for interface hardware": `td.left:contains('${interfaceNameHardWare}')~td.right div[title='Delete']`
};

let gateMap = {
  Network: "//span[text()='Network']",
  Interfaces: "a[ng-href='page/p/system/interface/']",
  "Interface Name": "input#name",
  Type: "input#type",
  "VLAN ID": "input#vlanid",
  Role: "select#role",
  "Address Mode Manual": "input#addressing_mode_static",
  "Address Mode DHCP": "input#addressing_mode_dhcp",
  Distance: "input#distance",
  "IP/Netmask": "input#ipmask",
  "Device Detection": "input:checkbox#enable-device-identification",
  "Miscellaneous Block": "input:radio#scan-botnet-connections-block",
  "Miscellaneous Monitor": "input:radio#scan-botnet-connections-monitor",
  "Interface Status Disable": "input:radio#admin_status_down",
  Comments: "textarea#description",

  "interface man": "td:contains('interface man')",
  "interface dhcp": "tr[mkey='interface dhcp']",
  "interface loop": "tr[mkey='interface loop']",
  "interface wan": "tr[mkey='interface wan']",
  "interface dmz": "tr[mkey='interface dmz']",
  "interface undef": "tr[mkey='interface undef']",
  Edit: "button span:contains('Edit'):eq(0)"
};

new Testcase({
  name: "interface_type_vlan new",
  testcase() {
    this.click(cloudMap["Interfaces"]);
    this.wait(1000);
    this.click(cloudMap["Create New"]);
    this.wait(1000);
    this.set("#fcld-interfaceEditor-name", interfaceNameVlan);
    this.set("#fcld-interfaceEditor-alias", interfaceNameAlias);
    this.evaluate(
      `FcldUiTest.setUiObjectValue("interfaceEditor-type", "VLAN")`
    );
    // this.evaluate(`FcldUiTest.setUiObjectValue("interfaceEditor-physIntf", "wan")`)
    this.evaluate(`FcldUiTest.setUiObjectValue("interfaceEditor-role", "WAN")`);
    this.evaluate(
      `FcldUiTest.setUiObjectValue("interfaceEditor-vlanid", "2048")`
    );
    this.evaluate(
      `FcldUiTest.setUiObjectValue("interfaceEditor-addrModeGroup", "DHCP")`
    );
    this.evaluate(
      `FcldUiTest.setUiObjectValue("interfaceEditor-dhcpDefaultgw", "false")`
    );
    this.evaluate(
      `FcldUiTest.setUiObjectValue("interfaceEditor-dhcpDnsServerOverride", "false")`
    );
    this.evaluate(
      `FcldUiTest.setUiObjectValue("interfaceEditor-deviceDetect", "true")`
    );
    this.evaluate(
      `FcldUiTest.setUiObjectValue("interfaceEditor-miscScanGroup", "Monitor")`
    );
    this.evaluate(
      `FcldUiTest.setUiObjectValue("interfaceEditor-intfStateGroup", "Disable")`
    );
    this.set("#fcld-interfaceEditor-comments", "test comments");

    this.wait(1000);
    this.click(cloudMap["Save"]);
  },
  verify() {
    this.click(gateMap["Network"]);
    this.wait(500);
    this.click(gateMap["Interfaces"]);
    this.wait(1000);
    this.click(`button.compact-visual-toggle`);
    this.has(interfaceNameVlan);
    this.has(interfaceNameAlias);
    // this.isSet(gateMap['Address Mode Manual', "static")
    //this.isSet(gateMap['IP/Netmask'], "1.1.1.1/255.255.255.0")
    // this.isCheck('Device Detection')
    // this.isCheck('Miscellaneous Block')
    //this.isCheck(gateMap['Interface Status Disable'])
    //this.isSet(gateMap['Comments'], "test comments")
  }
});

new Testcase({
  name: "interface_vlan delete",
  testcase() {
    this.wait(1000);
    this.click(cloudMap["Interfaces"]);
    this.click(cloudMap["Delete for interface van"]);
    this.click(cloudMap["YES"]);
  },
  verify() {
    this.click(gateMap["Network"]);
    this.wait(500);
    this.click(gateMap["Interfaces"]);
    this.wait(1000);
    //todo isDelete now work now.
    this.isDelete(interfaceNameVlan);
  }
});

new Testcase({
  name: "interface_type_lookBack new",
  testcase() {
    this.click(cloudMap["Interfaces"]);
    this.click(cloudMap["Create New"]);

    this.wait(1000);
    this.set("#fcld-interfaceEditor-name", interfaceNameLookBack);
    this.set("#fcld-interfaceEditor-alias", interfaceNameAlias);

    this.evaluate(
      `FcldUiTest.setUiObjectValue("interfaceEditor-type", "Loopback Interface")`
    );
    this.evaluate(`FcldUiTest.setUiObjectValue("interfaceEditor-role", "DMZ")`);
    this.set("#fcld-interfaceEditor-ipNetMask", "1.1.1.1/255.255.255.0");
    this.evaluate(
      `FcldUiTest.setUiObjectValue("interfaceEditor-allowAccess", ["HTTPS","SSH"])`
    );
    this.evaluate(
      `FcldUiTest.setUiObjectValue("interfaceEditor-deviceDetect", "true")`
    );
    this.evaluate(
      `FcldUiTest.setUiObjectValue("interfaceEditor-intfStateGroup", "Enable")`
    );
    this.set("#fcld-interfaceEditor-comments", "test comments");

    this.wait(1000);
    this.click(cloudMap["Save"]);
  },
  verify() {
    this.click(gateMap["Network"]);
    this.wait(500);
    this.click(gateMap["Interfaces"]);
    this.wait(3000);
    this.has(interfaceNameLookBack);
    this.has(interfaceNameAlias);
  }
});

new Testcase({
  name: "interface_type_lookBack delete",
  testcase() {
    this.wait(1000);
    this.click(cloudMap["Interfaces"]);
    this.click(cloudMap["Delete for interface lookBack"]);
    this.click(cloudMap["YES"]);
  },
  verify() {
    this.click(gateMap["Network"]);
    this.wait(500);
    this.click(gateMap["Interfaces"]);
    this.wait(3000);
    //todo isDelete now work now.
    this.isDelete(interfaceNameLookBack);
  }
});

// new Testcase({
//     name: 'interface_type_hardware_switch new',
//     testcase() {
//         this.click(cloudMap['Interfaces'])
//         this.click(cloudMap['Create New'])

//         this.wait(1000)
//         this.set('#fcld-interfaceEditor-name', interfaceNameHardWare)
//         this.set('#fcld-interfaceEditor-alias', interfaceNameAlias)

//         this.evaluate(`FcldUiTest.setUiObjectValue("interfaceEditor-type", "Hardware Switch")`)
//         this.evaluate(`FcldUiTest.setUiObjectValue("interfaceEditor-role", "DMZ")`)
//         this.evaluate(`FcldUiTest.setUiObjectValue("interfaceEditor-addrModeGroup", "Dedicated to FortiSwitch")`)
//         this.set('#fcld-interfaceEditor-ipNetMask', "1.1.1.1/255.255.255.0")
//         this.evaluate(`FcldUiTest.setUiObjectValue("interfaceEditor-autoAuthDevices", "true")`)
//         this.evaluate(`FcldUiTest.setUiObjectValue("interfaceEditor-allowAccess", ["HTTPS","SSH"])`)
//         this.evaluate(`FcldUiTest.setUiObjectValue("interfaceEditor-intfStateGroup", "Enable")`)
//         this.set('#fcld-interfaceEditor-comments', "test comments")

//         this.wait(1000)
//         this.click(cloudMap['Save'])
//     },
//     verify() {
//         this.click(gateMap['Network'])
//         this.wait(500)
//         this.click(gateMap['Interfaces'])
//         this.wait(2000)
//         this.has(interfaceNameHardWare)
//         this.has(interfaceNameAlias)
//     }
// })

// new Testcase({
//     name: 'interface_hardware delete',
//     testcase() {
//         this.click(cloudMap['Interfaces'])
//         this.wait(1000)
//         this.click(cloudMap['Delete for interface hardware'])
//         this.click(cloudMap['YES'])
//     },
//     verify() {

//         this.click(gateMap['Network'])
//         this.wait(500)
//         this.click(gateMap['Interfaces'])
//         this.wait(1000)
//         this.isDelete(interfaceNameHardWare)
//     }
// })

// new Testcase({
//     name: 'interface dhcp new',
//     testcase() {
//         this.click(cloudMap['Interfaces'])
//         this.click(cloudMap['Create New'])
//         this.set(cloudMap['Interface Name'], "interface dhcp")
//         this.set(cloudMap['Alias'], "alias dhcp")
//         this.set(cloudMap['VLAN ID'], 2)
//         this.click(cloudMap['Address Mode DHCP'])
//         this.set(cloudMap['Distance'], 100)
//         this.check('Device Detection for dhcp mode')
//         this.check('Miscellaneous Monitor')
//         this.check('Interface Status Disable')
//         this.set(cloudMap['Comments'], "test comments")
//         this.click(cloudMap['Save'])
//     },
//     verify() {
//         this.isSet(gateMap['Interface Name'], "interface dhcp")
//         this.isSet(gateMap['Alias'], "alias dhcp")
//         this.isSet(gateMap['VLAN ID'], 2)
//         this.isSet(gateMap['Address Mode DHCP'], "dhcp")
//         this.isSet(gateMap['Distance'], 100)
//         this.isCheck('Device Detection')
//         this.isCheck('Miscellaneous Monitor')
//         this.isCheck('Interface Status Disable')
//         this.isSet(gateMap['Comments'], "test comments")
//     }
// })
//
// new Testcase({
//     name: 'interface dhcp delete',
//     testcase() {
//         this.click(cloudMap['Interfaces'])
//         this.click(cloudMap['Delete for interface dhcp'])
//         this.click(cloudMap['YES'])
//     },
//     verify() {
//         this.click(gateMap['Interfaces'])
//         this.isDelete(gateMap['interface dhcp'])
//     }
// })
//
// new Testcase({
//     name: 'interface loopback new',
//     testcase() {
//         this.click(cloudMap['Interfaces'])
//         this.click(cloudMap['Create New'])
//         this.set(cloudMap['Interface Name'], "interface loop")
//         this.set(cloudMap['Alias'], "alias loop")
//         this.set(cloudMap['Type'], "LOOPBACK")
//         // this.check('Device Detection') // todo: GUI bug, no device detection
//         this.check('Miscellaneous Monitor')
//         this.check('Interface Status Disable')
//         this.set(cloudMap['Comments'], "test comments")
//         this.click(cloudMap['Save'])
//     },
//     verify() {
//         this.isSet(gateMap['Interface Name'], "interface loop")
//         this.isSet(gateMap['Alias'], "alias loop")
//         this.isSet(gateMap['Type'], "loopback")
//         this.isCheck('Miscellaneous Monitor')
//         this.isCheck('Interface Status Disable')
//         this.isSet(gateMap['Comments'], "test comments")
//     }
// })
//
// new Testcase({
//     name: 'interface loopback delete',
//     testcase() {
//         this.click(cloudMap['Interfaces'])
//         this.click(cloudMap['Delete for interface loopback'])
//         this.click(cloudMap['YES'])
//     },
//     verify() {
//         this.click(gateMap['Interfaces'])
//         this.isDelete(gateMap['interface loop'])
//     }
// })
//
// // todo: Physical Interface Members need validataion
// new Testcase({
//     name: 'interface hardswitch new',
//     testcase() {
//         this.click(cloudMap['Interfaces'])
//         this.click(cloudMap['Create New'])
//         this.set(cloudMap['Interface Name'], "interface hard")
//         this.set(cloudMap['Alias'], "alias hard")
//         this.set(cloudMap['Type'], "HARD_SWITCH")
//         this.check(cloudMap['Address Mode DHCP'])
//         this.check(cloudMap['Device Detection'])
//         this.check(cloudMap['Miscellaneous Monitor'])
//         this.check(cloudMap['Interface Status Disable'])
//         this.set(cloudMap['Comments'], "test comments")
//         this.click(cloudMap['Save'])
//     },
//     verify() {
//         this.isSet(gateMap['Interface Name'], "interface hard")
//         this.isSet(gateMap['Alias'], "alias hard")
//         this.isSet(gateMap['Type'], "HARD_SWITCH")
//         this.isCheck('Address Mode DHCP')
//         this.isCheck('Device Detection')
//         this.isCheck('Miscellaneous Monitor')
//         this.isCheck('Interface Status Disable')
//         this.isSet(gateMap['Comments'], "test comments")
//     }
// })
//
// // todo: Attribute 'interface' MUST be set.
// new Testcase({
//     name: 'interface softswitch new',
//     testcase() {
//         this.click(cloudMap['Interfaces'])
//         this.click(cloudMap['Create New'])
//         this.set(cloudMap['Interface Name'], "interface soft")
//         this.set(cloudMap['Alias'], "alias soft")
//         this.set(cloudMap['Type'], "SWITCH")
//         this.check('Address Mode DHCP')
//         this.check('Device Detection')
//         this.check('Miscellaneous Monitor')
//         this.check('Interface Status Disable')
//         this.set(cloudMap['Comments'], "test comments")
//         this.click(cloudMap['Save'])
//     },
//     verify() {
//         this.isSet(gateMap['Interface Name'], "interface soft")
//         this.isSet(gateMap['Alias'], "alias soft")
//         this.isSet(gateMap['Type'], "SWITCH")
//         this.isCheck('Address Mode DHCP')
//         this.isCheck('Device Detection')
//         this.isCheck('Miscellaneous Monitor')
//         this.isCheck('Interface Status Disable')
//         this.isSet(gateMap['Comments'], "test comments")
//     }
// })
//
// new Testcase({
//     name: 'interface wan new',
//     testcase() {
//         this.click(cloudMap['Interfaces'])
//         this.click(cloudMap['Create New'])
//         this.set(cloudMap['Interface Name'], "interface wan")
//         this.set(cloudMap['Alias'], "alias wan")
//         this.set(cloudMap['VLAN ID'], 5)
//         this.set(cloudMap['Role'], "WAN")
//         this.check('Miscellaneous Monitor')
//         this.check('Interface Status Disable')
//         this.set(cloudMap['Comments'], "test comments")
//         this.click(cloudMap['Save'])
//     },
//     verify() {
//         this.isSet(gateMap['Interface Name'], "interface wan")
//         this.isSet(gateMap['Alias'], "alias wan")
//         this.isSet(gateMap['VLAN ID'], 5)
//         this.isSet(gateMap['Role'], "wan")
//         this.isCheck('Miscellaneous Monitor')
//         this.isCheck('Interface Status Disable')
//         this.isSet(gateMap['Comments'], "test comments")
//     }
// })
//
// new Testcase({
//     name: 'interface wan delete',
//     testcase() {
//         this.click(cloudMap['Interfaces'])
//         this.click(cloudMap['Delete for interface wan'])
//         this.click(cloudMap['YES'])
//     },
//     verify() {
//         this.click(gateMap['Interfaces'])
//         this.isDelete(gateMap['interface wan'])
//     }
// })
//
// new Testcase({
//     name: 'interface dmz new',
//     testcase() {
//         this.click(cloudMap['Interfaces'])
//         this.click(cloudMap['Create New'])
//         this.set(cloudMap['Interface Name'], "interface dmz")
//         this.set(cloudMap['Alias'], "alias dmz")
//         this.set(cloudMap['VLAN ID'], 3)
//         this.set(cloudMap['Role'], "DMZ")
//         this.check('Device Detection')
//         this.check('Miscellaneous Monitor')
//         this.check('Interface Status Disable')
//         this.set(cloudMap['Comments'], "test comments")
//         this.click(cloudMap['Save'])
//     },
//     verify() {
//         this.isSet(gateMap['Interface Name'], "interface dmz")
//         this.isSet(gateMap['Alias'], "alias dmz")
//         this.isSet(gateMap['VLAN ID'], 3)
//         this.isSet(gateMap['Role'], "dmz")
//         this.isCheck('Device Detection')
//         this.isCheck('Miscellaneous Monitor')
//         this.isCheck('Interface Status Disable')
//         this.isSet(gateMap['Comments'], "test comments")
//     }
// })
//
// new Testcase({
//     name: 'interface dmz delete',
//     testcase() {
//         this.click(cloudMap['Interfaces'])
//         this.click(cloudMap['Delete for interface dmz'])
//         this.click(cloudMap['YES'])
//     },
//     verify() {
//         this.click(gateMap['Interfaces'])
//         this.isDelete(gateMap['interface dmz'])
//     }
// })
//
// new Testcase({
//     name: 'interface undef new',
//     testcase() {
//         this.click(cloudMap['Interfaces'])
//         this.click(cloudMap['Create New'])
//         this.set(cloudMap['Interface Name'], "interface undef")
//         this.set(cloudMap['Alias'], "alias undefined")
//         this.set(cloudMap['VLAN ID'], 4)
//         this.set(cloudMap['Role'], "UNDEFINED")
//         this.check('Device Detection')
//         this.check('Miscellaneous Monitor')
//         this.check('Interface Status Disable')
//         this.set(cloudMap['Comments'], "test comments")
//         this.click(cloudMap['Save'])
//     },
//     verify() {
//         this.isSet(gateMap['Interface Name'], "interface undef")
//         this.isSet(gateMap['Alias'], "alias undefined")
//         this.isSet(gateMap['VLAN ID'], 4)
//         this.isSet(gateMap['Role'], "undefined")
//         this.isCheck('Device Detection')
//         this.isCheck('Miscellaneous Monitor')
//         this.isCheck('Interface Status Disable')
//         this.isSet(gateMap['Comments'], "test comments")
//     }
// })
//
// new Testcase({
//     name: 'interface undef delete',
//     testcase() {
//         this.click(cloudMap['Interfaces'])
//         this.click(cloudMap['Delete for interface undef'])
//         this.click(cloudMap['YES'])
//     },
//     verify() {
//         this.click(gateMap['Interfaces'])
//         this.isDelete(gateMap['interface undef'])
//     }
// })
