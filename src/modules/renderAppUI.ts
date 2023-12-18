export function renderAppUI(rootEl: HTMLElement) {
  rootEl.innerHTML = `
  <main class="main">
        <header>
          <h1>Task Calendar</h1>
        </header>
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
          placeholder="By tags (comma-separated)"
        />
        
        <button id="filterTasksBtn">Filter tasks</button>
      </div>
      <div class="task-form">
        
        <input type="date" id="taskDate" />
        <select id="taskProgress">
          <option value="new">New</option>
          <option value="in progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <input type="text" id="taskTags" placeholder="Tags (comma-separated)" />
        <input
          id="taskText"
          class="task-text"
          autofocus
          placeholder="Enter your task"
          
          ></input>
        <button type="submit" id="add-update-task-btn">Add/Update Task</button>
      </div>
      <ul class="task-list" id="taskList"></ul>
    </div>
  </main>
  `;
}
