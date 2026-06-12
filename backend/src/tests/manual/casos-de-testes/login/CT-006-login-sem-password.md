# CT-005 Login sem password

## Objetivo:
Validar o comportamento da API quando o campo password não é informado.

## Pré-condição
Campo username preenchido corretamente e password não informado.

## Passos
1. Enviar username válido.
2. Enviar password vazio.
3. Executar endpoint POST /login.

## Resultado esperado
- Status Code 400.
- Mensagem de campos faltando serem preenchidos para efetuar login.
- Login não efetuado.

## Resultado obtido

Status Code: 400 Bad Request.

Mensagem retornada: "Missing fields to complete".

Login não efetuado.

## Evidência

Arquivo: evidencias/login/006-login-sem-password.png

## Status

APROVADO