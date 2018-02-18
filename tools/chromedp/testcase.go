package main

import (
	"github.com/chromedp/chromedp"
	"github.com/stretchr/testify/assert"
)

type (
	Options struct {
		Key     string
		Type    int
		Content string
	}

	Testcase struct {
		s     *TestSuite
		test  []Options
		query []Options
	}
)

const (
	Dummy int = 0

	Click int = 100

	Navigate int = 200
	Value    int = 201
)

func (t *Testcase) Test() chromedp.Tasks {
	var tasks = chromedp.Tasks
	for i := 0; i < len(t.test); i++ {
		tt := t.test[i]
		ta := tasks[i]
		switch tt.Type {
		case Click:
			ta = chromedp.Click(tt.Key, chromedp.NodeVisible)
		}
	}
	return tasks
}

func (t *Testcase) Query() chromedp.Tasks {

}

func (t *Testcase) Build() {
	c := t.s.c
	ctxt := t.s.ctxt
	assert := assert.New(t.s.T())

	assert.Nil(c.Run(ctxt, cloudLogin()))
	assert.Nil(c.Run(ctxt, t.Test()))
	// assert.Nil(c.Run(ctxt, saveAndDeploy()))
	// assert.Nil(c.Run(ctxt, fortiGateLogin()))
	assert.Nil(c.Run(ctxt, t.Query()))
}
