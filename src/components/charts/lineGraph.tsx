import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  scales,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { plugins } from "chart.js/dist/core";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const LineGraph = () => {
  const data = {
    labels: ["asd", "asd", "asd"],
    datasets: [
      {
        labels: "oaisjdoaijsd",
        data: [1, 23, 32],
        backgroundColor: "aqua",
        borderColor: "black",
        pointBorderColor: "red",
      },
    ],
  };

  const options = {
    plugins: {
      legend: true,
    },
    scales: {
      y: {
        min: 3,
        max: 6,
      },
    },
  };

  return (
    <>
      <Line data={data}></Line>
    </>
  );
};

export default LineGraph;
