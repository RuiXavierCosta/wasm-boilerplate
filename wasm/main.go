//go:build js && wasm
// +build js,wasm

package main

import (
	"fmt"
	"syscall/js"
)

type WASMBenchmarks struct {
	sayHi, shutdownCb js.Func
	console           js.Value
	done              chan struct{}
}

func NewWASM() *WASMBenchmarks {
	return &WASMBenchmarks{
		console: js.Global().Get("console"),
		done:    make(chan struct{}),
	}
}

func main() {
	wasmB := NewWASM()
	wasmB.Start()
}

// Start sets up all the callbacks and waits for the close signal
// to be sent from the browser.
func (b *WASMBenchmarks) Start() {
	// Setup callbacks
	b.setupSayHi()
	js.Global().Set("sayHi", b.sayHi)

	<-b.done
	fmt.Println("Shutting down app")
	b.sayHi.Release()
	b.shutdownCb.Release()
}

func (b *WASMBenchmarks) setupShutdownCb() {
	b.shutdownCb = js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		b.done <- struct{}{}
		return nil
	})
}

func (b *WASMBenchmarks) setupSayHi() {
	b.sayHi = js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		fmt.Println("Hello, WebAssembly!")
		return nil
	})
}
