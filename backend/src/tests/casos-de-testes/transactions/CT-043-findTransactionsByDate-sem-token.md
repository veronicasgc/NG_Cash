# CT-043 Find Transactions By Date - Sem Token

## Objetivo

Validar o comportamento da API ao consultar transações por data sem informar o token de autenticação.

## Pré-condição

ID válido informado.

Data válida informada.

Token ausente nos Headers.

## Passos

1. Informar um id válido via Query Params.
2. Informar uma data válida.
3. Não informar o Header authorization.
4. Executar endpoint GET /transaction/date.

## Resultado esperado

- Status Code 400 ou 401.
- Mensagem informando que o token deve ser informado para realizar a consulta.
- A consulta não deve ser executada.

## Resultado obtido

Status Code: 400 Bad Request.

Mensagem: "Token needs to be passed in headers".

A consulta não foi executada devido à ausência do token de autenticação.

## Evidência

Arquivo: evidencias/transactions/045-findTransactionsByDate-sem-token.png

## Status

APROVADO