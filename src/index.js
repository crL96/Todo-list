import "./style.css";
import { projects } from "./projects.js";
import { sidebarUI, contentUI } from "./UI.js";
import { storage } from "./storage.js";

if (storage.checkSaved()) {
    storage.loadProjects();
}
else {
    projects.addNewProject("Default Project");
}

sidebarUI.renderProjectList(projects.list);
contentUI.renderProject(0);