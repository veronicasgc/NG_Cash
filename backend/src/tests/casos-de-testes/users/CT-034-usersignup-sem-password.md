# CT-034 User Signup sem Password

## Objetivo

Validar o comportamento da API ao tentar cadastrar um usuário sem informar o campo password.

## Pré-condição

Username válido informado.

Campo password ausente.

## Passos

1. Informar um username válido.
2. Não informar o campo password.
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

Arquivo: evidencias/users/036-usersignup-sem-password.png

## Status

APROVADO
