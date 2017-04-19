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
    ["div.cat_link:contains('Management')"],

    ["div.gwt-HTML:contains('Admin Settings')"],
    ["input.gwt-TextBox:eq(0)", 80],
    ["span.gwt-CheckBox>label"],
    ["input.gwt-TextBox:eq(1)", 443],
    ["input.gwt-TextBox:eq(2)", 23],
    ["input.gwt-TextBox:eq(3)", 22],
    ["input.gwt-TextBox:eq(4)", 480],

    ["span:contains('Save')"],
    ["button[title='Deploy']"],
    ["span:contains('YES')"],
    ["button:contains('OK')"],
    ["span:contains('Close')"],

    ["div.gwt-HTML:contains('Routing')"],
    ["button[title='Create New']"],
    ["input.gwt-TextBox:eq(0)", "192.168.18.0"],
    ["input.gwt-TextBox:eq(1)", "255.255.255.0"],
    ["input.gwt-TextBox:eq(2)", "192.168.1.1"],
    ["input.gwt-TextBox:eq(3)", 11],
    ["textarea.gwt-TextArea", "test comments"],
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
        let max_try = 20;
        while (!await ready() && retry < max_try) {
            console.log('waiting %s s...', retry + 1);
            await sleep(1000);
            ++retry;
        }
        if (retry === max_try) {
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

    await sleep(1000);

    await page.render('forticloud.png');
    console.log('save as ./forticloud.png');

    await sleep(2000);

    await instance.exit();
    console.log('instance exit...');

}());
