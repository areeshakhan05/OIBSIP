const taskInput = document.getElementById("taskInput");
const pendingTasks = document.getElementById("pendingTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingCount = document.getElementById("pendingCount");
const completedCount = document.getElementById("completedCount");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function formatDate(date) {
    return new Date(date).toLocaleString();
}

function addTask() {
    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task.");
        return;
    }

    tasks.push({
        id: Date.now(),
        text: text,
        completed: false,
        added: new Date().toISOString(),
        completedTime: null
    });

    taskInput.value = "";

    saveTasks();
    renderTasks();
}

function toggleTask(id) {
    tasks = tasks.map(task => {

        if (task.id === id) {

            task.completed = !task.completed;

            if (task.completed)
                task.completedTime = new Date().toISOString();
            else
                task.completedTime = null;
        }

        return task;

    });

    saveTasks();
    renderTasks();
}

function deleteTask(id) {

    tasks = tasks.filter(task => task.id !== id);

    saveTasks();
    renderTasks();

}

function editTask(id) {

    const task = tasks.find(t => t.id === id);

    const newText = prompt("Edit Task", task.text);

    if (newText !== null && newText.trim() !== "") {

        task.text = newText.trim();

        saveTasks();
        renderTasks();

    }

}

function renderTasks() {

    pendingTasks.innerHTML = "";
    completedTasks.innerHTML = "";

    const pending = tasks.filter(task => !task.completed);
    const completed = tasks.filter(task => task.completed);

    pendingCount.textContent = `${pending.length} pending`;
    completedCount.textContent = `${completed.length} completed`;

    if (pending.length === 0) {

        pendingTasks.innerHTML =
        `<p class="empty-state">No pending tasks 🎉</p>`;

    }

    if (completed.length === 0) {

        completedTasks.innerHTML =
        `<p class="empty-state">No completed tasks yet.</p>`;

    }

    pending.forEach(createTaskElement);

    completed.forEach(createTaskElement);

}

function createTaskElement(task) {

    const li = document.createElement("li");

    if (task.completed)
        li.classList.add("completed");

    let time = `Added: ${formatDate(task.added)}`;

    if (task.completedTime) {

        time += `<br>Completed: ${formatDate(task.completedTime)}`;

    }

    li.innerHTML = `

        <div class="task-info">

            <div class="task-text">${task.text}</div>

            <div class="timestamp">${time}</div>

        </div>

        <div class="actions">

            <button class="complete-btn"
            onclick="toggleTask(${task.id})">

            ${task.completed ? "Undo" : "Complete"}

            </button>

            <button class="edit-btn"
            onclick="editTask(${task.id})">

            Edit

            </button>

            <button class="delete-btn"
            onclick="deleteTask(${task.id})">

            Delete

            </button>

        </div>

    `;

    if (task.completed)
        completedTasks.appendChild(li);
    else
        pendingTasks.appendChild(li);

}

taskInput.addEventListener("keypress", function(e) {

    if (e.key === "Enter") {

        addTask();

    }

});

renderTasks();