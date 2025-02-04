export default class Task {
    constructor(name, desc, dueDate, prio) {
        this.name = name;
        this.desc = desc;
        this.dueDate = dueDate;
        this.prio = prio;
        this.doneStatus = false;
    }

    changeDoneStatus() {
        this.doneStatus = !(this.doneStatus);
    }

    changePrio(newPrio) {
        this.prio = newPrio;
    }
}