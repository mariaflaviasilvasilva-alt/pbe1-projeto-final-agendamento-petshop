# API Pet Shop - Agendamento de Serviços 🐶

Projeto Final Integrador - Programação Back-End 1 (PBE1) - SENAI / Binário Tech

**Dupla:** Maria Eduarda Gonçalves da Silva e Maély Peixoto Santos  
**Professor/orientador:** Irineu Moura Caldeira  
**Tema:** 3 - Agendamento de Serviços (Pet Shop)

---

## Sobre o projeto 👩🏽‍💻👩🏻‍💻

API RESTful desenvolvida em Node.js com Express para gerenciamento e controle de **clientes** (tutores) e **agendamentos** de serviços para pet shop (banho, tosa, consulta, etc.).

Os dados são armazenados temporariamente em memória durante a execução do servidor. O projeto inclui também um script Bash automatizado para validação de todas as rotas e geração de logs de execução.

---

## Tecnologias Utilizadas ᯤ🌐

- **Node.js** e **Express**
- **Bash**, **curl** e **jq**
- **Git** e **GitHub**
- **SSH** (acesso ao servidor)
- **Linux Debian** / Google Cloud Shell

---

## Acessando o servidor Linux 🌐🐧

O projeto também foi executado no servidor Linux (Debian) da escola, acessado por SSH:

```bash
# Maria Eduarda
ssh maria.eduarda@10.85.198.243
# Maély
ssh maely.peixoto@10.85.198.243
```

Depois de digitar a senha, o terminal mostra o prompt do servidor:

```bash
maria.eduarda@genesis:~$
maely.peixoto@genesis:~$
```

Daqui em diante é só seguir os passos de clonar, instalar e executar.

---

## Como clonar, instalar e executar 📥 ⚙️ ▶️

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

Saída do `npm install`:

```bash
added 65 packages, and audited 66 packages in 669ms

30 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

> O aviso "New major version of npm available" não é erro, pode ignorar.

Saída do `npm start`:

```bash
> pbe1-projeto-final-agendamento-petshop@1.0.0 start
> node server.js

