import "./style.css";
import { projects } from "./projects.js";
import { sidebarUI, contentUI } from "./UI.js";

projects.addNewProject("Default Project");
sidebarUI.renderProjectList(projects.list);
contentUI.renderProject(0);