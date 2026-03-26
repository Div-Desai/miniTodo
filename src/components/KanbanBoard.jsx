import { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";

const COLUMNS = [
  { id: "todo", label: "Todo" },
  { id: "inprogress", label: "In Progress" },
  { id: "done", label: "Done" },
];

export default function KanbanBoard() {
  const { data: tasks = [], isLoading, isError } = useTasks();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  function handleEdit(task) {
    setEditingTask(task);
    setModalOpen(true);
  }

  function handleAddNew() {
    setEditingTask(null);
    setModalOpen(true);
  }

  if (isLoading)
    return <div className="p-6 text-gray-400">Loading tasks...</div>;
  if (isError)
    return <div className="p-6 text-red-500">Something went wrong.</div>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-800">My Board</h1>
        <button
          onClick={handleAddNew}
          className="bg-teal-500 hover:bg-teal-600 text-white text-sm px-4 py-2 rounded-lg transition-colors"
        >
          + Add Task
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {COLUMNS.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.id);
          return (
            <div key={col.id} className="bg-gray-100 rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  {col.label}
                </h2>
                <span className="text-xs bg-white text-gray-500 px-2 py-0.5 rounded-full">
                  {colTasks.length}
                </span>
              </div>

              <div className="space-y-3">
                {colTasks.map((task) => (
                  <TaskCard key={task.id} task={task} onEdit={handleEdit} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {modalOpen && (
        <TaskModal task={editingTask} onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
}
