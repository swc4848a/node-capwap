const { Chromeless } = require('chromeless')

async function run() {
    const chromeless = new Chromeless()

    const screenshot = await chromeless
        .goto('https://beta.forticloud.com')
        .type('zqqiang@fortinet.com', 'input#email')
        .type('SuperCRM801', 'input[type="password"]')
        .click('input[type="submit"]')
        .wait('#demo')
        .screenshot()

    console.log(screenshot)

    await chromeless.end()
}

run().catch(console.error.bind(console))