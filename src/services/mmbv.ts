import { Complex, add, complex, multiply } from "mathjs";

export const multiplyMatrixByVector = (
  matrix: Complex[][],
  vector: Complex[]
) => {
  var result = [] as Complex[];
  var rows = matrix.length;
  var cols = matrix[0].length;

  if (cols !== vector.length) {
    throw new Error("Несоответствующие размеры матрицы и вектора");
  }

  for (var i = 0; i < rows; i++) {
    var sum = complex(0, 0);
    for (var j = 0; j < cols; j++) {
      // sum += matrix[i][j] * vector[j];

      const t = multiply(matrix[i][j], vector[j]);
      sum = add(sum, t) as Complex;
    }
    result.push(sum);
  }

  return result;
};
