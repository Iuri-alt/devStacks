function entrar() {
  const usuario = document.querySelector(".usuario").value;
  const senha = document.querySelector(".senha").value;

  if (usuario === "admin" && senha === "123") {
    localStorage.setItem("logado", "true");

    window.location.href = "tarefas.html";
  } else {
    alert("Login inválido 😬");
  }
}

// já verifica ao abrir
window.onload = function () {
  const logado = localStorage.getItem("logado");

  if (logado === "true") {
    window.location.href = "tarefas.html";
  }
};