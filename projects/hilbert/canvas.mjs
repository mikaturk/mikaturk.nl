import { createCurve } from "./hilbert.mjs";
import { logCall, debug } from "./debug.mjs"

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

export function drawCurve(order, pixelSize, colorFunction) {
  var t0 = performance.now();
  const matrix = createCurve(order);
  var t1 = performance.now();
  logCall("createCurve", t1-t0);
  
  var t0 = performance.now();
  drawMatrix(matrix, pixelSize, colorFunction)
  var t1 = performance.now();
  logCall("drawMatrix", t1-t0);

}

export function drawMatrix(matrix, pixelSize, colorFunction) {
  const ymax = matrix.length;
  const xmax = matrix[0].length;
  
  if (pixelSize > 0) {
    // poor performance (30+ seconds for 50x order 9)
    debug("Using fillRect (slower)");
    for (let y = 0; y < ymax; y++) {
      for (let x = 0; x < xmax; x++) {
        const pixelValue = matrix[y][x]
        ctx.fillStyle = colorFunction(pixelValue);
        ctx.fillRect(x*pixelSize, y*pixelSize, pixelSize, pixelSize);
      }
    }
  } else if (pixelSize === 0) {
    // good performance (<5 seconds for 50x order 9)
    debug("Using putImageData (faster)");
    const pixelValues = [];
    for (let y = 0; y < ymax; y++) {
      for (let x = 0; x < xmax; x++) {
        const pixelValue = matrix[y][x]*256
        const currentIndex = (y*xmax+x)*4
        pixelValues[currentIndex + 0] = pixelValue; // red
        pixelValues[currentIndex + 1] = pixelValue; // blue
        pixelValues[currentIndex + 2] = pixelValue; // green
        pixelValues[currentIndex + 3] = 255;        // opacity
      }
    }
    const imageData = new ImageData(new Uint8ClampedArray(pixelValues), xmax, ymax);
    ctx.putImageData(imageData, 0, 0);
  } else {
    throw new Error('pixelSize should be bigger than 0');
  }
}