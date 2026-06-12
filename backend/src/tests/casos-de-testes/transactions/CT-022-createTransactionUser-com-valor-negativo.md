# CT-022 Create-Transaction com valor negativo

## Objetivo

Validar o comportamento da API ao tentar realizar uma transferência utilizando um valor negativo.

## Pré-condição

Usuário autenticado no sistema.

Conta de origem válida.

Conta de destino válida.

Token válido informado nos Headers.

## Passos

1. Informar conta de origem válida.
2. Informar conta de destino válida.
3. Informar valor negativo para a transferência.
4. Informar data da transação.
5. Executar endpoint POST /transaction/add.

## Resultado esperado

- Status Code 400.
- Mensagem informando que o valor da transação é inválido.
- Transação não realizada.
- Nenhuma alteração no saldo das contas envolvidas.

## Resultado obtido

Status Code: 400 Bad Request.

Mensagem: "Invalid transaction value".

Transação não realizada.

## Evidência

Arquivo: evidencias/transactions/024-createTransactionUser-valor-negativo.png

## Status

APROVADO