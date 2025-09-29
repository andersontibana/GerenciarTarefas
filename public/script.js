const nomeInput = document.getElementById("nomeInput");
const salvarBtn = document.getElementById("salvarBtn");
const listaNomes = document.getElementById("listaNomes");

// Carregar tarefas ao inicializar a página
document.addEventListener("DOMContentLoaded", carregarTarefas);

// Event listeners
salvarBtn.addEventListener("click", salvarTarefa);
nomeInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    salvarTarefa();
  }
});

// Função para carregar todas as tarefas
async function carregarTarefas() {
  try {
    const response = await fetch("/tarefas");
    const tarefas = await response.json();
    exibirTarefas(tarefas);
  } catch (error) {
    console.error("Erro ao carregar tarefas:", error);
  }
}

// Função para exibir tarefas na lista
function exibirTarefas(tarefas) {
  listaNomes.innerHTML = "";
  tarefas.forEach((tarefa) => {
    const li = document.createElement("li");
    li.innerHTML = `
            <span>${tarefa.tarefa}</span>
            <button onclick="removerTarefa(${tarefa.id})" class="remover-btn">Remover</button>
        `;
    listaNomes.appendChild(li);
  });
}

// Função para salvar nova tarefa
async function salvarTarefa() {
  const tarefaTexto = nomeInput.value.trim();
  if (tarefaTexto === "") {
    alert("Por favor, digite uma tarefa!");
    return;
  }

  try {
    const response = await fetch("/tarefas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tarefa: tarefaTexto }),
    });

    if (response.ok) {
      nomeInput.value = "";
      carregarTarefas(); // Recarregar a lista
    } else {
      alert("Erro ao salvar tarefa!");
    }
  } catch (error) {
    console.error("Erro ao salvar tarefa:", error);
    alert("Erro ao salvar tarefa!");
  }
}

// Função para remover tarefa
async function removerTarefa(id) {
  try {
    const response = await fetch(`/tarefas/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      carregarTarefas(); // Recarregar a lista
    } else {
      alert("Erro ao remover tarefa!");
    }
  } catch (error) {
    console.error("Erro ao remover tarefa:", error);
    alert("Erro ao remover tarefa!");
  }
}
