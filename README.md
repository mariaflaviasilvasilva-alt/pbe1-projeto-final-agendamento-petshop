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
# 1. Clocar o repositório
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


