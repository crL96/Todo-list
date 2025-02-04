import { projects } from "./projects.js";

let selectedProjectIndex = 0;

const sidebarUI = (function() {

    function renderProjectList(allProjects) {
        const projectList = document.querySelector("#projectList");
        projectList.replaceChildren();

        let index = 0;
        for (let project of allProjects) {
            const projectListItem = document.createElement("li");
            const projectTitle = document.createElement("button");
            projectTitle.classList.add("projectSelectBtn");
            projectTitle.setAttribute("value", index);
            projectTitle.textContent = project.name;
            projectListItem.appendChild(projectTitle);
            projectList.appendChild(projectListItem);
            index++;
        }
        handleProjectSelect();
    }

    // New Project Button
    const btnAddProject = document.querySelector("#btnAddProject");
    btnAddProject.addEventListener("click", () => {
        const ElName = document.getElementById("projectName");
        const valueName = ElName.value;
        if (!(valueName === "")) {
            projects.addNewProject(valueName.trim());
            ElName.value = "";
            sidebarUI.renderProjectList(projects.list);
        }
    });

    // Make project buttons clickable and render selected project to content
    function handleProjectSelect() {
        const projectList = document.querySelector("#projectList");
        projectList.addEventListener("click", (e) => {
                contentUI.renderProject(e.target.value);
                selectedProjectIndex = e.target.value;
            });

    }

    return {renderProjectList};
})();


const contentUI = (function() {

    function renderProject(index) {
        const container = document.querySelector("#projectContainer");
        container.replaceChildren();
        const currentProject = projects.list[index];
        
        const projectName = document.createElement("h2");
        projectName.classList.add("projectHeader");
        projectName.textContent = currentProject.name;
        container.appendChild(projectName);

        let taskIndex = 0;
        for (let task of currentProject.tasks) {
            const taskContainer = document.createElement("div");
            taskContainer.classList.add("task");
    
            const name = document.createElement("h3");
            name.textContent = task.name;
            taskContainer.appendChild(name);
    
            const desc = document.createElement("p");
            desc.textContent = task.desc;
            taskContainer.appendChild(desc);
    
            const dueDate = document.createElement("p");
            dueDate.textContent = task.dueDate;
            taskContainer.appendChild(dueDate);
    
            const prio = document.createElement("p");
            prio.textContent = task.prio;
            taskContainer.appendChild(prio);
    
            const checkTitle = document.createElement("span");
            checkTitle.textContent = "Completed:"
            const check = document.createElement("input");
            check.setAttribute("type", "checkbox");
            check.textContent = task.doneStatus;
            taskContainer.appendChild(checkTitle);
            taskContainer.appendChild(check);
            
            const deleteBtn = document.createElement("button");
            deleteBtn.classList.add("deleteTask");
            deleteBtn.setAttribute("value", taskIndex);
            deleteBtn.textContent = "Delete";
            taskContainer.appendChild(deleteBtn);
            handelTaskDelete(deleteBtn);
    
            const editBtn = document.createElement("button");
            editBtn.classList.add("editTask");
            editBtn.setAttribute("value", taskIndex);
            editBtn.textContent = "Edit";
            taskContainer.appendChild(editBtn);
            handleTaskEdit(editBtn);
            
            container.appendChild(taskContainer);
            taskIndex++;
        }
    }

    // 
    function handelTaskDelete(deleteBtn) {
        deleteBtn.addEventListener("click", (e) => {
                projects.list[selectedProjectIndex].deleteTask(e.target.value);
                renderProject(selectedProjectIndex);
            });
    }


// EDIT TASK
// EDIT Task button to open form
    let selectedTask = 0;
    function handleTaskEdit(editBtn) {
        editBtn.addEventListener("click", (e) => {
            const editTaskForm = document.querySelector("#editTaskForm");

            selectedTask = projects.list[selectedProjectIndex].tasks[e.target.value];
            const nameEl = document.getElementById("editTaskName");
            const descEl = document.getElementById("editTaskDescription");
            const dueDateEl = document.getElementById("editDueDate");
            const prioEl = document.getElementById("editPrio");

            nameEl.value = selectedTask.name;
            descEl.value = selectedTask.desc;
            dueDateEl.value = selectedTask.dueDate;
            prioEl.value = selectedTask.prio;

            editTaskForm.showModal();
        });
    }
// Submit EDIT Task button in dialog/form
    const btnEditTaskSubmit = document.querySelector("#btnEditTaskSubmit");
    btnEditTaskSubmit.addEventListener("click", () => {
        const nameEl = document.getElementById("editTaskName");
        const descEl = document.getElementById("editTaskDescription");
        const dueDateEl = document.getElementById("editDueDate");
        const prioEl = document.getElementById("editPrio");

        const name = nameEl.value;
        const desc = descEl.value;
        const dueDate = dueDateEl.value;
        const prio = prioEl.value;

        

        selectedTask.updateTask(name, desc, dueDate, prio);
        editTaskForm.close();
        contentUI.renderProject(selectedProjectIndex);
    });
    

    // New task button
    const btnAddTaskForm = document.querySelector("#btnAddTaskForm");
    const addTaskForm = document.querySelector("#addTaskForm");
    
    btnAddTaskForm.addEventListener("click", () => {
        addTaskForm.showModal();
    });
    
    // Submit Task button in dialog/form
    const btnAddTaskSubmit = document.querySelector("#btnAddTaskSubmit");
    btnAddTaskSubmit.addEventListener("click", () => {
        const nameEl = document.getElementById("taskName");
        const descEl = document.getElementById("taskDescription");
        const dueDateEl = document.getElementById("dueDate");
        const prioEl = document.getElementById("prio");
        const name = nameEl.value;
        const desc = descEl.value;
        const dueDate = dueDateEl.value;
        const prio = prioEl.value;

        projects.list[selectedProjectIndex].addTask(name, desc, dueDate, prio);
        addTaskForm.close();
        nameEl.value = ""; //Clear fields
        descEl.value = "";
        dueDateEl.value = "";
        prioEl.value = "";
        contentUI.renderProject(selectedProjectIndex);
    });

    return {renderProject};
})();


export { sidebarUI, contentUI };