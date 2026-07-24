<h1 align="center">💳 NG Cash API</h1>

<p align="center">
Backend de uma API REST para gerenciamento de contas digitais, autenticação de usuários e transferências financeiras entre contas.
</p>

<p align="center">
Desenvolvido com <strong>TypeScript</strong>, arquitetura em camadas, testes automatizados e integração contínua utilizando <strong>GitHub Actions</strong>.
</p>

---

## 🚀 Sobre o projeto

O NG Cash é uma API que simula um sistema bancário simplificado, permitindo que usuários realizem cadastro, autenticação, consulta de saldo e transferências financeiras entre contas.

Durante o desenvolvimento foram aplicados conceitos de arquitetura em camadas, autenticação JWT, testes automatizados e integração contínua, buscando aproximar o projeto de um ambiente profissional.

---

## ⚙️ Tecnologias utilizadas

<p>

<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white"/>
<img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge"/>
<img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white"/>
<img src="https://img.shields.io/badge/Knex.js-DAA520?style=for-the-badge"/>
<img src="https://img.shields.io/badge/JWT-black?style=for-the-badge"/>
<img src="https://img.shields.io/badge/Bcrypt-338033?style=for-the-badge"/>
<img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white"/>
<img src="https://img.shields.io/badge/Supertest-000000?style=for-the-badge"/>
<img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white"/>

</p>

---

## 📌 Funcionalidades

- ✅ Cadastro de usuários
- ✅ Criação automática de conta bancária
- ✅ Login com autenticação JWT
- ✅ Consulta de saldo
- ✅ Transferências entre contas (Cash In / Cash Out)
- ✅ Histórico completo de transações
- ✅ Busca de transações por data
- ✅ Validações de regras de negócio
- ✅ Tratamento centralizado de erros

---

## 🧪 Testes automatizados

O projeto possui:

- ✅ Testes unitários utilizando Jest
- ✅ Testes de integração utilizando Supertest
- ✅ Helpers para criação dinâmica de usuários de teste
- ✅ Helpers para criação dinâmica de transações
- ✅ Testes independentes de dados previamente existentes no banco
- ✅ Encerramento automático das conexões com PostgreSQL após a execução dos testes

Executar todos os testes:

```bash
npm test
```

Executar apenas os testes unitários:

```bash
npm run test:unit
```

Executar apenas os testes de integração:

```bash
npm run test:integration
```

---

## 🔄 Integração Contínua (CI)

O projeto utiliza **GitHub Actions** para automatizar o processo de integração contínua.

A cada push para o repositório, a pipeline executa automaticamente:

- instalação das dependências
- build da aplicação
- execução dos testes automatizados

Essa abordagem garante que o projeto permaneça funcional independentemente do ambiente onde for executado.

---

## 📚 Documentação da API

A documentação completa da API, contendo exemplos de requisição e resposta, está disponível no Postman:

👉 https://documenter.getpostman.com/view/21025086/2s8Yt1qozv

---

## 👨‍💻 Como executar o projeto

### Clone o repositório

```bash
git clone <URL_DO_REPOSITORIO>
```

### Acesse a pasta

```bash
cd ng_cash
```

### Instale as dependências

```bash
npm install
```

### Configure o arquivo .env

```env
DB_USERNAME=
DB_DATABASE=
DB_HOSTNAME=
DB_PASSWORD=
DB_PORT=5432

JWT_KEY=
```

### Crie as tabelas

Execute os scripts disponíveis em:

```
queries.sql
```

### Execute a aplicação

```bash
npm run dev
```

---

## 🏗 Arquitetura

O projeto foi desenvolvido utilizando arquitetura em camadas.

```
src
│
├── business
│
├── controller
│
├── data
│
├── error
│
├── model
│
├── router
│
├── services
│
└── tests
    ├── helpers
    ├── integration
    └── unit
```

Cada camada possui uma responsabilidade específica:

- **Controller:** recebe as requisições HTTP e envia as respostas.
- **Business:** concentra toda a regra de negócio.
- **Data:** comunicação com o banco de dados.
- **Services:** autenticação JWT, criptografia e serviços auxiliares.
- **Error:** tratamento centralizado das exceções.
- **Tests:** testes unitários, integração e helpers reutilizáveis.

---

## 📚 Principais aprendizados

Durante o desenvolvimento deste projeto foram aprofundados conhecimentos em:

- Arquitetura em camadas
- TypeScript
- PostgreSQL
- Knex
- Express
- Autenticação JWT
- Criptografia com Bcrypt
- Testes unitários com Jest
- Testes de integração com Supertest
- Criação dinâmica de dados para testes
- Isolamento de testes
- GitHub Actions
- Integração Contínua (CI)
- Encerramento correto das conexões com banco de dados

---

## 🚀 Melhorias futuras

- Docker
- Deploy em cloud
- Documentação OpenAPI (Swagger)
- Cobertura de testes (Coverage)
- Rate Limiting
- Refresh Token
- Logs estruturados
- Monitoramento da aplicação

---

## 👩‍💻 Desenvolvedora

Desenvolvido por **Verônica Silveira**.

GitHub:
https://github.com/veronicasgc
