'use client';
import { Bar } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
            display: false,
        },
        title: {
            display: false,
            text: 'Quotes',
        },
    },
    scales: {
        y: {
            ticks: {
                stepSize: 1,
            }
        }
    }
};

const BarChart = ({ data, options: passedOptions }) => (
    <Bar data={data} options={passedOptions || options} />
)

export default BarChart;