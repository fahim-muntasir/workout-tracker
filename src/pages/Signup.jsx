import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Signup() {
  return (
    <div className="container-fluid">
      <div
        className="row h-100 align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
          <div className="bg-secondary rounded p-4 p-sm-5 my-4 mx-3">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <Link to={"/signup"} className="">
                <img
                  src={logo}
                  alt="user"
                  style={{ width: "88px", height: "57px" }}
                />
              </Link>
              <h3>Sign Up</h3>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingText"
                placeholder="jhondoe"
              />
              <label htmlFor="floatingText">Username</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating mb-4">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <div className="d-flex align-items-center justify-content-between mb-4">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  Check me out
                </label>
              </div>
              <a href="">Forgot Password</a>
            </div>
            <button type="submit" className="btn btn-primary py-3 w-100 mb-4">
              Sign Up
            </button>
            <p className="text-center mb-0">
              Already have an Account? <Link to={"/signin"}>Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
