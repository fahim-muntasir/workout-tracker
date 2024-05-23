import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../instance/axios";

export default function Exercise() {
  const [exercises, setExercises] = useState([]);

  const getExercises = async () => {
    try {
      const { data: response } = await axiosInstance.get("/exercises");
      setExercises(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getExercises();
  }, []);

  const deleteHandler = async (id) => {
    try {
      await axiosInstance.delete("/exercises/" + id);
      getExercises();
      toast.success("Exercises have been deleted successfully")
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
                <h6>Exercise</h6>
                <Link to={"/exercise/new"}>
                  <button className="btn btn-primary btn-sm">
                    +Add Exercise
                  </button>
                </Link>
              </div>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Exercise Name</th>
                      <th scope="col">Muscle group</th>
                      <th scope="col">Equipment</th>
                      <th scope="col">Difficulty level</th>
                      <th scope="col">Description</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exercises.map((item, index) => (
                      <tr key={item.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{item.exercise_name}</td>
                        <td>{item.muscle_group}</td>
                        <td>{item.equipment}</td>
                        <td>{item.difficulty_level}</td>
                        <td>{item.description}</td>
                        <td>
                          <Link to={`/exercise/${item.id}`}>
                          <button className="btn btn-secondary btn-sm">
                            Edit
                          </button>
                          </Link>
                          <button
                            onClick={() => deleteHandler(item.id)}
                            className="btn btn-primary btn-sm"
                          >
                            Delete
                          </button>
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
