import { Task, TaskCRUD, TasksFilter } from "./types";

export class workWithLocalStorage implements TaskCRUD {
  private namespace: string;

  constructor(namespace: string) {
    this.namespace = namespace;
  }

  public async getTasks(): Promise<Task[]> {
    const tasks = localStorage.getItem(this.namespace);
    return tasks ? JSON.parse(tasks) : [];
  }

  public async setTask(task: Task): Promise<void> {
    const savedTasks = await this.getTasks();
    const taskIndex = savedTasks.findIndex(
      (savedTask) => savedTask.id === task.id,
    );

    if (taskIndex > -1) {
      savedTasks[taskIndex] = task;
    } else {
      savedTasks.push(task);
    }

    localStorage.setItem(this.namespace, JSON.stringify(savedTasks));
  }

  async deleteTask(taskId: string): Promise<boolean> {
    try {
      let savedTasks = await this.getTasks();
      savedTasks = savedTasks.filter((task) => task.id !== taskId);
      localStorage.setItem(this.namespace, JSON.stringify(savedTasks));
      return true;
    } catch (error) {
      console.error("Something went wrong");
      return false;
    }
  }
}
