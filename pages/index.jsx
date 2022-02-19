import React, { useEffect } from 'react';
import Head from 'next/head';

import setupWASM from 'scripts/setup-wasm';
import Color from 'scripts/Color';
import RemoveRepeated from 'scripts/RemoveRepeated';
import FFT from 'scripts/FFT';
import { BLUES } from 'scripts/constants';

import Navbar from 'components/Navbar';
import BackgroundBar from 'components/BackgroundBar';
import ShortBio from 'components/ShortBio';
import CodeExample from 'components/CodeExample';
import Disclaimer from 'components/Disclaimer';
import Footer from 'components/Footer';

const sections = {
  shortBio: {
    el: React.createRef(),
    title: 'WASM Benchmark',
    color: new Color(...BLUES[1]),
  },
  code1: {
    el: React.createRef(),
    title: 'Example #1',
    color: new Color(...BLUES[2]),
  },
  code2: {
    el: React.createRef(),
    title: 'Example #2',
    color: new Color(...BLUES[3]),
  },
  code3: {
    el: React.createRef(),
    title: 'Example #3',
    color: new Color(...BLUES[2]),
  },
  disclaimer: {
    el: React.createRef(),
    title: 'Disclaimer',
    color: new Color(...BLUES[3]),
  },
  footer: {
    el: React.createRef(),
    title: 'Contacts',
    color: new Color(...BLUES[1]),
  },
};

const orderNames = () => {
  console.log('ordering JS');
  [...randomNames].sort(); // deconstruct to new array to stop mutation
  console.log('ordered JS');
}

const removeRepeated = () => {
  console.log('removing repeated JS');
  RemoveRepeated(randomNames);
  console.log('removing repeated JS');
}

const JScallFFT = () => {
  console.log('executing FFT JS');
  FFT(realSignal, complexSignal)
  console.log('executed FFT JS');
}

const code = {
  code1: {
    title: 'Order an array strings',
    description: `Let\s start with an <a href="/mock-data.js" target="example-data" class="text-light text-decoration-underline">array with 20 000 random names</a>, and see how fast each approach handles this.
One small thing we needed to do, was to deconstruct the array ([...randomNames]) to stop mutation. To be fair, this could
be done before-hand, but it shouldn't make much difference at all (I tested)`,
    JS: {
      code: `[...randomNames].sort();`,
      callback: () => orderNames(),
    },
    WASM: {
      code: 'sort.Strings(randomNames)',
      callback: () => sortStringsWasm(),
    },
    uri: 'order-string-array',
  },
  code2: {
    title: 'Remove repeated string in array',
    description: `Considering both of the sorting algorithms make in-place changes (mutating the original array) let's now try and see
which of them can remove the many repeated names off of this array.`,
    JS: {
      code: `return array.reduce((acc, item) => {
  if (acc.find((i) => i === item)) {
    return acc;
  }

  acc.push(item);
  return acc;
}, []);`,
      callback: () => removeRepeated(),
    },
    WASM: {
      code: `keys := make(map[string]bool)
list := []string{}

for _, entry := range intSlice {
  if _, value := keys[entry]; !value {
    keys[entry] = true
    list = append(list, entry)
  }
}
return list`,
      callback: () => removeDuplicateWasm(),
    },
    uri: 'remove-repeated',
  },
  code3: {
    title: 'Fast Fourier Transform (Cooley-Tukey)',
    description: `Now using <a href="/mock-data.js" target="example-data" class="text-light text-decoration-underline">a random signal of length 8192</a>, we're going to compare how fast each aproach can compute an FFT.
This one should definitely be a bigger challenge and maybe now we can see where WASM would shine.`,
    JS: {
      code: `FFT(re, im) {
  var N = re.length;
  for (var i = 0; i < N; i++) {
      for(var j = 0, h = i, k = N; k >>= 1; h >>= 1)
          j = (j << 1) | (h & 1);
      if (j > i) {
          re[j] = [re[i], re[i] = re[j]][0]
          im[j] = [im[i], im[i] = im[j]][0]
      }
  }
  for(var hN = 1; hN * 2 <= N; hN *= 2)
      for (var i = 0; i < N; i += hN * 2)
          for (var j = i; j < i + hN; j++) {
              var cos = Math.cos(Math.PI * (j - i) / hN),
                  sin = Math.sin(Math.PI * (j - i) / hN)
              var tre =  re[j+hN] * cos + im[j+hN] * sin,
                  tim = -re[j+hN] * sin + im[j+hN] * cos;
              re[j + hN] = re[j] - tre; im[j + hN] = im[j] - tim;
              re[j] += tre; im[j] += tim;
          }
}`,
      callback: () => JScallFFT(),
    },
    WASM: {
      code: `func FFT(a []complex128, n int) []complex128 {
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
}`,
      callback: () => fftWasm(),
    },
    uri: 'fft',
  }
  // Remove repeated string array
};

export default function Home() {
  useEffect(async ()=> {
    await setupWASM();
    if(typeof encodedNames !== 'undefined') {
      loadNamesToGo(encodedNames);
      loadRealSignalToGo(encodedRealSignal);
      loadImgSignalToGo(encodedComplexSignal);
    }
  });

  return (
    <>
      <Head>
        <title>WASM Benchmark | Xavier Costa</title>
      </Head>
      <Navbar sections={sections} />
      <BackgroundBar sections={sections} />
      <ShortBio ref={sections.shortBio.el}/>
      <CodeExample ref={sections.code1.el} {...code.code1}/>
      <CodeExample ref={sections.code2.el} {...code.code2}/>
      <CodeExample ref={sections.code3.el} {...code.code3}/>
      <Disclaimer ref={sections.disclaimer.el}/>
      <Footer ref={sections.footer.el}/>
      <div className="bottom-overflow"></div>
    </>
  )
}
