export function renderAppUI(rootEl: HTMLElement) {
  rootEl.innerHTML = `
  <main class="main">
        <header>
          <h1>Task Calendar</h1>
        </header>
      <div class="filters">
       
        <input type="date" id="filterDate" />
        <select id="filterStatus">
          <option value="new">New</option>
          <option value="in progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <input
          type="text"
          id="filterTags"
          placeholder="By tags (comma-separated)"
        />
        
        <button id="applyFiltersButton">Apply Filters</button>
      </div>
      <div class="task-form">
        
        <input type="date" id="taskDate" />
        <select id="taskStatus">
          <option value="new">New</option>
          <option value="in progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <input type="text" id="taskTags" placeholder="Tags (comma-separated)" />
        <input
          id="taskText"
          class="task-text"
          placeholder="Enter your task"
        ></input>
        <button id="add-update-task">Add/Update Task</button>
        <!-- <button id="loadFromFirebaseButton">Load Tasks from Firebase</button> -->
        <!-- <button id="loadFromLocalButton">Load from Local</button> -->
      </div>
      <ul class="task-list" id="taskList"></ul>
    </div>
  </main>
  `;
}
