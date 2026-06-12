# CT-029 Create-Transaction com campos vazios

## Objetivo

Validar o comportamento da API ao tentar realizar uma transação informando os campos obrigatórios vazios.

## Pré-condição

Usuário autenticado no sistema.

Token válido informado nos Headers.

Campos da requisição preenchidos com valores vazios.

## Passos

1. Informar token válido no header authorization.
2. Informar os campos debitedaccountid, creditedaccountid, value e createdat vazios.
3. Executar endpoint POST /transaction/add.

## Resultado esperado

- Status Code 400.
- Mensagem informando que existem campos obrigatórios não preenchidos.
- Transação não realizada.

## Resultado obtido

Status Code: 400 Bad Request.

Mensagem: "Missing fields to complete".

Transação não realizada.

## Evidência

Arquivo: evidencias/transactions/031-createTransactionUser-campos-vazios.png

## Status

APROVADO