# CT-009 Get-Account com token válido

## Objetivo:
Validar o comportamento da API quando o token é válido e informado corretamente juntamente com o id correto, para obter os dados da conta do usuário.

## Pré-condição
Usuário logado no sistema.

ID válido.
Token válido.


## Passos
1. Enviar id válido.
2. Enviar token válido.
3. Executar endpoint GET /getAccount.

## Resultado esperado
- Status Code 200.
- Retorna saldo da conta consultada.

## Resultado obtido

Status Code: 200 OK.

Saldo da conta retornado com sucesso.

## Evidência

Arquivo: evidencias/get-account/009-getAccount-com-token-valido.png

## Status

APROVADO

