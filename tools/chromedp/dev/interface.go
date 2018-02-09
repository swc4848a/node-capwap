package dev

import (
	"github.com/chromedp/chromedp"
	"time"
)

var m = map[string]string{
	"Network":        `#toppanel > tbody > tr > td > table > tbody > tr.main_panel > td > div > div > div > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > div > table > tbody > tr:nth-child(2) > td > div > div:nth-child(2) > div > div > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(6) > td > div > table > tbody > tr > td:nth-child(2) > div`,
	"Interfaces":     `#toppanel > tbody > tr > td > table > tbody > tr.main_panel > td > div > div > div > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > div > table > tbody > tr:nth-child(2) > td > div > div:nth-child(2) > div > div > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(7) > td > table > tbody > tr > td:nth-child(4) > div > table > tbody > tr > td:nth-child(2) > div`,
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
}

func interfaces_setup() chromedp.Tasks {
	return chromedp.Tasks{
		chromedp.Click(m["Network"], chromedp.NodeVisible),
		chromedp.Click(m["Interfaces"], chromedp.NodeVisible),
	}
}

func create_new_hardware_switch() chromedp.Tasks {
	return chromedp.Tasks{
		chromedp.Click(m["Create New"], chromedp.NodeVisible),
		chromedp.Sleep(1 * time.Second),
		chromedp.SetValue(m["Interface Name"], `hardware switch test`),
		chromedp.SetValue(m["Alias"], `alias test`),
		chromedp.SetValue(m["Type"], `HARD_SWITCH`),
		chromedp.Click(m["Save"], chromedp.NodeVisible),
		chromedp.Sleep(1 * time.Second),
		chromedp.Click(m["Deploy"], chromedp.NodeVisible),
		chromedp.Click(m["Immediately"], chromedp.NodeVisible),
		chromedp.Click(m["Apply"], chromedp.NodeVisible),
		chromedp.Click(m["Deploy OK"], chromedp.NodeVisible),
		chromedp.Click(m["Close"], chromedp.NodeVisible),
	}
}

var Interfaces = []cases{
	interfaces_setup,
	create_new_hardware_switch,
}
