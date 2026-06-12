# CT-011 Get-Account com token inválido

## Objetivo:
Validar o comportamento da API quando o token informado é inválido e o id é informado corretamente, para obter os dados da conta do usuário.

## Pré-condição
Usuário logado no sistema.

ID válido.
Token inválido.


## Passos
1. Enviar id válido.
2. Enviar token inválido.
3. Executar endpoint GET /getAccount.

## Resultado esperado
- Status Code 400.
- Retorna mensagem dizendo que o token informado é inválido.

## Resultado obtido

Status Code: 400 Bad Request.

Mensagem: "invalid signature".

## Evidência

Arquivo: evidencias/get-account/011-getAccount-com-token-invalido.png

## Status

APROVADO

