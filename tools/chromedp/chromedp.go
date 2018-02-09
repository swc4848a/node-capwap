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
		chromedp.Navigate(`http://172.16.94.163/com.fortinet.gwt.Main/Main.html`),
		chromedp.SetValue(`input.gwt-TextBox`, `zqqiang@fortinet.com`),
		chromedp.SetValue(`input.gwt-PasswordTextBox`, `SuperCRM801`),
		chromedp.Click(`button.loginButton1`),
	}
}

func testcases() chromedp.Tasks {
	FGT := `#ext-gen6 > table.home_panel > tbody > tr:nth-child(2) > td > div > table > tbody > tr > td > div > div:nth-child(2) > div > div > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(2) > td > div`
	Management := `#ext-gen6 > table:nth-child(12) > tbody > tr:nth-child(1) > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td:nth-child(2) > table > tbody > tr > td:nth-child(2) > table > tbody > tr > td:nth-child(3) > div`
	return chromedp.Tasks{
		chromedp.Click(FGT, chromedp.NodeVisible),
		chromedp.Sleep(1 * time.Second),
		chromedp.Click(Management, chromedp.NodeVisible),
	}
}
