# CT-005 Login sem username

## Objetivo:
Validar o comportamento da API quando o campo username não é informado.

## Pré-condição
Campo username não informado e password preenchido corretamente.

## Passos
1. Enviar username vazio.
2. Enviar password válido.
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

Arquivo: evidencias/login-sem-username.png

## Status

APROVADO