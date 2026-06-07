# CT-012 Get-Account sem ID

## Objetivo:
Validar o comportamento da API quando o token informado é válido e o id não é informado, para obter os dados da conta do usuário.

## Pré-condição
Usuário logado no sistema.

ID não informado.
Token válido.


## Passos
1. Enviar id vazio.
2. Enviar token válido.
3. Executar endpoint GET /getAccount.

## Resultado esperado
- Status Code 400.
- Retorna mensagem dizendo que o id deve ser informado ou está faltando.

## Resultado obtido

Status Code: 400 Bad Request.

Mensagem: "select "id", "balance" from "accounts" where "id" = $1 - invalid input syntax for type bigint: """.

## Evidência

Arquivo: evidencias/get-account/012-getAccount-sem-id.png

## Status

REPROVADO

## Observação:

Foi encontrado o BUG-002.

O sistema retorna uma mensagem de resposta direto do banco de dados em sql, o que não é uma mensagem informativa adequada para o usuário e interfere na interatividade do sistema.