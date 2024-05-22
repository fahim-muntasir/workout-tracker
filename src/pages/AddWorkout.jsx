import Layout from "../components/Layout";

export default function AddWorkout() {
  return (
    <Layout>
      <div className="container-fluid pt-4 px-4">
        <div className="row g-4">
          <div className="col-sm-12 col-xl-6">
            <div className="bg-secondary rounded h-100 p-4">
              <h6 className="mb-4">Create new workout</h6>
              <div className="form-floating mb-3">
                <input type="date" name="date" className="form-control" />
                <label htmlFor="floatingInput">Date</label>
              </div>
              <div className="form-floating mb-3">
                <select
                  className="form-select"
                  id="floatingSelect"
                  aria-label="Floating label select example"
                >
                  <option selected>Select Exericse</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
                <label htmlFor="floatingSelect">Exercise</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="number"
                  className="form-control"
                  id="sets"
                  placeholder="Sets"
                />
                <label htmlFor="sets">Sets</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="number"
                  className="form-control"
                  id="reps"
                  placeholder="Reps"
                />
                <label htmlFor="reps">Reps</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="number"
                  className="form-control"
                  id="duration"
                  placeholder="Duration"
                />
                <label htmlFor="duration">Duration (minutes):</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="number"
                  className="form-control"
                  id="weight"
                  placeholder="Weight"
                />
                <label htmlFor="weight">Weight (kg):</label>
              </div>
              <div className="form-floating">
                <textarea
                  className="form-control"
                  placeholder="Leave a comment here"
                  id="nots"
                  style={{ height: "150px" }}
                ></textarea>
                <label htmlFor="nots">Nots</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
