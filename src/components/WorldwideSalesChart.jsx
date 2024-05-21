// src/components/WorldwideSalesChart.js
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const WorldwideSalesChart = () => {
  const data = {
    labels: ["2016", "2017", "2018", "2019", "2020", "2021", "2022"],
    datasets: [
      {
        label: "USA",
        data: [15, 30, 55, 65, 60, 80, 95],
        backgroundColor: "rgba(235, 22, 22, .7)"
      },
      {
        label: "UK",
        data: [8, 35, 40, 60, 70, 55, 75],
        backgroundColor: "rgba(235, 22, 22, .5)"
      },
      {
        label: "AU",
        data: [12, 25, 45, 55, 65, 70, 60],
        backgroundColor: "rgba(235, 22, 22, .3)"
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Worldwide Sales'
      }
    }
  };

  return <Bar data={data} options={options} />;
};

export default WorldwideSalesChart;
