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

    function clearAllProjects() {
        list.splice(0);
    }

    function deleteProject(index) {
        list.splice(index, 1);
    }

    return {addNewProject, list, clearAllProjects, deleteProject};
})();


export { projects };