import { glueMatrices, multiplyMatrixByNumber, addNumberToMatrix, rotateMatrix, flipMatrix } from "./matrix.mjs";

const order1curve = [
  [0.25, 0.50],
  [0.00, 0.75]
]
export function createCurve(order) {
  if (order <= 1) {
    return order1curve;
  } else {
    const lowercurve = multiplyMatrixByNumber(createCurve(order-1), 0.25);

    const matrices = [
      addNumberToMatrix(lowercurve, 0.25),
      addNumberToMatrix(lowercurve, 0.50),
      flipMatrix(lowercurve,"northwest"),
      addNumberToMatrix(flipMatrix(lowercurve, "northeast"), 0.75)
    ];
    return glueMatrices(matrices)
  }
}