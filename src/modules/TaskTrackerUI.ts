import { Task, TasksFilter } from './types';
import { TaskTrackerAPI } from './TaskTrackerAPI';

export class TaskTrackerUI {
  private taskTracker: TaskTrackerAPI;

  constructor(taskTracker: TaskTrackerAPI) {
    this.taskTracker = taskTracker;
    this.setEvents();
  }

  private async setEvents(): Promise<void> {
    document
      .getElementById('add-update-task-btn')
      ?.addEventListener('click', async () => {
        await this.addUpdateTask();
      });
    document
      .getElementById('filterTasksBtn')
      ?.addEventListener('click', async () => {
        await this.filterTasks();
      });
  }

  public async addUpdateTask(): Promise<void> {
    const taskDateInput = document.getElementById(
      'taskDate',
    ) as HTMLInputElement;
    const taskProgressSelect = document.getElementById(
      'taskProgress',
    ) as HTMLSelectElement;
    const taskTagsInput = document.getElementById(
      'taskTags',
    ) as HTMLInputElement;
    const taskTextInput = document.getElementById(
      'taskText',
    ) as HTMLInputElement;
    const { editingId } = (
      document.getElementById('add-update-task-btn') as HTMLButtonElement
    ).dataset;

    const taskId = editingId || this.taskTracker.generateTaskId();

    const task: Task = {
      id: taskId,
      text: taskTextInput.value,
      date: taskDateInput.value,
      status: taskProgressSelect.value as 'New' | 'In work' | 'Done',
      tags: taskTagsInput.value.split(',').map((tag) => tag.trim()),
    };

    await this.taskTracker.saveTask(task);
    await this.clearInputs();
    await this.renderTasks();
  }

  public async filterTasks(): Promise<void> {
    // const filterTextElement = document.getElementById(
    //   "filterText",
    // ) as HTMLInputElement;
    const filterDateElement = document.getElementById(
      'filterDate',
    ) as HTMLInputElement;
    const filterProgressElement = document.getElementById(
      'filterProgress',
    ) as HTMLSelectElement;
    const filterTagsElement = document.getElementById(
      'filterTags',
    ) as HTMLInputElement;

    const filter: TasksFilter = {
      date: filterDateElement.value || undefined,
      status:
        (filterProgressElement.value as 'New' | 'In work' | 'Done') ||
        undefined,

      tags: filterTagsElement.value
        ? filterTagsElement.value.split(',').map((tag) => tag.trim())
        : undefined,
    };

    let tasks: Task[] = [];

    tasks = await this.taskTracker.getSavedTasks();

    const filteredTasks = tasks.filter((task) =>
      this.taskTracker.taskFilter(task, filter),
    );
    await this.renderTasks(filteredTasks);
  }

  public async deleteTask(taskId: string): Promise<void> {
    const isTaskDeleted = await this.taskTracker.deleteTask(taskId);
    if (isTaskDeleted) {
      await this.renderTasks();
    }
  }

  public async renderTasks(tasks?: Task[]): Promise<void> {
    const taskListEl = document.getElementById('taskList') as HTMLUListElement;
    taskListEl.innerHTML = '';

    const taskList = tasks || (await this.taskTracker.getSavedTasks());

    taskList.forEach((task) => {
      const taskListItem = document.createElement('li');
      taskListItem.classList.add('task-item-flex');
      const editTaskBtn = document.createElement('button');
      editTaskBtn.textContent = 'Edit';
      editTaskBtn.classList.add('edit-btn');
      editTaskBtn.addEventListener('click', () => this.editTask(task.id));

      const deleteTaskBtn = document.createElement('button');
      deleteTaskBtn.textContent = 'Delete';
      deleteTaskBtn.classList.add('delete-btn');
      deleteTaskBtn.addEventListener('click', async () => {
        await this.deleteTask(task.id);
      });

      const dateEl = document.createElement('span');
      dateEl.textContent = ` Date: ${task.date}`;
      const progressEl = document.createElement('span');
      progressEl.textContent = `${task.status}`;
      const tagsEl = document.createElement('span');
      tagsEl.textContent = `Tags: ${task.tags.join(', ')}`;

      taskListItem.appendChild(document.createTextNode(task.text));
      taskListItem.appendChild(dateEl);
      taskListItem.appendChild(progressEl);
      taskListItem.appendChild(tagsEl);
      taskListItem.appendChild(editTaskBtn);
      taskListItem.appendChild(deleteTaskBtn);

      taskListEl.appendChild(taskListItem);
    });
  }

  async editTask(taskId: string): Promise<void> {
    const task = await this.taskTracker.getTaskById(taskId);
    if (!task) {
      return;
    }

    (document.getElementById('taskText') as HTMLInputElement).value = task.text;
    (document.getElementById('taskDate') as HTMLInputElement).value = task.date;
    (document.getElementById('taskProgress') as HTMLSelectElement).value =
      task.status;
    (document.getElementById('taskTags') as HTMLInputElement).value =
      task.tags.join(', ');
    (
      document.getElementById('add-update-task-btn') as HTMLButtonElement
    ).dataset.editingId = task.id;
  }

  public async clearInputs(): Promise<void> {
    (document.getElementById('taskDate') as HTMLInputElement).value = '';
    (document.getElementById('taskProgress') as HTMLSelectElement).value = '';
    (document.getElementById('taskTags') as HTMLInputElement).value = '';
    (document.getElementById('taskText') as HTMLInputElement).value = '';
    delete (document.getElementById('add-update-task-btn') as HTMLButtonElement)
      .dataset.editingId;
  }
}

export default TaskTrackerUI;
