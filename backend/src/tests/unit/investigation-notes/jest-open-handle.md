# Observação 001 - Jest Open Handle

## Sintoma

Durante a execução dos testes de sucesso, o Jest apresentava a mensagem:

"Jest did not exit one second after the test run has completed."

## Investigação

O comportamento ocorria apenas quando os testes executavam a criação de conta.

Após isolar as dependências utilizando mocks, foi identificado que a conexão permanecia aberta devido ao método `AccountDatabase.createAccount()`, que ainda acessava o banco de dados real.

## Conclusão

Após mockar `AccountDatabase.createAccount()`, o Jest passou a finalizar normalmente.

## Aprendizado

Testes unitários devem isolar dependências externas (banco de dados, autenticação, APIs etc.), evitando conexões reais durante a execução.