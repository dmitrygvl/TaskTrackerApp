// import "./renderHeader.scss";

export const renderHeader = (headerRoot: HTMLElement): void => {
  headerRoot.innerHTML = `
  <h1>Task Tracker app</h1>
  <nav class="'nav">
  <h1>My Task Tracker App</h1>
  <nav class="nav">
    <a href="/calendar" class="nav__link" id="calendar-link">Calendar</a>
    <a href="/list" class="nav__link" id="list-link">List</a>
    <a href="/about" class="nav__link" id="about-link">About</a>
  </nav>
  `;
};

// <nav>
//     <a href="/calendar" class="nav__link" id="">Tasks calendar</a>
//     <a href="/tasklist" class="nav__link" id="My taskList"></a>
//   </nav>
