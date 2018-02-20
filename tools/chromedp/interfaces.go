package main

import (
	"github.com/stretchr/testify/assert"
)

var cloudInterfaces = map[string]string{
	"Create New":      `//button[text()='Create New']`,
	"Interface Name":  `(//input[@class='gwt-TextBox'])[1]`,
	"Alias":           `(//input[@class='gwt-TextBox'])[2]`,
	"Type":            `(//div[@class='short-select'])[1]`,
	"Hardware Switch": `(//div[@class='filter_text'])[3]`,
	"Internal5":       `//label[text()='internal5']`,
	"IP/Netmask":      `(//input[@class='gwt-TextBox'])[3]`,
	"HTTPS":           `//label[text()='HTTPS']`,
}

var fgtInterfaces = map[string]string{
	"": ``,
}

func (s *TestSuite) TestCreateNewHardwareSwitchInterface() {
	t := Testcase{
		s,
		TestOptions{
			{Key: menu["Network"], Action: Click},
			{Key: menu["Interfaces"], Action: Click},
			{Key: cloudInterfaces["Create New"], Action: Click},
			{Key: cloudInterfaces["Interface Name"], Action: SetValue, In: "Test Hardware"},
			{Key: cloudInterfaces["Alias"], Action: SetValue, In: "Alias Test Hardware"},
			{Key: cloudInterfaces["Type"], Action: Click},
			{Key: cloudInterfaces["Hardware Switch"], Action: Click},
			{Key: cloudInterfaces["Internal5"], Action: Click},
			{Key: cloudInterfaces["IP/Netmask"], Action: SetValue, In: "192.168.100.0/24"},
			{Key: cloudInterfaces["HTTPS"], Action: Click},
		},
		QueryOptions{},
	}

	t.Build()

	assert := assert.New(s.T())

	assert.Nil(nil)

	// assert.Equal(`Google Search`, result, "should be the same.")
}
