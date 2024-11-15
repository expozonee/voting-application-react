import "./Chart.css";
import "chart.js/auto";
import { useRef } from "react";
import { Bar } from "react-chartjs-2";

import { useUser } from "../../providers/UserProvider";

export function Chart() {
  const { chartData } = useUser();
  const ref = useRef();

  return (
    <div style={{ width: "100%" }}>
      <Bar
        options={{
          scales: {
            y: {
              beginAtZero: true,
              max: 15,
            },
          },
        }}
        ref={ref}
        data={chartData}
        style={{
          backgroundColor: "white",
          width: "100%",
          borderRadius: "10px",
          marginTop: "1rem",
          padding: "0.5rem",
          height: "auto",
        }}
      />
    </div>
  );
}
