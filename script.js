const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  savedTasks.forEach(taskObj => {
    const newTask = document.createElement("li");
    newTask.classList.add("task");
    newTask.textContent = taskObj.text;

    // Highlight if completed
    if (taskObj.completed) {
      newTask.classList.add("completed");
    }

    // Add delete button
    const deleteBtn = document.createElement("span");
    deleteBtn.textContent = "🗑️";
    deleteBtn.style.cursor = "pointer";
    deleteBtn.style.marginLeft = "10px";
    deleteBtn.addEventListener("click", function() {
      taskList.removeChild(newTask);
      saveTasks();
    });

    // Add completion toggle
    newTask.addEventListener("click", function() {
      newTask.classList.toggle("completed");
      saveTasks();
    });

    newTask.appendChild(deleteBtn);
    taskList.appendChild(newTask);
  });
}


function saveTasks() {
  const tasksArray = [];

  // Loop through all tasks in the list
  taskList.querySelectorAll("li").forEach(task => {
    const text = task.firstChild.textContent; // task text
    const completed = task.classList.contains("completed"); // check if highlighted
    tasksArray.push({ text, completed });
  });

  // Save to localStorage as a string
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
}


addTaskButton.addEventListener('click', function() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  const newTask = document.createElement("li");
  newTask.classList.add("task");
  newTask.textContent = taskText;

  newTask.addEventListener('click', function() {
    newTask.classList.toggle('completed');
    saveTasks(); // Save tasks after toggling
    });

    // Create delete button
    const deleteBtn = document.createElement("span");
    deleteBtn.textContent = "🗑️";  // bin icon
    deleteBtn.style.cursor = "pointer";
    deleteBtn.style.marginLeft = "10px";

    // Add listener to delete task
    deleteBtn.addEventListener("click", function() {
        taskList.removeChild(newTask);
        saveTasks(); // Save tasks after deletion
    });

    // Append delete button to task
    newTask.appendChild(deleteBtn);


  taskList.appendChild(newTask);
  saveTasks(); // Save tasks after adding
  taskInput.value = ""; // Clear input after adding
});

loadTasks(); // Load tasks on page load

