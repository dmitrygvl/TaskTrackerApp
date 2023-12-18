import { WorkWithLocalStorage } from './store';
import { TaskTrackerAPI } from './TaskTrackerAPI';
import { Task, TasksFilter, TaskTrackerCRUD } from './types';
import { renderAppUI } from './renderAppUI';

jest.mock('./TaskTrackerAPI');

describe('Test localStorage work', () => {
  let taskTracker: TaskTrackerAPI;
  let storage: WorkWithLocalStorage;

  beforeEach(() => {
    document.body.innerHTML = `
    <div class="filters">
    <h2>Filters</h2>
      <input type="date" id="filterDate" />
      <select id="filterProgress">
        <option value="new">New</option>
        <option value="in progress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <input
        type="text"
        id="filterTags"
        placeholder="By tags"
      />
      <button class="filters__btn" id="filterTasksBtn">Filter tasks</button>
    </div>
    `;

    taskTracker = {
      getTasks: jest.fn(),
      getAllTasks: jest.fn().mockResolvedValue([]),
      deleteTask: jest.fn(),
    } as unknown as TaskTrackerAPI;

    storage = new WorkWithLocalStorage('testNamespace');
  });

  it('getTasks should return tasks from localStorage', async () => {
    const mockTask = [
      {
        id: '256',
        text: 'Eat pizza',
        date: '2023-01-01',
        status: 'new',
        tags: ['pizza'],
      },
    ];
    localStorage.setItem('testNamespace', JSON.stringify(mockTask));
  });

  it('deleteTask should remove a task from localStorage', async () => {
    const mockTask = [
      {
        id: '256',
        text: 'Eat pizza',
        date: '2023-01-01',
        status: 'new',
        tags: ['pizza'],
      },
    ];

    localStorage.setItem('testNamespace', JSON.stringify(mockTask));

    const isDeleted = await storage.deleteTask('256');
    const storedItem = localStorage.getItem('testNamespace');
    const remainingTasks = storedItem ? JSON.parse(storedItem) : [];

    expect(isDeleted).toBe(true);
    expect(remainingTasks).not.toContain(mockTask);
  });

  it('saveTask should add or update a task in localStorage', async () => {
    const mockTask: Task = {
      id: '328',
      text: 'Buy a hat',
      date: '2024-10-12',
      status: 'New',
      tags: ['shopping'],
    };
    await storage.setTask(mockTask);

    const tasksInStorage = JSON.parse(
      localStorage.getItem('testNamespace') || '[]',
    );
    expect(tasksInStorage).toContainEqual(mockTask);
  });
});

// describe('WorkWithLocalStorage', () => {
//   let workWithLocalStorage: WorkWithLocalStorage;

//   beforeEach(() => {
//     workWithLocalStorage = new WorkWithLocalStorage('tasks');
//     localStorage.clear();
//   });

//   it('fetches all tasks when no filter is provided', async () => {
//     const tasks: Task[] = [
//       // ... задачи для тестирования
//     ];
//     localStorage.setItem('tasks', JSON.stringify(tasks));

//     const fetchedTasks = await workWithLocalStorage.getTasks();

//     expect(fetchedTasks).toEqual(tasks);
//   });

//   it('fetches tasks based on the provided filter', async () => {
//     const tasks: Task[] = [
//       // ... задачи для тестирования
//     ];
//     localStorage.setItem('tasks', JSON.stringify(tasks));

//     const filter: TasksFilter = {
//       // ... установите любые фильтры для тестирования
//     };
//     const fetchedTasks = await workWithLocalStorage.getTasks(filter);

//     const filteredTasks = tasks.filter(task => workWithLocalStorage.taskFilter(task, filter));

//     expect(fetchedTasks).toEqual(filteredTasks);
//   });

//   it('adds a new task to the localStorage', async () => {
//     const newTask: Task = {
//       id: '1',
//       // ... поля задачи
//     };
//     await workWithLocalStorage.setTask(newTask);
//     const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');

//     expect(savedTasks).toContainEqual(newTask);
//   });

//   it('updates an existing task in the localStorage', async () => {
//     const tasks: Task[] = [
//       // ... задачи для тестирования
//     ];
//     localStorage.setItem('tasks', JSON.stringify(tasks));

//     const updatedTask: Task = {
//       id: '1',
//       // ... обновленные поля задачи
//     };
//     await workWithLocalStorage.setTask(updatedTask);
//     const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');

//     expect(savedTasks).toContainEqual(updatedTask);
//   });

//   it('deletes a task from the localStorage', async () => {
//     const tasks: Task[] = [
//       // ... задачи для тестирования
//     ];
//     localStorage.setItem('tasks', JSON.stringify(tasks));

//     const taskIdToDelete = '1';
//     await workWithLocalStorage.deleteTask(taskIdToDelete);
//     const remainingTasks = JSON.parse(localStorage.getItem('tasks') || '[]');

//     expect(remainingTasks.some((task: Task) => task.id === taskIdToDelete)).toBe(false);
//   });
// });

//

