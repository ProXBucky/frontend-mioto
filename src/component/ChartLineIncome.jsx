// hooks/ChartLineIncome.js
import { useEffect, useState } from 'react';
import { statisticIncome } from '../api/appAPI';
import { useSelector } from 'react-redux';
import { adminTokenSelector } from '../redux/selector';
import { Line } from 'react-chartjs-2';

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

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
const ChartLineIncome = () => {
    const adminToken = useSelector(adminTokenSelector);
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });

    const fetchData = async () => {
        try {
            const response = await statisticIncome(adminToken);
            const { labels, data } = response;
            setChartData({
                labels: labels,
                datasets: [
                    {
                        label: 'Doanh thu / tháng',
                        data: data,
                        fill: false,
                        borderColor: '#5fcf86',
                        tension: 0.2
                    }
                ]
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [adminToken]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Biểu đồ doanh thu hàng tháng',
            },
        },
        scales: {
            x: {
                ticks: {
                    maxRotation: 90,  // Set rotation to 90 degrees
                    minRotation: 90   // Ensure rotation is at least 90 degrees
                },
                grid: {
                    display: false,
                },
                padding: 20,  // Add padding to the x-axis
            },
            y: {
                beginAtZero: true,
            },
        },
        layout: {
            padding: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20
            }
        }
    };


    return (
        <Line data={chartData} options={options} />
    );
};

export default ChartLineIncome;
