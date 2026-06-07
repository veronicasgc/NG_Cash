# BUG-002 Mensagem incorreta para get-account sem ID

## Descrição

Ao realizar a requisição sem informar o valor do parâmetro id, a API não trata a exceção de conversão de tipo de dados e expõe a stack trace/query interna do banco de dados PostgreSQL na resposta da requisição.

## Pré-condição

Usuário logado no sistema.

ID não informado ou vazio.

## Passos para reprodução

1. Enviar id vazio.
2. Enviar token válido.
3. Executar endpoint GET /getAccount.

## Resultado esperado

- Status Code 400.
- Mensagem indicando que o id deve ser informado para obter os dados da conta.
- A requisição deve ser interceptada e tratada adequadamente pela camada de validação antes de atingir o banco de dados.

## Resultado obtido

- Status Code 400.
- Mensagem:

"select "id", "balance" from "accounts" where "id" = $1 - invalid input syntax for type bigint: """

## Impacto

O usuário recebe uma mensagem que não corresponde ao erro real ocorrido, dificultando a identificação do motivo da falha de consulta a conta, devolvendo dados do banco de dados que interfere na interatividade do sistema, bem como compromete sua segurança, já que informa dados sensíveis.

## Evidência

Arquivo: evidencias/get-account/012-getAccount-sem-id.png

## Severidade

Alta

## Prioridade

Alta