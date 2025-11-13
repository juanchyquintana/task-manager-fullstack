import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { useStores } from "../stores/useStore";
import { observer } from "mobx-react-lite";
import TaskList from "../components/tasks/TaskList";

const DashboardTask = observer (() => {
  const { taskStore } = useStores();
  const { user } = useAuth0();

  useEffect(() => {
    taskStore.loadTasks(user?.sub)
  }, [user, taskStore]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Your Tasks ({taskStore.totalTasks})
        </h1>

        <Link
          className="bg-emerald-600 hover:bg-emerald-700 transition text-white px-4 py-2 rounded-lg shadow-sm font-bold uppercase"
          to={"/app/create-task"}
        >
          + Create
        </Link>
      </div>

      {taskStore.tasks.length === 0 && (
        <p className="text-gray-400 bg-slate-800 p-4 rounded-lg text-center">
          {taskStore.serverMessage || "No tasks yet for this user. Create one to test."}
        </p>
      )}

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
        {taskStore.tasks.map((task) => (
          <TaskList key={task._id} task={task}  />
        ))}
      </ul>
    </div>
  );
})

export default DashboardTask;
