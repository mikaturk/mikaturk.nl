import { drawCurve } from "./canvas.mjs";
import { logCall } from "./debug.mjs";

const MIN_ORDER = 1;
const MAX_ORDER = 5;

// default value, will be overwritten when the program runs, could probably be any value;
let canvas_size = 512;

function rgb(r,g,b) {
  return `rgb(${r}, ${g}, ${b})`;
}

function hsl(h,s,l) {
  return `hsl(${h}, ${s}%, ${l}%)`
}

function easeInOut(pixelValue) {
  return (1-Math.cos(Math.PI*pixelValue)) / 2
}

function easeInOutHsl(pixelValue) {
  return hsl(256*easeInOut(pixelValue), 90, 50)
}

function computePixelValue(value) {
  return easeInOutHsl(value)
  // return hsl(value*256, 100, 50);
  //return rgb(value*256, value*256, value*256);
}

window.rgb = rgb;
window.hsl = hsl;
window.easeInOutHsl = easeInOutHsl;
window.easeInOut = easeInOut;
window.computePixelValue = computePixelValue;

let order = 1;

const canvas = document.getElementById("canvas");
const increase = document.getElementById("increase");
const decrease = document.getElementById("decrease");
const output = document.getElementById("output");

function changeOrder(amount=0) {
  order += amount;
  const pixelSize = canvas_size*2**-order;

  if (order <= MIN_ORDER) {
    decrease.disabled = true;
  } else {
    decrease.disabled = false;
  }

  if (order >= MAX_ORDER) {
    increase.disabled = true;
  } else {
    increase.disabled = false;
  }

  output.innerText = order;
  
  
  var t0 = performance.now();
  drawCurve(order, pixelSize, window.computePixelValue);
  var t1 = performance.now();
  logCall("drawCurve", t1-t0);

}

increase.addEventListener("click", () => {
  changeOrder(1);
});

decrease.addEventListener("click", () => {
  changeOrder(-1);
});

function resizeListener () {
  var width = window.innerWidth
  || document.documentElement.clientWidth
  || document.body.clientWidth;

  var height = window.innerHeight
  || document.documentElement.clientHeight
  || document.body.clientHeight;

  const dimension = Math.min(height*0.9, width);
  canvas.width = dimension;
  canvas.height = dimension;
  canvas_size = dimension;
  changeOrder();
}

window.addEventListener('resize', resizeListener);
resizeListener();