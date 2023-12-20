import { renderAppUI } from './renderAppUI';

describe('renderAppUI', () => {
  let rootEl: HTMLElement;

  beforeEach(() => {
    rootEl = document.createElement('div');
  });

  it('should render main content into the root element', () => {
    renderAppUI(rootEl);

    expect(rootEl.querySelector('main')).not.toBeNull();
  });

  it('should render header with the correct title', () => {
    renderAppUI(rootEl);

    const header = rootEl.querySelector('header h1');
    if (header) {
      expect(header.textContent).toBe('Task Calendar');
    } else {
      fail('Header element not found');
    }
  });

  it('should render filters section with appropriate controls', () => {
    renderAppUI(rootEl);

    const filtersSection = rootEl.querySelector('.filters');
    expect(filtersSection).not.toBeNull();

    if (filtersSection) {
      expect(filtersSection.querySelector('#filterDate')).not.toBeNull();
      expect(filtersSection.querySelector('#filterProgress')).not.toBeNull();
      expect(filtersSection.querySelector('#filterTags')).not.toBeNull();
      expect(filtersSection.querySelector('#filterTasksBtn')).not.toBeNull();
    }
  });
  it('should render task form with expected fields', () => {
    renderAppUI(rootEl);

    const taskForm = rootEl.querySelector('.task-form');
    if (!taskForm) {
      fail('Task form element not found');
    } else {
      expect(taskForm.querySelector('#taskDate')).not.toBeNull();
      expect(taskForm.querySelector('#taskProgress')).not.toBeNull();
      expect(taskForm.querySelector('#taskTags')).not.toBeNull();
      expect(taskForm.querySelector('#taskText')).not.toBeNull();
      expect(taskForm.querySelector('#add-update-task-btn')).not.toBeNull();
    }
  });

  it('should render an empty task list', () => {
    renderAppUI(rootEl);

    const taskList = rootEl.querySelector('.task-list');
    if (!taskList) {
      fail('Task list element not found');
    } else {
      expect(taskList.children.length).toBe(0);
    }
  });
});
