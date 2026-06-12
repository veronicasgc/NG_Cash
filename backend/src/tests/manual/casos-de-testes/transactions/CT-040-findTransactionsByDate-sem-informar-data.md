# CT-040 Find Transactions By Date - Sem Informar Data

## Objetivo

Validar o comportamento da API ao consultar transações sem informar a data da transação.

## Pré-condição

Usuário autenticado no sistema.

ID válido informado.

Campo de data vazio.

Token válido informado nos Headers.

## Passos

1. Informar um id válido via Query Params.
2. Não informar a data da transação.
3. Informar token válido no Header authorization.
4. Executar endpoint GET /transaction/date.

## Resultado esperado

* Status Code 400.
* Mensagem informando que a data deve ser preenchida para realizar a consulta.
* Nenhuma consulta deve ser executada.

## Resultado obtido

Status Code: 400 Bad Request.

Mensagem: "Date not validated".

A consulta não foi executada devido à ausência da data.

## Evidência

Arquivo: evidencias/transactions/042-findTransactionsByDate-sem-informar-data.png

## Status

APROVADO
