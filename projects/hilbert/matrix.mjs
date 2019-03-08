export function rotateMatrix(matrix, direction) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  let newMatrix = [];
  if (direction === "right") {
    for (let col = 0; col < cols; col++) {
      newMatrix[col] = []
      for (let row = 0; row < rows; row++) {
        newMatrix[col][row] = matrix[rows-1-row][col]
      }
    }
    return newMatrix;
  } else if (direction === "left") {
    for (let col = 0; col < cols; col++) {
      newMatrix[col] = []
      for (let row = 0; row < rows; row++) {
        newMatrix[col][row] = matrix[row][cols-1-col]
      }
    }
    return newMatrix;
  } else {
    throw new Error(`Invalid parameter for direction: ${direction}`)
  }
}

export function flipMatrix(matrix, direction) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  let newMatrix = [];
  if (direction === "northeast") {
    for (let col = 0; col < cols; col++) {
      newMatrix[col] = []
      for (let row = 0; row < rows; row++) {
        newMatrix[col][row] = matrix[row][col]
      }
    }
    return newMatrix;
  } else if (direction === "northwest") {
    for (let col = 0; col < cols; col++) {
      newMatrix[col] = []
      for (let row = 0; row < rows; row++) {
        newMatrix[col][row] = matrix[rows-1-row][cols-1-col]
      }
    }
    return newMatrix;
  } else {
    throw new Error(`Invalid parameter for direction: ${direction}`)
  }
}

export function multiplyMatrixByNumber(matrix, number) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  let newMatrix = [];
  for (let row = 0; row < rows; row++) {
    newMatrix[row] = []
    for (let col = 0; col < cols; col++) {
      newMatrix[row][col] = matrix[row][col]*number;
    }
  }
  return newMatrix;
}

export function addNumberToMatrix(matrix, number) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  let newMatrix = [];
  for (let row = 0; row < rows; row++) {
    newMatrix[row] = []
    for (let col = 0; col < cols; col++) {
      newMatrix[row][col] = matrix[row][col]+number;
    }
  }
  return newMatrix;
}

// assumes all of matrices are the same size
export function glueMatrices(matrices) {
  if (matrices.length !== 4) throw new Error("glueMatrixes accepts exactly 4 matrices, you provided "+matrices.length)
  const rows = matrices[0].length;
  const cols = matrices[0][0].length;
  let newMatrix = [];
  for (let row = 0; row < rows*2; row++) {
    newMatrix[row] = [];
  }
  for (let matrix = 0; matrix < matrices.length; matrix++) {
    const x = matrix%2;
    const y = matrix/2|0;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        newMatrix[row+y*rows][col+x*cols] = matrices[matrix][row][col];
      }
    }
  }
  return newMatrix;
}

