<h1 align="center"> 💳 NG Cash API</h1>

<p align="center">
API backend que simula um sistema bancário simplificado com autenticação de usuários, controle de saldo e registro de transações financeiras.
</p>

---

## ⚙ Tecnologias utilizadas

<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge"/>
<img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white"/>
<img src="https://img.shields.io/badge/Knex.js-DAA520?style=for-the-badge"/>
<img src="https://img.shields.io/badge/JWT-black?style=for-the-badge"/>
<img src="https://img.shields.io/badge/Bcrypt-338033?style=for-the-badge"/>

---

## 📌 Funcionalidades

- Cadastro de usuário com criação automática de conta  
- Autenticação via JWT  
- Consulta de saldo  
- Transferência entre contas (cash in / cash out)  
- Histórico de transações  
- Busca de transações por data  
- Validação para impedir saldo negativo  

---

## 📃 Documentação da API

A documentação completa com exemplos de requisição e resposta está disponível:

👉 <a href="https://documenter.getpostman.com/view/21025086/2s8Yt1qozv">Postman</a>

---

## 👨‍💻 Como rodar o projeto

Clone o repositório:
git clone <seu-link>

Instale dependências:
npm install

Crie um arquivo `.env` na raiz:

```env
DB_USERNAME=
DB_DATABASE=
DB_HOSTNAME=
DB_PASSWORD=
DB_PORT=5432
JWT_KEY=
```


Crie as tabelas utilizando o arquivo:
queries.sql


Inicie o servidor:
npm run dev


---

## 🏗 Arquitetura

O projeto foi estruturado em camadas:

- Controller → entrada e saída HTTP  
- Business → regras de negócio  
- Data → acesso ao banco  
- Services → autenticação e criptografia  
- Error → tratamento de erros  

---

## 🚀 Melhorias futuras

- Testes automatizados  
- Paginação de transações  
- Deploy em cloud  
- Logs estruturados  
- Versionamento da API








