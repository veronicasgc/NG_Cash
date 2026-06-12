# CT-030 Create-Transaction para a mesma conta

## Objetivo

Validar o comportamento da API ao tentar realizar uma transferência utilizando a mesma conta como origem e destino.

## Pré-condição

Usuário autenticado no sistema.

Conta de origem e destino cadastradas no sistema.

Token válido informado nos Headers.

Saldo disponível para transferência.

## Passos

1. Informar uma conta válida como conta de origem.
2. Informar a mesma conta como conta de destino.
3. Informar valor válido para transferência.
4. Informar data da transação.
5. Executar endpoint POST /transaction/add.
6. Consultar o saldo da conta após a transação.

## Resultado esperado

- Status Code 400.
- Mensagem informando que a transferência para a mesma conta não é permitida.
- Transação não realizada.
- Saldo da conta permanece inalterado.

## Resultado obtido

Status Code: 201 Created.

Mensagem: "Transaction registered successfully!".

A transação foi registrada com sucesso utilizando a mesma conta como origem e destino.

O saldo da conta foi alterado indevidamente após a operação.

## Evidência

Arquivo: evidencias/transactions/032-createTransactionUser-transferencia-para-propria-conta.png

## Status

REPROVADO

## Observação

Foi identificado o BUG-006.

A API permite transferências para a própria conta e altera o saldo do usuário de forma incorreta, comprometendo a integridade financeira do sistema.