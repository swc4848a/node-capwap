package main

import (
	"bytes"
	"encoding/binary"
	"fmt"
)

type T struct {
	logType int16
	logLen  int64
	logBody [128]int64
}

func main() {
	t := T{
		logType: 100,
		logLen:  1024,
	}
	for i := 0; i < 128; i++ {
		t.logBody[i] = 0xff
	}
	buf := &bytes.Buffer{}
	err := binary.Write(buf, binary.BigEndian, t)
	if err != nil {
		panic(err)
	}
	fmt.Printf("% x", buf.Bytes())
}
