import { useState, useEffect } from 'react';
// src/components/SalesRevenueChart.js
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, PointElement, Filler } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, PointElement, Filler);

const SalesRevenueChart = () => {
  const [last7Days, setLast7Days] = useState([]);
  const [workoutData, setWorkoutData] = useState([99, 155, 120, 170, 100, 180, 110]); // Example workout data

  function getLast7DaysShort() {
    const dates = [];
    const today = new Date();
  
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
  
      // Format the date as DD MMM
      const options = { day: '2-digit', month: 'short' };
      const formattedDate = date.toLocaleDateString('en-US', options);
      dates.push(formattedDate);
    }
  
    return dates.reverse(); // Reverse to get the dates in chronological order
  }

  useEffect(() => {
    setLast7Days(getLast7DaysShort());
  }, []);
  
  console.log(getLast7DaysShort());

  const data = {
    labels: last7Days,
    datasets: [
      {
        label: "Workout",
        data: workoutData,
        backgroundColor: "rgba(235, 22, 22, .5)",
        borderColor: "rgba(235, 22, 22, .5)",
        fill: true,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    }
  };

  return <Line data={data} options={options} />;
};

export default SalesRevenueChart;
