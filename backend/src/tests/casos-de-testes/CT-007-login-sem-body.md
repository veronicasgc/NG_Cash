# CT-005 Login sem body

## Objetivo:
Validar o comportamento da API quando os campos do body não são informados.

## Pré-condição
Campo username e password não informados.

## Passos
1. Enviar username vazio.
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

Arquivo: evidencias/login-sem-body.png

## Status

APROVADO