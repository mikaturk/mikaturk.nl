const rotateLeftFlip = {
  'u': 'l',
  'r': 'd',
  'd': 'r',
  'l': 'u'
}

const rotateRightFlip = {
  'u': 'r',
  'r': 'u',
  'd': 'l',
  'l': 'd'
}

const order1 = ['u', 'r', 'd'];

function transformCurve(curve, lookup) {
  return curve.map(instruction => lookup[instruction]);
}

function hilbertCurve(order) {
  if (order < 1) {
    throw new Error("order must be 1 or greater");
  }

  if (order == 1) {
    return [order1, 1];
  }

  const [innerCurve, innerCurveSize] = hilbertCurve(order - 1);

  const curve = [
    ...transformCurve(innerCurve, rotateRightFlip),
    'u',
    ...innerCurve,
    'r',
    ...innerCurve,
    'd',
    ...transformCurve(innerCurve, rotateLeftFlip)
  ];

  const size = innerCurveSize * 2 + 1;

  return [curve, size];
}

function hilbertCurvePath(order, svgSize, margin) {
  const innerSize = svgSize - 2 * margin;

  const [curve, curveSize] = hilbertCurve(order);
  const factor = innerSize / curveSize;
  // .toFixed is to prevent the path string from being too large
  const instructions = curve.map(dir => {
    switch (dir) {
      case 'u': return 'v' + (-factor).toFixed(2);
      case 'r': return 'h' + factor.toFixed(2);
      case 'd': return 'v' + factor.toFixed(2);
      case 'l': return 'h' + (-factor).toFixed(2);
      default: throw Error("Invalid direction");
    }
  });

  const startx = margin;
  const starty = svgSize - margin;
  return [`M${startx} ${starty}` + instructions.join(''), curve.length * factor];
}

window.addEventListener("DOMContentLoaded", () => {
  const paths = document.querySelectorAll('.hilbert-path');

  paths.forEach(path => {
    const { order = 1, size = 24, margin = 3 } = path.dataset;
    const [d, length] = hilbertCurvePath(order, size, margin);
    path.style.setProperty('--path-length', length);
    path.setAttribute('d', d);
  });
});