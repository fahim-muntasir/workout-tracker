import { Outlet, Navigate } from "react-router-dom";
import { UseAuthContext } from "../context/AuthProvider";

export default function PrivateRoute() {
  const { accessToken, user } = UseAuthContext();

  return accessToken && user ? <Outlet /> : <Navigate to="/signin" />;
}
