import { useAuth0 } from "@auth0/auth0-react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import MainPage from "./views/MainPage";
import Spinner from "./components/commons/Spinner";
import ErrorMessage from "./components/commons/ErrorMessage";
import AppLayout from "./layout/AppLayout";
import DashboardTask from "./views/DashboardPage";
import ErrorPage from "./views/ErrorPage";
import { useInitAuthToken } from './hooks/useInitAuthToken';
import TaskForm from "./components/tasks/TaskForm";

function App() {
  const { isLoading, error } = useAuth0();

  useInitAuthToken();

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorMessage />;
  }

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<DashboardTask />} />
          <Route path="create-task" element={<TaskForm />} />
          <Route path="edit-task/:id" element={<TaskForm />} />
        </Route>
      </Route>

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
