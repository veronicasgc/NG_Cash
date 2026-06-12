# CT-020 Create-Transaction com saldo suficiente

## Objetivo

Validar o comportamento da API ao realizar uma transferência entre contas com saldo suficiente disponível na conta de origem.

## Pré-condição

Usuário autenticado no sistema.

Conta de origem com saldo disponível para realizar a transferência.

Conta de destino válida e cadastrada no sistema.

Token válido informado nos Headers.

## Passos

1. Informar conta de origem válida.
2. Informar conta de destino válida.
3. Informar valor de transferência menor ou igual ao saldo disponível.
4. Informar data da transação.
5. Executar endpoint POST /transaction/add.

## Resultado esperado

- Status Code 201 Created.
- Mensagem informando que a transação foi registrada com sucesso.
- Valor debitado da conta de origem.
- Valor creditado na conta de destino.

## Resultado obtido

Status Code: 201 Created.

Mensagem: "Transaction registered successfully!"

Saldo da conta de origem atualizado de 100 para 90.

Saldo da conta de destino atualizado de 100 para 110.

Transação realizada com sucesso.

## Evidência

Arquivo: evidencias/transactions/020-createTransaction-sucesso.png

Arquivo: evidencias/transactions/021-getAccount-origem-apos-transferencia.png

Arquivo: evidencias/transactions/022-getAccount-destino-apos-transferencia.png

## Status

APROVADO