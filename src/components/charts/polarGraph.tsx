import React from "react";
import {
  Chart,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";

Chart.register(RadialLinearScale, ArcElement, Tooltip, Legend);

// Ensure that Chart.js does not throw errors due to missing properties

export const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [2, 3, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.5)",
        "rgba(54, 162, 235, 0.5)",
        "rgba(255, 206, 86, 0.5)",
        "rgba(75, 192, 192, 0.5)",
        "rgba(153, 102, 255, 0.5)",
        "rgba(255, 159, 64, 0.5)",
      ],
      borderWidth: 1,
    },
  ],
};

export function PolarGraph() {
  return (
    <>
      <div className=" w-[100%] h-auto px-10">
        <PolarArea
          data={data}
          options={{
            responsive: true,
            scales: {
              r: {
                beginAtZero: true,
                suggestedMin: 0,
                suggestedMax: 5,
                ticks: {
                  color: "black",
                  stepSize: 1,
                },
                grid: {
                  color: "#271933",
                },
              },
            },
            plugins: {
              legend: {
                display: true,
                labels: {
                  color: "white",
                },
              },
            },
          }}
        />
      </div>
    </>
  );
}
