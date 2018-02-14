package alpha

import (
	"github.com/chromedp/chromedp"
	"time"
)

var signin = map[string]string{
	"url":      `https://alpha.forticloud.com`,
	"email":    `input#email`,
	"password": `input[name='password']`,
	"login":    `input[type='submit']`,
}

var fgtConfig = map[string]string{
	"FGT_SN":         `//div[text()='FGT60D4615007833']`,
	"Management_Tab": `//div[text()='Management']`,
}

type cases func() chromedp.Tasks

func login() chromedp.Tasks {
	m := signin
	return chromedp.Tasks{
		chromedp.Navigate(m["url"]),
		chromedp.SetValue(m["email"], `zqqiang@fortinet.com`),
		chromedp.SetValue(m["password"], `SuperCRM801`),
		chromedp.Click(m["login"]),
	}
}

func setup() chromedp.Tasks {
	m := fgtConfig
	return chromedp.Tasks{
		chromedp.Click(m["FGT_SN"], chromedp.NodeVisible),
		chromedp.Sleep(1 * time.Second),
		chromedp.Click(m["Management_Tab"], chromedp.NodeVisible),
		chromedp.Sleep(3 * time.Second),
	}
}

var Setup = []cases{
	login,
	setup,
}
