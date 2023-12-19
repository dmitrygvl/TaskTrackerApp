import { WorkWithLocalStorage } from './store';
import { TaskTrackerAPI } from './TaskTrackerAPI';
import { Task } from './types';

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
