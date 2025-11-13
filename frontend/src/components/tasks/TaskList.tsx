import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useStores } from "../../stores/useStore";
import type { Task } from "../../types";
import { formatDate } from "../../utils";

interface TaskListProps {
  task: Task;
}

export default function TaskList({ task }: TaskListProps) {
  const { taskStore } = useStores();
  const { user } = useAuth0();

  const handleDelete = async (id: string) => {
    try {
      await taskStore.deleteTask(id, user?.sub);
    } catch (error) {
      console.log("Error deleting task", error);
    }
  };

  return (
    <li className="h-full">
      <div className="border border-slate-700 bg-slate-700 rounded-xl p-2 shadow-md hover:bg-slate-800 transition h-full flex flex-col">
        <div className="text-center">
          <p className="text-xl font-bold text-white mb-1">{task.title}</p>

          <hr className="border-slate-600 mb-2" />
        </div>

        <div className="flex flex-col items-center justify-center flex-1 text-center">
          <p className="text-md text-gray-300">{task.description}</p>
        </div>

        <hr className="border-slate-600 mt-2" />

        <div className="mt-3 flex flex-row justify-around ">
          <p className="text-sm text-gray-400">
            Status:{" "}
            <span className="font-bold text-gray-200">
              {task.status.toUpperCase()}
            </span>
          </p>
          <p className="text-sm text-gray-400">
            📅 {formatDate(task.createdAt)}
          </p>
        </div>

        <div className="flex flex-row gap-3 mt-auto pt-4">
          <Link
            className="bg-blue-600 hover:bg-blue-700 transition px-4 py-1 rounded-lg text-white font-medium w-full text-center"
            to={`/app/edit-task/${task._id}`}
          >
            Edit
          </Link>

          <button
            className="bg-red-500 hover:bg-red-700 px-4 py-1 rounded-lg text-white font-medium w-full"
            onClick={() => handleDelete(task._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}
