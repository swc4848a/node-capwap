package main

import (
	"github.com/chromedp/chromedp"
	"github.com/stretchr/testify/assert"
	"time"
)

var cloudDnsServers = map[string]string{
	"Create New for DNS Service":  `(//button[text()='Create New'])[1]`,
	"Create New for DNS Database": `(//button[text()='Create New'])[2]`,
	"Delete dmz":                  `(//div[@title='Delete'])[1]`,

	"Interface Select":   `(//div[@class='short-select'])[1]`,
	"Interface wan1":     `//div[text()='wan1']`,
	"Mode Select":        `(//div[@class='short-select'])[2]`,
	"Mode Non Recursive": `//div[text()='NON_RECURSIVE']`,
}

var fgtDnsServers = map[string]string{
	"dmzUrl":    `http://172.16.95.49/ng/network/dns/service/edit/dmz`,
	"wan1Url":   `http://172.16.95.49/ng/network/dns/service/edit/wan1`,
	"Interface": `//*[@id="ng-base"]/form/div[2]/div[2]/section/f-field[1]/div/field-value/div/div/div[1]/div/span/span/span`,
	"Mode":      `input:checked`,

	"dnsServersUrl":            `http://172.16.95.49/ng/network/dns`,
	"DNS Service on Interface": `//*[@id="navbar-view-section"]/div/f-dns-servers/div/section[1]/f-dns-service-list/f-list/div/div[2]/div[1]/div[2]/table/tbody/tr/td`,
}

func dnsServerCreateNew() chromedp.Tasks {
	return chromedp.Tasks{
		chromedp.Click(menu["Network"], chromedp.NodeVisible),
		chromedp.Click(menu["DNS Servers"], chromedp.NodeVisible),
		chromedp.Click(cloudDnsServers["Create New for DNS Service"], chromedp.NodeVisible),
	}
}

func dnsServerCreateNewVerify(inter *string, mode *string) chromedp.Tasks {
	return chromedp.Tasks{
		chromedp.Navigate(fgtDnsServers["dmzUrl"]),
		chromedp.Text(fgtDnsServers["Interface"], inter),
		chromedp.Value(fgtDnsServers["Mode"], mode, chromedp.BySearch),
	}
}

func (s *TestSuite) TestDnsServersCreate() {
	c := s.c
	ctxt := s.ctxt
	assert := assert.New(s.T())

	var inter string
	var mode string

	assert.Nil(c.Run(ctxt, cloudLogin()))
	assert.Nil(c.Run(ctxt, dnsServerCreateNew()))
	assert.Nil(c.Run(ctxt, saveAndDeploy()))
	assert.Nil(c.Run(ctxt, fortiGateLogin()))
	assert.Nil(c.Run(ctxt, dnsServerCreateNewVerify(&inter, &mode)))

	assert.Equal(`dmz`, inter, "should be the same.")
	assert.Equal(`recursive`, mode, "should be the same.")
}

func dnsServerDelete() chromedp.Tasks {
	return chromedp.Tasks{
		chromedp.Click(menu["Network"], chromedp.NodeVisible),
		chromedp.Click(menu["DNS Servers"], chromedp.NodeVisible),
		chromedp.Click(cloudDnsServers["Delete dmz"], chromedp.NodeVisible),
	}
}

func dnsServerDeleteVerify(inter *string) chromedp.Tasks {
	return chromedp.Tasks{
		chromedp.Navigate(fgtDnsServers["dnsServersUrl"]),
		chromedp.Text(fgtDnsServers["DNS Service on Interface"], inter),
	}
}

func (s *TestSuite) TestDnsServersDelete() {
	c := s.c
	ctxt := s.ctxt
	assert := assert.New(s.T())

	var inter string

	assert.Nil(c.Run(ctxt, cloudLogin()))
	assert.Nil(c.Run(ctxt, dnsServerDelete()))
	assert.Nil(c.Run(ctxt, saveAndDeploy()))
	assert.Nil(c.Run(ctxt, fortiGateLogin()))
	assert.Nil(c.Run(ctxt, dnsServerDeleteVerify(&inter)))

	assert.Equal(`No matching entries found`, inter, "should be the same.")
}

func dnsServerCreateNewWan1() chromedp.Tasks {
	return chromedp.Tasks{
		chromedp.Click(menu["Network"], chromedp.NodeVisible),
		chromedp.Click(menu["DNS Servers"], chromedp.NodeVisible),
		chromedp.Click(cloudDnsServers["Create New for DNS Service"], chromedp.NodeVisible),
		chromedp.Click(cloudDnsServers["Interface Select"], chromedp.NodeVisible),
		chromedp.Click(cloudDnsServers["Interface wan1"], chromedp.NodeVisible),
		chromedp.Sleep(1 * time.Second),
		chromedp.Click(cloudDnsServers["Mode Select"], chromedp.NodeVisible),
		chromedp.Click(cloudDnsServers["Mode Non Recursive"], chromedp.NodeVisible),
	}
}

func dnsServerCreateNewWan1Verify(inter *string, mode *string) chromedp.Tasks {
	return chromedp.Tasks{
		chromedp.Navigate(fgtDnsServers["wan1Url"]),
		chromedp.Text(fgtDnsServers["Interface"], inter),
		chromedp.Value(fgtDnsServers["Mode"], mode, chromedp.BySearch),
	}
}

func (s *TestSuite) TestDnsServersCreateWan1() {
	c := s.c
	ctxt := s.ctxt
	assert := assert.New(s.T())

	var inter string
	var mode string

	assert.Nil(c.Run(ctxt, cloudLogin()))
	assert.Nil(c.Run(ctxt, dnsServerCreateNewWan1()))
	assert.Nil(c.Run(ctxt, saveAndDeploy()))
	assert.Nil(c.Run(ctxt, fortiGateLogin()))
	assert.Nil(c.Run(ctxt, dnsServerCreateNewWan1Verify(&inter, &mode)))

	assert.Equal(`wan1`, inter, "should be the same.")
	assert.Equal(`non-recursive`, mode, "should be the same.")
}

func (s *TestSuite) TestDemo() {
	var val string

	t := Testcase{
		s,
		[]string{val},
		chromedp.Tasks{
			chromedp.Click(menu["Network"], chromedp.NodeVisible),
		},
		chromedp.Tasks{
			chromedp.Navigate(fgtDnsServers["wan1Url"]),
			chromedp.Text(fgtDnsServers["Interface"], &val),
		},
	}

	t.build()

	assert := assert.New(s.T())

	assert.Equal(``, val, "should be the same.")
}
