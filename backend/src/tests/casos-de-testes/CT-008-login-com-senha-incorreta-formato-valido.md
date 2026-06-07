# CT-005 Login com senha incorreta e formato válido

## Objetivo:
Validar o comportamento da API quando uma senha incorreta é informada, mesmo atendendo todos os critérios de validação exigidos pelo sistema.

## Pré-condição
Usuário cadastrado no sistema.

Username válido.

Senha informada com formato válido (mínimo de caracteres, número e letra maiúscula), porém diferente da senha cadastrada.

## Passos
1. Enviar username válido.
2. Enviar password incorreto com formato válido.
3. Executar endpoint POST /login.

## Resultado esperado
- Status Code 400.
- Mensagem informando que a senha está incorreta.
- Login não efetuado.

## Resultado obtido

Status Code: 400 Bad Request.

Mensagem retornada: "Invalid password! Must be at least 8 characters. A number and a capital letter".

Login não efetuado.

## Evidência

Arquivo: evidencias/senha-incorreta-formato-valido.png

## Status

REPROVADO

## Observação

Foi identificado o BUG-001.

A API retorna uma mensagem relacionada às regras de validação da senha, mesmo quando a senha informada atende aos requisitos mínimos e o problema real é apenas a divergência entre a senha digitada e a senha cadastrada.