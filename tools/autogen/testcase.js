let cloudcases = require('./it/root.js');
let gatecases = require('./it/gatecases.js');

class CloudGUI {
    constructor(options) {
        this.name = options.name
        this.map = options.map
        this.setup()
    }
    setup() {
        cloudcases[this.name] = []
    }
    click(btn) {
        cloudcases[this.name].push([this.map[btn], undefined])
    }
    checked(btn) {
        if (this.map[btn]) {
            cloudcases[this.name].push([this.map[btn], true])
        }
    }
    unchecked(btn) {
        if (this.map[btn]) {
            cloudcases[this.name].push([this.map[btn], false])
        }
    }
    set(btn, val) {
        if (this.map[btn]) {
            cloudcases[this.name].push([this.map[btn], val]);
        }
    }
    hide(btn) {
        if (this.map[btn]) {
            cloudcases[this.name].push([this.map[btn], { action: 'hide' }]);
        }
    }
}

class GateGUI {
    constructor(options) {
        this.name = options.name
        this.map = options.map
        this.setup()
    }
    setup() {
        gatecases[this.name] = []
    }
    click(btn) {
        if (this.map[btn]) {
            gatecases[this.name].push([this.map[btn], undefined])
        }
    }
    isChecked(btn) {
        if (this.map[btn]) {
            gatecases[this.name].push([this.map[btn], true])
        }
    }
    isSet(btn, val) {
        if (this.map[btn]) {
            gatecases[this.name].push([this.map[btn], val]);
        }
    }
    isDelete(btn) {
        if (this.map[btn]) {
            gatecases[this.name].push([this.map[btn], { action: 'delete' }]);
        }
    }
}

class Testcase {
    constructor(options) {
        this.testcase = options.testcase
        this.verify = options.verify
        this.cloudgui = new CloudGUI({
            name: options.name,
            map: options.cloud
        })
        this.gategui = new GateGUI({
            name: options.name,
            map: options.gate
        })
        this.setup()
    }
    setup() {
        this.testcase(this.cloudgui)
        this.verify(this.gategui)
    }
}

module.exports = Testcase;
