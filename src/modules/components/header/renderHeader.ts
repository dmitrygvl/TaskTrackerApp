// import "./header.scss";

export const renderHeader = (headerRoot: HTMLElement): void => {
  headerRoot.innerHTML = `
  <h1>Task Tracker app</h1>
  <nav class="nav">
    <a href="/calendar" class="nav__link" id="calendar-link">Calendar</a>
    <a href="/list" class="nav__link" id="list-link">Task list</a>
    <a href="/about" class="nav__link" id="about-link">About</a>
  </nav>
  `;
};
