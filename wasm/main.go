//go:build js && wasm
// +build js,wasm

package main

import (
	"encoding/binary"

	"fmt"
	"math"
	"math/cmplx"
	"sort"
	"strings"
	"syscall/js"
)

type WASMBenchmarks struct {
	nameBuf                                                  []uint8
	signalBuf                                                []uint8
	sortStringsCb, fastFourierTransformCb, removeDuplicateCb js.Func
	shutdownCb, loadNamesCb                                  js.Func
	loadRealSignalCb, loadImgSignalCb                        js.Func
	randomNames                                              []string
	realSignal, imgSignal                                    []float64
	console                                                  js.Value
	done                                                     chan struct{}
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
	b.setupOnRealSignalLoadCb()
	js.Global().Set("loadRealSignalToGo", b.loadRealSignalCb)
	b.setupOnImgSignalLoadCb()
	js.Global().Set("loadImgSignalToGo", b.loadImgSignalCb)
	b.setupSortStrings()
	js.Global().Set("sortStringsWasm", b.sortStringsCb)
	b.setupRemoveDuplicate()
	js.Global().Set("removeDuplicateWasm", b.removeDuplicateCb)
	b.setupFastFourierTransform()
	js.Global().Set("fftWasm", b.fastFourierTransformCb)

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

func (b *WASMBenchmarks) setupRemoveDuplicate() {
	b.removeDuplicateCb = js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		fmt.Println("removing duplicate WASM")
		removeDuplicateStrings(b.randomNames)
		fmt.Println("removed duplicate WASM")
		return nil
	})
}

func removeDuplicateStrings(stringSlice []string) []string {
	keys := make(map[string]bool)
	list := []string{}

	for _, entry := range stringSlice {
		if _, value := keys[entry]; !value {
			keys[entry] = true
			list = append(list, entry)
		}
	}
	return list
}

func (b *WASMBenchmarks) setupFastFourierTransform() {
	b.fastFourierTransformCb = js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		fmt.Println("fft start WASM")
		cmpx := toComplex(b.realSignal, b.imgSignal)
		FFT(cmpx, len(b.realSignal))
		fmt.Println("fft end WASM")
		return nil
	})
}

func (b *WASMBenchmarks) setupOnNamesLoadCb() {
	b.loadNamesCb = js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		array := args[0]
		b.nameBuf = make([]uint8, array.Get("byteLength").Int())
		js.CopyBytesToGo(b.nameBuf, array)

		reader := string(b.nameBuf)
		b.randomNames = strings.Split(reader, ",")
		fmt.Println("Loaded names list")
		return nil
	})
}

func Float64FromBytes(bytes []byte) []float64 {
	chunkSize := 8
	var result []float64

	for i := 0; i < len(bytes); i += chunkSize {
		end := i + chunkSize
		chunk := bytes[i:end]
		bits := binary.LittleEndian.Uint64(chunk)
		float := math.Float64frombits(bits)

		result = append(result, float)
	}

	return result
}
func toComplex(re []float64, im []float64) []complex128 {
	cmpx := make([]complex128, len(re))
	for i := 0; i < len(re); i++ {
		cmpx[i] = complex(re[i], im[i])
	}
	return cmpx
}

func (b *WASMBenchmarks) setupOnRealSignalLoadCb() {
	b.loadRealSignalCb = js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		array := args[0]
		b.signalBuf = make([]uint8, array.Get("byteLength").Int())
		js.CopyBytesToGo(b.signalBuf, array)

		b.realSignal = Float64FromBytes(b.signalBuf)
		fmt.Println("Loaded real signal")
		return nil
	})
}

func (b *WASMBenchmarks) setupOnImgSignalLoadCb() {
	b.loadImgSignalCb = js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		array := args[0]
		b.signalBuf = make([]uint8, array.Get("byteLength").Int())
		js.CopyBytesToGo(b.signalBuf, array)

		b.imgSignal = Float64FromBytes(b.signalBuf)
		fmt.Println("Loaded img signal")
		return nil
	})
}

func FFT(a []complex128, n int) []complex128 {
	x := make([]complex128, n)
	copy(x, a)

	j := 0
	for i := 0; i < n; i++ {
		if i < j {
			x[i], x[j] = x[j], x[i]
		}
		m := n / 2
		for {
			if j < m {
				break
			}
			j = j - m
			m = m / 2
			if m < 2 {
				break
			}
		}
		j = j + m
	}
	kmax := 1
	for {
		if kmax >= n {
			return x
		}
		istep := kmax * 2
		for k := 0; k < kmax; k++ {
			theta := complex(0.0, -1.0*math.Pi*float64(k)/float64(kmax))
			for i := k; i < n; i += istep {
				j := i + kmax
				temp := x[j] * cmplx.Exp(theta)
				x[j] = x[i] - temp
				x[i] = x[i] + temp
			}
		}
		kmax = istep
	}
}
