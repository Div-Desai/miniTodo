import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useTasks, useUpdateTask } from "../hooks/useTasks";
import { useFilters } from "../hooks/useFilter";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";
import SkeletonCard from "./SkeletonCard";

const COLUMNS = [
  { id: "todo", label: "Todo" },
  { id: "inprogress", label: "In Progress" },
  { id: "done", label: "Done" },
];

export default function KanbanBoard() {
  const { data: tasks = [], isLoading, isError } = useTasks();
  const { mutate: updateTask } = useUpdateTask();
  const { search, status, setSearch, setStatus } = useFilters();
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

  function onDragEnd(result) {
    const { draggableId, destination } = result;
    if (!destination) return;

    const task = tasks.find((t) => t.id === draggableId);
    if (!task || task.status === destination.droppableId) return;

    updateTask({ ...task, status: destination.droppableId });
  }

  const filteredTasks = tasks.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = status === "all" || t.status === status;
    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
          <div className="h-9 bg-gray-200 rounded w-24 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((col) => (
            <div
              key={col}
              className="bg-white rounded-xl p-4 shadow-md border border-gray-100"
            >
              <div className="h-4 bg-gray-200 rounded w-24 mb-4 animate-pulse"></div>
              <div className="space-y-3">
                <SkeletonCard />
                <SkeletonCard />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError)
    return <div className="p-6 text-red-500">Something went wrong.</div>;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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

        {/* Search and Filter */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks..."
            className="flex-1 max-w-xs border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="todo">Todo</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {COLUMNS.map((col) => {
            const colTasks = filteredTasks.filter((t) => t.status === col.id);
            return (
              <Droppable droppableId={col.id} key={col.id}>
                {(provided) => (
                  <div
                    className="bg-white rounded-xl p-4 shadow-md border border-gray-100 flex flex-col h-[calc(100vh-220px)]"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                        {col.label}
                      </h2>
                      <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                        {colTasks.length}
                      </span>
                    </div>

                    <div className="space-y-3 overflow-y-auto flex-1 pr-1">
                      {colTasks.map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <TaskCard task={task} onEdit={handleEdit} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>

        {modalOpen && (
          <TaskModal task={editingTask} onClose={() => setModalOpen(false)} />
        )}
      </div>
    </DragDropContext>
  );
}
