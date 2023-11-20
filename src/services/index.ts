import { Complex, add, complex, fft, multiply, pow, ifft } from "mathjs";
import { multiplyMatrixByVector } from "./mmbv";
import { dft, dft1 } from "./dft";
import { idft } from "./idft";
import { applyFilters, transform } from "./transform";
import { Chart } from "chart.js";

// const ys = xs.map((x) =>
//   complex(y(x, 2, 1, (-3 * Math.PI) / 4) + y(x, 7, 17, (-3 * Math.PI) / 4), 0)
// ) as Complex[];

// const res = dft1(ys);
// const res2 = transform(res);
// const res3 = applyFilters(res2, 10, 20);
