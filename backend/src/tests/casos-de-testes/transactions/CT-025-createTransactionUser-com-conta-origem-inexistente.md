# CT-025 Create-Transaction com conta origem inexistente

## Objetivo

Validar o comportamento da API ao tentar realizar uma transferência utilizando uma conta de origem não cadastrada no sistema.

## Pré-condição

Usuário autenticado no sistema.

Conta de origem inexistente.

Conta de destino válida.

Token válido informado nos Headers.

## Passos

1. Informar conta de origem inexistente.
2. Informar conta de destino válida.
3. Informar valor válido para transferência.
4. Informar data da transação.
5. Executar endpoint POST /transaction/add.

## Resultado esperado

- Status Code 400.
- Mensagem informando que a conta de origem não foi encontrada.
- Transação não realizada.
- Nenhuma alteração no saldo das contas.

## Resultado obtido

Status Code: 400 Bad Request.

Mensagem: "Debited account not found".

Transação não realizada.

## Evidência

Arquivo: evidencias/transactions/027-createTransactionUser-conta-origem-inexistente.png

## Status

APROVADO