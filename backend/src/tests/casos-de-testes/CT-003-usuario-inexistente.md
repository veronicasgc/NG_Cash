# CT-003 Login com usuario inexistente

## Objetivo

Validar o comportamento da API quando o usuário informado não está cadastrado no sistema.

## Pré-condição

Usuário não cadastrado no sistema.

## Passos

1. Enviar username não cadastrado.
2. Enviar password válido.
3. Executar endpoint POST /login.

## Resultado esperado

- Status Code 400.
- Mensagem informando que usuário não está registrado no sistema.
- Login não realizado.

## Resultado obtido

Status Code: 400 Bad Request.

Mensagem informando que usuário não está registrado no sistema.

## Evidência

Arquivo: evidencias/usuario-inexistente.png

## Status

APROVADO