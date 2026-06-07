# CT-002 Login com senha fora do padrão

## Objetivo
Validar o comportamento da API quando uma senha fora do padrão mínimo exigido é informada.

## Pré-condição
Usuário insere senha com menos caracteres do que o padrão exige.

## Passos
1. Enviar username válido.
2. Enviar password faltando caracteres.
3. Executar endpoint POST /login.

## Resultado esperado
- Status Code 400.
- Mensagem de erro indicando senha faltando mínimo obrigatório de caracteres.

## Resultado obtido

Status Code: 400 Bad Resquest

Mensagem informando que a senha deve ter um mínimo obrigatório de caracteres.

## Evidência

Arquivo: evidencias/login/002-senha-fora-do-padrao.png

## Status

APROVADO