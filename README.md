# API Pet Shop - Agendamento de Serviços

Projeto Final Integrador - Programação Back-End 1 (PBE1) - SENAI / Binário Tech

**Dupla:** Maria Eduarda Gonçalves da Silva e Maély Peixoto Santos  
**Professor/orientador:** Irineu Moura Caldeira  
**Tema:** 3 - Agendamento de Serviços (Pet Shop)

---

## 📋 Sobre o projeto

API RESTful desenvolvida em Node.js com Express para gerenciamento e controle de **clientes** (tutores) e **agendamentos** de serviços para pet shop (banho, tosa, consulta, etc.).

Os dados são armazenados temporariamente em memória durante a execução do servidor. O projeto inclui também um script Bash automatizado para validação de todas as rotas e geração de logs de execução.

---

## 🛠️ Tecnologias Utilizadas

- **Node.js** e **Express**
- **Bash**, **curl** e **jq**
- **Git** e **GitHub**
- **Linux Debian** / Google Cloud Shell

---

## 🚀 Como clonar, instalar e executar

```bash
# 1. Clonar o repositório
git clone https://github.com/mariaflaviasilvasilva-alt/pbe1-projeto-final-agendamento-petshop.git

# 2. Entrar no diretório do projeto
cd pbe1-projeto-final-agendamento-petshop

# 3. Instalar as dependências
npm install

# 4. Iniciar o servidor
npm start
```

*O servidor estará rodando em: http://localhost:3000*

---

## 📌 Endpoints da API

### 1. Clientes (`/clientes`)

| Método | Endpoint | Parâmetros | Descrição |
| :--- | :--- | :--- | :--- |
| **GET** | `/clientes` | Query (opcional): `nome` | Lista todos os clientes. Permite filtro por nome (`?nome=`) |
| **GET** | `/clientes/:id` | Path: `id` | Retorna os detalhes de um cliente específico pelo ID |
| **POST** | `/clientes` | Body: `nome`*, `telefone`*, `email` | Cadastra um novo cliente |
| **PUT** | `/clientes/:id` | Path: `id`<br>Body: `nome`*, `telefone`*, `email` | Atualiza todos os dados do cliente |
| **PATCH** | `/clientes/:id` | Path: `id`<br>Body: campos a alterar | Atualiza parcialmente os dados do cliente |
| **DELETE** | `/clientes/:id` | Path: `id` | Remove o cliente da base de dados |

---

### 2. Agendamentos (`/agendamentos`)

| Método | Endpoint | Parâmetros | Descrição |
| :--- | :--- | :--- | :--- |
| **GET** | `/agendamentos` | Query (opcional): `status`, `servico` | Lista todos os agendamentos com suporte a filtros |
| **GET** | `/agendamentos/:id` | Path: `id` | Retorna os detalhes de um agendamento pelo ID |
| **POST** | `/agendamentos` | Body: `clienteId`*, `nomePet`*, `especie`*, `servico`*, `data`*, `horario`*, `status` (opcional) | Cria um novo agendamento validando o `clienteId` |
| **PUT** | `/agendamentos/:id` | Path: `id`<br>Body: todos os campos obrigatórios | Atualiza completamente os dados do agendamento |
| **PATCH** | `/agendamentos/:id` | Path: `id`<br>Body: campos a alterar | Atualiza parcialmente os dados do agendamento |
| **DELETE** | `/agendamentos/:id` | Path: `id` | Remove o agendamento da base de dados |

`*` = Campos obrigatórios.  
Os valores aceitos para o campo `status` são: `AGENDADO` (padrão ao criar), `CONCLUIDO` ou `CANCELADO`.

### Códigos de status

| Código | Quando acontece |
|--------|-----------------|
| 200 | Consulta, atualização ou remoção com sucesso |
| 201 | Cadastro criado com sucesso |
| 400 | Falta algum campo obrigatório (ou o status é inválido) |
| 404 | O ID não existe (ou o `clienteId` do agendamento não existe) |

---

## 🧪 Script de automação

O arquivo `testes_automacao.sh` testa todas as rotas com `curl`, formata as respostas com `jq` e confere os status esperados. Com o servidor ligado, em outro terminal:

```bash
chmod +x testes_automacao.sh
./testes_automacao.sh > resultado_execucao.log 2>&1
cat resultado_execucao.log
```

