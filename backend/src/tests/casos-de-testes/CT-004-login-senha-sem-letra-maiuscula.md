# CT-004 Login com senha sem letra maiúscula

## Objetivo

Validar o comportamento da API quando uma senha sem letra maiúscula é informada durante o login.

## Pré-condição

Usuário cadastrado no sistema.

## Passos

1. Enviar username válido.
2. Enviar password contendo apenas letras minúsculas e números.
3. Executar endpoint POST /login.

## Resultado esperado

- Status Code 400.
- Mensagem informando que a senha não atende aos critérios mínimos de validação.
- Login não realizado.

## Resultado obtido

Status Code: 400 Bad Request.

Mensagem informando que a senha deve conter pelo menos uma letra maiúscula, um número e atender ao tamanho mínimo exigido.

## Evidência

Arquivo: evidencias/senha-sem-letra-maiuscula.png

## Status

APROVADO