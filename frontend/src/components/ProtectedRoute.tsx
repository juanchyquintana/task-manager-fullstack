import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";
import Spinner from "./commons/Spinner";

export default function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth0();
  
  if (isLoading) return <Spinner />;
  
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}
