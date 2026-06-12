# CT-037 User Signup com Username Vazio

## Objetivo

Validar o comportamento da API ao tentar cadastrar um usuário com o campo username vazio.

## Pré-condição

Campo username vazio.

Senha válida informada.

## Passos

1. Informar o campo username vazio.
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

Arquivo: evidencias/users/039-usersignup-com-username-vazio.png

## Status

APROVADO
