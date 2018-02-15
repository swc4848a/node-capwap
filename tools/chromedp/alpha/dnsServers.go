package alpha

import (
	// "context"
	// "log"
	// "github.com/chromedp/cdproto/cdp"
	"context"
	"fmt"
	"github.com/chromedp/chromedp"
	"log"
)

var dnsServersButton = map[string]string{
	"Create New for DNS Service":  `(//button[text()='Create New'])[1]`,
	"Create New for DNS Database": `(//button[text()='Create New'])[2]`,
}

var fgtDnsServers = map[string]string{
	"dmzUrl":    `http://172.16.95.49/ng/network/dns/service/edit/dmz`,
	"Interface": `//*[@id="ng-base"]/form/div[2]/div[2]/section/f-field[1]/div/field-value/div/div/div[1]/div/span/span/span`,
	"Mode":      ``,
}

func dns_servers_create_new() chromedp.Tasks {
	return chromedp.Tasks{
		chromedp.Click(menu["Network"], chromedp.NodeVisible),
		chromedp.Click(menu["DNS Servers"], chromedp.NodeVisible),
		chromedp.Click(dnsServersButton["Create New for DNS Service"], chromedp.NodeVisible),
		chromedp.Click(button["Save"], chromedp.NodeVisible),

		chromedp.Sleep(1 * time.Second),
		chromedp.Click(button["Deploy"], chromedp.NodeVisible),
		chromedp.Click(button["Immediately"], chromedp.NodeVisible),
		chromedp.Click(button["Apply"], chromedp.NodeVisible),
		chromedp.Click(button["OK"], chromedp.NodeVisible),
		chromedp.Click(button["Close"], chromedp.NodeVisible),
	}
}

func dns_servers_create_new_verify(s *string) chromedp.Tasks {
	return chromedp.Tasks{
		chromedp.Navigate(fgtDnsServers["dmzUrl"]),
		chromedp.Text(fgtDnsServers["Interface"], s),
	}
}

func Run(ctxt context.Context, c *chromedp.CDP) error {
	var val string

	if err := c.Run(ctxt, cloudLogin()); err != nil {
		return fmt.Errorf("login run error: %v", err)
	}

	if err := c.Run(ctxt, dns_servers_create_new()); err != nil {
		return fmt.Errorf("login run error: %v", err)
	}

	if err := c.Run(ctxt, fortiGateLogin()); err != nil {
		return fmt.Errorf("login run error: %v", err)
	}

	if err := c.Run(ctxt, dns_servers_create_new_verify(&val)); err != nil {
		return fmt.Errorf("login run error: %v", err)
	}

	log.Printf("=======> interface value %s", val)

	return nil
}
