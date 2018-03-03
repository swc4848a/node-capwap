const Page = require('../src/page');
const cases = require('./src/cases');

(async() => {
    const files = fs.readdirSync('./it');

    for (const file of files) {
        require(`./it/${file}`);
        console.log(`  load ${file}`);
    };
})();


let page = new Page();


describe("Demo suite", function() {
    this.timeout(0)

    await page.setup();

    const testcase = cases[0];
    // for (const testcase of cases) {
    it(testcase.name, async function() {
        await page.run(testcase)
    });
    // }

    await page.close();
});