export type Task = {
  id: string;
  text: string;
  date: string;
  status: 'New' | 'In progress' | 'Done';
  tags: string[];
};

export type TasksFilter = {
  date?: string;
  status?: 'New' | 'In progress' | 'Done';
  tags?: string[];
};

export interface TaskTrackerCRUD {
  getTasks(taskFilter?: TasksFilter): Promise<Task[]>;
  setTask(task: Task): Promise<void>;
  deleteTask(taskId: string): Promise<boolean>;
}
