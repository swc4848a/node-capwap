const fs = require('fs')
const util = require('util')

const report = `mochawesome-report/mochawesome.json`
const reportJson = JSON.parse(fs.readFileSync(report))

const email = `mochawesome-report/email.json`
fs.writeFileSync(email, JSON.stringify(reportJson.stats, null, 4))