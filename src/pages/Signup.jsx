import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const apiUrl = import.meta.env.VITE_API_URL_V1;
  const navigate = useNavigate();

  const handler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async () => {
    setLoading(true);
    setError({});
    try {
      await axios.post(apiUrl + "/users", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      navigate("/signin");
      setLoading(false);
    } catch ({ response }) {
      console.log(response);
      console.log("err");
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
      setLoading(false);
    }
  };

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
                name="name"
                className="form-control"
                placeholder="name"
                onChange={handler}
                value={formData.name}
                required
              />
              <label htmlFor="name">Name</label>
              {error?.name && <div className="text-danger">{error?.name}</div>}
            </div>
            <div className="form-floating mb-3">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="email@email.com"
                onChange={handler}
                value={formData.email}
                required
              />
              <label htmlFor="email">Email address</label>
              {error?.email && (
                <div className="text-danger">{error?.email}</div>
              )}
            </div>
            <div className="form-floating mb-4">
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="password"
                onChange={handler}
                value={formData.password}
                required
              />
              <label htmlFor="password">Password</label>
              {error?.password && (
                <div className="text-danger">{error?.password}</div>
              )}
            </div>
            {error?.globalError && (
              <div className="alert alert-danger" role="alert">
                {error.globalError}
              </div>
            )}
            <button
              disabled={loading}
              onClick={submitHandler}
              type="submit"
              className="btn btn-primary py-3 w-100 mb-4"
            >
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
