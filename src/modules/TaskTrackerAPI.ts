import { TaskTrackerCRUD, Task, TasksFilter } from './types';

export class TaskTrackerAPI {
  private localTaskTracker: TaskTrackerCRUD;

  constructor(localTaskTracker: TaskTrackerCRUD) {
    this.localTaskTracker = localTaskTracker;
  }

  async getTaskById(taskId: string): Promise<Task | null> {
    const tasks = await this.localTaskTracker.getTasks();
    return tasks.find((task) => task.id === taskId) || null;
  }

  async deleteTask(taskId: string): Promise<boolean> {
    const success = await this.localTaskTracker.deleteTask(taskId);
    if (success) {
      const task = await this.getTaskById(taskId);
    }
    return success;
  }

  async getSavedTasks(): Promise<Task[]> {
    const savedTasks = await this.localTaskTracker.getTasks();
    return [...savedTasks];
  }

  async saveTask(task: Task): Promise<void> {
    if (task.text === '') {
      return;
    }
    await this.localTaskTracker.setTask(task);
  }

  public taskFilter(task: Task, filter: TasksFilter): boolean {
    const tagsToCompare =
      filter.tags?.map((tag) => tag.trim().toLowerCase()) ?? [];

    const dateMatches = !filter.date || task.date === filter.date;
    const statusMatches = !filter.status || task.status === filter.status;
    const tagsMatches =
      tagsToCompare.length === 0 ||
      tagsToCompare.some((filterTag) =>
        task.tags.some((taskTag) => taskTag.toLowerCase().includes(filterTag)),
      );

    return dateMatches && statusMatches && tagsMatches;
  }

  public generateTaskId() {
    const currentDate = new Date();
    const randomPart = Math.random().toString(36).substring(2, 15);
    const timestampPart = currentDate.getTime().toString(36);

    return `${timestampPart}-${randomPart}`;
  }
}
