## Observação 003 - Padronização de Exceções com BaseError

# Sintoma

Durante a execução dos testes unitários das classes UserBusiness e AccountBusiness, foi observado que exceções específicas estavam sendo convertidas para a classe BaseError.

# Investigação

Foi identificado que o comportamento ocorre devido ao bloco genérico de tratamento de exceções:

throw new BaseError(error.statusCode, error.sqlMessage || error.message);

Essa implementação encapsula qualquer exceção lançada anteriormente, fazendo com que o tipo original da exceção seja perdido.

# Conclusão

O comportamento observado não representa um defeito isolado em uma única classe, mas sim uma característica arquitetural compartilhada entre múltiplas classes da camada Business.

O comportamento foi identificado em:

UserBusiness
AccountBusiness

Por esse motivo, foi registrado apenas um relatório de defeito (BUG-UT-001), representando a causa raiz do problema.

# Aprendizado

Testes unitários permitem identificar problemas arquiteturais que afetam múltiplos componentes da aplicação. Nesses casos, a análise da causa raiz é mais importante do que a criação de múltiplos registros de defeitos duplicados.