const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
let tasks = JSON.parse(localStorage.getItem("tasks")) || {};

// Adicionar tarefa
addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  const date = dateInput.value;
  if (!text || !date) {
    alert("Preenche a tarefa e a data, visse!");
    return;
  }
  if (!tasks[date]) {
    tasks[date] = [];
  }
  tasks[date].push({
    text: text,
    done: false
  });
  saveTasks();
  renderTasks();
  taskInput.value = "";
});
// Salvar no localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
// Renderizar tarefas (MOSTRA TODAS)
function renderTasks() {
  taskList.innerHTML = "";
  Object.keys(tasks).forEach(date => {
    tasks[date].forEach((task, index) => {
      const li = document.createElement("li");
      const span = document.createElement("span");
      span.textContent = task.text;
      if (task.done) {
        span.style.textDecoration = "line-through";
      }
      // Marcar como concluída
      span.addEventListener("click", () => {
        toggleTask(date, index);
      });
      // Mostrar data
      const dateSpan = document.createElement("small");
      dateSpan.textContent = " (" + date + ")";
      // Botão deletar
      const btnDelete = document.createElement("button");
      btnDelete.textContent = "❌";
      btnDelete.addEventListener("click", (e) => {
        e.stopPropagation();
        deleteTask(date, index);
      });
      li.appendChild(span);
      li.appendChild(dateSpan);
      li.appendChild(btnDelete);
      taskList.appendChild(li);
    });
  });
}
// Deletar tarefa
function deleteTask(date, index) {
  tasks[date].splice(index, 1);
  // remove o dia se não tiver mais tarefa
  if (tasks[date].length === 0) {
    delete tasks[date];
  }
  saveTasks();
  renderTasks();
}
// Marcar/desmarcar tarefa
function toggleTask(date, index) {
  tasks[date][index].done = !tasks[date][index].done;
  saveTasks();
  renderTasks();
}
// 🚪 Sair
function sair() {
  localStorage.removeItem("logado");
  window.location.href = "index.html";
}

// 🔄 Inicializar
renderTasks();