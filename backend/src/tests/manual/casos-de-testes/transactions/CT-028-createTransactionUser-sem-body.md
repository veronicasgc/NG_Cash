# CT-028 Create-Transaction sem body

## Objetivo

Validar o comportamento da API ao tentar realizar uma transação sem informar os dados obrigatórios no corpo da requisição.

## Pré-condição

Usuário autenticado no sistema.

Token válido informado nos Headers.

Body da requisição vazio.

## Passos

1. Informar token válido no header authorization.
2. Não informar nenhum dado no corpo da requisição ({}).
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

Arquivo: evidencias/transactions/030-createTransactionUser-sem-body.png

## Status

APROVADO