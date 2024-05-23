import Layout from "../components/Layout";
import Chart from "../components/Chart";
import axiosInstance from "../instance/axios";
import { useState, useEffect } from "react";
import { UseAuthContext } from "../context/AuthProvider";

export default function Dashboard() {
  const [workouts, setWorkouts] = useState([]);
  const [totalEsercises, setTotalEsercises] = useState([]);
  const [totalWorkouts, setTotalWorkouts] = useState([]);
  const { user } = UseAuthContext();

  const populateWorkouts = async () => {
    try {
      const { data: response } = await axiosInstance.get(
        "/users/workouts/" + user.id
      );

      setWorkouts(response.data);
      setTotalWorkouts(response?.pagination?.totalItems);
    } catch (error) {
      console.log(error);
    }
  };

  const populateExercises = async () => {
    try {
      const { data: response } = await axiosInstance.get("/exercises");

      setTotalEsercises(response?.pagination?.totalItems);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    populateWorkouts();
    populateExercises();
  }, []);

  // formate date
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const totalWorkoutsTime = workouts.reduce((accu, curr) => {
    return accu + curr?.duration;
  }, 0);

  // current date
  const today = formatDate(new Date());

  const todayWorkout = workouts.filter((item) => {
    // Extract the date part from the workout_date
    const workoutDate = formatDate(new Date(item?.workout_date));
    return workoutDate === today;
  });
  
  const todayWorkoutTime = todayWorkout.reduce((accu, curr) => {
    return accu + curr?.duration;
  }, 0)

  return (
    <Layout>
      <div className="container-fluid pt-4 px-4">
        <div className="row g-4">
          <div className="col-sm-6 col-xl-3">
            <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
              <i className="fa fa-chart-line fa-3x text-primary"></i>
              <div className="ms-3">
                <p className="mb-2">Total Time</p>
                <h6 className="mb-0">{totalWorkoutsTime}m</h6>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-xl-3">
            <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
              <i className="fa fa-chart-bar fa-3x text-primary"></i>
              <div className="ms-3">
                <p className="mb-2">Exercise</p>
                <h6 className="mb-0">{totalEsercises}</h6>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-xl-3">
            <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
              <i className="fa fa-chart-area fa-3x text-primary"></i>
              <div className="ms-3">
                <p className="mb-2">Today</p>
                <h6 className="mb-0">{todayWorkoutTime}m</h6>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-xl-3">
            <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
              <i className="fa fa-chart-pie fa-3x text-primary"></i>
              <div className="ms-3">
                <p className="mb-2">Workouts</p>
                <h6 className="mb-0">{totalWorkouts}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Chart />
    </Layout>
  );
}
