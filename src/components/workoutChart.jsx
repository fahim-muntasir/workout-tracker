import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, PointElement, Filler } from 'chart.js';
import axiosInstance from '../instance/axios';
import { UseAuthContext } from '../context/AuthProvider';

ChartJS.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, PointElement, Filler);

const SalesRevenueChart = () => {
  const [allWorkouts, setWorkouts] = useState([]);
  const [last7Days, setLast7Days] = useState([]);
  const [workoutData, setWorkoutData] = useState([]);
  const { user } = UseAuthContext();

  const getWorkouts = async () => {
    try {
      const { data: response } = await axiosInstance.get(`/users/workouts/${user.id}`);
      setWorkouts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getLast7DaysShort = () => {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const options = { day: '2-digit', month: 'short' };
      const formattedDate = date.toLocaleDateString('en-US', options);
      dates.push(formattedDate);
    }

    return dates.reverse(); // Reverse to get the dates in chronological order
  };

  const calculateWorkoutDurations = (workouts) => {
    const durations = Array(7).fill(0);
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateString = date.toISOString().split('T')[0];

      workouts.forEach(workout => {
        if (workout.workout_date.startsWith(dateString)) {
          durations[6 - i] += workout.duration;
        }
      });
    }

    return durations;
  };

  useEffect(() => {
    const fetchData = async () => {
      await getWorkouts();
      setLast7Days(getLast7DaysShort());
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (allWorkouts.length > 0 && last7Days.length > 0) {
      const durations = calculateWorkoutDurations(allWorkouts);
      setWorkoutData(durations);
    }
  }, [allWorkouts, last7Days]);

  const data = {
    labels: last7Days,
    datasets: [
      {
        label: "Workout Duration (minutes)",
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
