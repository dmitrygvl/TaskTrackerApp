// import "normalize.css";
import "./styles/index.scss";
// import { TaskTrackerAPI } from "./modules/TaskTrackerAPI";
// import { WorkWithLocalStorage } from "./modules/store";
// import { TaskTrackerUI } from "./modules/TaskTrackerUI";
// import { renderAppUI } from "./modules/renderAppUI";
import { runApp } from "./modules/runApp";

// const header = document.getElementById("header") as HTMLElement;

// runApp(header);
// //

// import { runApp } from "./runApp";

const app = document.getElementById("app") as HTMLElement;

runApp(app);
