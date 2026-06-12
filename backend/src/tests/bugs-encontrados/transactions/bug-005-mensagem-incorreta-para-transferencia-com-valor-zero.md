# BUG-005 Mensagem incorreta para transferência com valor zero

## Descrição

Ao informar o valor 0 no campo value durante a criação de uma transação, a API retorna uma mensagem indicando ausência de campos obrigatórios, embora o campo tenha sido enviado corretamente na requisição.

## Pré-condição

Usuário autenticado no sistema.

Conta de origem válida.

Conta de destino válida.

Token válido informado nos Headers.

Campo value preenchido com o valor 0.

## Passos para reprodução

1. Informar conta de origem válida.
2. Informar conta de destino válida.
3. Informar o valor 0 para a transferência.
4. Informar a data da transação.
5. Executar endpoint POST /transaction/add.

## Resultado esperado

- Status Code 400 Bad Request.
- Mensagem informando que o valor da transação deve ser maior que zero ou que o valor informado é inválido.
- Transação não realizada.

## Resultado obtido

- Status Code: 400 Bad Request.
- Mensagem:

"Missing fields to complete"

## Impacto

O usuário recebe uma mensagem incompatível com o erro real ocorrido, dificultando a identificação da causa da falha e o correto preenchimento da transação.

A mensagem pode induzir o usuário a acreditar que algum campo obrigatório não foi preenchido, quando na verdade o valor informado é inválido para a regra de negócio.

## Evidência

Arquivo: evidencias/transactions/025-createTransactionUser-valor-zero.png

## Severidade

Baixa

## Prioridade

Média