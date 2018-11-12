const mysql = require("mysql");
const Page = require("src/page");
const assert = require("assert");
const config = require("conf/config");

describe.skip(`FCP Auto Test`, function() {
  this.timeout(0);
  let cloud;
  let headless;
  let conPortal;
  let conDispatcher;

  async function cloudLogin() {
    await cloud.goto(`${config.cloudUrl}`);
    await cloud.wait(`input#email`);
    await cloud.type(`input#email`, `${config.fcpLoginUsername}`);
    await cloud.type(`input[name="password"]`, `${config.fcpLoginPassword}`);
    await cloud.click(`input[type="submit"]`);
  }

  async function fgtLogin() {
    await cloud.goto(config.fcpFortigateUrl);
    await cloud.wait(`#username`);
    await cloud.type(`input#username`, config.fcpFortigateUsername);
    await cloud.type(`input#secretkey`, config.fcpFortigatePassword);
    await cloud.click(`button#login_button`);
  }

  async function accountLogoutFromFGT() {
    await cloud.wait(3000);
    await fgtLogin();
    await cloud.wait(3000);
    await cloud.click(`button:contains("Later")`);
    await cloud.wait(3000);
    await cloud.click(`span:contains("Activated")`);
    await cloud.wait(3000);
    await cloud.click(
      `div[click="$ctrl.registrationAction('forticloud_logout')"]`
    );
    await cloud.wait(1000);
    await cloud.click(`span:contains("OK")`);
    await cloud.wait(10000);
    await cloud.click(`button:contains("Close")`);
    //logout from FGT
    await cloud.click(`button:contains("Logout")`);
  }

  async function cleanupDB() {
    conPortal.query(
      "DELETE FROM device WHERE sn= '" + `${config.fcpFortgiateSN}` + "'",
      function(err, result, fields) {
        if (err) {
          console.log("cleanupDB.device error.");
          return;
        }
      }
    );
    conPortal.query(
      "DELETE FROM inventorySns WHERE sn= '" + `${config.fcpFortgiateSN}` + "'",
      function(err, result, fields) {
        if (err) throw err;
      }
    );

    conDispatcher.query(
      "UPDATE deviceKey SET valid = 1 WHERE sn= '" +
        `${config.fcpFortgiateSN}` +
        "'",
      function(err, result, fields) {
        if (err) {
          console.log("cleanupDB.deviceKey error.");
          return;
        }
      }
    );
  }

  async function addDeviceByKey() {
    await cloudLogin();
    await cloud.wait(6000);
    await cloud.click(`div:contains("Add FortiGate")`);
    await cloud.type(
      `input[style="width: 400px;"]`,
      `${config.fcpFortgiateKey}`
    );
    await cloud.click(`button:contains("Submit")`);
  }

  async function verifyAddDeviceByKey() {
    conPortal.query(
      "SELECT * FROM device WHERE sn= '" + `${config.fcpFortgiateSN}` + "'",
      function(err, result, fields) {
        if (err) {
          console.log("verifyAddDeviceByKey.device error.");
          return;
        } else if (!result.length) {
          console.log("verifyAddDeviceByKey.device: nothing retrieved.");
          return;
        }
        console.log(result);
        assert.equal(
          result[0].sn,
          `${config.fcpFortgiateSN}`,
          `device: sn should be ` + `${config.fcpFortgiateKey}`
        );
        assert.equal(result[0].allowJoin, "1", `device: allowJoin must be 1!`);
        assert.notEqual(
          result[0].homeServer,
          null,
          `device: homeServer must be assigned!`
        );
      }
    );
    await cloud.wait(1000);
    conPortal.query(
      "SELECT * FROM inventorySns WHERE sn= '" +
        `${config.fcpFortgiateSN}` +
        "'",
      function(err, result, fields) {
        if (err) {
          console.log("verifyAddDeviceByKey.inventorySns error.");
          return;
        } else if (!result.length) {
          console.log("verifyAddDeviceByKey.inventorySns: nothing retrieved.");
          return;
        }
        console.log(result);
        assert.equal(
          result[0].sn,
          `${config.fcpFortgiateSN}`,
          `InvenotrySns: the sn should be the same!`
        );
        assert.equal(
          result[0].deploymentKey,
          `${config.fcpFortgiateKey}`,
          `InvenotrySns: deeploymentKey must be` + `${config.fcpFortgiateKey}`
        );
        assert.equal(
          result[0].keyType,
          "CLOUD",
          `InvenotrySns: keyType must be CLOUD!`
        );
        assert.equal(
          result[0].category,
          "FortiCloud",
          `InvenotrySns: catetory must be FortiCloud!`
        );
        assert.equal(
          result[0].allowJoin,
          1,
          `InventorySns: allowJoint must be 1!`
        );
      }
    );
  }

  async function claimDeviceIntoInventory() {
    await cloudLogin();
    await cloud.wait(6000);
    await cloud.click(`div:contains("Inventory")`);
    await cloud.wait(1000);
    await cloud.click(`a:contains("Import FGT Key")`);
    await cloud.wait(1000);
    await cloud.type(
      `input[style="width: 400px;"]`,
      `${config.fcpFortgiateKey}`
    );
    await cloud.click(`button:contains("Submit")`);
    await cloud.wait(3000);
    await cloud.click(`button:contains("OK")`);
  }
  async function verifyClaimDeviceIntoInventory() {
    conPortal.query(
      "SELECT * FROM inventorySns WHERE sn= '" +
        `${config.fcpFortgiateSN}` +
        "'",
      function(err, result, fields) {
        if (err) {
          console.log("verifyClaimDeviceIntoInventory error.");
          return;
        } else if (!result.length) {
          console.log("verifyClaimDeviceIntoInventory: nothing retrieved.");
          return;
        }
        console.log(result);
        assert.equal(true, true, `no`);

        assert.equal(
          result[0].sn,
          `${config.fcpFortgiateSN}`,
          `InvenotrySns: the sn should be the same!`
        );
        assert.equal(
          result[0].deploymentKey,
          `${config.fcpFortgiateKey}`,
          `InvenotrySns: deeploymentKey must be` + `${config.fcpFortgiateKey}`
        );
        assert.equal(
          result[0].keyType,
          "CLOUD",
          `InvenotrySns: keyType must be CLOUD!`
        );
        assert.equal(
          result[0].category,
          null,
          `InvenotrySns: catetory must be FortiCloud!`
        );
        assert.equal(
          result[0].allowJoin,
          1,
          `InventorySns: allowJoint must be 1!`
        );
      }
    );
  }

  async function deployDeviceIntoInventory() {
    await cloud.click(`span[title="${config.fcpFortgiateSN}"`);
    await cloud.wait(1000);
    await cloud.click(`button:contains("Deploy")`);
    await cloud.wait(1000);
    await cloud.click(`div:contains("Deploy")`);
  }
  async function verifyDeployDeviceIntoInventory() {
    conPortal.query(
      "SELECT * FROM device where sn= '" + `${config.fcpFortgiateSN}` + "'",
      function(err, result, fields) {
        if (err) {
          console.log("verifydeployDeviceIntoInventory error.");
          return;
        } else if (!result.length) {
          console.log("verifydeployDeviceIntoInventory: nothing retrieved.");
          return;
        }
        console.log(result);
        assert.equal(
          result[0].sn,
          `${config.fcpFortgiateSN}`,
          `The sn should be the same!`
        );
        assert.equal(result[0].allowJoin, 1, `allowJoin must be 1!`);
        assert.notEqual(
          result[0].homeServer,
          null,
          `Home Server must be assigned!`
        );
      }
    );
    conPortal.query(
      "SELECT * FROM inventorySns WHERE sn= '" +
        `${config.fcpFortgiateSN}` +
        "'",
      function(err, result, fields) {
        if (err) {
          console.log("verifyClaimDeviceIntoInventory error.");
          return;
        } else if (!result.length) {
          console.log("verifyClaimDeviceIntoInventory: nothing retrieved.");
          return;
        }
        console.log(result);
        assert.equal(
          result[0].sn,
          `${config.fcpFortgiateSN}`,
          `InvenotrySns: the sn should be the same!`
        );
        assert.equal(
          result[0].deploymentKey,
          `${config.fcpFortgiateKey}`,
          `InvenotrySns: deeploymentKey must be` + `${config.fcpFortgiateKey}`
        );
        assert.equal(
          result[0].keyType,
          "CLOUD",
          `InvenotrySns: keyType must be CLOUD!`
        );
        assert.equal(
          result[0].category,
          "FortiCloud",
          `InvenotrySns: catetory must be FortiCloud!`
        );
        assert.equal(
          result[0].allowJoin,
          1,
          `InventorySns: allowJoint must be 1!`
        );
      }
    );
  }

  async function undeployDeviceIntoInventory() {
    await cloud.click(`td:contains("Deployed FortiGates")`);
    await cloud.wait(1000);
    await cloud.click(`span[title="${config.fcpFortgiateSN}"`);
    await cloud.wait(1000);
    await cloud.click(`div:contains("Undeploy")`);
    await cloud.wait(1000);
    await cloud.click(`span:contains("YES")`);
  }
  async function verifyUndeployDeviceIntoInventory() {
    conPortal.query(
      "SELECT * FROM device where sn= '" + `${config.fcpFortgiateSN}` + "'",
      function(err, result, fields) {
        if (err) {
          console.log("verifyUndeployDeviceIntoInventory error.");
          return;
        } else if (!result.length) {
          console.log("verifyUndeployDeviceIntoInventory: nothing retrieved.");
          return;
        }
        console.log(result);
        assert.equal(result.length, 0, `Device should not be there!`);
      }
    );
    conPortal.query(
      "SELECT * FROM inventorySns WHERE sn= '" +
        `${config.fcpFortgiateSN}` +
        "'",
      function(err, result, fields) {
        if (err) {
          console.log("verifyUndeployDeviceIntoInventory error.");
          return;
        } else if (!result.length) {
          console.log("verifyUndeployDeviceIntoInventory: nothing retrieved.");
          return;
        }
        console.log(result);
        assert.equal(true, true, `no`);

        assert.equal(
          result[0].sn,
          `${config.fcpFortgiateSN}`,
          `InvenotrySns: the sn should be the same!`
        );
        assert.equal(
          result[0].deploymentKey,
          `${config.fcpFortgiateKey}`,
          `InvenotrySns: deeploymentKey must be` + `${config.fcpFortgiateKey}`
        );
        assert.equal(
          result[0].keyType,
          "CLOUD",
          `InvenotrySns: keyType must be CLOUD!`
        );
        assert.equal(
          result[0].category,
          null,
          `InvenotrySns: catetory must be null!`
        );
        assert.equal(
          result[0].allowJoin,
          0,
          `InventorySns: allowJoint must be 1!`
        );
      }
    );
  }

  async function activateAccountFromFGT() {
    await cloud.wait(3000);
    await fgtLogin();
    await cloud.wait(3000);
    await cloud.click(`button:contains("Later")`);
    await cloud.wait(3000);
    await cloud.click(`div:contains("Not Activated")`, `header`);
    await cloud.wait(1000);
    await cloud.click(`button:contains("Activate FortiCloud"):first`, `header`);

    await cloud.wait(`#email`);
    await cloud.type(`input#email`, config.fcpLoginUsername);
    await cloud.type(`input#password`, config.fcpLoginPassword);
    await cloud.click(`button:contains("OK")`);
    await cloud.wait(10000);
    await cloud.click(`button:contains("Close")`);
    //logout from FGT
    await cloud.click(`button:contains("Logout")`);
  }
  async function verifyActiveAccountFromFGT() {
    conPortal.query(
      "SELECT * FROM device where sn= '" + `${config.fcpFortgiateSN}` + "'",
      function(err, result, fields) {
        if (err) {
          console.log("verifyActiveAccountFromFGT error");
          return;
        } else if (!result.length) {
          console.log("verifyActiveAccountFromFGT error: nothing retrieved.");
          return;
        }
        console.log(result);
        assert.equal(
          result[0].sn,
          `${config.fcpFortgiateSN}`,
          `The sn should be the same!`
        );
        assert.equal(result[0].allowJoin, 0, `allowJoin must be 0!`);
        assert.notEqual(
          result[0].homeServer,
          null,
          `Home Server must be assigned!`
        );
      }
    );
  }

  before(async function() {
    conPortal = mysql.createConnection({
      host: `${config.portalDBHost}`,
      user: `${config.portalDBUsr}`,
      password: `${config.portalDBPwd}`,
      database: `${config.portalDBDatabase}`
    });
    conDispatcher = mysql.createConnection({
      host: `${config.dispatcherDBHost}`,
      user: `${config.dispatcherDBUsr}`,
      password: `${config.dispatcherDBPwd}`,
      database: `${config.dispatcherDBDatabase}`
    });

    headless = undefined === process.env.HEADLESS ? true : false;
    console.log(`headless mode is ${headless}`);
    cloud = new Page();
    await cloud.setup({
      headless: headless
    });
  });

  after(async function() {
    await cloud.close();
    await conPortal.end();
    await conDispatcher.end();
  });

  beforeEach(async function() {
    await cleanupDB();
    await cloud.wait(1000);
  });

  afterEach(async function() {});

  // npm run debug -- --grep "fcp activate"
  it(`fcp login from fgt`, async function() {
    await activateAccountFromFGT();
    await cloud.wait(6000);
    await verifyActiveAccountFromFGT();
    await accountLogoutFromFGT();
  });

  it(`add device by key`, async function() {
    await addDeviceByKey();
    await cloud.wait(6000);
    await verifyAddDeviceByKey();
  });

  it(`add device from inventory and undeploy it`, async function() {
    await claimDeviceIntoInventory();
    await cloud.wait(6000);
    await verifyClaimDeviceIntoInventory();
    await cloud.wait(6000);
    await deployDeviceIntoInventory();
    await cloud.wait(6000);
    await verifyDeployDeviceIntoInventory();
    await cloud.wait(6000);
    await undeployDeviceIntoInventory();
    await cloud.wait(10000);
    await verifyUndeployDeviceIntoInventory();
  });
});
