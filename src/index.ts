import "normalize.css";
import { runApp } from "./modules/runApp";
import { renderHeader } from "./modules/components/header/renderHeader";

const header = document.getElementById("header") as HTMLElement;
// const app = document.getElementById("app") as HTMLElement;

renderHeader(header);

// runApp(header)