Saída registrada no arquivo resultado_execucao.log:

```bash
==============================================
 TESTES DA API - PET SHOP - 03/11/2026 02:10:38
==============================================

##### 1. CADASTRAR CLIENTE #####

>>> POST /clientes
>>> Corpo: {"nome":"Maria Souza","telefone":"11999990000","email":"maria@email.com"}
Status recebido: 201
{
  "id": 1,
  "nome": "Maria Souza",
  "telefone": "11999990000",
  "email": "maria@email.com"
}
Resultado: OK (esperado 201)
ID do cliente criado: 1

##### 2. LISTAR E BUSCAR CLIENTES #####

>>> GET /clientes
Status recebido: 200
[
  {
    "id": 1,
    "nome": "Maria Souza",
    "telefone": "11999990000",
    "email": "maria@email.com"
  }
]
Resultado: OK (esperado 200)

>>> GET /clientes/1
Status recebido: 200
{
  "id": 1,
  "nome": "Maria Souza",
  "telefone": "11999990000",
  "email": "maria@email.com"
}
Resultado: OK (esperado 200)

>>> GET /clientes?nome=maria
Status recebido: 200
[
  {
    "id": 1,
    "nome": "Maria Souza",
    "telefone": "11999990000",
    "email": "maria@email.com"
  }
]
Resultado: OK (esperado 200)

##### 3. ATUALIZAR CLIENTE (PUT E PATCH) #####

>>> PUT /clientes/1
>>> Corpo: {"nome":"Maria Souza Lima","telefone":"11988887777","email":"maria.lima@email.com"}
Status recebido: 200
{
  "id": 1,
  "nome": "Maria Souza Lima",
  "telefone": "11988887777",
  "email": "maria.lima@email.com"
}
Resultado: OK (esperado 200)

>>> PATCH /clientes/1
>>> Corpo: {"telefone":"11977776666"}
Status recebido: 200
{
  "id": 1,
  "nome": "Maria Souza Lima",
  "telefone": "11977776666",
  "email": "maria.lima@email.com"
}
Resultado: OK (esperado 200)

##### 4. CRIAR AGENDAMENTO #####

>>> POST /agendamentos
>>> Corpo: {"clienteId":1,"nomePet":"Thor","especie":"Cachorro","servico":"banho","data":"2026-12-10","horario":"14:00"}
Status recebido: 201
{
  "id": 1,
  "clienteId": 1,
  "nomePet": "Thor",
  "especie": "Cachorro",
  "servico": "banho",
  "data": "2026-12-10", 
  "horario": "14:00",
  "status": "AGENDADO"
}
Resultado: OK (esperado 201)
ID do agendamento criado: 1

>>> GET /agendamentos
Status recebido: 200
[
  {
    "id": 1,
    "clienteId": 1,
    "nomePet": "Thor",
    "especie": "Cachorro",
    "servico": "banho",
    "data": "2026-12-10",
    "horario": "14:00",
    "status": "AGENDADO"
  }
]
Resultado: OK (esperado 200)

>>> GET /agendamentos/1
Status recebido: 200
{
  "id": 1,
  "clienteId": 1,
  "nomePet": "Thor",
  "especie": "Cachorro",
  "servico": "banho",
  "data": "2026-12-10",
  "horario": "14:00",
  "status": "AGENDADO"
}
Resultado: OK (esperado 200)

##### 5. ATUALIZAR AGENDAMENTO (PUT E PATCH) #####

>>> PUT /agendamentos/1
>>> Corpo: {"clienteId":1,"nomePet":"Thor","especie":"Cachorro","servico":"tosa","data":"2026-12-11","horario":"15:00","status":"AGENDADO"}
Status recebido: 200
{
  "id": 1,
  "clienteId": 1,
  "nomePet": "Thor",
  "especie": "Cachorro",
  "servico": "tosa",
  "data": "2026-12-11",
  "horario": "15:00",
  "status": "AGENDADO"
}
Resultado: OK (esperado 200)

>>> PATCH /agendamentos/1
>>> Corpo: {"status":"CONCLUIDO"}
Status recebido: 200
{
  "id": 1,
  "clienteId": 1,
  "nomePet": "Thor",
  "especie": "Cachorro",
  "servico": "tosa",
  "data": "2026-12-11",
  "horario": "15:00",
  "status": "CONCLUIDO"
}
Resultado: OK (esperado 200)

##### 6. TESTAR FILTROS #####

>>> GET /agendamentos?status=CONCLUIDO
Status recebido: 200
[
  {
    "id": 1,
    "clienteId": 1,
    "nomePet": "Thor",
    "especie": "Cachorro",
    "servico": "tosa",
    "data": "2026-12-11",
    "horario": "15:00",
    "status": "CONCLUIDO"
  }
]
Resultado: OK (esperado 200)

>>> GET /agendamentos?servico=tosa
Status recebido: 200
[
  {
    "id": 1,
    "clienteId": 1,
    "nomePet": "Thor",
    "especie": "Cachorro",
    "servico": "tosa",
    "data": "2026-12-11",
    "horario": "15:00",
    "status": "CONCLUIDO"
  }
]
Resultado: OK (esperado 200)

>>> GET /agendamentos?status=CANCELADO
Status recebido: 200
[]
Resultado: OK (esperado 200)

##### 7. TESTAR ERROS (400 E 404) #####

>>> POST /clientes
>>> Corpo: {"nome":"Sem Telefone"}
Status recebido: 400
{
  "erro": "Campo(s) obrigatório(s) ausente(s): telefone"
}
Resultado: OK (esperado 400)

>>> POST /agendamentos
>>> Corpo: {"clienteId":1,"nomePet":"Rex"}
Status recebido: 400
{
  "erro": "Campo(s) obrigatório(s) ausente(s): especie, servico, data, horario"
}
Resultado: OK (esperado 400)

>>> GET /clientes/9999
Status recebido: 404
{
  "erro": "Cliente não encontrado"
}
Resultado: OK (esperado 404)

>>> GET /agendamentos/9999
Status recebido: 404
{
  "erro": "Agendamento não encontrado"
}
Resultado: OK (esperado 404)

>>> POST /agendamentos
>>> Corpo: {"clienteId":9999,"nomePet":"Rex","especie":"Cachorro","servico":"banho","data":"2026-12-10","horario":"10:00"}
Status recebido: 404
{
  "erro": "Cliente não encontrado para o clienteId informado"
}
Resultado: OK (esperado 404)

>>> PUT /clientes/9999
>>> Corpo: {"nome":"X","telefone":"1"}
Status recebido: 404
{
  "erro": "Cliente não encontrado"
}
Resultado: OK (esperado 404)

>>> PATCH /agendamentos/9999
>>> Corpo: {"status":"CANCELADO"}
Status recebido: 404
{
  "erro": "Agendamento não encontrado"
}
Resultado: OK (esperado 404)

>>> DELETE /clientes/9999
Status recebido: 404
{
  "erro": "Cliente não encontrado"
}
Resultado: OK (esperado 404)

##### 8. REMOVER OS REGISTROS CRIADOS #####

>>> DELETE /agendamentos/1
Status recebido: 200
{
  "mensagem": "Agendamento removido com sucesso",
  "agendamento": {
    "id": 1,
    "clienteId": 1,
    "nomePet": "Thor",
    "especie": "Cachorro",
    "servico": "tosa",
    "data": "2026-12-11",
    "horario": "15:00",
    "status": "CONCLUIDO"
  }
}
Resultado: OK (esperado 200)

>>> DELETE /clientes/1
Status recebido: 200
{
  "mensagem": "Cliente removido com sucesso",
  "cliente": {
    "id": 1,
    "nome": "Maria Souza Lima",
    "telefone": "11977776666",
    "email": "maria.lima@email.com"
  }
}
Resultado: OK (esperado 200)

>>> GET /clientes/1
Status recebido: 404
{
  "erro": "Cliente não encontrado"
}
Resultado: OK (esperado 404)

==============================================
 FIM: todos os testes passaram.
==============================================
```

