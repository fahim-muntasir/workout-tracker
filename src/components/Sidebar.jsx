import logo from "../assets/logo.png";
import { UseContext } from "../context/Provider";

export default function Sidebar() {
  const {open} = UseContext();

  return (
    <div className={`sidebar pe-4 pb-3 ${open && "open"}`}>
        <nav className="navbar bg-secondary navbar-dark">
          <a href="index.html" className="navbar-brand mx-4 mb-3">
            <img
              src={logo}
              alt="user"
              style={{ width: "120px", height: "57px" }}
            />
          </a>

          <div className="navbar-nav w-100">
            <a href="index.html" className="nav-item nav-link active">
              <i className="fa fa-tachometer-alt me-2"></i>Dashboard
            </a>
            <a href="widget.html" className="nav-item nav-link">
              <i className="fa fa-th me-2"></i>Workouts
            </a>
            <a href="form.html" className="nav-item nav-link">
              <i className="fa fa-keyboard me-2"></i>Exercise
            </a>
          </div>
        </nav>
      </div>
  );
}
