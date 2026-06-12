# CT-017 Get-Transactions-User sem ID

## Objetivo:

Validar o comportamento da API quando o campo de id está vazio  e o token informado está correto, para obter a lista com o histórico de transações do usuário.

## Pré-condição

Usuário logado no sistema.

ID vazio ou ausente.

Token válido no headers.

## Passos

1. Enviar id vazio.
2. Enviar token válido no Headers.
3. Executar endpoint GET /transaction.

## Resultado esperado

- Status Code 400.
- Nenhuma consulta ao banco deve ser executada.

## Resultado obtido

Status Code: 500 Internal Server Error.

Mensagem: "Invalid or incomplete id".

## Evidência

Arquivo: evidencias/transactions/017-getTransactionsUser-sem-id.png

## Status

REPROVADO

## Observação:

Comportamento relacionado ao BUG-003.
Ver detalhes em:
bugs-encontrados/transactions/bug-003-tratamento-incorreto-de-validacoes-e-autenticacao-getTransactionsUser.md