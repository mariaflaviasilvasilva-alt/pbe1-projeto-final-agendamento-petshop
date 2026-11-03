const express = require('express');

const app = express();
const PORT = 3000;

// Faz o servidor entender o JSON que chega no corpo (body) das requisições
app.use(express.json());

// Dados em memória (somem quando o servidor é desligado)
let clientes = [];
let agendamentos = [];
let proximoClienteId = 1;
let proximoAgendamentoId = 1;

const STATUS_VALIDOS = ['AGENDADO', 'CONCLUIDO', 'CANCELADO'];

// Devolve a lista de campos obrigatórios que estão faltando (ou vazios)
function camposFaltando(body, campos) {
  return campos.filter(
    (c) => body[c] === undefined || body[c] === null || String(body[c]).trim() === ''
  );
}

function buscarCliente(id) {
  return clientes.find((c) => c.id === Number(id));
}

function buscarAgendamento(id) {
  return agendamentos.find((a) => a.id === Number(id));
}

function statusInvalido(status) {
  return status !== undefined && !STATUS_VALIDOS.includes(String(status).toUpperCase());
}

function erro400(res, mensagem) {
  return res.status(400).json({ erro: mensagem });
}

function erro404(res, mensagem) {
  return res.status(404).json({ erro: mensagem });
}

// ===================== CLIENTES =====================
// Listar (com filtro opcional ?nome=)
app.get('/clientes', (req, res) => {
  const { nome } = req.query;
  let resultado = clientes;

  if (nome) {
    resultado = resultado.filter((c) =>
      c.nome.toLowerCase().includes(String(nome).toLowerCase())
    );
  }

  res.status(200).json(resultado);
});

// Buscar por ID
app.get('/clientes/:id', (req, res) => {
  const cliente = buscarCliente(req.params.id);
  if (!cliente) return erro404(res, 'Cliente não encontrado');
  res.status(200).json(cliente);
});

// Criar
app.post('/clientes', (req, res) => {
  const body = req.body || {};
  const faltando = camposFaltando(body, ['nome', 'telefone']);
  if (faltando.length > 0) {
    return erro400(res, `Campo(s) obrigatório(s) ausente(s): ${faltando.join(', ')}`);
  }

  const novo = {
    id: proximoClienteId++,
    nome: body.nome,
    telefone: body.telefone,
    email: body.email || null,
  };
  clientes.push(novo);
  res.status(201).json(novo);
});

// ===================== AGENDAMENTOS =====================
// (Maély cola as rotas de agendamentos logo abaixo desta linha)


app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
