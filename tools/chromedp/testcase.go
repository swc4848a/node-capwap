package main

import (
	"github.com/chromedp/chromedp"
	"github.com/stretchr/testify/assert"
)

type Testcase struct {
	s      *TestSuite
	val    []string
	test   func() chromedp.Tasks
	verify func([]string) chromedp.Tasks
}

func (t *Testcase) build() {
	c := t.s.c
	ctxt := t.s.ctxt
	assert := assert.New(t.s.T())

	var inter string
	var mode string

	assert.Nil(c.Run(ctxt, cloudLogin()))
	assert.Nil(c.Run(ctxt, t.test()))
	assert.Nil(c.Run(ctxt, saveAndDeploy()))
	assert.Nil(c.Run(ctxt, fortiGateLogin()))
	assert.Nil(c.Run(ctxt, t.verify(t.val)))

	assert.Equal(`wan1`, inter, "should be the same.")
	assert.Equal(`non-recursive`, mode, "should be the same.")
}
