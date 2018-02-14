package share

import (
	"github.com/chromedp/chromedp"
	// "time"
)

var dnsServersButton = map[string]string{
	"Create New for DNS Service":  `(//button[text()='Create New'])[1]`,
	"Create New for DNS Database": `(//button[text()='Create New'])[2]`,
}

func dns_servers_setup() chromedp.Tasks {
	return chromedp.Tasks{
		chromedp.Click(menu["Network"], chromedp.NodeVisible),
		chromedp.Click(menu["DNS Servers"], chromedp.NodeVisible),
	}
}

func dns_servers_create_new() chromedp.Tasks {
	return chromedp.Tasks{
		chromedp.Click(dnsServersButton["Create New for DNS Service"], chromedp.NodeVisible),
		chromedp.Click(button["Save"], chromedp.NodeVisible),
		chromedp.Click(button["Deploy"], chromedp.NodeVisible),
		chromedp.Click(button["Immediately"], chromedp.NodeVisible),
		chromedp.Click(button["Apply"], chromedp.NodeVisible),
		chromedp.Click(button["OK"], chromedp.NodeVisible),
		chromedp.Click(button["Close"], chromedp.NodeVisible),
	}
}

var DnsServers = []cases{
	dns_servers_setup,
	dns_servers_create_new,
}
