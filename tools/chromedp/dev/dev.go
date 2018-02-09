package dev

var Login = map[string]string{
	"url":      `http://172.16.94.163/com.fortinet.gwt.Main/Main.html`,
	"email":    `input.gwt-TextBox`,
	"password": `input.gwt-PasswordTextBox`,
	"login":    `button.loginButton1`,
}

var FgtConfig = map[string]string{
	"FGT_SN":         `#ext-gen6 > table.home_panel > tbody > tr:nth-child(2) > td > div > table > tbody > tr > td > div > div:nth-child(2) > div > div > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(2) > td > div`,
	"Management_Tab": `#ext-gen6 > table:nth-child(12) > tbody > tr:nth-child(1) > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td:nth-child(2) > table > tbody > tr > td:nth-child(2) > table > tbody > tr > td:nth-child(3) > div`,
}