// describe('WorkWithLocalStorage', () => {
//   it('should get tasks from localStorage', async () => {
//     const mockTasks = [
//       { id: '1', title: 'Task 1', date: '2023-12-31', status: 'pending', tags: ['work'] },
//       { id: '2', title: 'Task 2', date: '2023-12-30', status: 'completed', tags: ['personal'] },
//     ];

//     const localStorageMock = {
//       getItem: jest.fn().mockReturnValue(JSON.stringify(mockTasks)),
//     };

//     global.localStorage = localStorageMock as any;

//     const workWithLocalStorage = new WorkWithLocalStorage('testNamespace');
//     const tasks = await workWithLocalStorage.getTasks();

//     expect(tasks).toEqual(mockTasks);
//     expect(localStorageMock.getItem).toHaveBeenCalledWith('testNamespace');
//   });

//   it('should set a task in localStorage', async () => {
//     const mockTasks = [
//       { id: '1', title: 'Task 1', date: '2023-12-31', status: 'pending', tags: ['work'] },
//     ];

//     const localStorageMock = {
//       getItem: jest.fn().mockReturnValue(JSON.stringify(mockTasks)),
//       setItem: jest.fn(),
//     };

//     global.localStorage = localStorageMock as any;

//     const workWithLocalStorage = new WorkWithLocalStorage('testNamespace');
//     const newTask = { id: '2', title: 'Task 2', date: '2023-12-30', status: 'completed', tags: ['personal'] };
//     await workWithLocalStorage.setTask(newTask);

//     expect(localStorageMock.setItem).toHaveBeenCalledWith('testNamespace', JSON.stringify([...mockTasks, newTask]));
//   });

//   it('should delete a specific task from localStorage', async () => {
//     const mockTasks = [
//       { id: '1', title: 'Task 1', date: '2023-12-31', status: 'pending', tags: ['work'] },
//       { id: '2', title: 'Task 2', date: '2023-12-30', status: 'completed', tags: ['personal'] },
//     ];

//     const localStorageMock = {
//       getItem: jest.fn().mockReturnValue(JSON.stringify(mockTasks)),
//       setItem: jest.fn(),
//     };

//     global.localStorage = localStorageMock as any;

//     const workWithLocalStorage = new WorkWithLocalStorage('testNamespace');
//     await workWithLocalStorage.deleteTask('1');

//     // Verify that the correct task is removed from the storage
//     expect(localStorageMock.setItem).toHaveBeenCalledWith('testNamespace', JSON.stringify([{ id: '2', title: 'Task 2', date: '2023-12-30', status: 'completed', tags: ['personal'] }]));
//   });
// });

//

// describe('WorkWithLocalStorage', () => {
//   it('should get tasks from localStorage', async () => {
//     const mockTasks: Task[] = [
//       { id: '1', text: 'Task 1', date: '2023-12-31', status: 'New', tags: ['work'] },
//       { id: '2', text: 'Task 2', date: '2023-12-30', status: 'Done', tags: ['personal'] },
//     ];

//     const localStorageMock = {
//       getItem: jest.fn().mockReturnValue(JSON.stringify(mockTasks)),
//     };

//     global.localStorage = localStorageMock as any;

//     const workWithLocalStorage = new WorkWithLocalStorage('testNamespace');
//     const tasks = await workWithLocalStorage.getTasks();

//     expect(tasks).toEqual(mockTasks);
//     expect(localStorageMock.getItem).toHaveBeenCalledWith('testNamespace');
//   });

//   it('should set a task in localStorage', async () => {
//     const mockTasks: Task[] = [
//       { id: '1', text: 'Task 1', date: '2023-12-31', status: 'New', tags: ['work'] },
//     ];

//     const localStorageMock = {
//       getItem: jest.fn().mockReturnValue(JSON.stringify(mockTasks)),
//       setItem: jest.fn(),
//     };

//     global.localStorage = localStorageMock as any;

//     const workWithLocalStorage = new WorkWithLocalStorage('testNamespace');
//     const newTask: Task = { id: '2', text: 'Task 2', date: '2023-12-30', status: 'In work', tags: ['personal'] };
//     await workWithLocalStorage.setTask(newTask);

//     expect(localStorageMock.setItem).toHaveBeenCalledWith('testNamespace', JSON.stringify([...mockTasks, newTask]));
//   });

//   it('should delete a specific task from localStorage', async () => {
//     const mockTasks: Task[] = [
//       { id: '1', text: 'Task 1', date: '2023-12-31', status: 'New', tags: ['work'] },
//       { id: '2', text: 'Task 2', date: '2023-12-30', status: 'Done', tags: ['personal'] },
//     ];

//     const localStorageMock = {
//       getItem: jest.fn().mockReturnValue(JSON.stringify(mockTasks)),
//       setItem: jest.fn(),
//     };

//     global.localStorage = localStorageMock as any;

//     const workWithLocalStorage = new WorkWithLocalStorage('testNamespace');
//     await workWithLocalStorage.deleteTask('1');

//     // Verify that the correct task is removed from the storage
//     expect(localStorageMock.setItem).toHaveBeenCalledWith('testNamespace', JSON.stringify([{ id: '2', text: 'Task 2', date: '2023-12-30', status: 'Done', tags: ['personal'] }]));
//   });
// });
