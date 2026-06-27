# BUG-001-wrong-error-class-returned-for-missing-fields

## Descrição:

- Validação dos campos obrigatórios para criar conta de usuário.

## Passos:

Cenários afetados:
- username vazio
- password vazio
- username menor que 3 caracteres
- password menor que 8 caracteres

## Resultado esperado:

- retornar erro da classe MissingFields com mensagem "Missing fields to complete".
- conta não deverá ser criada

## Resultado obtido:

- retorna erro da classe BaseError com mensagem "Missing fields to complete" ao invés da classe MissingFields

## Evidência:

Arquivo: tests\unit\evidencias\BUG-001-username-empty.png
Arquivo: tests\unit\evidencias\BUG-001-username-less-than-3
Arquivo: tests\unit\evidencias\BUG-001-password-less-than-8
Arquivo: tests\unit\evidencias\BUG-001-password-empty

## Impacto:

- retorna mensagem correta, porém erro definido para especificar o tipo de erro está incorreto.Isso faz com que a regra de negócio fique indistinguível de outros erros genéricos.

## Severidade:

- Média