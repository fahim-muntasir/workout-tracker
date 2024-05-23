import { useState } from "react";
import logo from "../assets/logo.png";
import { UseContext } from "../context/Provider";
import { UseAuthContext } from "../context/AuthProvider";

export default function Navbar() {
  const { sidebarToggle } = UseContext();
  const {logout} = UseAuthContext();
  const [show, setShow] = useState(false);

  const userSettingMenuToggle = () => {
    setShow((prev) => !prev);
  }

  return (
    <nav className="navbar navbar-expand bg-secondary navbar-dark sticky-top px-4 py-0">
      <a href="index.html" className="navbar-brand d-flex d-lg-none me-4">
        <img src={logo} alt="user" style={{ width: "88px", height: "57px" }} />
      </a>
      <a
        href="#"
        className="sidebar-toggler flex-shrink-0"
        onClick={sidebarToggle}
      >
        <i className="fa fa-bars"></i>
      </a>
      <form className="d-none d-md-flex ms-4">
        <input
          className="form-control bg-dark border-0"
          type="search"
          placeholder="Search"
        />
      </form>
      <div className="navbar-nav align-items-center ms-auto">
        <div className={`nav-item dropdown ${show && "show"}`}>
          <button
            className="btn nav-link dropdown-toggle"
            data-bs-toggle="dropdown"
            onClick={userSettingMenuToggle}
          >
            <img
              className="rounded-circle me-lg-2"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="user"
              style={{ width: "40px", height: "40px" }}
            />
            <span className="d-none d-lg-inline-flex">John Doe</span>
          </button>
          <div className={`dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0 ${show && "show"}`}>
            <a href="#" className="dropdown-item">
              My Profile
            </a>
            <a href="#" className="dropdown-item">
              Settings
            </a>
            <button className="dropdown-item" onClick={logout}>
              Log Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
