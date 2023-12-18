import { TaskTrackerAPI } from './TaskTrackerAPI';
import { WorkWithLocalStorage } from './store';
import { TaskTrackerUI } from './TaskTrackerUI';
import { renderAppUI } from './renderAppUI';

const app = document.getElementById('app') as HTMLElement;

export function runApp(appEl: HTMLElement) {
  renderAppUI(appEl);

  const storage = new WorkWithLocalStorage('local_tasks');

  const taskTracker = new TaskTrackerAPI(storage);

  const taskTrackerUI = new TaskTrackerUI(taskTracker);
}
