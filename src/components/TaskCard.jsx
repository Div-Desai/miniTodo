import { memo } from "react";
import { useDeleteTask } from "../hooks/useTasks";

const TaskCard = memo(function TaskCard({ task, onEdit }) {
  const { mutate: deleteTask } = useDeleteTask();

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-100 dark:border-gray-700 group">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-medium text-gray-800 dark:text-gray-100 leading-snug">
          {task.title}
        </p>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
          <button
            onClick={() => onEdit(task)}
            className="text-xs text-gray-400 hover:text-teal-500 px-1"
          >
            Edit
          </button>
          <button
            onClick={() => deleteTask(task.id)}
            className="text-xs text-gray-400 hover:text-red-500 px-1"
          >
            Delete
          </button>
        </div>
      </div>

      {task.description && (
        <p className="text-xs text-gray-400 mt-1.5 leading-relaxed line-clamp-2">
          {task.description}
        </p>
      )}

      <p className="text-xs text-gray-300 dark:text-gray-500 mt-3">
        {new Date(task.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
});

export default TaskCard;
