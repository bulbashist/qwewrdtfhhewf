import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { Chart } from "chart.js/auto";
import { Complex, complex, fft, ifft } from "mathjs";
import { applyFiltersBefore, transform } from "./services/transform";
import { idft } from "./services/idft";
import { dft } from "./services/dft";

const N = 512;
const xs = [] as number[];
let chart1: Chart;
let chart2: Chart;
let chart3: Chart;
let chart4: Chart;

for (let i = 0; i < N; i++) {
  xs.push(i);
}

const y = (n: number, ampl: number, freq: number, phase: number) =>
  ampl * Math.sin((2 * Math.PI * freq * n) / N + phase);

function App() {
  const mainRef = useRef<HTMLCanvasElement>(null);
  const amplRef = useRef<HTMLCanvasElement>(null);
  const freqRef = useRef<HTMLCanvasElement>(null);
  const restoredRef = useRef<HTMLCanvasElement>(null);

  const [poly, setPoly] = useState(true);

  const [lFilter, setLFilter] = useState(0);
  const [hFilter, setHFilter] = useState(N);

  useEffect(() => {
    chart1?.destroy();
    chart2?.destroy();
    chart3?.destroy();
    chart4?.destroy();

    const ys = poly
      ? xs.map((x) =>
          complex(
            y(x, 2, 1, (-3 * Math.PI) / 4) +
              y(x, 7, 17, (-3 * Math.PI) / 4) +
              y(x, 4, 46, Math.PI) +
              y(x, 13, 92, Math.PI / 4) +
              y(x, 18, 32, 0),
            0
          )
        )
      : xs.map((x) => complex(y(x, 10, 5, Math.PI / 4), 0));

    const ctx1 = mainRef.current?.getContext("2d")!;
    chart1 = new Chart(ctx1, {
      type: "bar",
      data: {
        labels: xs,
        datasets: [{ data: ys.map((val) => val.re) }],
      },
    });

    const res = fft(ys); // or dft
    const res2 = applyFiltersBefore(res, lFilter, hFilter);
    const res3 = transform(res2);

    const ctx2 = amplRef.current?.getContext("2d")!;
    chart2 = new Chart(ctx2, {
      type: "bar",
      data: {
        labels: res2.map((val, i) => i),
        datasets: [{ data: res3.map((val) => val.ampl) }],
      },
    });

    const ctx3 = freqRef.current?.getContext("2d")!;
    chart3 = new Chart(ctx3, {
      type: "bar",
      data: {
        labels: res2.map((val, i) => i),
        datasets: [{ data: res3.map((val) => val.phase) }],
      },
    });

    const res4 = ifft(res2); // or idft

    const ctx4 = restoredRef.current?.getContext("2d")!;
    chart4 = new Chart(ctx4, {
      type: "bar",
      data: {
        labels: xs,
        datasets: [{ data: res4.map((val) => val.re) }],
      },
    });
  }, [lFilter, hFilter, poly]);

  return (
    <div className="App">
      <button onClick={() => setPoly(false)}>Гармонический</button>
      <button onClick={() => setPoly(true)}>Полигармонический</button>
      <input
        type="number"
        defaultValue={lFilter}
        onKeyDown={(e) => {
          //@ts-ignore
          if (e.key === "Enter") setLFilter(e.target.value);
        }}
      />
      <input
        type="number"
        defaultValue={hFilter}
        onKeyDown={(e) => {
          //@ts-ignore
          if (e.key === "Enter") setHFilter(e.target.value);
        }}
      />
      <canvas ref={mainRef} />
      <canvas ref={amplRef} />
      <canvas ref={freqRef} />
      <canvas ref={restoredRef} />
    </div>
  );
}

export default App;
