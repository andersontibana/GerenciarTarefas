import express from "express";
import path from "path";
import cors from "cors";

// Configuração do Express

const app = express();
const PORT = 3000;
const tarefas = [
  {
    id: 1,
    tarefa: "Lavar o carro",
  },
  { id: 2, tarefa: "sair" },
];

let id = tarefas.length;

// Middleware para parsing JSON
app.use(express.json());

// Middleware para CORS
app.use(cors());

// Middleware para servir arquivos estáticos
app.use(express.static("public"));

// Rota para a página inicial
app.get("/", (req, res) => {
  res.sendFile(path.join(path.resolve(), "public", "index.html"));
});

// Função para ler tarefas do arquivo

// GET - Listar todas as tarefas
app.get("/tarefas", async (req, res) => {
  try {
    res.json(tarefas);
  } catch (error) {
    res.status(500).json({ erro: "Erro interno do servidor" });
  }
});

// GET - Buscar tarefa por id
app.get("/tarefas/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!id) {
    return res.status(400).json({ message: "Id inválido" });
  }
  const tarefa = tarefas.find((t) => t.id === id);
  if (!tarefa) {
    return res.status(404).json({ erro: "Tarefa não encontrada" });
  }
  res.json(tarefa);
});

// POST - Criar nova tarefa
app.post("/tarefas", (req, res) => {
  const { tarefa } = req.body;
  id++;
  const novaTarefa = { id: id, tarefa: tarefa };
  tarefas.push(novaTarefa);
  res
    .status(201)
    .json({ message: "Tarefa adicionada com sucesso!", tarefa: novaTarefa });
});

//excluir tarefa
app.delete("/tarefas/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!id) {
    res.status(400).json({ message: "Id inválido" });
  }
  const tarefa = tarefas.findIndex((t) => t.id === id);
  if (tarefa === -1) {
    return res.status(404).json({ erro: "Tarefa não encontrada" });
  }
  console.log(tarefa);
  tarefas.splice(tarefa, 1);
  res.status(200).json({ message: "Tarefa removida com sucesso" });
});

// PUT - Atualizar tarefa
app.put("/tarefas/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { tarefa } = req.body;
    const buscaTarefa = tarefas.findIndex((t) => t.id === id);
    if (buscaTarefa === -1) {
      return res.status(404).json({ message: "Tarefa não encontrada" });
    }
    tarefas[buscaTarefa].tarefa = tarefa;
    res.status(200).json({
      message: "Tarefa atualizada com sucesso",
      tarefa: tarefas[buscaTarefa],
    });
  } catch (error) {
    res.status(500).json({ erro: "Erro interno do servidor" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
// No início do arquivo server.js, após importar o express, adicione:
