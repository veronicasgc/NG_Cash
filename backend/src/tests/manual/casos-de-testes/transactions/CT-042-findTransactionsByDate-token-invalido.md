# CT-042 Find Transactions By Date - Token Inválido

## Objetivo

Validar o comportamento da API ao consultar transações por data utilizando um token de autenticação inválido.

## Pré-condição

ID válido informado.

Data válida informada.

Token inválido informado nos Headers.

## Passos

1. Informar um id válido via Query Params.
2. Informar uma data válida.
3. Informar um token inválido no Header authorization.
4. Executar endpoint GET /transaction/date.

## Resultado esperado

- Status Code 400 ou 401.
- Mensagem informando que o token é inválido ou que o acesso não foi autorizado.
- A consulta não deve ser executada.

## Resultado obtido

Status Code: 400 Bad Request.

Mensagem: "invalid signature".

A consulta não foi executada devido à falha na validação do token.

## Evidência

Arquivo: evidencias/transactions/044-findTransactionsByDate-token-invalido.png

## Status

APROVADO