import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, Title);

function ChartBarBrand({ data }) {

    const chartData = {
        labels: data.res && data.res.brand && data.res.brand,
        datasets: [
            {
                label: 'Xe đăng ký',
                data: data.res && data.res.count && data.res.count,
                backgroundColor: '#3b82f6', // Màu của cột đăng ký
                borderColor: '#3b82f6',
                borderWidth: 1,
                barPercentage: 0.6, // Độ rộng của cột
                color: "black"
            },
            {
                label: 'Lượt thuê',
                data: data.res1 && data.res1.countRent && data.res1.countRent,
                backgroundColor: '#ef4444', // Màu của cột thuê
                borderColor: '#ef4444',
                borderWidth: 1,
                barPercentage: 0.6, // Độ rộng của cột
                color: "black"
            },
        ],
    };

    const options = {
        indexAxis: 'x', // Sắp xếp theo trục x
        plugins: {
            datalabels: {
                color: 'white',
                font: {
                    weight: 'bold',
                    size: 13
                },
                formatter: (value, context) => {
                    return value;
                }
            },
            legend: {
                position: 'bottom',
                font: {
                    weight: 'bold',
                    size: 16
                },
            },
        },
        scales: {
            x: {
                stacked: false, // Không xếp chồng các nhóm cột
            },
            y: {
                beginAtZero: true, // Bắt đầu từ 0
                title: {
                    display: true,
                    text: 'Số lượng',
                    font: {
                        weight: 'bold',
                        size: 16
                    },
                },
            },
        },
    };

    return (
        <div style={{ height: '400px', width: '100%' }}>
            <Bar data={chartData} options={options} />
        </div>
    );
};


export default ChartBarBrand;
