const { Chromeless } = require('chromeless')
const path = require('path')

async function run() {
    const chromeless = new Chromeless({
        debug: true,
        // implicitWait: true,
        // launchChrome: false
    })

    const screenshot = await chromeless
        .goto('https://alpha.forticloud.com')
        .type('zqqiang@fortinet.com', 'input[name="username"]')
        .type('SuperCRM801', 'input[name="password"]')
        .click('input[type="submit"]')
        .wait(20000)
        .screenshot({ filePath: path.join(__dirname, 'alpha-main.png') })

    console.log(screenshot) // prints local fileÏpath or S3 url

    await chromeless.end()
}

run().catch(console.error.bind(console))