---

## ⚙️ Processos em background

Para deixar o servidor rodando e continuar usando o mesmo terminal:

```bash
node server.js &
ps aux | grep node
kill -9 <PID>
```

- `&` roda o servidor em segundo plano.
- `ps aux | grep node` mostra os processos do Node. O número da segunda coluna é o PID.
- `kill -9 <PID>` encerra o processo à força (troque `<PID>` pelo número).

---

## ❗ Possíveis erros e como resolver

| Erro | Causa | Como resolver |
|------|-------|---------------|
| `Cannot find module 'express'` | Esqueceu de rodar o `npm install` | Rode `npm install` na pasta do projeto |
| `Error: listen EADDRINUSE :::3000` | A porta 3000 já está em uso (um servidor antigo ficou rodando) | Rode `ps aux \| grep node`, ache o PID e use `kill -9 <PID>` |
| O servidor antigo volta sozinho | O PM2 está mantendo o processo ativo | Rode `pm2 list` e depois `pm2 delete all` |
| `Permission denied` ao rodar o script | Falta permissão de execução | Rode `chmod +x testes_automacao.sh` |
| `curl: (7) Failed to connect` ou "servidor fora do ar" | O servidor não está ligado | Rode `npm start` em outro terminal |
| `jq: command not found` | O jq não está instalado | Rode `sudo apt install jq` |
| `git push` pede senha e recusa | O GitHub não aceita senha | Use o token de acesso pessoal no lugar da senha |
| `git push` rejeitado (rejected) | A outra pessoa enviou algo antes | Rode `git pull` e tente o `git push` de novo |
| `Missing script: "start"` | O package.json não tem o script start, ou o bloco "scripts" está errado | Rode `npm run` para ver os scripts e deixe `"start": "node server.js"` dentro de "scripts" |
| `Cannot PUT /agendamentos/1` (página HTML de erro) | A rota não existe no servidor que está rodando, porque o código mudou e o servidor não foi reiniciado | Pare com `Ctrl + C` e rode `npm start` de novo |
| `node_modules` aparecendo no `git status` | Falta o arquivo `.gitignore` | Crie o `.gitignore` com a linha `node_modules/` e rode `git rm -r --cached node_modules` |
| `git pull` recusado por arquivo local com o mesmo nome | Existe um arquivo que o Git não acompanha igual a um que está no GitHub | Mova o arquivo com `mv` e rode `git pull` de novo |

