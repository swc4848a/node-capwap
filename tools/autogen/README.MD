# ConfigManagerServer

# Auto Test Framework
Auto test for Config Manager Server  

## What is this repository for?
* simulate user click the cloud GUI and deploy to device  
* query the result from device GUI and compare the result  
* auto run all testcase if developer commit code and give them feedback  

## How do I get set up?
* install [node.js v7.10.0+](https://nodejs.org/en/download/package-manager/)  
* run single testcase: node headless.js "testcase name"  
* run group testcases: node headless.js "shared name string" (eg: "interface" will load all testcases contains "interface xxx")  
* run all testcases: node headless.js  

## How do I get result?
* stdout  
1. retry timeout, return failed: develop failed or develop timeout (eg: cfgServer core dump)  
2. *config failed jquery#selector expect-value input-value: failed after compare expect and input value  
2. config success jquery#selector expect-value input-value: success after compare expect and input value  
3. load "xxx" test cases: start run "xxx" test case  
4. load "xxx" gate verify seqs: start verify steps  

* img  
1. after each testcase run, it will capture the diff result page  
2. if encounter retry timeout, return failed, check the img/testcase-name.png for the specific reason  

## Contribution guidelines

### Develop your testcases
* create a testcase source file in it folder and name it with menu name  
~~~~
let Testcase = require('../testcase.js');

let cloudMap = {
    'Cloud Label': "jquery selector",
}

let gateMap = {
    'Fortigate Label': "jquery selector",
}

new Testcase({
    name: 'testcase name (eg: module + action)',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('menu label')
        c.click('Create New')

        c.set('Cloud Label', "input value")

        c.click('Save')
    },
    verify: (g) => {
        g.click('menu label')
        g.click('new item')
        g.click('Edit')

        g.isSet('Cloud Label', "input value")
    }
})
~~~~
1. cloudMap indicate the forticloud GUI label and the [jquery selector](https://api.jquery.com/category/selectors/)  
2. gateMap indicate the fortigate GUI label and the [jquery selector](https://api.jquery.com/category/selectors/)  
3. new Testcase will create a testcase with input and verify actions  
4. testcase callback define cloud GUI actions exempt the develop action which will do in the framework  
5. verify callback define gate GUI verify actions  

## Best Practise
1. first create a new item, edit it and delete it finally so that no side-effect to next testcase.
2. complicated testcase need group related action in one testcase, such as create a datasource first and use it in other module, finally remove all  

## Continuous Integration
1. we use [Jenkins](http://172.16.94.162:8080/job/CfgServerIT) to integrate our framework  
![Jenkins home](doc/jenkins-home)
![Jenkins build](doc/jenkins-build)
![Jenkins output](doc/jenkins-output)
2. if you commit cfgServer Code or testcases will trigger next build (for now it manually build by root user)  

## Todo List
