import { TaskTrackerAPI } from './TaskTrackerAPI';
import { TaskTrackerUI } from './TaskTrackerUI';
import { Task } from './types';

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
});