---

## 🕒 Histórico de atualizações

O histórico completo também está na aba **Commits** do repositório no GitHub.

**05/11/2026**
- Atualização do Histórico de atualização - README (Maély Peixoto)

**05/11/2026**
- Adiciona .gitignore para ignorar node_modules

**02/11/2026**
- Remove node_modules do repositório

**02/11/2026**
- Atualiza README com saída do log e atualização do histórico de atualizações

**02/11/2026**
- Adiciona resultado_execucao.log

**02/11/2026**
- Adiciona README com endpoints e erros comuns. Junto com o Histórico de Atualizações - README (Maria Eduarda)

**02/11/2026**
- Adiciona script de testes: agendamentos, filtros e erros

**02/11/2026**
- Adiciona script de testes: base e clientes

**02/11/2026**
- Adiciona rotas PUT, PATCH e DELETE de agendamentos

**02/11/2026**
- Adiciona rotas GET e POST de agendamentos

**02/11/2026**
- Fix formatting in README for API documentation

**02/11/2026**
- Update README.md

**02/11/2026**
- Adiciona rotas PUT, PATCH e DELETE de clientes

**02/11/2026**
- Adiciona rotas GET e POST de clientes

**02/11/2026**
- Adiciona base do servidor

**02/11/2026**
- Inicia projeto Node com Express e script start

**02/11/2026**
- Primeiro commit - Inicializando projeto

---

## 📚 Resumo dos comandos

| Comando | Para que serve |
|---------|----------------|
| `git clone <url>` | Baixa o repositório do GitHub |
| `npm install` | Instala as dependências do projeto |
| `npm start` | Liga o servidor (`node server.js`) |
| `node server.js &` | Liga o servidor em segundo plano |
| `ps aux \| grep node` | Mostra os processos do Node e seus PIDs |
| `kill -9 <PID>` | Encerra um processo à força |
| `chmod +x testes_automacao.sh` | Dá permissão para rodar o script |
| `./testes_automacao.sh > resultado_execucao.log 2>&1` | Roda os testes e salva tudo no log |
| `git pull` | Baixa as mudanças mais recentes do GitHub |
| `git add .` | Marca os arquivos alterados para o commit |
| `git commit -m "mensagem"` | Salva as alterações com uma mensagem |
| `git push` | Envia os commits para o GitHub |
