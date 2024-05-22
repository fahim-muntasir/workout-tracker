import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseAuthContext } from "../context/AuthProvider";

function Signin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const { login } = UseAuthContext();

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
      await login({
        email: formData.email,
        password: formData.password,
      });
      navigate("/");
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
    <div className="container-fluid">
      <div
        className="row h-100 align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
          <div className="bg-secondary rounded p-4 p-sm-5 my-4 mx-3">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <Link to={"/signin"} className="">
                <img
                  src={logo}
                  alt="user"
                  style={{ width: "88px", height: "57px" }}
                />
              </Link>
              <h3>Sign In</h3>
            </div>
            <div className="form-floating mb-3">
              <input
                type="email"
                name="email"
                onChange={handler}
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
              />
              <label htmlFor="floatingInput">Email address</label>
              {error?.email && (
                <div className="text-danger">{error?.email}</div>
              )}
            </div>
            <div className="form-floating mb-4">
              <input
                type="password"
                name="password"
                onChange={handler}
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
              />
              <label htmlFor="floatingPassword">Password</label>
              {error?.password && (
                <div className="text-danger">{error?.password}</div>
              )}
            </div>
            {error?.globalError && (
              <div className="alert alert-danger" role="alert">
                {error?.globalError}
              </div>
            )}
            <button
              disabled={loading}
              onClick={submitHandler}
              type="submit"
              className="btn btn-primary py-3 w-100 mb-4"
            >
              Sign In
            </button>
            <p className="text-center mb-0">
              Don't have an Account? <Link to={"/signup"}>Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
