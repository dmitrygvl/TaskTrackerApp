// import { SyncManager } from '../src/task';

// // Мок-класс для замены DualStorageTask в тестах
// class MockDualStorageTask {
//   async getAllTasks(): Promise<Task[]> {
//     // Mock реализация получения задач из DualStorageTask
//     return [];
//   }

//   // Другие методы, необходимые для тестов
// }

// describe('SyncManager', () => {
//   let syncManager: SyncManager;
//   let mockDualStorageTask: MockDualStorageTask;

//   beforeEach(() => {
//     mockDualStorageTask = new MockDualStorageTask();
//     syncManager = new SyncManager(mockDualStorageTask);
//   });

//   test('should sync tasks to Firebase when online', async () => {
//     // Мок-данные о задачах
//     const tasks: Task[] = [
//       { id: '1', text: 'Task 1', date: new Date(), status: TaskStatus.TODO, tags: ['work'] },
//       { id: '2', text: 'Task 2', date: new Date(), status: TaskStatus.IN_PROGRESS, tags: ['personal'] },
//     ];

//     // Устанавливаем мок для getAllTasks, который возвращает задачи
//     mockDualStorageTask.getAllTasks = jest.fn(() => Promise.resolve(tasks));

//     // Запускаем событие online
//     window.dispatchEvent(new Event('online'));

//     // Ожидаем, что SyncManager попытается сохранить каждую задачу в Firebase
//     for (const task of tasks) {
//       expect(mockDualStorageTask.saveTask).toHaveBeenCalledWith(task);
//     }
//   });

//   // Другие тесты для SyncManager
// });

// describe('SyncManager', () => {
//   let syncManager: SyncManager;
//   let mockDualStorageTask: MockDualStorageTask;

//   beforeEach(() => {
//     mockDualStorageTask = new MockDualStorageTask();
//     syncManager = new SyncManager(mockDualStorageTask);
//   });

//   test('should not sync tasks when offline', async () => {
//     // Запускаем событие offline
//     window.dispatchEvent(new Event('offline'));

//     // Проверяем, что SyncManager не пытается сохранить задачи в Firebase
//     expect(mockDualStorageTask.saveTask).not.toHaveBeenCalled();
//   });

//   test('should handle errors during sync', async () => {
//     // Мок-данные о задачах
//     const tasks: Task[] = [
//       { id: '1', text: 'Task 1', date: new Date(), status: TaskStatus.TODO, tags: ['work'] },
//     ];

//     // Устанавливаем мок для getAllTasks, который возвращает задачи
//     mockDualStorageTask.getAllTasks = jest.fn(() => Promise.resolve(tasks));

//     // Устанавливаем мок для saveTask, который генерирует ошибку
//     mockDualStorageTask.saveTask = jest.fn(() => Promise.reject('Error during saveTask'));

//     // Запускаем событие online
//     window.dispatchEvent(new Event('online'));

//     // Проверяем, что SyncManager обрабатывает ошибку и продолжает синхронизацию с остальными задачами
//     for (const task of tasks) {
//       expect(mockDualStorageTask.saveTask).toHaveBeenCalledWith(task);
//     }
//   });

//   // Другие тесты для Sync
