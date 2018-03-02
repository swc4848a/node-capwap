const program = require('commander')

function list(val) {
    return val.split(',');
}

class Commander {
    constructor(argv) {
        program
            .version(`0.2.0`)
            .option(`-h, --headless`, `run headless mode`)
            .option(`-s, --skip <steps>`, `add the skip steps [testcase,deploy,verify]`, list)
            .option(`-c, --case <cases>`, `run single/multi testcases ['case one', 'case two']`, list)
            .option(`-r, --regexr <regexr>`, `run testcases match regular expression`)
            .parse(process.argv)

        console.log(`headless: ${program.headless}`)
        console.log(`skip: ${program.skip}`)
        console.log(`case: ${program.case}`)
        console.log(`regexr: ${program.regexr}`)
    }
}

module.exports = new Commander(process.argv);