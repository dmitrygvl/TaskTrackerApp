import { TaskTrackerAPI } from './TaskTrackerAPI';
import { Task, TaskTrackerCRUD } from './types';

describe('TaskTrackerAPI', () => {
  let mockTaskTracker: TaskTrackerCRUD;
  let taskTrackerAPI: TaskTrackerAPI;

  beforeEach(() => {
    mockTaskTracker = {
      getTasks: jest.fn(() => Promise.resolve([])),
      setTask: jest.fn(() => Promise.resolve()),
      deleteTask: jest.fn(() => Promise.resolve(true)),
    };
    taskTrackerAPI = new TaskTrackerAPI(mockTaskTracker);
  });

  it('should get a task by ID', async () => {
    const mockTasks: Task[] = [
      {
        id: '152',
        text: 'Read a book',
        date: '2024-02-02',
        status: 'New',
        tags: [],
      },
      {
        id: '217',
        text: 'Go to gym',
        date: '2023-05-02',
        status: 'Done',
        tags: [],
      },
    ];
    mockTaskTracker.getTasks.mockImplementation(() =>
      Promise.resolve(mockTasks),
    );

    const task = await taskTrackerAPI.getTaskById('217');

    expect(task).toEqual(mockTasks[1]);
    expect(mockTaskTracker.getTasks).toHaveBeenCalled();
  });

  it('should delete a task', async () => {
    const taskId = '1';
    mockTaskTracker.getTasks.mockImplementation(() =>
      Promise.resolve([
        {
          id: '152',
          text: 'Read a book',
          date: '2024-02-02',
          status: 'New',
          tags: [],
        },
      ]),
    );
    mockTaskTracker.deleteTask.mockImplementation(() => Promise.resolve(true));

    const result = await taskTrackerAPI.deleteTask(taskId);

    // Ensure that the call to deleteTask succeeded and getTaskById was called
    expect(result).toBeTruthy();
    expect(mockTaskTracker.deleteTask).toHaveBeenCalledWith(taskId);
    expect(mockTaskTracker.getTasks).toHaveBeenCalled();
  });

  it('should get saved tasks', async () => {
    const mockTasks: Task[] = [
      {
        id: '152',
        text: 'Read a book',
        date: '2024-02-02',
        status: 'New',
        tags: [],
      },
      {
        id: '217',
        text: 'Go to gym',
        date: '2023-05-02',
        status: 'Done',
        tags: [],
      },
    ];
    mockTaskTracker.getTasks.mockImplementation(() =>
      Promise.resolve(mockTasks),
    );

    const savedTasks = await taskTrackerAPI.getSavedTasks();

    expect(savedTasks).toEqual(mockTasks);
    expect(mockTaskTracker.getTasks).toHaveBeenCalled();
  });

  it('should save a task', async () => {
    const task: Task = {
      id: '1',
      text: 'New Task',
      date: '2023-12-31',
      status: 'New',
      tags: ['work'],
    };
    mockTaskTracker.setTask.mockImplementation(() => Promise.resolve());

    await taskTrackerAPI.saveTask(task);

    expect(mockTaskTracker.setTask).toHaveBeenCalledWith(task);
  });
});
