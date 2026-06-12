# CT-031 Signup com sucesso

## Objetivo

Validar o comportamento da API ao realizar o cadastro de um novo usuário com dados válidos.

## Pré-condição

Username não cadastrado no sistema.

Senha atendendo às regras de validação da aplicação.

## Passos

1. Informar um username válido e não cadastrado.
2. Informar uma senha válida.
3. Executar endpoint POST /user/signup.

## Resultado esperado

- Status Code 200.
- Usuário cadastrado com sucesso.
- Retorno de mensagem de confirmação.
- Retorno de token de autenticação.

## Resultado obtido

Status Code: 200 OK.

Mensagem: "Successfully registered user!".

Token JWT retornado com sucesso após o cadastro.

Usuário cadastrado com sucesso.

## Evidência

Arquivo: evidencias/users/033-usersignup-com-sucesso.png

## Status

APROVADO