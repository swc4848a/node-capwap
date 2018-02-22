package main

import (
	"github.com/chromedp/chromedp"
	"github.com/stretchr/testify/assert"
	"time"
)

type (
	Option struct {
		Key    string
		Action int
		In     string
		Out    *string
	}

	TestOptions  []Option
	QueryOptions []Option

	Testcase struct {
		s     *TestSuite
		test  TestOptions
		query QueryOptions
	}
)

const (
	Dummy int = 0

	Click    int = 100
	SetValue int = 101
	Sleep    int = 102

	Navigate int = 200
	Text     int = 201
	Value    int = 202
)

func (t *Testcase) Test() chromedp.Tasks {
	tasks := make([]chromedp.Action, len(t.test))
	for i := 0; i < len(t.test); i++ {
		tt := t.test[i]
		switch tt.Action {
		case Click:
			tasks[i] = chromedp.Click(tt.Key, chromedp.NodeVisible)
		case SetValue:
			tasks[i] = chromedp.SetValue(tt.Key, tt.In, chromedp.NodeVisible)
		case Sleep:
			tasks[i] = chromedp.Sleep(1 * time.Second)
		}
	}
	return tasks
}

func (t *Testcase) Query() chromedp.Tasks {
	tasks := make([]chromedp.Action, len(t.query))
	for i := 0; i < len(t.query); i++ {
		tt := t.query[i]
		switch tt.Action {
		case Navigate:
			tasks[i] = chromedp.Navigate(tt.Key)
		case Value:
			tasks[i] = chromedp.Value(tt.Key, tt.Out, chromedp.NodeVisible)
		case Text:
			tasks[i] = chromedp.Text(tt.Key, tt.Out, chromedp.NodeVisible)
		case Sleep:
			tasks[i] = chromedp.Sleep(1 * time.Second)
		}
	}
	return tasks
}

func (t *Testcase) Build() {
	c := t.s.c
	ctxt := t.s.ctxt
	assert := assert.New(t.s.T())

	// assert.Nil(c.Run(ctxt, cloudLogin()))
	// assert.Nil(c.Run(ctxt, t.Test()))
	// assert.Nil(c.Run(ctxt, saveAndDeploy()))
	assert.Nil(c.Run(ctxt, fortiGateLogin()))
	assert.Nil(c.Run(ctxt, t.Query()))
}
