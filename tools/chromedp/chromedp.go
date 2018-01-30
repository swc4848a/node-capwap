// Command click is a chromedp example demonstrating how to use a selector to
// click on an element.
package main

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/chromedp/chromedp"
)

func main() {
	var err error

	// create context
	ctxt, cancel := context.WithCancel(context.Background())
	defer cancel()

	// create chrome instance
	c, err := chromedp.New(ctxt, chromedp.WithLog(log.Printf))
	if err != nil {
		log.Fatal(err)
	}

	// run task list
	err = start(ctxt, c)
	if err != nil {
		log.Fatalf("could not run with logic: %v", err)
	}

	// shutdown chrome
	err = c.Shutdown(ctxt)
	if err != nil {
		log.Fatal(err)
	}

	// wait for chrome to finish
	err = c.Wait()
	if err != nil {
		log.Fatal(err)
	}
}

func start(ctxt context.Context, c *chromedp.CDP) error {
	if err := c.Run(ctxt, login()); err != nil {
		return fmt.Errorf("login run error: %v", err)
	}

	if err := c.Run(ctxt, testcases()); err != nil {
		return fmt.Errorf("testcases run error: %v", err)
	}

	c.Run(ctxt, chromedp.Sleep(150*time.Second))

	return nil
}

func login() chromedp.Tasks {
	return chromedp.Tasks{
		chromedp.Navigate(`https://alpha.forticloud.com`),
		// chromedp.SetValue(`#email`, `zqqiang@fortinet.com`),
		// chromedp.SetValue(`input[name="password"]`, `SuperCRM801`),
		// chromedp.Click(`input[type="submit"]`),
	}
}

func testcases() chromedp.Tasks {
	return chromedp.Tasks{
		chromedp.WaitVisible(`.svg-icon-90`),
		chromedp.Click(`.svg-icon-90`),
	}
}
