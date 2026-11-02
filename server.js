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
// (Maria Eduarda cola as rotas de clientes logo abaixo desta linha)


// ===================== AGENDAMENTOS =====================
// (Maély cola as rotas de agendamentos logo abaixo desta linha)


app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
