# BUG-003 Erro interno no servidor para get-transactions sem Token

## Descrição

Ao deixar o parâmetro de autenticação (token) vazio ou ausente nos cabeçalhos (headers), a API não trata a exceção adequadamente e retorna um erro interno do servidor com Status Code 500. Além disso, a mensagem de resposta apresenta um desvio ortográfico.

## Pré-condição

ID de usuário válido informado via Query Params.

Token ausente ou vazio nos Headers.

## Passos para reprodução

1. Enviar id válido via Query Params (?id=1771440281963).
2. Enviar o header authorization vazio ou não enviar a chave.
3. Executar endpoint GET /getAccount.

## Resultado esperado

- Status Code 401 Unauthorized (ou 400 Bad Request).
- Mensagem indicando que a requisição precisa de um token válido para ser processada.
- Interceptação do erro na camada de autenticação/middleware antes de estourar a execução do backend.

## Resultado obtido

- Status Code: 500 Internal Server Error.
- Mensagem:

"Tokem needs to be passed in headers"

## Impacto

A ausência do cabeçalho de autenticação causa uma falha não tratada no backend (Uncaught Exception), resultando em um status HTTP 500. Isso indica que a aplicação está vulnerável a falhas de execução por entradas malformadas, além de dificultar o diagnóstico correto do erro por parte do cliente da API (Front-end). A mensagem retornada também expõe um erro de grafia ("Tokem" com "m").

## Evidência

Arquivo: evidencias/transactions/015-getTransactionsUser-sem-token.png

## Severidade

Média

## Prioridade

Média