Servidor rodando em http://localhost:3000
```

Para parar o servidor: `Ctrl + C`.

---

## Endpoints da API 📍

### 1. Clientes (`/clientes`) 🙋🏻‍♂️

| Método | Endpoint | Parâmetros | Descrição |
| :--- | :--- | :--- | :--- |
| **GET** | `/clientes` | Query (opcional): `nome` | Lista todos os clientes. Permite filtro por nome (`?nome=`) |
| **GET** | `/clientes/:id` | Path: `id` | Retorna os detalhes de um cliente específico pelo ID |
| **POST** | `/clientes` | Body: `nome`*, `telefone`*, `email` | Cadastra um novo cliente |
| **PUT** | `/clientes/:id` | Path: `id`<br>Body: `nome`*, `telefone`*, `email` | Atualiza todos os dados do cliente |
| **PATCH** | `/clientes/:id` | Path: `id`<br>Body: campos a alterar | Atualiza parcialmente os dados do cliente |
| **DELETE** | `/clientes/:id` | Path: `id` | Remove o cliente da base de dados |

---

### 2. Agendamentos (`/agendamentos`) 🦮

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

### Códigos de status 👻

| Código | Quando acontece |
|--------|-----------------|
| 200 | Consulta, atualização ou remoção com sucesso |
| 201 | Cadastro criado com sucesso |
| 400 | Falta algum campo obrigatório (ou o status é inválido) |
| 404 | O ID não existe (ou o `clienteId` do agendamento não existe) |

---

## Campos e valores aceitos 📋

### Cliente 👥🤝

| Campo | Obrigatório | Tipo | Exemplo | Observação |
|-------|-------------|------|---------|------------|
| `id` | Gerado pela API | número | `1` | Não precisa enviar. Não se repete, mesmo depois de apagar registros |
| `nome` | Sim | texto | `"Maria Silva"` | Não pode ser vazio. O filtro `?nome=` faz busca parcial e ignora maiúscula/minúscula |
| `telefone` | Sim | texto | `"11912345678"` | Não pode ser vazio |
| `email` | Não | texto | `"maria@email.com"` | Se não for informado, fica salvo como `null` |

### Agendamento 🗓️✎ᝰ.

| Campo | Obrigatório | Tipo | Exemplo | Observação |
|-------|-------------|------|---------|------------|
| `id` | Gerado pela API | número | `8` | Não precisa enviar |
| `clienteId` | Sim | número | `5` | Convertido para número; precisa ser o ID de um cliente existente, senão retorna `404` |
| `nomePet` | Sim | texto | `"Spike"` | Nome do animal (não pode ser vazio) |
| `especie` | Sim | texto | `"Cachorro"` | Texto livre obrigatório (ex.: `"Cachorro"`, `"Gato"`) |
| `servico` | Sim | texto | `"banho"` | Aceita qualquer serviço relacionado a pet shop (ex.: `"banho"`, `"tosa"`, `"consulta"`, `"vacinação"`, `"hidratação"`). O filtro `?servico=` faz busca parcial e ignora maiúscula/minúscula |
| `data` | Sim | texto | `"2026-11-20"` | Texto obrigatório (padrão usado: `AAAA-MM-DD`) |
| `horario` | Sim | texto | `"10:00"` | Texto obrigatório (padrão usado: `HH:MM`) |
| `status` | Não | texto | `"AGENDADO"` | Aceita minúsculas na entrada e converte para maiúsculas |

> **Sobre o campo `servico`:** A API não restringe o cadastro a uma lista fixa. Qualquer serviço relacionado a pet shop pode ser utilizado (como banho, tosa, consulta veterinária, vacinação, corte de unhas, hidratação, entre outros), desde que o campo não seja enviado vazio.

### Status aceitos no agendamento

| Status | Significado |
|--------|-------------|
| `AGENDADO` | Valor padrão ao criar o agendamento |
| `CONCLUIDO` | Serviço já realizado |
| `CANCELADO` | Agendamento cancelado |

Qualquer outro valor de `status` retorna erro `400` (`Status inválido. Use: AGENDADO, CONCLUIDO ou CANCELADO`). No `PATCH`, enviar qualquer campo obrigatório vazio (`""`) também retorna erro `400`.

---

## Script de automação

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

## Testes manuais com curl 🛠️

Além do script, dá para testar cada rota na mão. Com o servidor ligado:

### Cadastrar um cliente (POST)

```bash
curl -X POST http://localhost:3000/clientes \
  -H "Content-Type: application/json" \
  -d '{"nome":"Maria Silva","telefone":"11912345678","email":"maria@email.com"}'
```

```json
{"id":6,"nome":"Maria Silva","telefone":"11912345678","email":"maria@email.com"}
```

### Listar e buscar clientes (GET)

```bash
curl http://localhost:3000/clientes
curl http://localhost:3000/clientes/6
curl "http://localhost:3000/clientes?nome=Maria%20Silva"
```

Para o JSON aparecer formatado, use o `jq`:

```bash
curl http://localhost:3000/clientes | jq .
```

```json
[
  {
    "id": 9,
    "nome": "Maria Silva",
    "telefone": "11912345678",
    "email": "maria@email.com"
  }
]
```

### Atualizar cliente (PUT e PATCH)

```bash
curl -X PUT http://localhost:3000/clientes/5 \
  -H "Content-Type: application/json" \
  -d '{"nome":"Carlos Silva Santos","telefone":"11987654321","email":"carlos.santos@email.com"}'
```

```json
{"id":5,"nome":"Carlos Silva Santos","telefone":"11987654321","email":"carlos.santos@email.com"}
```

```bash
curl -X PATCH http://localhost:3000/clientes/5 \
  -H "Content-Type: application/json" \
  -d '{"telefone":"11900001111"}'
