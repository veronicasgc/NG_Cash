# BUG-001 Mensagem incorreta para senha inválida

## Descrição

Ao informar uma senha com formato válido, porém diferente da senha cadastrada para o usuário, a API retorna uma mensagem de erro relacionada às regras de validação da senha.

## Pré-condição

Usuário cadastrado no sistema.

Senha correta cadastrada:

Di12345656

## Passos para reprodução

1. Enviar username válido.
2. Enviar senha com formato válido, mas diferente da cadastrada.
3. Executar endpoint POST /login.

## Resultado esperado

- Status Code 400.
- Mensagem indicando que a senha informada está incorreta.
- Login não realizado.

## Resultado obtido

- Status Code 400.
- Mensagem:

"Invalid password! Must be at least 8 characters. A number and a capital letter"

## Impacto

O usuário recebe uma mensagem que não corresponde ao erro real ocorrido, dificultando a identificação do motivo da falha no login.

## Evidência

Arquivo: evidencias/senha-incorreta-formato-valido.png

## Severidade

Baixa

## Prioridade

Média