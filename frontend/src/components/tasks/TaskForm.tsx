import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ErrorMessageForm from "../Form/ErrorMessageForm";
import { useStores } from "../../stores/useStore";
import type { TaskFormData } from "../../types";

export default function TaskForm() {
   const { taskStore } = useStores();

  const initialValues: TaskFormData = {
    title: "",
    description: "",
    status: "pending",
  };

  const [dataForm, setDataForm] = useState<TaskFormData>(initialValues);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { id } = useParams();
  const { user } = useAuth0();

  const navigate = useNavigate();
  const isEdit = Boolean(id);

  useEffect(() => {
    const loadTaskById = async () => {
      if (!id) return;

      try {
        const task = await taskStore.getTaskById(id);
        const { title, description, status } = task;

        setDataForm({ title, description, status });
      } catch (error) {
        console.error("Error loading task", error);
        setError("Could not load task data.");
      }
    };

    if (isEdit) {
      loadTaskById();
    }
  }, [id, isEdit, taskStore]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setDataForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!user) {
      setError("You must be logged in to create a Task.");
      return;
    }

    if (!dataForm.title.trim()) {
      setError("Title is required.");
      return;
    }

    if (!dataForm.description.trim()) {
      setError("Description is required.");
      return;
    }

    try {
      setIsSubmitting(true);

      const data = {
        title: dataForm.title.trim(),
        description: dataForm.description.trim(),
        status: dataForm.status,
        userId: user.sub,
      };

      if (isEdit && id) {
        await taskStore.updateTask(id, data, user.sub);
      } else {
        await taskStore.createTask(data, user.sub);
      }

      setDataForm(initialValues);
      navigate(-1);
    } catch (error) {
      console.error("Error creating task", error);
      setError("There was an error creating the task. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="w-full max-w-md bg-slate-800 rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-white mb-4 text-center">
          {isEdit ? "Edit Task" : "Create New Task"}
        </h1>

        {error && (
          <ErrorMessageForm error={error} />
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-slate-600 bg-slate-900 text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="e.g. Finish React test"
              name="title"
              value={dataForm.title}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Description <span className="text-red-400">*</span>
            </label>
            <textarea
              className="w-full rounded-lg border border-slate-600 bg-slate-900 text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none min-h-[90px]"
              placeholder="Add more details about this task..."
              name="description"
              value={dataForm.description}
              onChange={handleChange}
            />
          </div>

          {isEdit && (
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Status
              </label>
              <select
                className="w-full rounded-lg border border-slate-600 bg-slate-900 text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                name="status"
                value={dataForm.status}
                onChange={handleChange}
              >
                <option value="pending">Pending</option>
                <option value="inProgress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              className="w-1/3 bg-slate-600 hover:bg-slate-700 text-white text-sm font-medium px-3 py-2 rounded-lg transition"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-2/3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold px-3 py-2 rounded-lg transition"
            >
              {isEdit
                ? "Update Task"
                : isSubmitting
                ? "Creating..."
                : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
