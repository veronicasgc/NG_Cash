# CT-018 Get-Transactions-User com id inválido

## Objetivo:

Validar o comportamento da API quando o campo de id é informado incorretamente e o token informado está correto, para obter a lista com o histórico de transações do usuário.

## Pré-condição

Usuário logado no sistema.

ID não registrado no sistema.

Token válido no headers.

## Passos

1. Enviar id inválido via Query Params (?id=1771440281978).
2. Enviar token válido no Headers.
3. Executar endpoint GET /transaction.

## Resultado esperado

- Status Code 401 Unauthorized ou 404 Not Found.
- Mensagem indicando que o usuário não possui acesso ou que o recurso consultado não foi encontrado.

## Resultado obtido

Status Code: 500 Internal Server Error.

Mensagem: "Unauthorized access".

## Evidência

Arquivo: evidencias/transactions/018-getTransactionsUser-id-invalido.png

## Status

REPROVADO

## Observação:

Comportamento relacionado ao BUG-003.
Ver detalhes em:
bugs-encontrados/transactions/bug-003-tratamento-incorreto-de-validacoes-e-autenticacao-getTransactionsUser.md