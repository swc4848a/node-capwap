const phantom = require('phantom');

(async function() {
    const instance = await phantom.create();
    const page = await instance.createPage();

    await page.property('viewportSize', {width: 1024, height: 600});
    const status = await page.open('https://beta.forticloud.com/com.fortinet.gwt.Main/login.jsp');
    console.log(`Page opened with status [${status}].`);

    await page.render('forticloud.png');
    console.log(`File created at [./forticloud.png]`);

    await instance.exit();
}());