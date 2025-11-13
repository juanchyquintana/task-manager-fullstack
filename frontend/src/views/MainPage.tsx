import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import Spinner from "../components/commons/Spinner";
import ErrorMessage from "../components/commons/ErrorMessage";
import LoginPage from "./LoginPage";
import { useUserService } from "../services/user.service";
import { useEffect } from "react";

function MainPage() {
  const { isAuthenticated, isLoading, error } = useAuth0();
  const { registerIfNotExists } = useUserService();

useEffect(() => {
  if (!isAuthenticated) return;
  
  registerIfNotExists();
}, [isAuthenticated, registerIfNotExists]);

  if (isLoading) return <Spinner />;

  if (error) return <ErrorMessage />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white px-4">
      {isAuthenticated ? (
        <Navigate to={"/app"} replace />
      ) : (
        <LoginPage />
      )}
    </div>
  );
}

export default MainPage;
