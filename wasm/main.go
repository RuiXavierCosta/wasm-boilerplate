//go:build js && wasm
// +build js,wasm

package main

import (
	"bytes"
	"fmt"
	"sort"
	"strings"
	"syscall/js"
)

type WASMBenchmarks struct {
	inBuf                   []uint8
	outBuf                  bytes.Buffer
	sortStringsCb           js.Func
	shutdownCb, loadNamesCb js.Func
	randomNames             []string
	console                 js.Value
	done                    chan struct{}
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
	b.setupOnNamesLoadCb()
	js.Global().Set("loadNamesToGo", b.loadNamesCb)
	b.setupSortStrings()
	js.Global().Set("sortStringsWasm", b.sortStringsCb)

	<-b.done
	fmt.Println("Shutting down app")
	b.sortStringsCb.Release()
	b.shutdownCb.Release()
}

func (b *WASMBenchmarks) setupShutdownCb() {
	b.shutdownCb = js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		b.done <- struct{}{}
		return nil
	})
}

func (b *WASMBenchmarks) setupSortStrings() {
	b.sortStringsCb = js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		fmt.Println("ordering WASM")
		sort.Strings(b.randomNames)
		fmt.Println("ordered WASM")
		return nil
	})
}

func (b *WASMBenchmarks) setupOnNamesLoadCb() {
	b.loadNamesCb = js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		array := args[0]
		b.inBuf = make([]uint8, array.Get("byteLength").Int())
		js.CopyBytesToGo(b.inBuf, array)

		reader := string(b.inBuf)
		b.randomNames = strings.Split(reader, ",")
		fmt.Println("Loaded names list")
		return nil
	})
}
