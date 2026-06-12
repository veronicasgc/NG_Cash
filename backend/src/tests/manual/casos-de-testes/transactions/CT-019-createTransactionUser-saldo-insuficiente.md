# CT-019 Create-Transaction com saldo insuficiente

## Objetivo

Validar o comportamento da API ao tentar realizar uma transferência com valor superior ao saldo disponível na conta de origem.

## Pré-condição

Usuário autenticado.

Conta de origem com saldo insuficiente para realizar a transferência.

Conta de destino válida.

## Passos

1. Informar conta de origem válida.
2. Informar conta de destino válida.
3. Informar valor superior ao saldo disponível.
4. Executar endpoint POST /transaction/add.

## Resultado esperado

- Status Code 400.
- Mensagem informando saldo insuficiente.
- Transação não realizada.
- Saldo das contas permanece inalterado.

## Resultado obtido

Status Code: 400 Bad Request.

Mensagem: "Insufficient funds".

Transação não realizada.

## Evidência

Arquivo: evidencias/transactions/019-createTransactionUser-saldo-insuficiente.png

## Status

APROVADO