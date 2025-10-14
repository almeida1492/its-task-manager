function app() {
  let tasks = [];

  async function getTasks() {
    let data = [];
    try {
      const response = await fetch("http://localhost:8080/tasks");
      data = await response.json();
      tasks = data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
    return data;
  }

  function renderTasks(tasks) {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    tasks.forEach((task) => {
      const createdAt = new Date(task.createdAt);
      const statusIcon =
        task.status === "in progress" ? "circle-dot" : "circle-check";
      const li = document.createElement("li");
      li.className = "task-item";
      li.innerHTML = `
        <div class="task-header">
            <h4 class="task-name">${task.name}</h4>
            <span class="task-info">@${
              task.author
            } • ${createdAt.toUTCString()}</span>
            <img 
                src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/${statusIcon}.svg" 
                alt="${task.status} icon" 
                width="24" 
                height="24"
                class="task-status-icon ${
                  task.status === "in progress" ? "in-progress" : "completed"
                }"
            />
        </div>
        <p class="task-description">${task.description}</p>
    `;
      document.getElementById("task-list").appendChild(li);
    });
  }

  async function addTask(taskData) {
    try {
      const result = await fetch("http://localhost:8080/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      if (result.ok) {
        const newTask = await result.json();
        alert("Task added successfully!");
        tasks.push(newTask);
        renderTasks(tasks);
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  }

  getTasks().then(renderTasks);

  document.getElementById("task-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const taskData = {
      name: formData.get("name"),
      description: formData.get("description"),
      author: formData.get("author"),
      status: formData.get("status"),
    };

    addTask(taskData);
  });
}

app();
