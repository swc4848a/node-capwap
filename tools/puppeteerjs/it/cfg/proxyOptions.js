let Testcase = require("src/testcase.js");

/**
 * Editor: utmProxyOptionsEditor
 * Key/Id: both
        "oversizeLog",
	    "rpcOverHttp",
	    "httpStatus",
		"httpInspectAll",
		"httpPorts",
		"smtpStatus",
		"smtpInspectAll",
		"smtpPorts",
		"pop3Status",
		"pop3InspectAll",
		"pop3Ports",
		"imapStatus",
		"imapInspectAll",
		"imapPorts",
		
		"ftpStatus",
		"ftpInspectAll",
		"ftpPorts",
		"nntpStatus",
		"nntpInspectAll",
		"nntpPorts",
		
		"mapiStatus",
		"mapiPorts",		
		"dnsStatus",
		"dnsPorts",
		
		"clientcomfort",
		"comfortInterval",
		"comfortAmount",
		
		"oversize",
		"oversizeLimit",
		
		"chunkedbypass",
		
		"fortinetBar",
		"fortinetBarPort",
		
		"fragmail",
		
		"mailSignature",
		"signature"
 */
let apiData = {
  oversizeLog: true,
  rpcOverHttp: false,
  httpStatus: true,
  httpInspectAll: "Specify",
  httpPorts: 80,
  smtpStatus: true,
  smtpInspectAll: "Specify",
  smtpPorts: 25,
  pop3Status: true,
  pop3InspectAll: "Specify",
  pop3Ports: 110,
  imapStatus: true,
  imapInspectAll: "Specify",
  imapPorts: 143,

  ftpStatus: true,
  ftpInspectAll: "Specify",
  ftpPorts: 21,
  nntpStatus: true,
  nntpInspectAll: "Specify",
  nntpPorts: 119,

  mapiStatus: true,
  mapiPorts: 135,
  dnsStatus: true,
  dnsPorts: 53,

  clientcomfort: true,
  comfortInterval: 10,
  comfortAmount: 11,

  oversize: true,
  oversizeLimit: 8,

  chunkedbypass: false,

  fortinetBar: true,
  fortinetBarPort: 13,

  fragmail: false,

  mailSignature: true,
  signature: "my signature text"
};

let cloudMap = {
  "Proxy Options": "div.gwt-HTML:contains('Proxy Options'):eq(0)",

  "Log Oversized Files": "input:checkbox:eq(0)",
  "RPC over HTTP": "input:checkbox:eq(1)",
  HTTP: "input:checkbox:eq(2)",
  SMTP: "input:checkbox:eq(3)",
  POP3: "input:checkbox:eq(4)",
  IMAP: "input:checkbox:eq(5)",
  FTP: "input:checkbox:eq(6)",
  NNTP: "input:checkbox:eq(7)",
  MAPI: "input:checkbox:eq(8)",
  DNS: "input:checkbox:eq(9)",
  "Comfort Clients": "input:checkbox:eq(10)",
  "Interval (seconds)": "input:text:eq(91)",
  "Amount (bytes)": "input:text:eq(92)",
  "Block Oversized File/Email": "input:checkbox:eq(11)",
  "Threshold (MB)": "input:text:eq(95)",
  "Enable Chunked Bypass": "input:checkbox:eq(12)",
  "Add Fortinet Bar": "input:checkbox:eq(13)",
  "Communication Port": "input:text:eq(100)",
  "Allow Fragmented Messages": "input:checkbox:eq(14)",
  "Append Signature (SMTP)": "input:checkbox:eq(15)",
  "Email Signature Text": "textarea.gwt-TextArea",

  "All Any": "label:contains('Any')",
  "All Checkbox": "input:checkbox",

  Save: "span:contains('Save')"
};

