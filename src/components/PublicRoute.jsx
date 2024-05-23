import { UseAuthContext } from "../context/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute() {
  const { accessToken, user } = UseAuthContext();

  return !(accessToken && user) ? <Outlet /> : <Navigate to="/dashboard" />;
}
