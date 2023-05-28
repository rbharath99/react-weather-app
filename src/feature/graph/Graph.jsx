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
import { useSelector } from 'react-redux'

function Graph() {

    const forecastData = useSelector((state) => state.forecast.forecastData);

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

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
        },
    };

    let y = []
    let x = []
    if (forecastData) {
        for (let i = 0; i < forecastData.list.length; i++) {
            y.push(forecastData.list[i].main.temp)
            x.push(forecastData.list[i].dt_txt)
        }
    }

    const data = {
        labels: x,
        datasets: [
            {
                label: '6-hour temperature forecast',
                data: y,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ]
    }

    return (
        <Line options={options} data={data} />
    );
}

export default Graph;