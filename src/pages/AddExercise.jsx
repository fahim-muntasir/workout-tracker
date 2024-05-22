import Layout from "../components/Layout";

export default function AddExercise() {
  return (
    <Layout>
      <div className="container-fluid pt-4 px-4">
        <div className="row g-4">
          <div className="col-sm-12 col-xl-6">
            <div className="bg-secondary rounded h-100 p-4">
              <h6 className="mb-4">Create new exercise</h6>
              <div className="form-floating mb-3">
                <input
                  type="exerciseName"
                  className="form-control"
                  id="exerciseName"
                  placeholder="Exercise name"
                />
                <label htmlFor="exerciseName">Exercise name</label>
              </div>
              <div className="form-floating mb-3">
                <select
                  className="form-select"
                  id="Muscle Groups"
                  aria-label="Floating label select example"
                >
                  <option value="chest">Chest</option>
                  <option value="back">Back</option>
                  <option value="legs">Legs</option>
                  <option value="arms">Arms</option>
                  <option value="shoulders">Shoulders</option>
                  <option value="core">Core</option>
                </select>
                <label htmlFor="floatingSelect">Muscle Groups</label>
              </div>

              <div className="form-floating mb-3">
                <select
                  className="form-select"
                  id="equipment"
                  aria-label="Floating label select example"
                >
                  <option value="none">None</option>
                  <option value="dumbbells">Dumbbells</option>
                  <option value="barbells">Barbells</option>
                  <option value="resistanceBands">Resistance Bands</option>
                  <option value="machines">Machines</option>
                </select>
                <label htmlFor="equipment">Equipment</label>
              </div>

              <div className="form-floating mb-3">
                <select
                  className="form-select"
                  id="difficultyLevel"
                  aria-label="Floating label select example"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
                <label htmlFor="difficultyLevel">Difficulty Level</label>
              </div>

              <div className="form-floating">
                <textarea
                  className="form-control"
                  placeholder="Description"
                  id="Description"
                  style={{ height: "150px" }}
                ></textarea>
                <label htmlFor="Description">Description</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
