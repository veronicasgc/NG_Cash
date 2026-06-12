# BUG-004 Falha de autorização no endpoint Get-Account

## Descrição

A API permite que um usuário autenticado consulte informações de contas pertencentes a outros usuários apenas alterando o valor do parâmetro id enviado na requisição.

## Pré-condição

Usuário autenticado com token válido.

Conhecimento do ID de uma conta pertencente a outro usuário.

## Passos para reprodução

1. Realizar login com um usuário válido.
2. Obter o token de autenticação.
3. Informar o ID de uma conta pertencente a outro usuário.
4. Executar endpoint GET /getAccount.

## Resultado esperado

- Status Code 401 Unauthorized ou 403 Forbidden.
- Acesso negado aos dados de terceiros.

## Resultado obtido

- Status Code 200 OK.
- Dados da conta de outro usuário retornados com sucesso.

## Impacto

Falha de autorização que permite acesso indevido a informações financeiras de terceiros.

Usuários autenticados podem visualizar dados que não lhes pertencem apenas alterando o parâmetro id da requisição.

## Evidência

Arquivo: evidencias/get-account/023-getAccount-conta-terceiro.png

## Severidade

Alta

## Prioridade

Alta