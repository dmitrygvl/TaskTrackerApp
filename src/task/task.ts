// enum TaskStatus {
//   TODO = "TODO",
//   IN_PROGRESS = "IN_PROGRESS",
//   DONE = "DONE",
// }

// interface Task {
//   id: string;
//   text: string;
//   date: Date;
//   status: TaskStatus;
//   tags: string[];
// }

// interface TaskFilter {
//   searchText?: string;
//   startDate?: Date;
//   endDate?: Date;
//   status?: TaskStatus;
//   tags?: string[];
// }

// interface TaskStorage {
//   saveTask(task: Task): Promise<void>;
//   getTask(id: string): Promise<Task | null>;
//   updateTask(id: string, task: Task): Promise<void>;
//   deleteTask(id: string): Promise<void>;
//   getAllTasks(filter?: TaskFilter): Promise<Task[]>;
// }

// class LocalStorageTask implements TaskStorage {
//   async saveTask(task: Task): Promise<void> {
//     // Реализация сохранения задачи в localStorage
//   }

//   async getTask(id: string): Promise<Task | null> {
//     // Реализация чтения задачи из localStorage
//     return null;
//   // }

//   async updateTask(id: string, task: Task): Promise<void> {
//     // Реализация обновления задачи в localStorage
//   }

//   async deleteTask(id: string): Promise<void> {
//     // Реализация удаления задачи из localStorage
//   }

//   async getAllTasks(filter?: TaskFilter): Promise<Task[]> {
//     // Реализация получения всех задач из localStorage с учетом фильтра
//     return [];
//   }
// }

// export { Task, TaskFilter, TaskStorage, LocalStorageTask, TaskStatus };

// // interface Task {
// //   id: string;
// //   text: string;
// //   date: Date;
// //   status: string;
// //   tags: string[];
// // }

// // interface TaskFilter {
// //   searchText?: string;
// //   startDate?: Date;
// //   endDate?: Date;
// //   status?: string;
// //   tags?: string[];
// // }

// // interface TaskStorage {
// //   saveTask(task: Task): Promise<void>;
// //   getTask(id: string): Promise<Task | null>;
// //   updateTask(id: string, task: Task): Promise<void>;
// //   deleteTask(id: string): Promise<void>;
// //   getAllTasks(filter?: TaskFilter): Promise<Task[]>;
// // }

// // class LocalStorageTask implements TaskStorage {
// //   async saveTask(task: Task): Promise<void> {
// //     // Реализация сохранения задачи в localStorage
// //   }

// //   async getTask(id: string): Promise<Task | null> {
// //     // Реализация чтения задачи из localStorage
// //     return null;
// //   }

// //   async updateTask(id: string, task: Task): Promise<void> {
// //     // Реализация обновления задачи в localStorage
// //   }

// //   async deleteTask(id: string): Promise<void> {
// //     // Реализация удаления задачи из localStorage
// //   }

// //   async getAllTasks(filter?: TaskFilter): Promise<Task[]> {
// //     // Реализация получения всех задач из localStorage с учетом фильтра
// //     return [];
// //   }
// // }

// // export { Task, TaskFilter, TaskStorage, LocalStorageTask };
