const Page = require("src/page");
const assert = require("assert");
const config = require("conf/config");
const mysql = require("mysql");
const util = require("util");

describe(`Free Style Module Demo Suite`, function() {
  // disable timeouts
  this.timeout(0);
  let cloud;

  async function cloudLogin() {
    await cloud.goto(`${config.cloudUrl}`);
    await cloud.wait(`input#email`);
    await cloud.type(`input#email`, `${config.cloudUsername}`);
    await cloud.type(`input[name="password"]`, `${config.cloudPassword}`);
    await cloud.click(`input[type="submit"]`);
  }

  before(async function() {
    let headless = undefined === process.env.HEADLESS ? true : false;
    console.log(`  headless mode is ${headless}`);
    cloud = new Page();
    await cloud.setup({
      headless: headless
    });
    await cloudLogin();
  });

  after(async function() {
    await cloud.close();
  });

  beforeEach(async function() {});

  afterEach(async function() {});

  // npm run debug -- --grep "free style testcase demo"
  it(`free style testcase demo`, async function() {
    // do everything you want
    assert.equal(true, true, `should be the same`);
  });
});

describe(`Free Style MySQL Demo Suite`, function() {
  this.timeout(0);

  let connection;

  before(function() {
    connection = mysql.createConnection({
      host: `172.16.94.163`,
      user: `forticrm`,
      password: `forticrm`,
      database: `apportal`
    });

    connection.connect();

    // promisify query api
    connection.query = util.promisify(connection.query);
  });

  after(function() {
    connection.end();
  });

  // npm run debug -- --grep "free style mysql testcase demo"
  it(`free style mysql testcase demo`, async function() {
    const result = await connection.query("SELECT sn,createTime FROM `ap_ap`");
    console.log(result);
  });
});
