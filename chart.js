const chartConfig = {
    type: 'bar',
    options: {
        responsive: true,
        scales: {
            x: {
                beginAtZero: true
            },
            y: {
                beginAtZero: true
            },
            percentage: {
                type: 'linear',
                position: 'right',
                beginAtZero: true,
                ticks: {
                    callback: function (value) {
                        return value + '%';
                    }
                }
            }
        },
        animation: {
            duration: 2000,
            easing: 'easeOutBounce'
        },
        plugins: {
            legend: {
                display: true
            }
        }
    },
    plugins: [
        {
            id: 'dataLabels',
            afterDatasetsDraw: function (chart) {
                const ctx = chart.ctx;

                chart.data.datasets.forEach(function (dataset, datasetIndex) {
                    const meta = chart.getDatasetMeta(datasetIndex);

                    if (dataset.type !== 'line') {
                        meta.data.forEach(function (bar, index) {
                            const value = dataset.data[index];
                            ctx.fillStyle = '#000';
                            ctx.font = 'bold 12px Arial';
                            ctx.textAlign = 'center';
                            ctx.fillText(value, bar.x, bar.y - 5);
                        });
                    }
                });

                chart.data.datasets.forEach(function (dataset, datasetIndex) {
                    if (dataset.type === 'line') {
                        const meta = chart.getDatasetMeta(datasetIndex);
                        meta.data.forEach(function (point, index) {
                            const value = dataset.data[index];
                            ctx.fillStyle = '#d49542';
                            ctx.font = 'bold 12px Arial';
                            ctx.textAlign = 'center';
                            ctx.fillText(value + '%', point.x, point.y - 10);
                        });
                    }
                });
            }
        }
    ]
};

const chartData = {
    labels: ['2018', '2019', '2020', '2021', '2022', '2023'],
    datasets: [
        {
            label: 'إجمالي الموجودات',
            data: [512, 518, 470, 465, 1510, 1810],
            backgroundColor: '#3d7aa2',
            borderWidth: 1,
            order: 2
        },
        {
            label: 'إجمالي المطلوبات',
            data: [941, 1103, 1026, 1036, 1708, 1748],
            backgroundColor: '#0b233c',
            borderWidth: 1,
            order: 1
        },
        {
            label: 'صافي الدين الي نسبة الملكية',
            data: [119, 88, 85, 81, 206, 208],
            type: 'line',
            borderColor: '#d49542',
            backgroundColor: 'rgba(212, 149, 66, 0.2)',
            fill: false,
            yAxisID: 'percentage',
            tension: 0.4,
            pointBackgroundColor: '#d49542',
            borderWidth: 3,
            z: 100000,
            order: 3
        }
    ]
};

chartConfig.data = chartData;

const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, chartConfig);
