# CT-014 Get-Transactions-User válido

## Objetivo:

Validar o comportamento da API quando o token é válido e o id informado está correto, para obter a lista com o histórico de transações do usuário.

## Pré-condição

Usuário logado no sistema.

ID cadastrado e com transações realizadas.

Token válido informado nos headers.

## Passos

1. Enviar id válido via Query Params (?id=1771440281963).
2. Enviar token válido nos Headers.
3. Executar endpoint GET /transaction.

## Resultado esperado

- Status Code 200 OK.
- Retorna um array de objetos contendo o histórico de transações do usuário (detalhando conta debitada, recebedor, valor, data de criação e nome de usuário).

## Resultado obtido

Status Code: 200 OK.

Retornado o histórico de transações em formato JSON com sucesso.

## Evidência

Arquivo: evidencias/transactions/014-getTransactionsUser-valido.png

## Status

APROVADO