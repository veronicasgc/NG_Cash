# CT-033 User Signup sem Username

## Objetivo

Validar o comportamento da API ao tentar cadastrar um usuário sem informar o campo username.

## Pré-condição

Campo username ausente.

Senha válida informada.

## Passos

1. Não informar o campo username.
2. Informar uma senha válida.
3. Executar endpoint POST /user/signup.

## Resultado esperado

* Status Code 401.
* Mensagem informando que existem campos obrigatórios não preenchidos.
* Usuário não cadastrado.

## Resultado obtido

Status Code: 401 Unauthorized.

Mensagem: "Missing fields to complete".

Usuário não cadastrado.

## Evidência

Arquivo: evidencias/users/035-usersignup-sem-username.png

## Status

APROVADO
