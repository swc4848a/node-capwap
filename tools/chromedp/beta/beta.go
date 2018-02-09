package beta

var login = map[string]string{
	"url":      `https://beta.forticloud.com`,
	"email":    `#email`,
	"password": `input[type='password']`,
	"login":    `input[value='Login']`,
}

var FgtConfig = map[string]string{
	"Lower_Level":    `#ext-gen6 > table:nth-child(12) > tbody > tr:nth-child(2) > td > div > table > tbody > tr > td > div > div:nth-child(6) > div > div > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr > td:nth-child(1) > table > tbody > tr > td > table > tbody > tr > td:nth-child(1) > span > label`,
	"FGT_SN":         `#ext-gen6 > table:nth-child(12) > tbody > tr:nth-child(2) > td > div > table > tbody > tr > td > div > div:nth-child(6) > div > div > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(3) > td > table > tbody > tr.data > td:nth-child(2)`,
	"Management_Tab": `#ext-gen6 > table:nth-child(12) > tbody > tr:nth-child(1) > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td:nth-child(2) > table > tbody > tr > td:nth-child(2) > table > tbody > tr > td:nth-child(3) > div`,
}

var ApConfig = map[string]string{
	"AP_Network":   `#ext-gen6 > table:nth-child(12) > tbody > tr:nth-child(1) > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td:nth-child(2) > table > tbody > tr > td:nth-child(2) > table > tbody > tr > td:nth-child(3) > div`,
	"Lower_Level":  `#ext-gen6 > table:nth-child(12) > tbody > tr:nth-child(2) > td > div > table > tbody > tr > td > div > div:nth-child(6) > div > div > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr > td:nth-child(1) > table > tbody > tr > td > table > tbody > tr > td:nth-child(1) > span > label`,
	"DEV3":         `#ext-gen6 > table:nth-child(12) > tbody > tr:nth-child(2) > td > div > table > tbody > tr > td > div > div:nth-child(6) > div > div > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(6) > td:nth-child(1) > div`,
	"Access_Point": `#toppanel > tbody > tr > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr > td > table > tbody > tr > td:nth-child(4) > div > table > tbody > tr > td.menu_button_off_c`,
	"AP_SN":        `#toppanel > tbody > tr > td > table > tbody > tr.main_panel > td > div > div > div > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > div > table > tbody > tr > td > div > div:nth-child(6) > div > div > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td:nth-child(2) > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(2) > td:nth-child(1)`,
}
