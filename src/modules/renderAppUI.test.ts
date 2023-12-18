import { renderAppUI } from './renderAppUI';

describe('renderAppUI', () => {
  it('renders main UI with filters and task form', () => {
    document.body.innerHTML = '<div id="root"></div>';
    const rootEl = document.getElementById('root') as HTMLElement;

    renderAppUI(rootEl);

    expect(rootEl.innerHTML).toMatchSnapshot();
  });

  it('verifies presence of filter elements in the UI', () => {
    document.body.innerHTML = '<div id="root"></div>';
    const rootEl = document.getElementById('root') as HTMLElement;
    renderAppUI(rootEl);

    expect(rootEl.querySelector('#filterDate')).toBeInstanceOf(
      HTMLInputElement,
    );
    expect(rootEl.querySelector('#filterProgress')).toBeInstanceOf(
      HTMLSelectElement,
    );
    expect(rootEl.querySelector('#filterTags')).toBeInstanceOf(
      HTMLInputElement,
    );
    expect(rootEl.querySelector('#filterTasksBtn')).toBeInstanceOf(
      HTMLButtonElement,
    );
  });

  it('verifies presence of task form elements in the UI', () => {
    document.body.innerHTML = '<div id="root"></div>';
    const rootEl = document.getElementById('root') as HTMLElement;
    renderAppUI(rootEl);

    expect(rootEl.querySelector('#taskDate')).toBeInstanceOf(HTMLInputElement);
    expect(rootEl.querySelector('#taskProgress')).toBeInstanceOf(
      HTMLSelectElement,
    );
    expect(rootEl.querySelector('#taskTags')).toBeInstanceOf(HTMLInputElement);
    expect(rootEl.querySelector('#taskText')).toBeInstanceOf(HTMLInputElement);
    expect(rootEl.querySelector('#add-update-task-btn')).toBeInstanceOf(
      HTMLButtonElement,
    );
  });

  it('verifies the presence of task list in the UI', () => {
    document.body.innerHTML = '<div id="root"></div>';
    const rootEl = document.getElementById('root') as HTMLElement;
    renderAppUI(rootEl);

    expect(rootEl.querySelector('#taskList')).toBeInstanceOf(HTMLUListElement);
  });
});
