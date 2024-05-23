import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import axiosInstance from "../instance/axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddExercise() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [formData, setFormData] = useState({
    exercise_name: "",
    muscle_group: "",
    equipment: "",
    difficulty_level: "",
    description: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  const populateExercises = async () => {
    if (id === "new") {
      return;
    }

    try {
      const { data: response } = await axiosInstance.get("/exercises/" + id);
      console.log(response);
      setFormData({
        id: response.data.id,
        exercise_name: response.data.exercise_name,
        muscle_group: response.data.muscle_group,
        equipment: response.data.equipment,
        difficulty_level: response.data.difficulty_level,
        description: response.data.description,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
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
        await axiosInstance.patch("/exercises/" + id, formData);
        toast.success("Exercises have been updated");
      } else {
        await axiosInstance.post("/exercises", formData);
        toast.success("Exercises have been created successfully");
      }
      navigate("/exercise");
      setLoading(false);
    } catch ({ response }) {
      console.log(response);
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
                <h6 className="mb-4">Create new exercise</h6>
                <div className="form-floating mb-3">
                  <input
                    type="exerciseName"
                    className="form-control"
                    id="exerciseName"
                    placeholder="Exercise name"
                    name="exercise_name"
                    onChange={handler}
                    value={formData.exercise_name}
                  />
                  <label htmlFor="exerciseName">Exercise name</label>
                  {error?.exercise_name && (
                    <div className="text-danger">{error?.exercise_name}</div>
                  )}
                </div>
                <div className="form-floating mb-3">
                  <select
                    className="form-select"
                    id="Muscle Groups"
                    aria-label="Floating label select example"
                    name="muscle_group"
                    onChange={handler}
                    value={formData.muscle_group}
                  >
                    <option value="chest">Chest</option>
                    <option value="back">Back</option>
                    <option value="legs">Legs</option>
                    <option value="arms">Arms</option>
                    <option value="shoulders">Shoulders</option>
                    <option value="core">Core</option>
                  </select>
                  <label htmlFor="floatingSelect">Muscle Groups</label>
                  {error?.muscle_group && (
                    <div className="text-danger">{error?.muscle_group}</div>
                  )}
                </div>

                <div className="form-floating mb-3">
                  <select
                    className="form-select"
                    id="equipment"
                    aria-label="Floating label select example"
                    name="equipment"
                    onChange={handler}
                    value={formData.equipment}
                  >
                    <option value="none">None</option>
                    <option value="dumbbells">Dumbbells</option>
                    <option value="barbells">Barbells</option>
                    <option value="resistanceBands">Resistance Bands</option>
                    <option value="machines">Machines</option>
                  </select>
                  <label htmlFor="equipment">Equipment</label>
                  {error?.equipment && (
                    <div className="text-danger">{error?.equipment}</div>
                  )}
                </div>

                <div className="form-floating mb-3">
                  <select
                    className="form-select"
                    id="difficultyLevel"
                    aria-label="Floating label select example"
                    name="difficulty_level"
                    onChange={handler}
                    value={formData.difficulty_level}
                  >
                    <option value="">Select Dificulty level</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                  <label htmlFor="difficultyLevel">Difficulty Level</label>
                  {error?.difficulty_level && (
                    <div className="text-danger">{error?.difficulty_level}</div>
                  )}
                </div>

                <div className="form-floating">
                  <textarea
                    className="form-control"
                    placeholder="Description"
                    id="Description"
                    style={{ height: "150px" }}
                    name="description"
                    onChange={handler}
                    value={formData.description}
                  ></textarea>
                  <label htmlFor="Description">Description</label>
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
