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
	// for i := 0; i < len(dev.Setup); i++ {
	// 	if err := c.Run(ctxt, dev.Setup[i]()); err != nil {
	// 		return fmt.Errorf("login run error: %v", err)
	// 	}
	// }

	for i := 0; i < len(dev.Interfaces); i++ {
		if err := c.Run(ctxt, dev.Interfaces[i]()); err != nil {
			return fmt.Errorf("login run error: %v", err)
		}
	}

	if err := c.Run(ctxt, demo()); err != nil {
		return fmt.Errorf("demo run error: %v", err)
	}

	c.Run(ctxt, chromedp.Sleep(60*time.Second))

	return nil
}

func demo() chromedp.Tasks {
	return chromedp.Tasks{
		chromedp.Sleep(1 * time.Second),
	}
}
