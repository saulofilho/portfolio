import React, { Component } from "react"
import loadable from '@loadable/component'

const Sketch = loadable(() => import('react-p5'))

export default class SketchTorus extends Component {

  setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.frameRate(100);
  };

  draw = p5 => {
    let img = p5.createImage(p5.windowWidth, p5.windowHeight);

    img.loadPixels();
    p5.background(0);

    function writeColor(image, x, y, red, green, blue, alpha) {
      let index = (x + y * p5.width) * 4;
      image.pixels[index] = red;
      image.pixels[index + 1] = green;
      image.pixels[index + 2] = blue;
      image.pixels[index + 3] = alpha;
    }

    let x, y;
    for (y = 0; y < img.height; y++) {
      for (x = 0; x < img.width; x++) {
        let red = p5.random(255);
        let green = p5.random(255);
        let blue = p5.random(255);
        let alpha = 255;
        writeColor(img, x, y, red, green, blue, alpha);
      }
    }

    img.updatePixels();
    p5.image(img, 0, 0);

  };

  windowResized = p5 => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  }

  render() {
    return <Sketch setup={this.setup} draw={this.draw} windowResized={this.windowResized} />;
  }
}
