package main

import (
	"github.com/stretchr/testify/assert"
)

var cloudInterfaces = map[string]string{
	"Create New":     `//button[text()='Create New']`,
	"Interface Name": `(//input[@class='gwt-TextBox'])[1]`,
	"":               ``,
}

var fgtInterfaces = map[string]string{
	"": ``,
	"": ``,
}

func (s *TestSuite) TestCreateNewHardwareSwitchInterface() {
	var result string

	t := Testcase{
		s,
		TestOptions{
			{Key: menu["Network"], Action: Click},
			{Key: menu["Interfaces"], Action: Click},
			{Key: cloudInterfaces["Create New"], Action: Click},
			{Key: cloudInterfaces["Interface Name"], Action: SetValue, In: "Test Hardware"},
		},
		QueryOptions{
		// {Key: "https://www.google.ca/", Action: Navigate},
		// {Key: "//input[@name='btnK']", Action: Value, Content: &result},
		},
	}

	t.Build()

	assert := assert.New(s.T())

	assert.Equal(`Google Search`, result, "should be the same.")
}
