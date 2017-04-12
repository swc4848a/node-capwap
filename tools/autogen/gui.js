'use strict'

// let url = 'https://beta.forticloud.com/com.fortinet.gwt.Main/Main.html'

// let params = 'locale=en_US'

// window.location.href = url + '?' + params

let cmd_options = [{
    msg: 'click fortigate sn',
    action: () => {
        $($("div.img_link")[4]).click()
    },
    timeout: 1,
}, {
    msg: 'click tab management',
    action: () => {
        $($("div.cat_link")[0]).click()
    },
    timeout: 1,
}, {
    msg: 'click admin settings',
    action: () => {
        $($("div.gwt-HTML")[35]).click()
    },
    timeout: 3,
}, {
    msg: 'set http port to 100',
    action: () => {
        $($("input.gwt-TextBox")[0]).val(100)
    },
    timeout: 1,
}, {
    msg: 'click save button',
    action: () => {
        $($("span")[2]).click()
    },
    timeout: 1
}];

let total_timeout = 0;

cmd_options.forEach((item) => {
    total_timeout += item.timeout
    setTimeout(() => {
        console.log(item.msg)
        item.action()
    }, (total_timeout) * 1000);
})