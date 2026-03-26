import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getTasks, createTask, updateTask, deleteTask } from "../util/taskUtil";
import { useAuth } from "../features/auth/AuthContext";

export function useTasks() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["tasks", user?.id],
    queryFn: () => getTasks(user?.id),
    enabled: !!user,
  });
}

export function useCreateTask(onDone) {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", user?.id] });
      toast.success("Task created");
      if (onDone) onDone();
    },
    onError: () => toast.error("Failed to create task"),
  });
}

export function useUpdateTask(onDone) {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: updateTask,
    onMutate: async (updatedTask) => {
      await queryClient.cancelQueries({ queryKey: ["tasks", user?.id] });

      const previousTasks = queryClient.getQueryData(["tasks", user?.id]);

      queryClient.setQueryData(["tasks", user?.id], (old) => {
        if (!old) return old;
        return old.map((t) =>
          t.id === updatedTask.id ? { ...t, ...updatedTask } : t,
        );
      });

      return { previousTasks };
    },
    onSuccess: () => {
      if (onDone) onDone();
    },
    onError: (err, variables, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(["tasks", user?.id], context.previousTasks);
      }
      toast.error("Failed to update task");
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", user?.id] });
      toast.success("Task deleted");
    },
    onError: () => toast.error("Failed to delete task"),
  });
}
