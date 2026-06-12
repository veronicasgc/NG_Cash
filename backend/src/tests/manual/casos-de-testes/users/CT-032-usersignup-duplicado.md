# CT-032 User Signup Duplicado

## Objetivo

Validar o comportamento da API ao tentar cadastrar um usuário com username já existente no sistema.

## Pré-condição

Username já cadastrado no sistema.

Senha válida.

## Passos

1. Informar um username já cadastrado.
2. Informar uma senha válida.
3. Executar endpoint POST /user/signup.

## Resultado esperado

* Status Code 400.
* Mensagem informando que o username já está cadastrado.
* Usuário não cadastrado.

## Resultado obtido

Status Code: 400 Bad Request.

Mensagem: "This username is already registered".

Usuário não cadastrado.

## Evidência

Arquivo: evidencias/users/034-usersignup-duplicado.png

## Status

APROVADO
