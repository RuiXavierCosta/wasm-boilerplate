export default function FFT(real, imaginary) {
  const N = real.length;
  const re = Array.from(real);
  const im = Array.from(imaginary);
  for (let i = 0; i < N; i++) {
    for (let j = 0, h = i, k = N; (k >>= 1); h >>= 1) {
      j = (j << 1) | (h & 1);
      if (j > i) {
        re[j] = [re[i], (re[i] = re[j])][0];
        im[j] = [im[i], (im[i] = im[j])][0];
      }
    }
  }
  for (let hN = 1; hN * 2 <= N; hN *= 2) {
    for (let i = 0; i < N; i += hN * 2) {
      for (let j = i; j < i + hN; j++) {
        let cos = Math.cos((Math.PI * (j - i)) / hN),
          sin = Math.sin((Math.PI * (j - i)) / hN);
        let tre = re[j + hN] * cos + im[j + hN] * sin,
          tim = -re[j + hN] * sin + im[j + hN] * cos;
        re[j + hN] = re[j] - tre;
        im[j + hN] = im[j] - tim;
        re[j] += tre;
        im[j] += tim;
      }
    }
  }

  return {
    real: re,
    imaginary: im
  };
}
