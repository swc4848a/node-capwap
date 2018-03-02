const program = require('commander')

function list(val) {
    return val.split(',');
}

class Commander {
    constructor(argv) {
        this.commander = program
        this.commander
            .version(`0.2.0`)
            .option(`-h, --headless`, `run headless mode`)
            .option(`-s, --skip <steps>`, `add the skip steps [testcase,deploy,verify]`, list)
            .option(`-c, --case <cases>`, `run single/multi testcases ['case one', 'case two']`, list)
            .option(`-r, --regexr <regexr>`, `TODO: run testcases match regular expression`)
            .parse(argv)
    }
    headless() {
        return this.commander.headless !== undefined
    }
    skip() {
        return this.commander.skip
    }
    case () {
        return this.commander.case
    }
    regexr() {
        return this.commander.regexr
    }
    show() {
        console.log(`  -h [${this.headless()}]`)
        console.log(`  -s ${this.skip()}`)
        console.log(`  -c ${this.case()}`)
        console.log(`  -r ${this.regexr()}`)
    }
}

module.exports = new Commander(process.argv);