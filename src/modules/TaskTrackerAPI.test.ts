import { TaskTrackerAPI } from './TaskTrackerAPI';
import { Task, TaskTrackerCRUD } from './types';

// describe("TaskTrackerAPI tests", () => {
//   let taskTracker: TaskTrackerAPI;
//   let storage: WorkWithLocalStorage;

// })

//

// describe('TaskTrackerAPI', () => {
//   let mockTaskTracker: TaskTrackerCRUD;
//   let taskTrackerAPI: TaskTrackerAPI;

//   beforeEach(() => {
//     mockTaskTracker = {
//       getTasks: jest.fn(),
//       setTask: jest.fn(),
//       deleteTask: jest.fn(),
//     };
//     taskTrackerAPI = new TaskTrackerAPI(mockTaskTracker);
//   });

//   it('should get a task by ID', async () => {
//     const mockTasks: Task[] = [
//       { id: '1', text: 'Task 1', date: '2023-12-31', status: 'New', tags: ['work'] },
//       { id: '2', text: 'Task 2', date: '2023-12-30', status: 'Done', tags: ['personal'] },
//     ];
//     mockTaskTracker.getTasks.mockResolvedValue(mockTasks);

//     const task = await taskTrackerAPI.getTaskById('2');

//     expect(task).toEqual(mockTasks[1]);
//     expect(mockTaskTracker.getTasks).toHaveBeenCalled();
//   });

//   it('should delete a task', async () => {
//     mockTaskTracker.getTasks.mockResolvedValue([
//       { id: '1', text: 'Task 1', date: '2023-12-31', status: 'New', tags: ['work'] },
//     ]);
//     mockTaskTracker.deleteTask.mockResolvedValue(true);

//     const result = await taskTrackerAPI.deleteTask('1');

//     // Ensure that the call to deleteTask succeeded and getTaskById was called
//     expect(result).toBeTruthy();
//     expect(mockTaskTracker.deleteTask).toHaveBeenCalledWith('1');
//     expect(mockTaskTracker.getTasks).toHaveBeenCalled();
//   });

//   it('should get saved tasks', async () => {
//     const mockTasks: Task[] = [
//       { id: '1', text: 'Task 1', date: '2023-12-31', status: 'New', tags: ['work'] },
//       { id: '2', text: 'Task 2', date: '2023-12-30', status: 'Done', tags: ['personal'] },
//     ];
//     mockTaskTracker.getTasks.mockResolvedValue(mockTasks);

//     const savedTasks = await taskTrackerAPI.getSavedTasks();

//     expect(savedTasks).toEqual(mockTasks);
//     expect(mockTaskTracker.getTasks).toHaveBeenCalled();
//   });

//   it('should save a task', async () => {
//     const task: Task = { id: '1', text: 'New Task', date: '2023-12-31', status: 'New', tags: ['work'] };

//     await taskTrackerAPI.saveTask(task);

//     expect(mockTaskTracker.setTask).toHaveBeenCalledWith(task);
//   });
// });

//

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
        id: '1',
        text: 'Task 1',
        date: '2023-12-31',
        status: 'New',
        tags: ['work'],
      },
      {
        id: '2',
        text: 'Task 2',
        date: '2023-12-30',
        status: 'Done',
        tags: ['personal'],
      },
    ];
    mockTaskTracker.getTasks.mockImplementation(() =>
      Promise.resolve(mockTasks),
    );

    const task = await taskTrackerAPI.getTaskById('2');

    expect(task).toEqual(mockTasks[1]);
    expect(mockTaskTracker.getTasks).toHaveBeenCalled();
  });

  it('should delete a task', async () => {
    const taskId = '1';
    mockTaskTracker.getTasks.mockImplementation(() =>
      Promise.resolve([
        {
          id: '1',
          text: 'Task 1',
          date: '2023-12-31',
          status: 'New',
          tags: ['work'],
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
        id: '1',
        text: 'Task 1',
        date: '2023-12-31',
        status: 'New',
        tags: ['work'],
      },
      {
        id: '2',
        text: 'Task 2',
        date: '2023-12-30',
        status: 'Done',
        tags: ['personal'],
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
