# BUG-008 Endpoint GetAllUsers sem controle de autenticação

## Descrição

O endpoint GET /user retorna a lista completa de usuários cadastrados no sistema sem exigir autenticação.

Durante os testes foi verificado que a requisição retorna os mesmos dados quando executada sem token, com token válido e com token inválido.

## Pré-condição

Existirem usuários cadastrados no sistema.

## Passos para reprodução

1. Executar endpoint GET /user sem informar token de autenticação.
2. Executar endpoint GET /user com token inválido.
3. Comparar os resultados retornados.

## Resultado esperado

* O endpoint deve exigir autenticação.
* Apenas usuários autorizados devem acessar a lista de usuários.
* Requisições sem autenticação devem retornar Status Code 401 Unauthorized ou 403 Forbidden.

## Resultado obtido

* Status Code 200 OK.
* Lista de usuários retornada com sucesso.
* O comportamento é idêntico independentemente da presença ou validade do token.

## Impacto

A API permite a exposição de informações de todos os usuários cadastrados sem qualquer mecanismo de autenticação ou autorização.

Esse comportamento possibilita a enumeração de usuários do sistema e o acesso indevido a informações que deveriam ser restritas a usuários autenticados ou perfis administrativos.

## Evidência

Arquivo: evidencias/users/046-getAllUsers-retorna-usuarios.png

## Severidade

Alta

## Prioridade

Alta
