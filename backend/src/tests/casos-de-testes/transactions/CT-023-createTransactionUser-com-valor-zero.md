# CT-023 Create-Transaction com valor igual a zero

## Objetivo

Validar o comportamento da API ao tentar realizar uma transferência utilizando valor igual a zero.

## Pré-condição

Usuário autenticado no sistema.

Conta de origem válida.

Conta de destino válida.

Token válido informado nos Headers.

## Passos

1. Informar conta de origem válida.
2. Informar conta de destino válida.
3. Informar valor igual a zero para a transferência.
4. Informar data da transação.
5. Executar endpoint POST /transaction/add.

## Resultado esperado

- Status Code 400.
- Mensagem informando que o valor da transação deve ser maior que zero.
- Transação não realizada.
- Nenhuma alteração no saldo das contas envolvidas.

## Resultado obtido

Status Code: 400 Bad Request.

Mensagem: "Missing fields to complete".

Transação não realizada.

## Evidência

Arquivo: evidencias/transactions/025-createTransactionUser-valor-zero.png

## Status

REPROVADO

## Observação

Foi identificado o BUG-005.

Embora o campo value tenha sido informado corretamente na requisição, a API retorna uma mensagem indicando ausência de campos obrigatórios, quando o erro real está relacionado à validação do valor da transação.