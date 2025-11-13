import { api } from "../api/api";
import { isAxiosError } from "axios";
import type { Task, TaskFormData } from "../types";
import { authToken } from "./auth.service";

interface GetTasksResponse {
  success: boolean;
  data: Task[];
  message?: string;
}

interface GetTaskResponse {
  success: boolean;
  data: Task;
  message?: string;
}

export const taskService = {
  async createTask(taskData: TaskFormData) {
    try {
      const token = authToken.get();
      if (!token) throw new Error("No token available");

      const response = await api.post<string>("/api/tasks", taskData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.message) {
        throw new Error(error.response?.data.error);
      }

      throw new Error("Error creating task");
    }
  },

  async getAllTasks() {
    try {
      const token = authToken.get();
      if (!token) throw new Error("No token available");

      const response = await api.get<GetTasksResponse>("/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.message) {
        throw new Error(error.response?.data.error);
      }

      throw new Error("Error fetching tasks");
    }
  },

  async getTaskById(taskId: string) {
    try {
      const token = authToken.get();
      if (!token) throw new Error("No token available");

      const response = await api.get<GetTaskResponse>(`/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data.data;
    } catch (error) {
      if (isAxiosError(error) && error.message) {
        throw new Error(error.response?.data.error);
      }

      throw new Error("Error fetching tasks");
    }
  },

  async updateTask(taskId: string, data: TaskFormData) {
    try {
      const token = authToken.get();
      if (!token) throw new Error("No token available");

      const response = await api.put<GetTaskResponse>(
        `/api/tasks/${taskId}`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.message) {
        throw new Error(error.response?.data.error);
      }

      throw new Error("Error fetching tasks");
    }
  },

  async deleteTask(taskId: string) {
    try {
      const token = authToken.get();
      if (!token) throw new Error("No token available");

      await api.delete(`/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      if (isAxiosError(error) && error.message) {
        throw new Error(error.response?.data.error);
      }

      throw new Error("Error fetching tasks");
    }
  },
};
