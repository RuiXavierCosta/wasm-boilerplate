export default class Color {
  constructor(r, g, b) {
    const red = Math.round(r);
    const green = Math.round(g);
    const blue = Math.round(b);

    this.rgbValues = { r, g, b};
    this.cssColor = `rgb(${red}, ${green}, ${blue})`;
  };

  get css() {
    return this.cssColor;
  }

  get rgb() {
    return this.rgbValues;
  }
}
