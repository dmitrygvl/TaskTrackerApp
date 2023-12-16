// import { DualStorageTask } from '../src/task';
// import { Task, TaskStatus } from '../src/task/index';

// // Мок-класс для замены FirebaseTask в тестах
// class MockFirebaseTask {
//   async saveTask(task: Task): Promise<void> {
//     // Mock реализация сохранения в Firebase
//   }

//   // Другие методы, необходимые для тестов
// }

// describe('DualStorageTask', () => {
//   let dualStorageTask: DualStorageTask;
//   let mockLocalStorage: LocalStorageTask;
//   let mockFirebase: MockFirebaseTask;

//   beforeEach(() => {
//     mockLocalStorage = new LocalStorageTask();
//     mockFirebase = new MockFirebaseTask();
//     dualStorageTask = new DualStorageTask(mockLocalStorage, mockFirebase);
//   });

//   test('should save a task in both localStorage and Firebase', async () => {
//     const task: Task = {
//       // id: '1',
//       text: 'Sample Task',
//       date: new Date(),
//       status: TaskStatus.TODO,
//       tags: ['work'],
//     };

//     await dualStorageTask.saveTask(task);

//     // Проверяем, что задача сохранена в обоих хранилищах
//     const localStorageTask = await mockLocalStorage.getTask('1');
//     const firebaseTask = await mockFirebase.getTask('1');

//     expect(localStorageTask).toEqual(task);
//     expect(firebaseTask).toEqual(task);
//   });

//   // Другие тесты для методов saveTask, getTask, updateTask, deleteTask и getAllTasks
// });
