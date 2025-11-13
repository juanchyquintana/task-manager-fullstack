import { makeAutoObservable } from "mobx";
import type { Task, TaskFormData } from "../types";
import { taskService } from "../services/task.service";

export class TaskStore {
  /* MobX Observables */
  tasks: Task[] = [];
  isLoading = false;
  error: string | null = null;
  serverMessage = "";

  constructor() {
    makeAutoObservable(this);
  }

  /* MobX Actions */
  async loadTasks(userId?: string) {
    this.isLoading = true;
    this.error = null;

    try {
      const response = await taskService.getAllTasks();
      if (response.message) {
        this.serverMessage = response.message;
      } else {
        this.serverMessage = "";
      }

      const taskResponse = response.data;
      this.tasks = userId
        ? taskResponse.filter((t) => t.userId === userId)
        : taskResponse;
    } catch (error) {
      this.error = "Error fetching tasks";
      console.log(error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  async getTaskById(id: string) {
    this.isLoading = true;
    this.error = null;

    try {
      const task = await taskService.getTaskById(id);
      return task;
    } catch (error) {
      this.error = "Error loading task";
      console.error(error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  async createTask(data: TaskFormData, userId?: string) {
    this.isLoading = true;
    this.error = null;

    try {
      await taskService.createTask(data);
      await this.loadTasks(userId);
    } catch (error) {
      this.error = "Error fetching tasks";
      console.log(error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  async updateTask(id: string, data: TaskFormData, userId?: string) {
    this.isLoading = true;
    this.error = null;

    try {
      await taskService.updateTask(id, data);
      await this.loadTasks(userId);
    } catch (error) {
      this.error = "Error fetching tasks";
      console.log(error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  async deleteTask(id: string, userId?: string) {
    try {
      await taskService.deleteTask(id);
      this.tasks = this.tasks.filter((t) => t._id !== id);

      await this.loadTasks(userId);
    } catch (error) {
      this.error = "Error fetching tasks";
      console.log(error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  get totalTasks() {
    return this.tasks.length;
  }
}

export const taskStore = new TaskStore();
