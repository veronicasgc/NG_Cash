# CT-038 Find Transactions By Date - Data Válida

## Objetivo

Validar o comportamento da API ao consultar transações utilizando uma data válida associada ao usuário informado.

## Pré-condição

Usuário autenticado no sistema.

ID válido informado.

Data contendo transações cadastradas para o usuário.

Token válido informado nos Headers.

## Passos

1. Informar um id válido via Query Params.
2. Informar uma data válida contendo transações registradas.
3. Informar token válido no Header authorization.
4. Executar endpoint GET /transaction/date.

## Resultado esperado

* Status Code 200.
* Retorno da lista de transações encontradas para a data informada.
* Exibição dos dados da transação, incluindo conta de origem, conta de destino, valor e data.

## Resultado obtido

Status Code: 200 OK.

A API retornou com sucesso as transações registradas para a data informada.

Foram retornados os dados da conta de origem, conta de destino, valor da transação e data da movimentação.

## Evidência

Arquivo: evidencias/transactions/040-findTransactionsByDate-data-valida.png

## Status

APROVADO
