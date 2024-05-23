import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import axiosInstance from "../instance/axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddWorkout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [exercises, setExercises] = useState([]);
  const [formData, setFormData] = useState({
    workout_date: Date.now(),
    exercise: "",
    sets: "",
    reps: "",
    duration: "",
    weight: "",
    notes: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  const populateExercises = async () => {
    try {
      const { data: response } = await axiosInstance.get("/exercises");
      setExercises(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const populateWorkouts = async () => {
    if (id === "new") {
      return;
    }

    try {
      const { data: response } = await axiosInstance.get("/workouts/" + id);
      console.log(response);
      setFormData({
        id: response.data.id,
        workout_date: new Date(response.data.workout_date)
          .toISOString()
          .split("T")[0],
        exercise: response.data.exercise,
        sets: response.data.sets,
        reps: response.data.reps,
        duration: response.data.duration,
        weight: response.data.weight,
        notes: response.data.notes,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    populateWorkouts();
    populateExercises();
  }, []);

  const handler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError({});
    try {
      if (formData.id) {
        await axiosInstance.patch("/workouts/" + id, formData);
        toast.success("workout have been updated");
      } else {
        await axiosInstance.post("/workouts", formData);
        toast.success("workout have been created successfully");
      }
      navigate("/workouts");
      setLoading(false);
    } catch ({ response }) {
      if (response.status === 400) {
        if (response?.data?.data.length > 0) {
          const generateErrorObj = {};

          response.data?.data?.forEach((err) => {
            generateErrorObj[err.field] = err.message;
          });
          setError(generateErrorObj);
        } else {
          setError({ globalError: response.data?.error });
        }
      }

      if (response.status === 401) {
        setError({ globalError: response.data?.error });
      }
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container-fluid pt-4 px-4">
        <div className="row g-4">
          <div className="col-sm-12 col-xl-6">
            <form onSubmit={submitHandler}>
              <div className="bg-secondary rounded h-100 p-4">
                <h6 className="mb-4">Create new workout</h6>
                <div className="form-floating mb-3">
                  <input
                    type="date"
                    name="workout_date"
                    className="form-control"
                    onChange={handler}
                    value={formData.workout_date}
                  />
                  <label htmlFor="floatingInput">Date</label>
                </div>
                <div className="form-floating mb-3">
                  <select
                    className="form-select"
                    id="floatingSelect"
                    aria-label="Floating label select example"
                    name="exercise"
                    onChange={handler}
                    value={formData.exercise}
                  >
                    <option value="">Select Exericse</option>
                    {exercises.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.exercise_name}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="floatingSelect">Exercise</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="number"
                    className="form-control"
                    id="sets"
                    placeholder="Sets"
                    name="sets"
                    onChange={handler}
                    value={formData.sets}
                  />
                  <label htmlFor="sets">Sets</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="number"
                    className="form-control"
                    id="reps"
                    placeholder="Reps"
                    name="reps"
                    onChange={handler}
                    value={formData.reps}
                  />
                  <label htmlFor="reps">Reps</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="number"
                    className="form-control"
                    id="duration"
                    placeholder="Duration"
                    name="duration"
                    onChange={handler}
                    value={formData.duration}
                  />
                  <label htmlFor="duration">Duration (minutes):</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="number"
                    className="form-control"
                    id="weight"
                    placeholder="Weight"
                    name="weight"
                    onChange={handler}
                    value={formData.weight}
                  />
                  <label htmlFor="weight">Weight (kg):</label>
                </div>
                <div className="form-floating">
                  <textarea
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="nots"
                    style={{ height: "150px" }}
                    name="notes"
                    onChange={handler}
                    value={formData.notes}
                  ></textarea>
                  <label htmlFor="nots">Notes</label>
                </div>
                {error?.globalError && (
                  <div className="alert alert-danger mt-3" role="alert">
                    {error.globalError}
                  </div>
                )}
                <div className="mt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
