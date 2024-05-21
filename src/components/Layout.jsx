import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { UseContext } from "../context/Provider";

export default function Layout({children}) {
  const {open} = UseContext();

  return (
    <div className="container-fluid position-relative d-flex p-0">
      <Sidebar />
      <div className={`content ${open && "open"}`}>
        <Navbar />

        {children}
      </div>
    </div>
  );
}
