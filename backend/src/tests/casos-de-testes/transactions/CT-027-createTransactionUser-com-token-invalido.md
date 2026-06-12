# CT-027 Create-Transaction com token inválido

## Objetivo

Validar o comportamento da API ao tentar realizar uma transação utilizando um token de autenticação inválido.

## Pré-condição

Conta de origem válida.

Conta de destino válida.

Dados da transação preenchidos corretamente.

Token inválido informado nos Headers.

## Passos

1. Informar conta de origem válida.
2. Informar conta de destino válida.
3. Informar valor válido para transferência.
4. Informar data da transação.
5. Informar token inválido no header authorization.
6. Executar endpoint POST /transaction/add.

## Resultado esperado

- Status Code 400.
- Mensagem informando que o token é inválido.
- Transação não realizada.

## Resultado obtido

Status Code: 400 Bad Request.

Mensagem: "invalid signature".

Transação não realizada.

## Evidência

Arquivo: evidencias/transactions/029-createTransactionUser-token-invalido.png

## Status

APROVADO