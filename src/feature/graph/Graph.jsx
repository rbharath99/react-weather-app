import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import ChartDataLabels from 'chartjs-plugin-datalabels';

function Graph() {

    const forecastData = useSelector((state) => state.forecast.forecastData);

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
        const temperatures = forecastData.list.map(item => item.main.temp);
        const dates = forecastData.list.map(item => item.dt_txt);

        const options = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Temperature forecast',
                },
                datalabels: {
                    anchor: 'end',
                    align: 'top',
                    color: 'black',
                    font: {
                        weight: 'bold',
                    },
                    formatter: (value) => value + '°C',
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
                }
            ]
        }

        return (
            <Line options={options} data={data} />
        );
    }

}

export default Graph;