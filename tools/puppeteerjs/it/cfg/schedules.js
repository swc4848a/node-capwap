let Testcase = require("src/testcase.js");

let nameOneTime = "onetime one";
let startTime = "2019/06/18 06:07";
let endTime = "2019/07/18 08:09";
let nameRecurring = "recurring one";
let nameGroup = "schedule group one";

function goToScheduleList(obj) {
  obj.click(gateMap["Policy & Objects"]);
  obj.wait(500);
  obj.click(gateMap["Schedules"]);
  obj.wait(2000);
}

let cloudMap = {
  Schedules: "div.gwt-HTML:contains('Schedules')",
  "Create New": "button:contains('Create New')",

  "Create One-Time Schedule": "div.filter_text:contains('One-Time Schedule')",
  Name: "input.gwt-TextBox:eq(0)",
  "Start Date": "img.html-link:eq(0)",
  Select: "button:contains('Select')",
  "End Date": "img.html-link:eq(1)",
  "Last Day": "select.gwt-ListBox:eq(0)",
  "Pre-expiration Event Log": "input.gwt-TextBox:eq(3)",
  Save: "span:contains('Save')",
  OK: "button:contains('OK')",
  YES: "span:contains('YES')",

  "Create Recurring Schedule": "div.filter_text:contains('Recurring Schedule')",
  Sunday: "input:checkbox:eq(0)",
  Monday: "input:checkbox:eq(1)",
  Tuesday: "input:checkbox:eq(2)",
  Wednesday: "input:checkbox:eq(3)",
  Thursday: "input:checkbox:eq(4)",
  Friday: "input:checkbox:eq(5)",
  Saturday: "input:checkbox:eq(6)",
  Time: "td>input.textBox",

  "Create Schedule Group": "div.filter_text:contains('Schedule Group')",
  Members: "div.gwt-HTML:contains(' - ')",
  "Members Always": "div.gwt-HTML:contains('always')",
  "Members None": "div.gwt-HTML:contains('none')",
  "Popup Panel": "div.gwt-DecoratedPopupPanel",

  "Delete Onetime one":
    "td.left:contains('" + nameOneTime + "')~td.right div[title='Delete']",
  "Delete Recurring One":
    "td.left:contains('" + nameRecurring + "')~td.right div[title='Delete']",
  "Delete Schedule Group One":
    "td.left:contains('" + nameGroup + "')~td.right div[title='Delete']"
};

let gateMap = {
  "Policy & Objects": "//span[text()='Policy & Objects']",
  Schedules: "a[href='page/p/firewall/object/schedule/']",
  "OneTime One": "tr[mkey='onetime one']",
  Edit: "button:contains('Edit'):eq(0)",
  "Type Onetime": "input#type-onetime",
  Name: "input#name",
  "Start Date": "input#start_date",
  "Start Hour": "input#start_hour",
  "Start Min": "input#start_min",
  "End Date": "input#stop_date",
  "End Hour": "input#stop_hour",
  "End Min": "input#stop_min",
  "Pre-expiration event log": "input:checkbox#generate_log",
  "Number of days before": "input#expiration-days",

  "Recurring One": "tr[mkey='recurring one']",
  "Type Recurring": "input#type-recurring",
  Sunday: "input#days-sunday",
  Monday: "input#days-monday",
  Tuesday: "input#days-tuesday",
  Wednesday: "input#days-wednesday",
  Thursday: "input#days-thursday",
  Friday: "input#days-friday",
  Saturday: "input#days-saturday",
  "All Day": "input#allday",
  "Start Hour": "input#start_hour",
  "Start Min": "input#start_min",
  "Stop Hour": "input#stop_hour",
  "Stop Min": "input#stop_min",

  "Schedule Group One": "tr[mkey='schedule group one']",
  "Members Always": "div.selected-entry>span:contains('always')",
  "Members None": "div.selected-entry>span:contains('none')"
};

/**
 * Editor: scheduleOnetimeEditor
 * Key/id
 *  i : name,
 *  k : start,
 *  k : end,
 *  i : expirationDays
 */

new Testcase({
  name: "onetime schedule new",
  testcase() {
    this.click(cloudMap["Schedules"]);
    this.wait(1000);
    this.click(cloudMap["Create New"]);
    this.wait(50);
    this.click(cloudMap["Create One-Time Schedule"]);
    this.wait(100);
    this.set("#fcld-scheduleOnetimeEditor-name", nameOneTime);
    this.evaluate(
      `FcldUiTest.setUiObjectValue("scheduleOnetimeEditor-start", "${startTime}")`
    );
    this.evaluate(
      `FcldUiTest.setUiObjectValue("scheduleOnetimeEditor-end", "${endTime}")`
    );
    this.set("#fcld-scheduleOnetimeEditor-expirationDays", 5);
    this.click("#fcld-scheduleOnetimeEditor-save");
    this.click(cloudMap["OK"]);
  },
  verify() {
    goToScheduleList(this);
    this.has(nameOneTime);
    this.has(startTime);
    this.has(endTime);
  }
});