let gateMap = {
  "Security Profiles": "//span[text()='Security Profiles']",
  "Proxy Options": "a[ng-href='page/p/firewall/proxy_options/edit/default/']",
  "Log Oversized Files": "input#oversize-log",
  "RPC over HTTP": "input#rpc-over-http",
  HTTP: "input[name=\\'http.status\\']",
  "HTTP ports": "input[name='http.ports']",
  SMTP: "input[name=\\'smtp.status\\']",
  "SMTP ports": "input[name='smtp.ports']",
  POP3: "input[name=\\'pop3.status\\']",
  "POP3 ports": "input[name='pop3.ports']",
  IMAP: "input[name=\\'imap.status\\']",
  "IMAP ports": "input[name='imap.ports']",
  FTP: "input[name=\\'ftp.status\\']",
  "FTP ports": "input[name='ftp.ports']",
  NNTP: "input[name=\\'nntp.status\\']",
  "NNTP ports": "input[name='nntp.ports']",
  MAPI: "input[name=\\'mapi.status\\']",
  "MAPI ports": "input[name='mapi.ports']",
  DNS: "input[name=\\'dns.status\\']",
  "DNS ports": "input[name='dns.ports']",
  "Comfort Clients": "input[name=\\'common.options.clientcomfort\\']",
  "Interval(seconds)": "input[name='common.comfort-interval']",
  "Amount(bytes)": "input[name='common.comfort-amount']",
  "Block Oversized File/Email": "input[name=\\'common.options.oversize\\']",
  "Threshold(MB)": "input[name='common.oversize-limit']",
  "Chunked Bypass": "input[name=\\'http.options.chunkedbypass\\']",
  "Add Fortinet Bar": "input[name=\\'http.fortinet-bar\\']",
  "Communication Port": "input[name='http.fortinet-bar-port']",
  "Allow Fragmented Messages": "input[name=\\'common.options.fragmail\\']",
  "Append Signature (SMTP)": "input[name=\\'mail-signature.status\\']",
  "Email Signature Text": "textarea[name='mail-signature.signature']"
};

