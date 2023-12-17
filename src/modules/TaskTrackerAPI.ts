import { TaskTrackerCRUD, Task, TasksFilter } from "./types";

export class TaskTracker {
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

  public taskFilter(task: Task, filter: TasksFilter): boolean {
    const tagsFilter =
      filter.tags?.map((tag) => tag.trim().toLowerCase()) ?? [];
    const dateFilter = !filter.date || task.date === filter.date;
    const statusFilter = !filter.status || task.status === filter.status;

    return tagsFilter && dateFilter && statusFilter;
  }

  public generateTaskId() {
    const currentDate = new Date();
    const randomPart = Math.random().toString(36).substring(2, 15);
    const timestampPart = currentDate.getTime().toString(36);

    return `${timestampPart}-${randomPart}`;
  }
}
