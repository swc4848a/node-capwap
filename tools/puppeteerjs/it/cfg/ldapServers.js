let Testcase = require("src/testcase.js");

let serverName = "server one";
let cloudMap = {
  "LDAP Servers": "div.gwt-HTML:contains('LDAP Servers')",
  "Create New": "button:contains('Create New')",

  Name: "input.gwt-TextBox:eq(0)",
  "Server IP/Name": "input.gwt-TextBox:eq(1)",
  "Server Port": "input.gwt-TextBox:eq(2)",
  "Common Name Identifier": "input.gwt-TextBox:eq(3)",
  "Distinguished Name": "input.gwt-TextBox:eq(4)",
  "Secure Connection": "input:checkbox",

  Save: "span:contains('Save')",
  OK: "button:contains('OK')",
  "Delete server one": "div[title='Delete']:eq(0)",
  YES: "button:contains('YES')"
};

let gateMap = {
  "LDAP Servers": "a[ng-href='page/p/user/ldap/']",
  Name: "input[ng-model='$ctrl.ldapServer.name']",
  "Server IP/Name": "input[ng-model='$ctrl.ldapServer.server']",
  "Server Port": "input[ng-model='$ctrl.ldapServer.port']",
  "Common Name Identifier": "input[ng-model='$ctrl.ldapServer.cnid']",
  "Distinguished Name": "input[ng-model='$ctrl.ldapServer.dn']",
  "Secure Connection": "input#secure-connection",
  Protocol: "",
  Certificate: "",

  "server one": "tr[mkey='server one']"
};
/**
 * Editor: userLdapServersEditor
 * Key/Id
 *  i : name,
 *  i : serverIp,
 *  i : serverPort,
 *  i : cnid,
 *  i : dn,
 *  k : type,
 *  i : userDn,
 *  i : password,
 *  k : secureConnection,
 *  k : protocol,
 *  k : certificate
 */
new Testcase({
  name: "ldap server new",
  testcase() {
    this.click(cloudMap["LDAP Servers"]);
    this.wait(500);
    this.click(cloudMap["Create New"]);
    this.wait(1000);
    this.set("#fcld-userLdapServersEditor-name", serverName);
    this.set("#fcld-userLdapServersEditor-serverIp", "3.3.3.3");
    this.set("#fcld-userLdapServersEditor-serverPort", 100);
    this.set("#fcld-userLdapServersEditor-cnid", "ldap id");
    this.set("#fcld-userLdapServersEditor-dn", "ldap dis");
    this.evaluate(
      `FcldUiTest.setUiObjectValue("userLdapServersEditor-type", "Anonymous")`
    );
    this.evaluate(
      `FcldUiTest.setUiObjectValue("userLdapServersEditor-secureConnection", "false")`
    );

    this.wait(1000);
    this.click(cloudMap["Save"]);
    this.wait(1000);
    this.click(cloudMap["OK"]);
  },
  verify() {
    this.click(`span:contains("User & Device")`);
    this.click(`span:contains("LDAP Servers")`);
    this.wait(2000);
    this.click(`//td[text()='${serverName}']`);
    this.click(`span:contains("Edit")`);
    this.wait(2000);
    this.isSet(gateMap["Name"], serverName);
    this.isSet(gateMap["Server IP/Name"], "3.3.3.3");
    //this.isSet(gateMap['Server Port'], 636) // if enable secure connection port must be 636
    this.isSet(gateMap["Server Port"], 100); // if enable secure connection port must be 636
    this.isSet(gateMap["Common Name Identifier"], "ldap id");
    this.isSet(gateMap["Distinguished Name"], "ldap dis");
    this.isUncheck(gateMap["Secure Connection"]);
    this.click(`button#submit_cancel`);
  }
});

new Testcase({
  name: "ldap server delete",
  testcase() {
    this.click(cloudMap["LDAP Servers"]);
    this.wait(1000);
    this.click(cloudMap["Delete server one"]);
    this.wait(1000);
    this.click(cloudMap["YES"]);
  },
  verify() {
    this.click(`span:contains("User & Device")`);
    this.click(`span:contains("LDAP Servers")`);
    this.wait(3000);
    this.isDelete("server one");
  }
});
