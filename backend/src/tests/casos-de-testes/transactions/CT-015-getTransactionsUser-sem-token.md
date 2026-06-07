# CT-015 Get-Transactions-User sem token

## Objetivo:

Validar o comportamento da API quando o campo de token é vazio e o id informado está correto, para obter a lista com o histórico de transações do usuário.

## Pré-condição

Usuário logado no sistema.

ID cadastrado e com transações realizadas.

Token não informado nos headers.

## Passos

1. Enviar id válido via Query Params (?id=1771440281963).
2. Enviar token vazio nos Headers.
3. Executar endpoint GET /transaction.

## Resultado esperado

- Status Code 400.
- Retorna uma mensagem indicando que a requisição não está autenticada.

## Resultado obtido

Status Code: 500 Internal Server Error.

Mensagem: "Tokem needs to be passed in headers".

## Evidência

Arquivo: evidencias/transactions/015-getTransactionsUser-sem-token.png

## Status

REPROVADO

## Observação:

Comportamento relacionado ao BUG-003.
Ver detalhes em:
bugs-encontrados/transactions/bug-003-tratamento-incorreto-de-validacoes-e-autenticacao-getTransactionsUser.md