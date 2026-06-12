# CT-041 Find Transactions By Date - Data Inválida

## Objetivo

Validar o comportamento da API ao consultar transações utilizando uma data em formato inválido.

## Pré-condição

Usuário autenticado no sistema.

ID válido informado.

Token válido informado nos Headers.

Data informada em formato inválido.

## Passos

1. Informar um id válido via Query Params.
2. Informar uma data inválida (2024-12).
3. Informar token válido no Header authorization.
4. Executar endpoint GET /transaction/date.

## Resultado esperado

- Status Code 400.
- Mensagem informando que a data está em formato inválido.
- Nenhuma informação interna da aplicação deve ser exposta.

## Resultado obtido

Status Code: 400 Bad Request.

A API retornou detalhes internos da consulta SQL executada pelo banco de dados.

Mensagem:

"invalid input syntax for type date: '2024-12'"

Além da mensagem de erro, foram expostas informações técnicas da consulta ao banco de dados PostgreSQL.

## Evidência

Arquivo: evidencias/transactions/043-findTransactionsByDate-data-invalida.png

## Status

REPROVADO

## Observação

Foi encontrado o BUG-007.

A API expõe detalhes internos da consulta SQL e da estrutura do banco de dados ao receber uma data inválida, comprometendo a segurança da aplicação e dificultando a experiência do usuário final.