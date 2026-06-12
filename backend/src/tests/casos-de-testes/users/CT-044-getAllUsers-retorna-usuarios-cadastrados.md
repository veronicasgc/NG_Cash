# CT-044 Get All Users - Retorna Usuários Cadastrados

## Objetivo

Validar o comportamento da API ao consultar a lista de usuários cadastrados no sistema.

## Pré-condição

Existir ao menos um usuário cadastrado no sistema.

## Passos

1. Executar endpoint GET /user.
2. Observar o retorno da requisição.

## Resultado esperado

* Status Code 200.
* Retorno da lista de usuários cadastrados.
* Exibição dos dados disponibilizados pela API.

## Resultado obtido

Status Code: 200 OK.

A API retornou com sucesso a lista de usuários cadastrados no sistema, incluindo id, username e accountId.

## Evidência

Arquivo: evidencias/users/046-getAllUsers-retorna-usuarios.png

## Status

APROVADO

## Observação

Foi identificado durante a execução do teste que o endpoint retorna a lista de usuários independentemente da presença ou validade do token de autenticação.

Foi registrado o BUG-008 para análise.
