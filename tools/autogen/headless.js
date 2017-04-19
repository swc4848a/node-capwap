const phantom = require('phantom');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// [selector, {value}]
let seq = [
    ["input#email", "zqqiang@fortinet.com"],
    ["input[name='password']", "SuperCRM801"],
    ["input[type='submit']"],
    ["div.img_link:contains('FGT60D4615007833')"],
];

(async function() {
    const instance = await phantom.create();
    const page = await instance.createPage();

    await page.property('viewportSize', {
        width: 1500,
        height: 900
    });
    const status = await page.open('https://beta.forticloud.com/com.fortinet.gwt.Main/login.jsp');
    console.log(`Page opened with status [${status}].`);

    for (let i = 0; i < seq.length; ++i) {
        let selector = seq[i][0];
        let value = seq[i][1];

        async function ready() {
            let result = await page.evaluate(function(selector) {
                return ($(selector)[0] !== undefined);
            }, selector);
            console.log('selector:%s -> %s', selector, result);
            return result;
        }
        let retry = 0;
        while (!await ready() && retry < 5) {
            console.log('waiting...');
            await sleep(1000);
            ++retry;
        }
        if (retry === 5) {
            console.log('retry timeout, return failed');
            break;
        }
        await page.evaluate(function(selector, value) {
            if (value) {
                $(selector).val(value);
            } else {
                $(selector).click();
            }
        }, selector, value);
    }

    await sleep(5000);

    await page.render('forticloud.png');
    console.log('save as ./forticloud.png');

    await sleep(2000);

    await instance.exit();
    console.log('instance exit...');

}());
