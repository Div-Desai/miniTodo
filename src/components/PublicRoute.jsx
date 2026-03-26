import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext";

export default function PublicRoute() {
  const { user } = useAuth();

  if (user) return <Navigate to="/dashboard" replace />;

  return <Outlet />;
}
