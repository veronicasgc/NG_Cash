# CT-016 Get-Transactions-User com token inválido

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

Foi encontrado o BUG-003. 
A API retorna um erro de servidor (Status 500) em vez de um código de erro de cliente (401 ou 400) ao identificar a ausência do token, indicando falta de tratamento de exceção no middleware de autenticação. Além disso, a mensagem contém o erro de grafia "Tokem".