let tasks = [];

const addTask = () => {
  const taskInput = document.getElementById("taskInput");
  const text = taskInput.value;

  if (text) {
    tasks.push({ text: text, completed: false });
    taskInput.value = "";
    updateTasksList();
  }
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
            <img src="edit-icon.png" alt="Edit" onClick="editTask(${index})">
            <img src="delete-icon.png" alt="Delete" onClick="deleteTask(${index})">
        </div>
      </div>`;

    listItem
      .querySelector(".checkbox")
      .addEventListener("change", () => toggleTaskComplete(index));

    taskList.append(listItem);
  });
};

const toggleTaskComplete = (index) => {
  tasks[index].completed = !tasks[index].completed;
  updateTasksList();
};

const editTask = (index) => {
  const taskInput = document.getElementById("taskInput");
  taskInput.value = tasks[index].text;

  tasks.splice(index, 1);
  updateTasksList();
};

const deleteTask = (index) => {
  tasks.splice(index, 1);
  updateTasksList();
};

document.getElementById("new-task").addEventListener("click", function (e) {
  e.preventDefault();
  addTask();
});
