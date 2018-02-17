package main

import (
	"github.com/chromedp/chromedp"
	"github.com/stretchr/testify/assert"
)

type Testcase struct {
	s      *TestSuite
	result []string
	test   func() chromedp.Tasks
	query  func([]string) chromedp.Tasks
	verify func(*assert.Assertions)
}

func (t *Testcase) build() {
	c := t.s.c
	ctxt := t.s.ctxt
	assert := assert.New(t.s.T())

	assert.Nil(c.Run(ctxt, cloudLogin()))
	assert.Nil(c.Run(ctxt, t.test()))
	assert.Nil(c.Run(ctxt, saveAndDeploy()))
	assert.Nil(c.Run(ctxt, fortiGateLogin()))
	assert.Nil(c.Run(ctxt, t.query(t.result)))

	t.verify(assert)
}
