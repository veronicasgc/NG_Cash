# CT-021 Get-Account acesso indevido em conta de terceiro

## Objetivo

Validar o comportamento da API ao consultar os dados de uma conta que não pertence ao usuário autenticado.

## Pré-condição

Usuário autenticado no sistema.

Token válido pertencente ao usuário A.

ID válido pertencente ao usuário B.

## Passos

1. Realizar login com o usuário A.
2. Copiar o token retornado.
3. Informar o ID de uma conta pertencente ao usuário B.
4. Enviar o token do usuário A no Header authorization.
5. Executar endpoint GET /getAccount.

## Resultado esperado

- Status Code 401 Unauthorized ou 403 Forbidden.
- Mensagem informando que o usuário não possui permissão para acessar os dados solicitados.
- Nenhuma informação da conta de terceiros deve ser retornada.

## Resultado obtido

Status Code: 200 OK.

A API retornou os dados da conta pertencente a outro usuário.

## Evidência

Arquivo: evidencias/get-account/023-getAccount-conta-terceiro.png

## Status

REPROVADO

## Observação

Foi identificado o BUG-004.

A API permite que um usuário autenticado consulte informações de contas pertencentes a outros usuários apenas alterando o parâmetro id enviado na requisição. O comportamento indica ausência de validação de autorização entre o usuário autenticado pelo token e a conta consultada, permitindo acesso indevido a dados de terceiros.