# Auto Test Framework
Auto test for FortiCloud GUI Config Parts  

## What is this repository for?
* simulate user click the cloud GUI and deploy to device  
* query the result from device GUI and compare the result  
* auto run all testcase if developer commit code and give them feedback  

## How do I get set up?
* install [node.js v8.6.0+](https://nodejs.org/en/download/package-manager/)  
* npm install  
* change conf/config.js to your own environment url, account, password  
* run single testcase in debug mode(start Chromium): npm run debug "testcase name"  
* run group testcases: npm run debug "shared name string"  
  (eg: "interface" will load all testcases contains "interface xxx")  
* run all testcases in headless mode: npm run headless  

## How do I get result?
* stdout  
1. retry timeout, return failed: develop failed or develop timeout (eg: cfgServer core dump)  
2. if result match expect:
```
result: [192.168.100.0/255.255.255.0] expect: [192.168.100.0/255.255.255.0] => success
```
3. if not match:
```
result: [192.168.100.0/255.255.255.0] expect: [192.168.100.0/255.255.255.0] => failed
```

* img  
1. after each testcase run, it will capture final GUI image  
2. if encounter retry timeout, return failed, check the img/result.png for the specific reason  or use debug mode  

## Contribution guidelines

### Develop your testcases
* create a testcase source file in it folder and name it with menu label name  
```javascript
let Testcase = require('../src/testcase.js');

let cloudMap = {
    'Addresses': "div.gwt-HTML:contains('Addresses')",
    'Create New': "button:contains('Create New')",
    'Create Address': "div.filter_text:contains('Address'):eq(0)",
    'Name': "input.gwt-TextBox:eq(0)",
    'IP/Netmask': "input.gwt-TextBox:eq(1)",
    'Visibility': "input:checkbox:eq(0)",
    'Static Route': "input:checkbox:eq(1)",
    'Comments': "textarea.gwt-TextArea",
    'Save': "span:contains('Save')",
    'OK': "button:contains('OK')",

    'Delete for address new': "td.left:contains('address new')~td.right div[title='Delete']",
    'Delete for group new': "td.left:contains('group new')~td.right div[title='Delete']",
    'Next Page': "img.gwt-Image:eq(3)",
    'YES': "span:contains('YES')",

    'Create Address Group': "div.filter_text:contains('Address'):eq(1)",
    'Members': "div.gwt-HTML:contains(' - ')",
    'all': "div.gwt-HTML:contains('all'):eq(0)",
    'Popup Pannel': "div.gwt-DecoratedPopupPanel",
}

let gateMap = {
    'Name': "input#name",
    'IP/Netmask': "input#ipmask",
    'Visibility': "input#visibility",
    'Static Route': "input#allow-routing",
    'Comments': "textarea#comment",

    'address table': "div.first-cell span",
    'address new': "//span[text()='address new']",
    'group new': "tr[mkey='group new']",
    'Edit': "button span:contains('Edit'):eq(0)",

    'Policy & Objects': "//span[text()='Policy & Objects']",
    'Addresses': "a[href='firewall/address']",
    'Edit': "//span[text()='Edit']",
}

new Testcase({
    name: 'address new',
    testcase() {
        this.click(cloudMap['Addresses'])
        this.click(cloudMap['Create New'])
        this.click(cloudMap['Create Address'])
        this.set(cloudMap['Name'], "address new")
        this.set(cloudMap['IP/Netmask'], "192.168.100.100/255.255.255.0")
        this.check(cloudMap['Visibility'])
        this.check(cloudMap['Static Route'])
        this.set(cloudMap['Comments'], "test comments")
        this.click(cloudMap['Save'])
        this.wait(1000)
        this.click(cloudMap['OK'])
    },
    verify() {
        this.click(gateMap['Policy & Objects'])
        this.click(gateMap['Addresses'])
        this.wait(3000)
        this.click(gateMap['address new'])
        this.click(gateMap['Edit'])
        this.wait(3000)
        this.isSet(gateMap['Name'], "address new")
        this.isSet(gateMap['IP/Netmask'], "192.168.100.0/255.255.255.0")
        this.isChecked(gateMap['Visibility'])
        this.isChecked(gateMap['Static Route'])
        this.isSet(gateMap['Comments'], "test comments")
    }
})

new Testcase({
    name: 'address delete',
    testcase() {
        this.click(cloudMap['Addresses'])
        this.wait(1000)
        this.click(cloudMap['Delete for address new'])
        this.click(cloudMap['YES'])
    },
    verify() {
        this.click(gateMap['Policy & Objects'])
        this.click(gateMap['Addresses'])
        this.wait(3000)
        this.isDelete('address new')
    }
})
```
1. cloudMap indicate the forticloud GUI label and the [jquery/xpath/css selector](https://api.jquery.com/category/selectors/)  
2. gateMap indicate the fortigate GUI label and the [jquery/xpath/css selector](https://api.jquery.com/category/selectors/)  
3. new Testcase will create a testcase with input and verify actions  
4. testcase callback define cloud GUI actions exempt the develop action which will do in the framework  
5. verify callback define gate GUI verify actions  

### API documentation

#### testcase.click(selector)
- `selector` <[string]> A [selector] to search for element to click. If there are multiple elements satisfying the selector, the first will be clicked.

This method fetches an element with `selector`, scrolls it into view if needed, and then uses [page.mouse]() to click in the center of the element.
If there's no element matching `selector`, the method throws an error.

```javascript
this.click(`input#email`)
```
#### testcase.goto(url)
- `url` <[string]> URL to navigate page to. The url should include scheme, e.g. `https://`.

The `page.goto` will throw an error if:
- there's an SSL error (e.g. in case of self-signed certificates).
- target URL is invalid.
- 30 seconds`timeout` is exceeded during navigation.
- the main resource failed to load.

```javascript
this.goto(`https://alpha.forticloud.com`)
```
#### testcase.set(selector, text)
- `selector` <[string]> A [selector] of an element to type into. If there are multiple elements satisfying the selector, the first will be used.
- `text` <[string]> A text to type into a focused element.

Sends a `keydown`, `keypress`/`input`, and `keyup` event for each character in the text.

```js
this.set('#mytextarea', 'Hello'); // Types instantly
```
#### testcase.check(selector)
- `selector` <[string]> A [selector] to search for element to check. If there are multiple elements satisfying the selector, the first will be checked.

If there's no element matching `selector`, the method throws an error.

```javascript
this.check(`input#checkbox`)
```
#### testcase.wait(selectorOrTimeout)
- `selectorOrTimeout` <[string]|[number]> A [selector] or timeout to wait for

This method behaves differently with respect to the type of the first parameter:
- if `selectorOrTimeout` is a `string`, then the first argument is treated as a [selector] or [xpath], depending on whether or not it starts with '//', and the method is a shortcut for
- if `selectorOrTimeout` is a `number`, then the first argument is treated as a timeout in milliseconds and the method returns a promise which resolves after the timeout
- otherwise, an exception is thrown

```javascript
this.wait(`//button[text()="OK"]`)
this.wait(1000)
```
#### testcase.isSet(selector, text)
- `selector` <[string]> A [selector] of an element to type into. If there are multiple elements satisfying the selector, the first will be used.
- `text` <[string]> A text to verify.

```js
this.isSet('#mytextarea', 'Hello');
```
#### testcase.isCheck(selector)
- `selector` <[string]> A [selector] to search for element to check. If there are multiple elements satisfying the selector, the first will be checked.

If there's no element matching `selector`, the method throws an error.

```javascript
this.isCheck(`input#checkbox`)
```
#### testcase.isDelete(target)
- `target` <[string]> A [target] to search for element.

```javascript
this.isDelete(`address new`)
```

## Best Practise
1. first create a new item, edit it and delete it finally so that no side-effect to next testcase.
2. complicated testcase need group related action in one testcase, such as create a datasource first and use it in other module, finally remove all  

## Continuous Integration (TODO)
1. we use [Jenkins](http://172.16.94.162:8080/job/CfgServerIT) to integrate our framework  
2. if you commit cfgServer Code or testcases will trigger next build (for now it manually build by root user)  

## Todo List
1.  
