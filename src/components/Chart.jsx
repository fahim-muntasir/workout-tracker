import WorkoutChart from './workoutChart';

export default function Chart() {
  return (
    <div className="container-fluid pt-4 px-4">
      <div className="row g-4">
        <div className="col-sm-12 col-xl-7">
          <div className="bg-secondary text-center rounded p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h6 className="mb-0">Your recent workout</h6>
              <a href="">Show All</a>
            </div>
            <WorkoutChart />
          </div>
        </div>
      </div>
    </div>
  );
}
