let cases = require('./it/root.js');

class Testcase {
    constructor(module, map, build) {
        this.module = module
        cases[module] = []
        this.map = map
        build(this)
    }
    click(btn) {
        cases[this.module].push([this.map[btn], undefined])
    }
    checked(btn) {
        if (this.map[btn]) {
            cases[this.module].push([this.map[btn], true])
        }
    }
    set(btn, val) {
        if (this.map[btn]) {
            cases[this.module].push([this.map[btn], val]);
        }
    }
}

module.exports = Testcase;
