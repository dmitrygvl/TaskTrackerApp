const enum TaskStatus {
  New = "New",
  InWork = "In work",
  Done = "Done",
}

export interface Task {
  id: string;
  text: string;
  date: string;
  status: TaskStatus;
  tags: string[];
}

export interface TasksFilter {
  date?: string;
  status?: TaskStatus;
  tags?: string[];
}

export interface TaskTrackerCRUD {
  getTasks(taskFilter?: TasksFilter): Promise<Task[]>;
  setTask(task: Task): Promise<void>;
  deleteTask(taskId: string): Promise<boolean>;
}
