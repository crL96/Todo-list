import { projects } from "./projects";

export const storage = (function() {

    function saveProjects() {
        const projectsJson = JSON.stringify(projects.list);
        localStorage.removeItem("projects");
        localStorage.setItem("projects", projectsJson);
    }
    
    function loadProjects() {
        const projectsJson = localStorage.getItem("projects");
        const projectsList = JSON.parse(projectsJson);
    
        projects.clearAllProjects();
        //loop through each project from localStorage (to add back methods)
        for (let i = 0; i < projectsList.length; i++) {
            projects.addNewProject(projectsList[i].name);
            //loop through each task in project
            for (let j = 0; j < projectsList[i].tasks.length; j++) {
                const currentTask = projectsList[i].tasks[j];
                projects.list[i].addTask(currentTask.name, currentTask.desc, currentTask.dueDate, currentTask.prio);
            }
        }
    }

    function checkSaved() {
        if (localStorage.getItem("projects") === null) {
            return false;
        } else {
            return true;
        }
    }

    return {saveProjects, loadProjects, checkSaved};

})();