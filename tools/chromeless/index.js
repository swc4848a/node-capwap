const { Chromeless } = require('chromeless')

async function run() {
    const chromeless = new Chromeless()

    const screenshot = await chromeless
        .goto('https://beta.forticloud.com')
        .type('zqqiang@fortinet.com', 'input#email')
        .type('SuperCRM801', 'input[type="password"]')
        .click('input[value="Login"]')
        .wait(5000)
        .screenshot()

    console.log(screenshot) // prints local file path or S3 url

    await chromeless.end()
}

run().catch(console.error.bind(console))