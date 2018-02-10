package dev

import (
	"github.com/chromedp/chromedp"
	"time"
)

var interfaces = map[string]string{
	"Create New":     `#toppanel > tbody > tr > td > table > tbody > tr.main_panel > td > div > div > div > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > div > table > tbody > tr:nth-child(2) > td > div > div:nth-child(6) > div > div > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(2) > td:nth-child(3) > button`,
	"Interface Name": `#toppanel > tbody > tr > td > table > tbody > tr.main_panel > td > div > div > div > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > div > table > tbody > tr:nth-child(2) > td > div > div:nth-child(6) > div > div > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td:nth-child(2) > input`,
	"Alias":          `#toppanel > tbody > tr > td > table > tbody > tr.main_panel > td > div > div > div > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > div > table > tbody > tr:nth-child(2) > td > div > div:nth-child(6) > div > div > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > input`,
	"Type":           `#toppanel > tbody > tr > td > table > tbody > tr.main_panel > td > div > div > div > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > div > table > tbody > tr:nth-child(2) > td > div > div:nth-child(6) > div > div > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(3) > td:nth-child(2) > select`,
	"Save":           `#toppanel > tbody > tr > td > table > tbody > tr.main_panel > td > div > div > div > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > div > table > tbody > tr:nth-child(2) > td > div > div:nth-child(6) > div > div > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(8) > td > table > tbody > tr > td > table > tbody > tr > td:nth-child(2) > button`,
	"Deploy":         `#toppanel > tbody > tr > td > table > tbody > tr.main_panel > td > div > div > div > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > div > table > tbody > tr:nth-child(1) > td > table > tbody > tr > td:nth-child(2) > table > tbody > tr > td:nth-child(3) > button`,
	"Immediately":    `#ext-gen6 > div.tk-ModalDialog > div > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > span > label`,
	"Apply":          `#ext-gen6 > div.tk-ModalDialog > div > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(3) > td > table > tbody > tr > td:nth-child(4) > table > tbody > tr > td:nth-child(1) > button`,
	"Deploy OK":      `#ext-gen6 > div.gwt-PopupPanel > div > table > tbody > tr:nth-child(3) > td > table > tbody > tr > td:nth-child(2) > button`,
	"Close":          `#ext-gen6 > div.tk-ModalDialog > div > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > button`,

	"Delete Hardware Switch": `#toppanel > tbody > tr > td > table > tbody > tr.main_panel > td > div > div > div > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > div > table > tbody > tr:nth-child(2) > td > div > div:nth-child(6) > div > div > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(3) > td.right.last > div > div.html-link.svg-bg.svg-bg-gray.svg-bg-24.svg-bg-delete`,
	"Yes": `#ext-gen6 > div.gwt-PopupPanel > div > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table > tbody > tr:nth-child(3) > td > table > tbody > tr > td:nth-child(2) > table > tbody > tr > td:nth-child(1) > button`,
}

var g = map[string]string{
	"url":             `http://172.16.95.49`,
	"username":        `#username`,
	"password":        `#secretkey`,
	"Login":           `button#login_button`,
	"Later":           `#navbar-view-section > div > f-forticare-license-prompt > div > div > div.prompt-body > span > div.button-actions > button:nth-child(2)`,
	"Hardware Switch": `http://172.16.95.49/ng/page/p/system/interface/edit/hardware%20switch/?redir=%2Fp%2Fsystem%2Finterface%2F`,
}

func interfaces_setup() chromedp.Tasks {
	return chromedp.Tasks{
		chromedp.Click(menu["Network"], chromedp.NodeVisible),
		chromedp.Click(menu["Interfaces"], chromedp.NodeVisible),
	}
}

func create_new_hardware_switch() chromedp.Tasks {
	return chromedp.Tasks{
		chromedp.Click(interfaces["Create New"], chromedp.NodeVisible),
		chromedp.Sleep(1 * time.Second),
		chromedp.SetValue(interfaces["Interface Name"], `hardware switch test`),
		chromedp.SetValue(interfaces["Alias"], `alias test`),
		chromedp.SetValue(interfaces["Type"], `HARD_SWITCH`),
		chromedp.Click(interfaces["Save"], chromedp.NodeVisible),
		chromedp.Sleep(1 * time.Second),
		chromedp.Click(interfaces["Deploy"], chromedp.NodeVisible),
		chromedp.Click(interfaces["Immediately"], chromedp.NodeVisible),
		chromedp.Click(interfaces["Apply"], chromedp.NodeVisible),
		chromedp.Click(interfaces["Deploy OK"], chromedp.NodeVisible),
		chromedp.Click(interfaces["Close"], chromedp.NodeVisible),

		chromedp.Navigate(g["url"]),
		chromedp.Sleep(1 * time.Second),
		chromedp.SetValue(g["username"], `admin`),
		chromedp.SetValue(g["password"], `admin`),
		chromedp.Click(g["Login"]),
		chromedp.Click(g["Later"]),

		chromedp.Navigate(g["Hardware Switch"]), // can't open due to validation error
	}
}

func delete_hardware_switch() chromedp.Tasks {
	return chromedp.Tasks{
		chromedp.Click(interfaces["Delete Hardware Switch"], chromedp.NodeVisible),
		chromedp.Click(interfaces["Yes"], chromedp.NodeVisible),
		chromedp.Sleep(1 * time.Second),
		chromedp.Click(interfaces["Deploy"], chromedp.NodeVisible),
		chromedp.Click(interfaces["Immediately"], chromedp.NodeVisible),
		chromedp.Click(interfaces["Apply"], chromedp.NodeVisible),
		chromedp.Click(interfaces["Deploy OK"], chromedp.NodeVisible),
		chromedp.Click(interfaces["Close"], chromedp.NodeVisible),
	}
}

var Interfaces = []cases{
	interfaces_setup,
	create_new_hardware_switch,
	delete_hardware_switch,
}
