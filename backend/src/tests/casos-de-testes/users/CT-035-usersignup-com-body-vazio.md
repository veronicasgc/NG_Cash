# CT-035 User Signup com Body Vazio

## Objetivo

Validar o comportamento da API ao tentar cadastrar um usuário sem informar nenhum dado no corpo da requisição.

## Pré-condição

Body da requisição vazio.

## Passos

1. Não informar username.
2. Não informar password.
3. Enviar body vazio ({}).
4. Executar endpoint POST /user/signup.

## Resultado esperado

* Status Code 401.
* Mensagem informando que existem campos obrigatórios não preenchidos.
* Usuário não cadastrado.

## Resultado obtido

Status Code: 401 Unauthorized.

Mensagem: "Missing fields to complete".

Usuário não cadastrado.

## Evidência

Arquivo: evidencias/users/037-usersignup-com-body-vazio.png

## Status

APROVADO
