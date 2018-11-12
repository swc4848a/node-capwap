let Testcase = require("src/testcase.js");

let reportMap = {
  summaryReport: "//div[text()='Summary Report']",
  scheduleBtn: "div.svg-bg-schedule"
};

let scheduleDlgMap = {
  dailyCheckBox:
    "tr:nth-of-type(2) > td:nth-of-type(2) > div > div.fwrapper input[type='checkbox']",
  dailyEmailCheckBox:
    "tr:nth-of-type(2) > td:nth-of-type(3) > div > div.fwrapper input[type='checkbox']",
  dailyEmailTextBox:
    "tr:nth-of-type(2) > td:nth-of-type(4) > input[type='text']",
  weeklyCheckBox:
    "tr:nth-of-type(3) > td:nth-of-type(2) > div > div.fwrapper input[type='checkbox']",
  weeklyEmailCheckBox:
    "tr:nth-of-type(3) > td:nth-of-type(3) > div > div.fwrapper input[type='checkbox']",
  weeklyEmailTextBox:
    "tr:nth-of-type(3) > td:nth-of-type(4) > input[type='text']",
  monthlyCheckBox:
    "tr:nth-of-type(4) > td:nth-of-type(2) > div > div.fwrapper input[type='checkbox']",
  monthlyEmailCheckBox:
    "tr:nth-of-type(4) > td:nth-of-type(3) > div > div.fwrapper input[type='checkbox']",
  monthlyEmailTextBox:
    "tr:nth-of-type(4) > td:nth-of-type(4) > input[type='text']",
  submitBtn: "table.footer td:nth-of-type(2) > button",
  cancelBtn: "table.footer td:nth-of-type(3) > button"
};

new Testcase({
  name: "daily report schedule",
  category: "Analysis/Reports",
  testcase() {
    this.wait(reportMap["summaryReport"]);
    this.click(reportMap["summaryReport"]);
    this.wait(reportMap["scheduleBtn"]);
    this.click(reportMap["scheduleBtn"]);

    this.wait(scheduleDlgMap["dailyCheckBox"]);
    this.check(scheduleDlgMap["dailyCheckBox"]);
    this.check(scheduleDlgMap["dailyEmailCheckBox"]);
    this.wait(scheduleDlgMap["dailyEmailTextBox"]);
    this.set(scheduleDlgMap["dailyEmailTextBox"], "leonfan@fortinet.com");
    this.click(scheduleDlgMap["submitBtn"]);
  },
  verify() {
    this.wait(reportMap["scheduleBtn"]);
    this.click(reportMap["scheduleBtn"]);
    this.wait(scheduleDlgMap["dailyCheckBox"]);
    this.isCheck(scheduleDlgMap["dailyCheckBox"]);
    this.wait(scheduleDlgMap["dailyEmailCheckBox"]);
    this.isCheck(scheduleDlgMap["dailyEmailCheckBox"]);
    this.wait(scheduleDlgMap["dailyEmailTextBox"]);
    this.isSet(scheduleDlgMap["dailyEmailTextBox"], "leonfan@fortinet.com");
    this.click(scheduleDlgMap["cancelBtn"]);
  }
});

new Testcase({
  name: "daily report unschedule",
  category: "Analysis/Reports",
  testcase() {
    this.wait(reportMap["summaryReport"]);
    this.click(reportMap["summaryReport"]);
    this.wait(reportMap["scheduleBtn"]);
    this.click(reportMap["scheduleBtn"]);

    this.wait(scheduleDlgMap["dailyEmailTextBox"]);
    this.set(scheduleDlgMap["dailyEmailTextBox"], "");
    this.wait(scheduleDlgMap["dailyEmailCheckBox"]);
    this.uncheck(scheduleDlgMap["dailyEmailCheckBox"]);
    this.wait(scheduleDlgMap["dailyCheckBox"]);
    this.uncheck(scheduleDlgMap["dailyCheckBox"]);
    this.click(scheduleDlgMap["submitBtn"]);
  },
  verify() {
    this.wait(reportMap["scheduleBtn"]);
    this.click(reportMap["scheduleBtn"]);
    this.wait(scheduleDlgMap["dailyCheckBox"]);
    this.isCheck(scheduleDlgMap["dailyCheckBox"], false);
    this.wait(scheduleDlgMap["dailyEmailCheckBox"]);
    this.isCheck(scheduleDlgMap["dailyEmailCheckBox"], false);
    this.wait(scheduleDlgMap["dailyEmailTextBox"]);
    this.isSet(scheduleDlgMap["dailyEmailTextBox"], "");
  }
});
