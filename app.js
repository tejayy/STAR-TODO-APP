document.addEventListener("DOMContentLoaded", () => {
  const storedTask = JSON.parse(localStorage.getItem("tasks"));

  if (storedTask) {
    storedTask.forEach((task) => tasks.push(task));
    updateTasksList();
    updateStats();
  }
});

let tasks = [];

const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const addTask = () => {
  const taskInput = document.getElementById("taskInput");
  const text = taskInput.value;

  if (text) {
    tasks.push({ text: text, completed: false });
    taskInput.value = "";
    updateTasksList();
    updateStats();
    saveTasks();
  }
};

const toggleTaskComplete = (index) => {
  tasks[index].completed = !tasks[index].completed;
  updateTasksList();
  updateStats();
  saveTasks();
};

const editTask = (index) => {
  const taskInput = document.getElementById("taskInput");
  taskInput.value = tasks[index].text;

  tasks.splice(index, 1);
  updateTasksList();
  updateStats();
  saveTasks();
};

const deleteTask = (index) => {
  tasks.splice(index, 1);
  updateTasksList();
  updateStats();
  saveTasks();
};

const updateStats = () => {
  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const progressBar = document.getElementById("progress");
  progressBar.style.width = `${progress}%`;

  document.getElementById(
    "numbers"
  ).innerText = `${completedTasks} / ${totalTasks}`;
};

const updateTasksList = () => {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");

    listItem.innerHTML = `
      <div class="taskItem">
        <div class="task ${task.completed ? "completed" : ""}"> 
            <input type="checkbox" class="checkbox" ${
              task.completed ? "checked" : ""
            }>
            <p>${task.text}</p>
        </div>
        <div class="icons">
            <img src="edit-icon.png" alt="Edit" data-action="edit" data-index="${index}">
            <img src="delete-icon.png" alt="Delete" data-action="delete" data-index="${index}">
        </div>
      </div>`;

    taskList.append(listItem);
  });
};

document.getElementById("task-list").addEventListener("click", function (e) {
  if (e.target.tagName === "IMG") {
    const index = e.target.getAttribute("data-index");
    const action = e.target.getAttribute("data-action");

    if (action === "edit") {
      editTask(index);
    } else if (action === "delete") {
      deleteTask(index);
    }
  }
});

document.getElementById("task-list").addEventListener("change", function (e) {
  if (e.target.classList.contains("checkbox")) {
    const index = [...e.target.closest("ul").children].indexOf(
      e.target.closest("li")
    );
    toggleTaskComplete(index);
  }
});

document.getElementById("new-task").addEventListener("click", function (e) {
  e.preventDefault();
  addTask();
});
