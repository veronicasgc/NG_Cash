# CT-036 User Signup com Senha Fora do Padrão

## Objetivo

Validar o comportamento da API ao tentar cadastrar um usuário utilizando uma senha que não atende às regras de validação definidas pelo sistema.

## Pré-condição

Username válido informado.

Senha fora do padrão exigido pela aplicação.

## Passos

1. Informar um username válido.
2. Informar uma senha que não atenda aos requisitos mínimos de segurança.
3. Executar endpoint POST /user/signup.

## Resultado esperado

* Status Code 400.
* Mensagem informando que a senha não atende aos critérios mínimos exigidos.
* Usuário não cadastrado.

## Resultado obtido

Status Code: 400 Bad Request.

Mensagem: "Invalid password! Must be at least 8 characters. A number and a capital letter".

Usuário não cadastrado.

## Evidência

Arquivo: evidencias/users/038-usersignup-com-senha-fora-do-padrao.png

## Status

APROVADO
