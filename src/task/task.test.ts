// import { LocalStorageTask, Task, TaskStatus } from '../src/task';

// describe('LocalStorageTask', () => {
//   let localStorageTask: LocalStorageTask;

//   beforeEach(() => {
//     localStorageTask = new LocalStorageTask();
//   });

//   test('should save and retrieve a task', async () => {
//     const task: Task = {
//       id: '1',
//       text: 'Sample Task',
//       date: new Date(),
//       status: TaskStatus.TODO,
//       tags: ['work'],
//     };

//     await localStorageTask.saveTask(task);

//     const retrievedTask = await localStorageTask.getTask('1');
//     expect(retrievedTask).toEqual(task);
//   });

//   test('should update a task', async () => {
//     const task: Task = {
//       id: '1',
//       text: 'Sample Task',
//       date: new Date(),
//       status: TaskStatus.TODO,
//       tags: ['work'],
//     };

//     await localStorageTask.saveTask(task);

//     const updatedTask: Task = {
//       ...task,
//       text: 'Updated Task',
//       status: TaskStatus.DONE,
//     };

//     await localStorageTask.updateTask('1', updatedTask);

//     const retrievedTask = await localStorageTask.getTask('1');
//     expect(retrievedTask).toEqual(updatedTask);
//   });

//   test('should delete a task', async () => {
//     const task: Task = {
//       id: '1',
//       text: 'Sample Task',
//       date: new Date(),
//       status: TaskStatus.TODO,
//       tags: ['work'],
//     };

//     await localStorageTask.saveTask(task);
//     await localStorageTask.deleteTask('1');

//     const retrievedTask = await localStorageTask.getTask('1');
//     expect(retrievedTask).toBeNull();
//   });

//   test('should get all tasks', async () => {
//     const tasks: Task[] = [
//       { id: '1', text: 'Task 1', date: new Date(), status: TaskStatus.TODO, tags: ['work'] },
//       { id: '2', text: 'Task 2', date: new Date(), status: TaskStatus.IN_PROGRESS, tags: ['personal'] },
//     ];

//     for (const task of tasks) {
//       await localStorageTask.saveTask(task);
//     }

//     const allTasks = await localStorageTask.getAllTasks();
//     expect(allTasks).toEqual(tasks);
//   });
// });
