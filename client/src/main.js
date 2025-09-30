async function getTasks() {
  let data = [];
  try {
    const response = await fetch("http://localhost:8080");
    data = await response.json();
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
  return data;
}

getTasks().then((data) => {
  data.forEach((task) => {
    const createdAt = new Date(task.createdAt);
    const statusIcon =
      task.status === "in progress" ? "circle-dot" : "circle-check";
    const li = document.createElement("li");
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
});
