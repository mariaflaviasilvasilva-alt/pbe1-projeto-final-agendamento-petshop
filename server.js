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


// Atualizar tudo (PUT)
app.put('/clientes/:id', (req, res) => {
  const cliente = buscarCliente(req.params.id);
  if (!cliente) return erro404(res, 'Cliente não encontrado');

  const body = req.body || {};
  const faltando = camposFaltando(body, ['nome', 'telefone']);
  if (faltando.length > 0) {
    return erro400(res, `Campo(s) obrigatório(s) ausente(s): ${faltando.join(', ')}`);
  }

  cliente.nome = body.nome;
  cliente.telefone = body.telefone;
  cliente.email = body.email || null;
  res.status(200).json(cliente);
});

// Atualizar só alguns campos (PATCH)
app.patch('/clientes/:id', (req, res) => {
  const cliente = buscarCliente(req.params.id);
  if (!cliente) return erro404(res, 'Cliente não encontrado');

  const body = req.body || {};
  const vazios = ['nome', 'telefone'].filter(
    (c) => body[c] !== undefined && String(body[c]).trim() === ''
  );
  if (vazios.length > 0) {
    return erro400(res, `Campo(s) não podem ficar vazios: ${vazios.join(', ')}`);
  }

  ['nome', 'telefone', 'email'].forEach((c) => {
    if (body[c] !== undefined) cliente[c] = body[c];
  });
  res.status(200).json(cliente);
});

// Remover
app.delete('/clientes/:id', (req, res) => {
  const indice = clientes.findIndex((c) => c.id === Number(req.params.id));
  if (indice === -1) return erro404(res, 'Cliente não encontrado');

  const removido = clientes.splice(indice, 1)[0];
  res.status(200).json({ mensagem: 'Cliente removido com sucesso', cliente: removido });
});

// ===================== AGENDAMENTOS =====================
// (Maély cola as rotas de agendamentos logo abaixo desta linha)


app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
