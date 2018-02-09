package main

import (
	"./dev"
	"context"
	"fmt"
	"github.com/chromedp/chromedp"
	"log"
	"time"
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
	if err := c.Run(ctxt, login(dev.Login)); err != nil {
		return fmt.Errorf("login run error: %v", err)
	}

	if err := c.Run(ctxt, setup(dev.FgtConfig)); err != nil {
		return fmt.Errorf("login run error: %v", err)
	}

	if err := c.Run(ctxt, testcases()); err != nil {
		return fmt.Errorf("testcases run error: %v", err)
	}

	c.Run(ctxt, chromedp.Sleep(150*time.Second))

	return nil
}

func login(m map[string]string) chromedp.Tasks {
	return chromedp.Tasks{
		chromedp.Navigate(m["url"]),
		chromedp.SetValue(m["email"], `zqqiang@fortinet.com`),
		chromedp.SetValue(m["password"], `SuperCRM801`),
		chromedp.Click(m["login"]),
	}
}

func setup(m map[string]string) chromedp.Tasks {
	return chromedp.Tasks{
		chromedp.Click(m["FGT_SN"], chromedp.NodeVisible),
		chromedp.Sleep(1 * time.Second),
		chromedp.Click(m["Management_Tab"], chromedp.NodeVisible),
	}
}

func testcases() chromedp.Tasks {
	return chromedp.Tasks{
		chromedp.Sleep(1 * time.Second),
	}
}
