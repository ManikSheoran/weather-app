import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartAnnotation from "chartjs-plugin-annotation";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartAnnotation
);

const SunriseSunset = ({ sunrise, sunset }) => {
  const parseTimeToHours = (time) => {
    const [hours, minutes, seconds] = time.split(":").map(Number);
    return hours + minutes / 60 + seconds / 3600;
  };

  const sunriseHour = parseTimeToHours(sunrise);
  const sunsetHour = parseTimeToHours(sunset);

  const hours = [
    0,
    sunriseHour,
    (sunriseHour + sunsetHour) / 2,
    sunsetHour,
    24,
  ];

  const higher = Math.max(sunriseHour, sunsetHour);
  const lower = Math.min(sunriseHour, sunsetHour);

  const graphColor = "rgba(250, 64, 50, 0.8)";
  const sunriseSunsetColor = "#fab12f";

  const unifiedData = hours.map((hour) =>
    hour > lower && hour < higher
      ? 0.5
      : hour === sunriseHour || hour === sunsetHour
      ? 0
      : -0.25
  );

  const currentTime = new Date();
  const currentHour = currentTime.getHours() + currentTime.getMinutes() / 60;

  const data = {
    labels: hours.map((h) => sunrise),
    datasets: [
      {
        label: "Sunlight & Night",
        data: unifiedData,
        borderColor: graphColor,
        backgroundColor: "transparent",
        fill: true,
        tension: 0.4,
        pointRadius: 0,
      },
      {
        label: "Sunrise",
        data: [null, 0, null, null, null],
        borderColor: sunriseSunsetColor,
        backgroundColor: sunriseSunsetColor,
        pointRadius: 8,
        pointStyle: "circle",
        fill: false,
        showLine: false,
      },
      {
        label: "Sunset",
        data: [null, null, null, 0, null],
        borderColor: sunriseSunsetColor,
        backgroundColor: sunriseSunsetColor,
        pointRadius: 8,
        pointStyle: "circle",
        fill: false,
        showLine: false,
      },
      {
        label: "Current Time",
        data: Array(24)
          .fill(null)
          .map((_, index) => (index === Math.floor(currentHour) ? 1 : null)),
        backgroundColor: "red",
        borderColor: "red",
        pointRadius: 6,
        pointStyle: "circle",
        fill: false,
        showLine: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      annotation: {
        annotations: [
          {
            type: "line",
            scaleID: "y",
            value: 0,
            borderColor: "black",
            borderWidth: 2,
            label: {
              display: false,
            },
          },
        ],
      },
    },
    scales: {
      x: {
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
      y: {
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
    },
    elements: {
      line: {
        borderWidth: 2,
      },
    },
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <div
            className="chart-container"
            style={{ maxWidth: "100%", margin: "0 auto" }}
          >
            <Line data={data} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SunriseSunset;
