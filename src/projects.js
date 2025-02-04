import Task from "./tasks.js";

export default class Project {
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