import { Task, TasksFilter, TaskTrackerCRUD } from './types';

export class WorkWithLocalStorage implements TaskTrackerCRUD {
  private namespace: string;

  constructor(namespace: string) {
    this.namespace = namespace;
  }

  public async getTasks(taskFilter?: TasksFilter): Promise<Task[]> {
    const tasks = await this.getTasksFromLocalStorage();

    if (!taskFilter) {
      return tasks;
    }

    return tasks.filter((task) => this.taskFilter(task, taskFilter));
  }

  private taskFilter(task: Task, filter: TasksFilter): boolean {
    const tagsToCompare =
      filter.tags?.map((tag) => tag.trim().toLowerCase()) ?? [];

    const dateMatches = !filter.date || task.date === filter.date;
    const statusMatches = !filter.status || task.status === filter.status;
    const tagsMatches =
      tagsToCompare.length === 0 ||
      tagsToCompare.every((filterTag) => task.tags.includes(filterTag));

    return dateMatches && statusMatches && tagsMatches;
  }

  private async getTasksFromLocalStorage(): Promise<Task[]> {
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
      console.error('Something went wrong');
      return false;
    }
  }
}
