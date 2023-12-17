// import React from 'react';
// import Button from './components/Button/Button';
// import { ReactComponent as Add } from './assets/icons/add.svg'

// const App = () => {
//   return (
//     <div className="container">
//       <main className="App">
//         <header className="header">
//           <h1>Task Tracker</h1>
//           <Button title="Add Task" icon={<Add />} onClick={() => {}} />
//         </header>
//         <section className="task-container"></section>
//       </main>
//     </div>
//   );
// };

// export default App;

import { renderAppUI } from "./modules/renderAppUI";

const app = document.getElementById("app") as HTMLElement;

export function runApp(appEl: HTMLElement) {
  renderAppUI(appEl);
}
