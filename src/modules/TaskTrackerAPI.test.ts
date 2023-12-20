import { TaskTrackerAPI } from './TaskTrackerAPI';
import { TaskTrackerCRUD, Task, TasksFilter } from './types';

describe('TaskTrackerAPI', () => {
  let taskTrackerAPI: TaskTrackerAPI;
  let localTaskTrackerMock: jest.Mocked<TaskTrackerCRUD>;

  beforeEach(() => {
    localTaskTrackerMock = {
      getTasks: jest.fn(),
      setTask: jest.fn(),
      deleteTask: jest.fn(),
    };
    taskTrackerAPI = new TaskTrackerAPI(localTaskTrackerMock);
  });

  describe('getTaskById', () => {
    it('should return a task by ID', async () => {
      const tasks: Task[] = [
        {
          id: '1',
          text: 'Test Task',
          date: '2023-01-01',
          status: 'New',
          tags: ['test'],
        },
      ];
      localTaskTrackerMock.getTasks.mockResolvedValue(tasks);

      const task = await taskTrackerAPI.getTaskById('1');
      expect(task).toEqual(tasks[0]);
    });

    it('should return null if task is not found', async () => {
      localTaskTrackerMock.getTasks.mockResolvedValue([]);

      const task = await taskTrackerAPI.getTaskById('1');
      expect(task).toBeNull();
    });
  });

  describe('deleteTask', () => {
    it('should delete a task and return true', async () => {
      localTaskTrackerMock.deleteTask.mockResolvedValue(true);
      localTaskTrackerMock.getTasks.mockResolvedValue([]);

      const result = await taskTrackerAPI.deleteTask('1');
      expect(result).toBe(true);
      expect(localTaskTrackerMock.deleteTask).toHaveBeenCalledWith('1');
    });

    it('should return false if task deletion fails', async () => {
      localTaskTrackerMock.deleteTask.mockResolvedValue(false);

      const result = await taskTrackerAPI.deleteTask('1');
      expect(result).toBe(false);
    });
  });
  describe('getSavedTasks', () => {
    it('should return all saved tasks', async () => {
      const tasks: Task[] = [
        {
          id: '1',
          text: 'Task 1',
          date: '2023-01-01',
          status: 'New',
          tags: ['work'],
        },
        {
          id: '2',
          text: 'Task 2',
          date: '2023-01-02',
          status: 'In progress',
          tags: ['home'],
        },
      ];
      localTaskTrackerMock.getTasks.mockResolvedValue(tasks);

      const result = await taskTrackerAPI.getSavedTasks();
      expect(result).toEqual(tasks);
    });
  });
  describe('taskFilter', () => {
    it('should filter tasks by provided criteria', () => {
      const task: Task = {
        id: '1',
        text: 'Test Task',
        date: '2023-01-01',
        status: 'New',
        tags: ['test'],
      };
      const filter: TasksFilter = {
        date: '2023-01-01',
        status: 'New',
        tags: ['test'],
      };

      const result = taskTrackerAPI.taskFilter(task, filter);
      expect(result).toBe(true);
    });
  });
});
