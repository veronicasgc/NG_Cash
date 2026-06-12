# CT-016 Get-Transactions-User com token inválido

## Objetivo:

Validar o comportamento da API quando o campo de token é informado incorretamente e o id informado está correto, para obter a lista com o histórico de transações do usuário.

## Pré-condição

Usuário logado no sistema.

ID cadastrado e com transações realizadas.

Token inválido no headers.

## Passos

1. Enviar id válido via Query Params (?id=1771440281963).
2. Enviar token inválido no Headers.
3. Executar endpoint GET /transaction.

## Resultado esperado

- Status Code 400.
- Retorna uma mensagem indicando que é necessário um token válido ou que não foi autorizado o acesso.

## Resultado obtido

Status Code: 500 Internal Server Error.

Mensagem: "invalid signature".

## Evidência

Arquivo: evidencias/transactions/016-getTransactionsUser-token-invalido.png

## Status

REPROVADO

## Observação:

Comportamento relacionado ao BUG-003.
Ver detalhes em:
bugs-encontrados/transactions/bug-003-tratamento-incorreto-de-validacoes-e-autenticacao-getTransactionsUser.md