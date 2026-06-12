# CT-026 Create-Transaction sem token

## Objetivo

Validar o comportamento da API ao tentar realizar uma transação sem informar o token de autenticação.

## Pré-condição

Conta de origem válida.

Conta de destino válida.

Dados da transação preenchidos corretamente.

Token não informado nos Headers.

## Passos

1. Informar conta de origem válida.
2. Informar conta de destino válida.
3. Informar valor válido para transferência.
4. Informar data da transação.
5. Não informar o token no header authorization.
6. Executar endpoint POST /transaction/add.

## Resultado esperado

- Status Code 400.
- Mensagem informando que o token deve ser informado.
- Transação não realizada.

## Resultado obtido

Status Code: 400 Bad Request.

Mensagem: "Token needs to be passed in headers".

Transação não realizada.

## Evidência

Arquivo: evidencias/transactions/028-createTransactionUser-sem-token.png

## Status

APROVADO