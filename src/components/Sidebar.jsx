import logo from "../assets/logo.png";
import { UseContext } from "../context/Provider";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Sidebar() {
  const { open } = UseContext();
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className={`sidebar pe-4 pb-3 ${open && "open"}`}>
      <nav className="navbar bg-secondary navbar-dark">
        <Link to={"/"} className="navbar-brand mx-4 mb-3">
          <img
            src={logo}
            alt="user"
            style={{ width: "120px", height: "57px" }}
          />
        </Link>

        <div className="navbar-nav w-100">
          <Link
            to={"/"}
            className={`nav-item nav-link ${path === "/" && "active"}`}
          >
            <i className="fa fa-tachometer-alt me-2"></i>Dashboard
          </Link>
          <Link
            to={"/workouts"}
            className={`nav-item nav-link ${
              (path === "/workouts" || path === "/workouts/new") && "active"
            }`}
          >
            <i className="fa fa-th me-2"></i>Workouts
          </Link>
          <Link
            to={"/exercise"}
            className={`nav-item nav-link ${
              (path === "/exercise" || path === "/exercise/new") && "active"
            }`}
          >
            <i className="fa fa-keyboard me-2"></i>Exercise
          </Link>
        </div>
      </nav>
    </div>
  );
}