new Testcase({
  name: "onetime schedule delete",
  testcase() {
    this.click(cloudMap["Schedules"]);
    this.wait(1000);
    this.click(cloudMap["Delete Onetime one"]);
    this.click(cloudMap["YES"]);
  },
  verify() {
    goToScheduleList(this);
    this.isDelete(nameOneTime);
  }
});
/**
 * Editor: "scheduleRecurringEditor"
 * Key/Id:
 *  i: "name",
 *  k: "day", // array-> "Monday", "Tuesday", etc
 *  i: "startHour",
 *  i: "startMinute",
 *  i: "endHour",
 *  i: "endMinute".
 */

let startHour = "01";
let startMinute = "02";
let endHour = "04";
let endMinute = "05";

new Testcase({
  name: "recurring schedule new",
  testcase() {
    this.click(cloudMap["Schedules"]);
    this.wait(1000);
    this.click(cloudMap["Create New"]);
    this.wait(50);
    this.click(cloudMap["Create Recurring Schedule"]);
    this.wait(100);
    this.set("#fcld-scheduleRecurringEditor-name", "recurring one");
    this.evaluate(
      `FcldUiTest.setUiObjectValue("scheduleRecurringEditor-day", ["Sunday","Saturday", "Tuesday"])`
    );
    this.evaluate(
      `FcldUiTest.setUiObjectValue("scheduleRecurringEditor-startHour", "${startHour}")`
    );
    this.evaluate(
      `FcldUiTest.setUiObjectValue("scheduleRecurringEditor-startMinute", "${startMinute}")`
    );
    this.evaluate(
      `FcldUiTest.setUiObjectValue("scheduleRecurringEditor-endHour", "${endHour}")`
    );
    this.evaluate(
      `FcldUiTest.setUiObjectValue("scheduleRecurringEditor-endMinute", "${endMinute}")`
    );
    this.click("#fcld-scheduleRecurringEditor-save");
    this.click(cloudMap["OK"]);
  },
  verify() {
    goToScheduleList(this);
    this.has(nameRecurring);
    /*
        this.isCheck(gateMap['Type Recurring'])
        this.isSet(gateMap['Name'], "recurring one")
        this.isUncheck(gateMap['Sunday'])
        this.isCheck(gateMap['Monday'])
        this.isCheck(gateMap['Tuesday'])
        this.isCheck(gateMap['Wednesday'])
        this.isCheck(gateMap['Thursday'])
        this.isCheck(gateMap['Friday'])
        this.isCheck(gateMap['Saturday'])
        this.isCheck(gateMap['All Day'])
        this.isSet(gateMap['Start Hour'], 10)
        this.isSet(gateMap['Start Min'], 10)
        this.isSet(gateMap['Stop Hour'], 10)
        this.isSet(gateMap['Stop Min'], 10)
        */
  }
});

new Testcase({
  name: "recurring schedule delete",
  testcase() {
    this.click(cloudMap["Schedules"]);
    this.wait(1000);
    this.click(cloudMap["Delete Recurring One"]);
    this.click(cloudMap["YES"]);
  },
  verify() {
    goToScheduleList(this);
    this.isDelete(nameRecurring);
  }
});
/**
 * Editor: "scheduleGroupEditor"
 * Key/Id:
 *  i: "name",
 *  k: "member".
 */
new Testcase({
  name: "schedule group new",
  testcase() {
    this.click(cloudMap["Schedules"]);
    this.wait(1000);
    this.click(cloudMap["Create New"]);
    this.wait(50);
    this.click(cloudMap["Create Schedule Group"]);
    this.wait(100);
    this.set("#fcld-scheduleGroupEditor-name", nameGroup);
    this.evaluate(
      `FcldUiTest.setUiObjectValue("scheduleGroupEditor-member", ["always", "none"])`
    );
    this.click("#fcld-scheduleGroupEditor-save");
    this.click(cloudMap["OK"]);
  },
  verify() {
    goToScheduleList(this);
    this.has(nameGroup);
  }
});

new Testcase({
  name: "schedule group delete",
  testcase() {
    this.click(cloudMap["Schedules"]);
    this.wait(1000);
    this.click(cloudMap["Delete Schedule Group One"]);
    this.click(cloudMap["YES"]);
  },
  verify() {
    goToScheduleList(this);
    this.isDelete(nameGroup);
  }
});
