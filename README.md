# API Pet Shop - Agendamento de Serviços

Projeto Final Integrador - Programação Back-End 1 (PBE1) - SENAI / Binário Tech

**Dupla:** Maria Eduarda Gonçalves da Silva e Maély Peixoto Santos  
**Professor/orientador:** Irineu Moura Caldeira  
**Tema:** 3 - Agendamento de Serviços (Pet Shop)

---

## 📋 Sobre o projeto

API RESTful desenvolvida em Server.js com Express para gerenciamento e controle de **clientes** (tutores) e **agendamentos** de serviços para pet shop (banho, tosa, consulta, etc.). 

Os dados são armazenados temporariamente em memória durante a execução do servidor. O projeto inclui também um script Bash automatizado para validação de todas as rotas e geração de logs de execução.

---

##  Tecnologias Utilizadas

- **Server.js** e **Express**
- **Bash**, **curl** e **jq**
- **Git** e **GitHub**
- **Linux Debian** / Google Cloud Shell

---

##  Como clonar, instalar e executar

```bash
# 1. Clonar o repositório
git clone [https://github.com/mariaflaviasilvasilva-alt/pbe1-projeto-final-agendamento-petshop.git](https://github.com/mariaflaviasilvasilva-alt/pbe1-projeto-final-agendamento-petshop.git)

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
| **POST** | `/agendamentos` | Body: `clienteId`*, `nomePet`*, `especie`*, `servico`*, `data`*, `horario`*, `status` | Cria um novo agendamento validando o `clienteId` |
| **PUT** | `/agendamentos/:id` | Path: `id`<br>Body: todos os campos obrigatórios | Atualiza completamente os dados do agendamento |
| **PATCH** | `/agendamentos/:id` | Path: `id`<br>Body: campos a alterar | Atualiza parcialmente os dados do agendamento |
| **DELETE** | `/agendamentos/:id` | Path: `id` | Remove o agendamento da base de dados |

`*` = Campos obrigatórios.  
Os valores aceites para o campo `status` são: `AGENDADO` (padrão ao criar), `CONCLUIDO` ou `CANCELADO`.

### Códigos de status

| Código | Quando acontece |
|--------|-----------------|
| 200 | Consulta, atualização ou remoção com sucesso |
| 201 | Cadastro criado com sucesso |
| 400 | Falta algum campo obrigatório (ou o status é inválido) |
| 404 | O ID não existe (ou o `clienteId` do agendamento não existe) |

## Script de automação

O arquivo `testes_automacao.sh` testa todas as rotas com `curl`, formata as respostas com `jq` e confere os status esperados. Com o servidor ligado, em outro terminal:

```bash
chmod +x testes_automacao.sh
./testes_automacao.sh > resultado_execucao.log 2>&1
cat resultado_execucao.log
```

Saída do terminal (colar aqui a saída real, em texto, depois de rodar):

```
(colar aqui o conteúdo do resultado_execucao.log)
```

## Processos em background

Para deixar o servidor rodando e continuar usando o mesmo terminal:

```bash
node server.js &
ps aux | grep node
kill -9 <PID>
```

- `&` roda o servidor em segundo plano.
- `ps aux | grep node` mostra os processos do Node. O número da segunda coluna é o PID.
- `kill -9 <PID>` encerra o processo à força (troque `<PID>` pelo número).

## Possíveis erros e como resolver

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

## Histórico de atualizações

O histórico completo está na aba **Commits** do repositório no GitHub.

## Resumo dos comandos

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

```
-----------------------------------------------------------------

>Histórico de Atualizações

**02/11/2026**
- Adiciona README com endpoints e erros comuns. Junto com o Histórico de Atualizações

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
