# CT-010 Get-Account sem token

## Objetivo:
Validar o comportamento da API quando o token não é informado e o id é informado corretamente, para obter os dados da conta do usuário.

## Pré-condição
Usuário logado no sistema.

ID válido.
Token vazio.


## Passos
1. Enviar id válido.
2. Enviar token vazio.
3. Executar endpoint GET /getAccount.

## Resultado esperado
- Status Code 400.
- Retorna mensagem informando que o token precisa ser informado.

## Resultado obtido

Status Code: 400 Bad Request.

Mensagem: "Tokem needs to be passed in headers".

## Evidência

Arquivo: evidencias/get-account/010-getAccount-sem-token.png

## Status

APROVADO

