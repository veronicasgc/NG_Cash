# CT-024 Create-Transaction com conta destino inexistente

## Objetivo

Validar o comportamento da API ao tentar realizar uma transferência para uma conta de destino não cadastrada no sistema.

## Pré-condição

Usuário autenticado no sistema.

Conta de origem válida.

Conta de destino inexistente.

Token válido informado nos Headers.

## Passos

1. Informar conta de origem válida.
2. Informar conta de destino inexistente.
3. Informar valor válido para transferência.
4. Informar data da transação.
5. Executar endpoint POST /transaction/add.

## Resultado esperado

- Status Code 400.
- Mensagem informando que a conta de destino não foi encontrada.
- Transação não realizada.
- Nenhuma alteração no saldo das contas.

## Resultado obtido

Status Code: 400 Bad Request.

Mensagem: "Credited account not found".

Transação não realizada.

## Evidência

Arquivo: evidencias/transactions/026-createTransactionUser-conta-destino-inexistente.png

## Status

APROVADO