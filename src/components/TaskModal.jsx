import { useForm } from "react-hook-form";
import { useCreateTask, useUpdateTask } from "../hooks/useTasks";
import { useAuth } from "../features/auth/AuthContext";

const STATUSES = [
  { value: "todo", label: "Todo" },
  { value: "inprogress", label: "In Progress" },
  { value: "done", label: "Done" },
];

export default function TaskModal({ task, onClose }) {
  const { user } = useAuth();
  const { mutate: createTask, isPending: creating } = useCreateTask(onClose);
  const { mutate: updateTask, isPending: updating } = useUpdateTask(onClose);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: task?.title || "",
      description: task?.description || "",
      status: task?.status || "todo",
    },
  });

  function onSubmit(data) {
    if (task) {
      updateTask({ ...task, ...data });
    } else {
      createTask({
        ...data,
        userId: user.id,
        createdAt: new Date().toISOString(),
      });
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-xl w-full max-w-md p-6 shadow-xl">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {task ? "Edit Task" : "New Task"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl leading-none"
          >
            &times;
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(onSubmit)(e);
          }}
          className="space-y-4"
        >
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">
              Title
            </label>
            <input
              type="text"
              placeholder="Task title"
              {...register("title", { required: "Title is required" })}
              className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">
              Description
            </label>
            <textarea
              rows={3}
              placeholder="Optional description"
              {...register("description")}
              className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent resize-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">
              Status
            </label>
            <select
              {...register("status")}
              className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
            >
              {STATUSES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 py-2.5 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={creating || updating}
              className="flex-1 bg-teal-500 hover:bg-teal-600 text-white py-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-60"
            >
              {creating || updating
                ? "Saving..."
                : task
                  ? "Save changes"
                  : "Create task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
