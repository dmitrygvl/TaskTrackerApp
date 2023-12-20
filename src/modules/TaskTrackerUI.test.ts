import { TaskTrackerAPI } from './TaskTrackerAPI';
import { TaskTrackerUI } from './TaskTrackerUI';
import { Task, TasksFilter } from './types';

jest.mock('./TaskTrackerAPI');

describe('TaskTrackerUI', () => {
  let testTaskTracker: TaskTrackerAPI;
  let testTaskTrackerUI: TaskTrackerUI;

  beforeEach(() => {
    testTaskTracker = {
      getTasksFromFirebase: jest.fn(),
      getTasksLocalStorage: jest.fn(),
      getSavedTasks: jest.fn().mockResolvedValue([]),
      deleteTask: jest.fn(),
      taskFilter: jest
        .fn()
        .mockImplementation((task: Task, filter: TasksFilter): boolean => {
          const tagsToCompare =
            filter.tags?.map((tag: string) => tag.trim().toLowerCase()) ?? [];

          const dateMatches = !filter.date || task.date === filter.date;
          const statusMatches = !filter.status || task.status === filter.status;
          const tagsMatches =
            tagsToCompare.length === 0 ||
            tagsToCompare.some((filterTag: string) =>
              task.tags.some((taskTag) =>
                taskTag.toLowerCase().includes(filterTag),
              ),
            );

          return dateMatches && statusMatches && tagsMatches;
        }),
      getTaskById: jest.fn(),
      saveTask: jest.fn(),
      generateTaskId: jest.fn().mockReturnValue('mock-task-id'),
    } as unknown as TaskTrackerAPI;

    document.body.innerHTML = `
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
          <input type="date" id="taskDate" />
          <select id="taskProgress">
            <option value="new">New</option>
            <option value="in progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <input type="text" id="taskTags" placeholder="Tags" />
          <input
            id="taskText"
            class="task-text"
            autofocus
            placeholder="Enter your task"
            ></input>
          <button type="submit" id="add-update-task-btn">Add/Update Task</button>
        <ul class="task-list" id="taskList"></ul>
    `;
    testTaskTrackerUI = new TaskTrackerUI(testTaskTracker);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should delete task and rerender UI', async () => {
    const mockTaskId = 'task1';
    jest.spyOn(testTaskTracker, 'deleteTask').mockResolvedValue(true);
    jest.spyOn(testTaskTrackerUI, 'renderTasks');

    await testTaskTrackerUI.deleteTask(mockTaskId);

    expect(testTaskTracker.deleteTask).toHaveBeenCalledWith(mockTaskId);
    expect(testTaskTrackerUI.renderTasks).toHaveBeenCalled();
  });

  it('renderTasks should create and append task elements to the list', async () => {
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

    (testTaskTracker.getSavedTasks as jest.Mock).mockResolvedValue(mockTasks);

    await testTaskTrackerUI.renderTasks();

    const taskListElement = document.getElementById(
      'taskList',
    ) as HTMLUListElement;
    expect(taskListElement.children).toHaveLength(2);

    const firstTaskElement = taskListElement.children[0];
    expect(firstTaskElement.textContent).toContain('Read a book');
    expect(firstTaskElement.querySelector('.edit-btn')).not.toBeNull();
    expect(firstTaskElement.querySelector('.delete-btn')).not.toBeNull();
  });

  it('should filter tasks based on user input', async () => {
    (document.getElementById('filterDate') as HTMLInputElement).value =
      '2024-01-01';
    (document.getElementById('filterProgress') as HTMLSelectElement).value =
      'New';
    (document.getElementById('filterTags') as HTMLInputElement).value = 'tag1';

    jest.spyOn(testTaskTracker, 'getSavedTasks').mockResolvedValue([
      {
        id: '1',
        text: 'Task 1',
        date: '2024-01-01',
        status: 'New',
        tags: ['tag1'],
      },
      {
        id: '2',
        text: 'Task 2',
        date: '2024-01-02',
        status: 'In progress',
        tags: ['tag2'],
      },
    ]);
    jest.spyOn(testTaskTrackerUI, 'renderTasks');

    await testTaskTrackerUI.filterTasks();

    expect(testTaskTrackerUI.renderTasks).toHaveBeenCalledWith([
      {
        id: '1',
        text: 'Task 1',
        date: '2024-01-01',
        status: 'New',
        tags: ['tag1'],
      },
    ]);
  });

  it('should set input fields to the values of the task being edited', async () => {
    const taskToEdit: Task = {
      id: 'edit-task-id',
      text: 'Edit Task',
      date: '2024-01-03',
      status: 'Done',
      tags: ['edit', 'task'],
    };

    jest.spyOn(testTaskTracker, 'getTaskById').mockResolvedValue(taskToEdit);

    await testTaskTrackerUI.editTask(taskToEdit.id);

    expect(
      (document.getElementById('taskText') as HTMLInputElement).value,
    ).toBe(taskToEdit.text);
    expect(
      (document.getElementById('taskDate') as HTMLInputElement).value,
    ).toBe(taskToEdit.date);

    (document.getElementById('taskProgress') as HTMLSelectElement).value =
      taskToEdit.status;

    expect(
      (document.getElementById('taskTags') as HTMLInputElement).value,
    ).toBe(taskToEdit.tags.join(', '));
  });

  it('should clear input fields after adding/updating a task', async () => {
    (document.getElementById('taskText') as HTMLInputElement).value =
      'Task Text';
    (document.getElementById('taskDate') as HTMLInputElement).value =
      '2024-01-05';
    (document.getElementById('taskTags') as HTMLInputElement).value =
      'tag1, tag2';

    (document.getElementById('taskProgress') as HTMLSelectElement).value =
      'new';

    const mockSaveTask = jest.fn();
    testTaskTracker.saveTask = mockSaveTask;

    jest.spyOn(testTaskTrackerUI, 'renderTasks');

    await testTaskTrackerUI.addUpdateTask();

    expect(
      (document.getElementById('taskText') as HTMLInputElement).value,
    ).toBe('');
    expect(
      (document.getElementById('taskDate') as HTMLInputElement).value,
    ).toBe('');
    expect(
      (document.getElementById('taskTags') as HTMLInputElement).value,
    ).toBe('');
    expect(
      (document.getElementById('taskProgress') as HTMLSelectElement).value,
    ).toBe('');
  });
});
