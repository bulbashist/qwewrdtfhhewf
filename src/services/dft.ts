import { Complex, complex, multiply, pow, sqrt, sum } from "mathjs";
import { multiplyMatrixByVector } from "./mmbv";

export const dft = (data: Complex[]) => {
  const N = data.length;
  const M = [] as Complex[][];
  const icomp = complex(0, -1);

  for (let i = 0; i < N; i++) {
    M[i] = [];
    for (let j = 0; j < N; j++) {
      const pow1 = multiply(icomp, (2 * Math.PI * i * j) / N) as Complex;
      M[i][j] = pow(Math.E, pow1) as Complex;
    }
  }

  const res = multiplyMatrixByVector(M, data);
  return res;
};

export const dft1 = (data: Complex[]) => {
  const N = data.length;
  const icomp = complex(0, -1);
  const res = [] as Complex[];

  for (let k = 0; k < N; k++) {
    let sumT = complex(0, 0);

    for (let n = 0; n < N; n++) {
      const pow1 = multiply(icomp, (2 * Math.PI * k * n) / N) as Complex;
      let tmp = pow(Math.E, pow1) as Complex;
      let tmpRes = multiply(data[n], tmp) as Complex;
      sumT = sum(sumT, tmpRes);
    }
    // l[i] = multiply(sumT, data[i]) as Complex;
    res[k] = sumT;
  }

  console.log(res);
  return res;
};
