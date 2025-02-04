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

const projects = (function(){
    const list = [];

    function addNewProject(name) {
        list.push(new Project(name));
    }

    return {addNewProject, list};
})();

projects.addNewProject("Default project");


export { projects };