const { Chromeless } = require('chromeless')
const chromeLauncher = require('chrome-launcher');
const path = require('path')

async function run() {
    var chrome = await chromeLauncher.launch({
        port: 9222,
        chromeFlags: [
            '--start-maximized',
            '--disable-gpu',
            // '--headless'
        ]
    });

    const chromeless = new Chromeless({
        debug: true,
        launchChrome: false
        // implicitWait: true,
    })

    const screenshot = await chromeless
        .goto('https://alpha.forticloud.com')
        .type('zqqiang@fortinet.com', 'input[name="username"]')
        .type('SuperCRM801', 'input[name="password"]')
        .click('input[type="submit"]')
        .wait(9000)
        .screenshot({ filePath: path.join(__dirname, 'alpha-main.png') })

    //todo: failed to redirect after login

    console.log(screenshot)

    await chromeless.end()
    await chrome.kill()
}

run().catch(console.error.bind(console))