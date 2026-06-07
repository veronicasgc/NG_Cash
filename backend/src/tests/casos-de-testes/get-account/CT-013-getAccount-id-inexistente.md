# CT-013 Get-Account com ID inexistente

## Objetivo:
Validar o comportamento da API quando o token informado é válido e o id informado não está registrado no sistema, para obter os dados da conta do usuário.

## Pré-condição
Usuário logado no sistema.

ID informado não cadastrado no sistema.
Token válido.


## Passos
1. Enviar id inválido.
2. Enviar token válido.
3. Executar endpoint GET /getAccount.

## Resultado esperado
- Status Code 400.
- Retorna mensagem dizendo que o id informado está incorreto ou que usuário não está cadastrado no sistema ou que não existe essa conta cadastrada.

## Resultado obtido

Status Code: 400 Bad Request.

Mensagem: "Has no account".

## Evidência

Arquivo: evidencias/get-account/013-getAccount-id-inexistente.png

## Status

APROVADO