```

```json
{"id":5,"nome":"Carlos Silva Santos","telefone":"11900001111","email":"carlos.santos@email.com"}
```

### Criar e atualizar agendamento

```bash
curl -X POST http://localhost:3000/agendamentos \
  -H "Content-Type: application/json" \
  -d '{"clienteId":5,"nomePet":"Spike","especie":"Cachorro","servico":"banho","data":"2026-11-20","horario":"10:00"}'
```

```json
{"id":8,"clienteId":5,"nomePet":"Spike","especie":"Cachorro","servico":"banho","data":"2026-11-20","horario":"10:00","status":"AGENDADO"}
```

```bash
curl -X PATCH http://localhost:3000/agendamentos/8 \
  -H "Content-Type: application/json" \
  -d '{"status":"CONCLUIDO"}'
```

```json
{"id":8,"clienteId":5,"nomePet":"Spike","especie":"Cachorro","servico":"banho","data":"2026-11-20","horario":"10:00","status":"CONCLUIDO"}
```

Filtrar por status:

```bash
curl "http://localhost:3000/agendamentos?status=AGENDADO" | jq .
```

### Remover (DELETE)

```bash
curl -X DELETE http://localhost:3000/agendamentos/3
```

```json
{"mensagem":"Agendamento removido com sucesso","agendamento":{"id":3,"clienteId":3,"nomePet":"Bob","especie":"Cachorro","servico":"banho","data":"2026-11-20","horario":"10:00","status":"AGENDADO"}}
```

```bash
curl -X DELETE http://localhost:3000/clientes/3
```

```json
{"mensagem":"Cliente removido com sucesso","cliente":{"id":3,"nome":"Carlos Silva Santos","telefone":"11987654321","email":"carlos.santos@email.com"}}
```

### Ver o status HTTP (curl -i)

Cadastro com campo faltando (400):

```bash
curl -i -X POST http://localhost:3000/clientes \
  -H "Content-Type: application/json" \
  -d '{"nome":"Incompleto"}'
```

```http
HTTP/1.1 400 Bad Request
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 56
ETag: W/"38-ffCFvHP5ktSa1Vt+34IxLdgUfmY"
Date: Fri, 06 Nov 2026 15:58:41 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

ID que não existe (404):

```bash
curl -i http://localhost:3000/clientes/9999
```

