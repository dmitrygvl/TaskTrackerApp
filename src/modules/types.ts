// const enum TaskStatus {
//   New = "New",
//   InWork = "In work",
//   Done = "Done",
// }

// export type TaskStatus = {
//   status: 'New' | 'In work' | 'Done';
// }

export type Task = {
  id: string;
  text: string;
  date: string;
  status: "New" | "In work" | "Done";
  tags: string[];
};

export type TasksFilter = {
  date?: string;
  status?: "New" | "In work" | "Done";
  tags?: string[];
};

export interface TaskTrackerCRUD {
  getTasks(taskFilter?: TasksFilter): Promise<Task[]>;
  setTask(task: Task): Promise<void>;
  deleteTask(taskId: string): Promise<boolean>;
}
