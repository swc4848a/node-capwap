const { Chromeless } = require('chromeless')

async function run() {
    const chromeless = new Chromeless()

    const screenshot = await chromeless
        .goto('https://172.16.95.47')
        .type('admin', 'input#username')
        .type('pass', 'input#secretkey')
        .click('button#login_button')
        .wait('button:contains("Later")')
        .screenshot()

    console.log(screenshot)

    await chromeless.end()
}

run().catch(console.error.bind(console))