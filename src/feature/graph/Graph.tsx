import React from 'react';
import { useSelector } from 'react-redux';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Line } from 'react-chartjs-2';
import { RootState } from '../../../app/Store';

const Graph: React.FC = () => {
  const forecastData = useSelector((state: RootState) => state.forecast.forecastData);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
  );

  if (forecastData) {
    const temperatures = forecastData.list
      .filter((_, index) => index % 2 !== 0)
      .map(item => item.main.temp);

    const dates = forecastData.list
      .filter((_, index) => index % 2 !== 0)
      .map(item => item.dt_txt);

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        title: {
          display: true,
          text: 'Temperature forecast',
        },
        datalabels: {
          anchor: 'end' as const,
          align: 'top' as const,
          color: 'black',
          font: {
            weight: 'bold' as const,
          },
          formatter: (value: number) => value + '°C',
        },
      },
      scales: {
        x: {
          beginAtZero: false,
          title: {
            display: true,
            text: 'Date and Time',
          },
        },
        y: {
          beginAtZero: false,
          title: {
            display: true,
            text: 'Temperature (°C)',
          },
        },
      },
    };

    const data = {
      labels: dates,
      datasets: [
        {
          label: 'Temperature',
          data: temperatures,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    };

    return <Line options={options} data={data} />;
  }

  return null;
};

export default Graph
