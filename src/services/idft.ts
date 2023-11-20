import { Complex, complex, divide, multiply, pow } from "mathjs";
import { multiplyMatrixByVector } from "./mmbv";

export const idft = (data: Complex[]) => {
  const N = data.length;
  const M = [] as Complex[][];
  const icomp = complex(0, 1);

  for (let i = 0; i < N; i++) {
    M[i] = [];
    for (let j = 0; j < N; j++) {
      const pow1 = multiply(icomp, (2 * Math.PI * i * j) / N) as Complex;
      M[i][j] = pow(Math.E, pow1) as Complex;
    }
  }

  const res = multiplyMatrixByVector(M, data).map((num) =>
    divide(num, N)
  ) as Complex[];
  return res;
};

//probably broken