new Testcase({
  name: "proxy options edit",
  testcase() {
    this.click(cloudMap["Proxy Options"]);
    this.wait(1000);
    /*
        this.click(cloudMap['Log Oversized Files'])
        this.click(cloudMap['RPC over HTTP'])
        this.click(cloudMap['HTTP'])
        this.click(cloudMap['SMTP'])
        this.click(cloudMap['POP3'])
        this.click(cloudMap['IMAP'])
        this.click(cloudMap['FTP'])
        this.click(cloudMap['NNTP'])
        this.click(cloudMap['MAPI'])
        this.click(cloudMap['DNS'])

        this.click(cloudMap['Comfort Clients'])
        this.set(cloudMap['Interval (seconds)'], 1)
        this.set(cloudMap['Amount (bytes)'], 2)

        this.click(cloudMap['Block Oversized File/Email'])
        this.set(cloudMap['Threshold (MB)'], 10)

        this.click(cloudMap['Enable Chunked Bypass'])
        this.click(cloudMap['Add Fortinet Bar'])
        this.set(cloudMap['Communication Port'], 400)

        this.click(cloudMap['Allow Fragmented Messages'])
        this.click(cloudMap['Append Signature (SMTP)'])
        this.set(cloudMap['Email Signature Text'], "Email Signature Text test")
*/
    this.readApiData("utmProxyOptionsEditor", apiData);
    this.click(cloudMap["Save"]);
  },
  verify() {
    this.click(gateMap["Security Profiles"]);
    this.wait(500);
    this.click(gateMap["Proxy Options"]);
    this.wait(1000);
    this.isCheck(gateMap["Log Oversized Files"], apiData["oversizeLog"]);
    this.isCheck(gateMap["RPC over HTTP"], apiData["rpcOverHttp"]);
    this.isCheck(gateMap["HTTP"], apiData["httpStatus"]);
    this.isSet(gateMap["HTTP ports"], apiData["httpPorts"]);
    this.isCheck(gateMap["SMTP"], apiData["smtpStatus"]);
    this.isSet(gateMap["SMTP ports"], apiData["smtpPorts"]);
    this.isCheck(gateMap["POP3"], apiData["pop3Status"]);
    this.isSet(gateMap["POP3 ports"], apiData["pop3Ports"]);
    this.isCheck(gateMap["IMAP"], apiData["imapStatus"]);
    this.isSet(gateMap["IMAP ports"], apiData["imapPorts"]);
    this.isCheck(gateMap["FTP"], apiData["ftpStatus"]);
    this.isSet(gateMap["FTP ports"], apiData["ftpPorts"]);
    this.isCheck(gateMap["NNTP"], apiData["nntpStatus"]);
    this.isSet(gateMap["NNTP ports"], apiData["nntpPorts"]);
    this.isCheck(gateMap["MAPI"], apiData["mapiStatus"]);
    this.isSet(gateMap["MAPI ports"], apiData["mapiPorts"]);
    this.isCheck(gateMap["DNS"], apiData["dnsStatus"]);
    this.isSet(gateMap["DNS ports"], apiData["dnsPorts"]);
    this.isCheck(gateMap["Comfort Clients"], apiData["clientcomfort"]);
    this.isSet(gateMap["Interval(seconds)"], apiData["comfortInterval"]);
    this.isSet(gateMap["Amount(bytes)"], apiData["comfortAmount"]);
    this.isCheck(gateMap["Block Oversized File/Email"], apiData["oversize"]);
    this.isSet(gateMap["Threshold(MB)"], apiData["oversizeLimit"]);
    this.isCheck(gateMap["Chunked Bypass"], apiData["chunkedbypass"]);
    this.isCheck(gateMap["Add Fortinet Bar"], apiData["fortinetBar"]);
    this.isSet(gateMap["Communication Port"], apiData["fortinetBarPort"]);
    this.isCheck(gateMap["Allow Fragmented Messages"], apiData["fragmail"]);
    this.isCheck(gateMap["Append Signature (SMTP)"], apiData["mailSignature"]);
    this.isSet(gateMap["Email Signature Text"], apiData["signature"]);
  }
});

new Testcase({
  name: "proxy options clean",
  testcase() {
    this.click(cloudMap["Proxy Options"]);
    this.wait(1000);

    this.evaluate(
      `FcldUiTest.setUiObjectValue("utmProxyOptionsEditor-oversizeLog", ${!apiData[
        "oversizeLog"
      ]})`
    );
    this.evaluate(
      `FcldUiTest.setUiObjectValue("utmProxyOptionsEditor-rpcOverHttp", ${!apiData[
        "rpcOverHttp"
      ]})`
    );

    this.click(cloudMap["Save"]);
  },
  verify() {
    this.click(gateMap["Security Profiles"]);
    this.wait(500);
    this.click(gateMap["Proxy Options"]);
    this.wait(1000);

    this.isCheck(gateMap["Log Oversized Files"], !apiData["oversizeLog"]);
    this.isCheck(gateMap["RPC over HTTP"], !apiData["rpcOverHttp"]);
    /*
        this.isUncheck(gateMap['HTTP'])
        this.isUncheck(gateMap['SMTP'])
        this.isUncheck(gateMap['POP3'])
        this.isUncheck(gateMap['IMAP'])
        this.isUncheck(gateMap['FTP'])
        this.isUncheck(gateMap['NNTP'])
        this.isUncheck(gateMap['MAPI'])
        this.isUncheck(gateMap['DNS'])
        this.isUncheck(gateMap['Comfort Clients'])
        this.isUncheck(gateMap['Block Oversized File/Email'])
        this.isUncheck(gateMap['Chunked Bypass'])
        this.isUncheck(gateMap['Add Fortinet Bar'])
        this.isUncheck(gateMap['Allow Fragmented Messages'])
        this.isUncheck(gateMap['Append Signature (SMTP)'])
        */
  }
});
