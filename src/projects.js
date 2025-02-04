import Task from "./tasks.js";

class Project {
    tasks = [];
    
    constructor(name) {
        this.name = name;
    }
    
    addTask(name, desc, dueDate, prio) {
        this.tasks.push(new Task(name, desc, dueDate, prio));
    }
    
    deleteTask(index) {
        this.tasks.splice(index, 1);
    }
}

const allProjects = (function(){
    const projectList = [];

    function addNewProject(name) {
        projectList.push(new Project(name));
    }

    return {addNewProject, projectList};
})();

allProjects.addNewProject("Default project");


export { Project, allProjects };