```http
HTTP/1.1 404 Not Found
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 34
ETag: W/"22-L55ac++QyfspldRA9j+9jWrnE40"
Date: Fri, 06 Nov 2026 15:58:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### Observações do que foi visto nos testes

- Os ids não voltam para 1. Mesmo com a lista vazia, o próximo cliente criado recebeu o id 9.
- Os dados ficam só na memória: se o servidor reiniciar, tudo some.
- Ao remover um cliente, os agendamentos dele continuam existindo (o agendamento 8 continuou depois de remover o cliente 5).
- O filtro `?nome=` não diferencia maiúscula de minúscula (`?nome=maria` achou "Maria Souza").

---

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

---

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
| `Missing script: "start"` | O package.json não tem o script start, ou o bloco "scripts" está errado | Rode `npm run` para ver os scripts e deixe `"start": "node server.js"` dentro de "scripts" |
| `Cannot PUT /agendamentos/1` (página HTML de erro) | A rota não existe no servidor que está rodando, porque o código mudou e o servidor não foi reiniciado | Pare com `Ctrl + C` e rode `npm start` de novo |
| `node_modules` aparecendo no `git status` | Falta o arquivo `.gitignore` | Crie o `.gitignore` com a linha `node_modules/` e rode `git rm -r --cached node_modules` |
| `git pull` recusado por arquivo local com o mesmo nome | Existe um arquivo que o Git não acompanha igual a um que está no GitHub | Mova o arquivo com `mv` e rode `git pull` de novo |
| `Permission denied, please try again.` no `ssh` | Usou o usuário do Windows (`t1dev-t5`) em vez do usuário do servidor | Use `ssh maria.eduarda@10.85.198.243` |
| `curl: (3) URL rejected: Malformed input to a URL function` com `\ -H ...` | Colou o comando com a `\` no meio da linha. A `\` só quebra linha se for o último caractere dela | Escreva o comando em uma linha só, sem a `\`, ou deixe a `\` no final de cada linha |
| `curl: (3) URL rejected: Malformed input to a URL function` com `?nome=Maria Silva` | Espaço dentro da URL | Use aspas e `%20` (`"...?nome=Maria%20Silva"`) ou `curl -G --data-urlencode "nome=Maria Silva" http://localhost:3000/clientes` |
| `{"erro":"Cliente não encontrado"}` ou `{"erro":"Agendamento não encontrado"}` | O ID não existe mais (o script de testes apaga o que cria e os IDs não se repetem) | Liste com `curl http://localhost:3000/clientes` e use um ID que apareça |
| `jq: parse error: Invalid numeric literal` | Usou `curl -i` junto com `\| jq .`. O `-i` mostra os cabeçalhos, que não são JSON | Use `-i` sem o jq, ou o jq sem o `-i` |
| `comando não encontrado` (ex.: `ja .`) | Erro de digitação | Confira o comando antes de dar Enter (o certo é `jq`) |
| `[2]+ Concluído node server` logo depois de subir o servidor | Já tinha um servidor rodando na porta 3000, então o segundo fechou sozinho | Use `ps aux \| grep node`, ache o PID e rode `kill -9 <PID>` antes de subir de novo |

---

## Histórico de atualizações

O histórico completo também está na aba **Commits** do repositório no GitHub.

**12/11/2026**
- Atualiza README com acesso por SSH, testes manuais com curl, novos erros comuns e resumo dos comandos - README (Maria Eduarda)

**05/11/2026**
- Update README.md

**05/11/2026**
- Update README.md

**05/11/2026**
- Update README.md

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

## Resumo dos comandos

| Comando | Para que serve |
|---------|----------------|
| `ssh usuario@ip` | Entra no servidor Linux |
| `ls` | Lista os arquivos da pasta |
| `cd pasta/` | Entra na pasta do projeto |
| `git clone <url>` | Baixa o repositório do GitHub |
| `npm install` | Instala as dependências do projeto |
| `npm start` | Liga o servidor (`node server.js`) |
| `node server.js &` | Liga o servidor em segundo plano |
| `ps aux \| grep node` | Mostra os processos do Node e seus PIDs |
| `kill -9 <PID>` | Encerra um processo à força |
| `chmod +x testes_automacao.sh` | Dá permissão para rodar o script |
| `./testes_automacao.sh > resultado_execucao.log 2>&1` | Roda os testes e salva tudo no log |
| `curl <url>` | Faz uma consulta (GET) |
| `curl -X POST <url> -H "Content-Type: application/json" -d '{...}'` | Cadastra um registro |
| `curl -X PUT <url> -H "Content-Type: application/json" -d '{...}'` | Atualiza o registro inteiro |
| `curl -X PATCH <url> -H "Content-Type: application/json" -d '{...}'` | Atualiza só alguns campos |
| `curl -X DELETE <url>` | Remove um registro |
| `curl -i <url>` | Mostra também o status e os cabeçalhos HTTP |
| `curl <url> \| jq .` | Mostra o JSON formatado |
| `curl -G --data-urlencode "nome=Maria Silva" <url>` | Faz a busca com espaço sem quebrar a URL |
| `git pull` | Baixa as mudanças mais recentes do GitHub |
| `git add .` | Marca os arquivos alterados para o commit |
| `git commit -m "mensagem"` | Salva as alterações com uma mensagem |
| `git push` | Envia os commits para o GitHub |
