import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../instance/axios";
import { toast } from "react-toastify";
import { UseAuthContext } from "../context/AuthProvider";

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const { user } = UseAuthContext();

  const getWorkouts = async () => {
    try {
      const { data: response } = await axiosInstance.get(
        "/users/workouts/" + user.id
      );

      setWorkouts(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWorkouts();
  }, []);

  const deleteHandler = async (id) => {
    try {
      await axiosInstance.delete("/workouts/" + id);
      getWorkouts();
      toast.success("Workout have been deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container-fluid pt-4 px-4">
        <div className="row g-4">
          <div className="col-12">
            <div className="bg-secondary rounded h-100 p-4">
              <div className="mb-4 d-flex justify-content-between ">
                <h6>Your Workouts</h6>
                <Link to={"/workouts/new"}>
                  <button className="btn btn-primary btn-sm">
                    +Add Workout
                  </button>
                </Link>
              </div>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Workout_Date</th>
                      <th scope="col">Exercise_Name</th>
                      <th scope="col">Difficulty_Level</th>
                      <th scope="col">Equipment</th>
                      <th scope="col">Muscle_group</th>
                      <th scope="col">Duration</th>
                      <th scope="col">Sets</th>
                      <th scope="col">Reps</th>
                      <th scope="col">Weight</th>
                      <th scope="col">Notes</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {workouts.map((item, index) => (
                      <tr key={item.id}>
                        <th scope="row">{index + 1}</th>
                        <td>
                          {new Date(item.workout_date).toLocaleDateString()}
                        </td>
                        <td>{item.exercise.exercise_name}</td>
                        <td>{item.exercise.difficulty_level}</td>
                        <td>{item.exercise.equipment}</td>
                        <td>{item.exercise.muscle_group}</td>
                        <td>{item.duration}</td>
                        <td>{item.sets}</td>
                        <td>{item.reps}</td>
                        <td>{item.weight}</td>
                        <td>{item.notes}</td>
                        <td>
                          <div className="row">
                            <div className="col-6">
                              <Link to={`/workouts/${item.id}`}>
                                <button className="btn btn-secondary btn-sm">
                                  Edit
                                </button>
                              </Link>
                            </div>
                            <div className="col-6">
                              <button
                                onClick={() => deleteHandler(item.id)}
                                className="btn btn-primary btn-sm"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
