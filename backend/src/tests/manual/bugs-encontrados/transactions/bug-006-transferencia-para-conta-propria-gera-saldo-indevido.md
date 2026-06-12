# BUG-006 Transferência para a própria conta gera saldo indevido

## Descrição

A API permite realizar transferências utilizando a mesma conta como origem e destino da transação.

Além de registrar a operação com sucesso, o sistema altera o saldo da conta de forma incorreta, permitindo o aumento indevido do valor disponível para o usuário.

## Pré-condição

Usuário autenticado no sistema.

Conta válida cadastrada.

Saldo disponível para transferência.

Token válido informado nos Headers.

## Passos para reprodução

1. Informar uma conta válida como conta de origem.
2. Informar a mesma conta como conta de destino.
3. Informar um valor válido para transferência.
4. Informar a data da transação.
5. Executar endpoint POST /transaction/add.
6. Consultar o saldo da conta após a operação.

## Resultado esperado

- Status Code 400 Bad Request.
- Mensagem informando que não é permitido realizar transferências para a própria conta.
- Transação não registrada.
- Saldo da conta permanece inalterado.

## Resultado obtido

- Status Code: 201 Created.
- Mensagem:

"Transaction registered successfully!"

- A transação é registrada com sucesso.
- O saldo da conta é alterado indevidamente após a operação.

### Exemplo observado

Saldo antes da operação:

90.00

Transferência para a própria conta:

10.00

Saldo após a operação:

100.00

Ao repetir a operação:

Saldo anterior:

100.00

Saldo após nova transferência:

110.00

## Impacto

Falha crítica de regra de negócio que permite a geração indevida de saldo por meio de transferências para a própria conta.

O comportamento compromete a integridade financeira do sistema, permitindo que usuários aumentem seus próprios saldos sem realizar uma transação legítima entre contas distintas.

## Evidência

Arquivo: evidencias/transactions/032-createTransactionUser-transferencia-para-propria-conta.png

## Severidade

Alta

## Prioridade

Alta