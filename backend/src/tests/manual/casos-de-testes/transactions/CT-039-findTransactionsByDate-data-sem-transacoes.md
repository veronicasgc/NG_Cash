# CT-039 Find Transactions By Date - Data sem Transações

## Objetivo

Validar o comportamento da API ao consultar transações utilizando uma data válida que não possui registros de movimentações para o usuário informado.

## Pré-condição

Usuário autenticado no sistema.

ID válido informado.

Data válida sem transações cadastradas.

Token válido informado nos Headers.

## Passos

1. Informar um id válido via Query Params.
2. Informar uma data válida sem transações registradas.
3. Informar token válido no Header authorization.
4. Executar endpoint GET /transaction/date.

## Resultado esperado

* Status Code 400.
* Mensagem informando que não foram encontradas transações para a data consultada.

## Resultado obtido

Status Code: 400 Bad Request.

Mensagem: "Has no transaction".

Nenhuma transação encontrada para a data informada.

## Evidência

Arquivo: evidencias/transactions/041-findTransactionsByDate-data-sem-transacoes.png

## Status

APROVADO
