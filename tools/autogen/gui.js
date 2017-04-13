'use strict'

// let url = 'https://beta.forticloud.com/com.fortinet.gwt.Main/Main.html'

// let params = 'locale=en_US'

// window.location.href = url + '?' + params

let is_valid = (selector) => {
    return $(selector)[0] !== undefined
}

let cmd_options = [{
    msg: 'click fortigate sn',
    action: () => {
        $("div.img_link:contains('FGT60D4615007833')").click()
    },
    done: () => {
        return is_valid("div.cat_link:contains('Management')")
    }
}, {
    msg: 'click tab management',
    action: () => {
        $("div.cat_link:contains('Management')").click()
    },
    done: () => {
        return is_valid("div.gwt-HTML:contains('Admin Settings')")
    }
}, {
    msg: 'click admin settings',
    action: () => {
        $("div.gwt-HTML:contains('Admin Settings')").click()
    },
    done: () => {
        return is_valid("div.gwt-HTML:contains('HTTP Port')")
    }
}, {
    msg: 'set http port to 100',
    action: () => {
        $($("input.gwt-TextBox")[0]).val(100)
    },
    done: () => {
        return is_valid("span:contains('Save')")
    }
}, {
    msg: 'click save button',
    action: () => {
        $("span:contains('Save')").click()
    },
    done: () => {
        return is_valid("button[title='Deploy']")
    }
}, {
    msg: 'click deploy button',
    action: () => {
        $("button[title='Deploy']").click()
    },
    done: () => {
        return is_valid("span:contains('YES')")
    }
}, {
    msg: 'click yes to confirm',
    action: () => {
        $("span:contains('YES')").click()
    },
    done: () => {
        return is_valid("button:contains('OK')")
    }
}, {
    msg: 'click ok if success',
    action: () => {
        $("button:contains('OK')").click()
    },
    done: () => {
        return is_valid("span:contains('Close')")
    }
}, {
    msg: 'click close button',
    action: () => {
        $("span:contains('Close')").click()
    },
    done: () => {
        return is_valid("div.logo:contains('FortiCloud')")
    }
}, {
    msg: 'click home logo',
    action: () => {
        $("div.logo:contains('FortiCloud')").click()
    },
    done: () => {
        return true
    }
}];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const timeout = 15;

async function start() {
    for (let i = 0; i < cmd_options.length; ++i) {
        let item = cmd_options[i];
        console.log(item.msg);
        item.action();

        let cnt = 0;
        while (item.done !== undefined && !item.done() && cnt < timeout) {
            ++cnt
            console.log('......')
            await sleep(1000);
        }
        if (cnt == timeout) {
            console.log('%d times check failed -> exit', timeout);
            break;
        }
    }
}

start();