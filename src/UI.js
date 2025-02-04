import { projects } from "./projects.js";

const sidebarUI = (function() {

    function renderProjectList(allProjects) {
        const projectList = document.querySelector("#projectList");
        projectList.replaceChildren();

        for (let project of allProjects) {
            const projectListItem = document.createElement("li");
            const projectTitle = document.createElement("button");
            projectTitle.textContent = project.name;
            projectListItem.appendChild(projectTitle);
            projectList.appendChild(projectListItem);
        }
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

    return {renderProjectList};
})();

export { sidebarUI };