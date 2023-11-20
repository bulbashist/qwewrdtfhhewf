import { Complex, complex } from "mathjs";
import { GraphData } from "./types";

export const transform = (data: Complex[]) => {
  const N = data.length;

  // fft => * 2/N => sqrt(Ar^2 + Ai^2) => amplitude
  // angle from point to Xaxis => phase

  let res = data.map((val, i) => {
    let real1 = (val.re * 2) / N;
    let im1 = (val.im * 2) / N;

    const temp = Math.sqrt(Math.pow(real1, 2) + Math.pow(im1, 2));
    const freq = i;
    const ampl = temp > 0.001 ? temp : 0;
    const phase = ampl > 0.001 ? Math.atan2(real1, -im1) : 0;
    if (phase !== 0) console.log(i, im1, real1);

    return {
      ampl,
      freq,
      phase,
    } as GraphData;
  });

  return res;
};

export const applyFilters = (
  data: GraphData[],
  lFilter: number,
  hFilter: number
) => {
  const N = data.length;
  const pt1 = data
    .filter((v, i) => i <= N / 2)
    .map((value) => {
      if (value.freq >= lFilter && value.freq <= hFilter) {
        return value;
      } else
        return {
          freq: value.freq,
          ampl: 0,
          phase: 0,
        };
    });
  // .filter((value) => value.freq >= lFilter && value.freq <= hFilter);
  const pt2 = data
    .filter((v, i) => i > N / 2)
    .map((value) => {
      if (value.freq <= N - lFilter && value.freq >= N - hFilter) {
        return value;
      } else
        return {
          freq: value.freq,
          ampl: 0,
          phase: 0,
        };
    });
  // .filter((value) => value.freq <= N - lFilter && value.freq >= N - hFilter);
  return pt1.concat(pt2);
};

export const invTransform = (data: GraphData[]) => {
  const N = data.length;
  const res = [] as number[];

  for (let i = 0; i < N; i++) {
    let sum = data[0].ampl / 2;

    for (let j = 1; j < N / 2 - 1; j++) {
      sum += data[j].ampl * Math.cos((2 * Math.PI * i * j) / N + data[j].phase);
    }
    res[i] = sum;
  }

  // Xi = E   A* cos(2pi*i*j / n- ph)

  return res;
};

export const applyFiltersBefore = (
  data: Complex[],
  lFilter: number,
  hFilter: number
) => {
  const N = data.length;
  const pt1 = data
    .filter((_, i) => i <= N / 2)
    .map((value, i) => {
      if (i < lFilter || i > hFilter) return complex(0, 0);
      else return value;
    });
  const pt2 = data
    .filter((_, i) => i > N / 2)
    .map((value, i) => {
      if (i + N / 2 > N - lFilter || i + N / 2 < N - hFilter)
        return complex(0, 0);
      else return value;
    });
  return pt1.concat(pt2);
};
