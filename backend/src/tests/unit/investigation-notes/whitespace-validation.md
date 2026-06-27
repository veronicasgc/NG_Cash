## Observação 002 - Validação de Campos com Espaços em Branco

# Sintoma

Durante a execução dos testes unitários do método de login, foi identificado que valores contendo apenas espaços em branco não eram tratados como campos obrigatórios ausentes.

# Investigação

A validação implementada utiliza a seguinte regra:

if (!username || !password)

Entretanto, strings contendo apenas espaços (" ") são consideradas valores válidos (truthy) em JavaScript.

Como consequência, entradas como:

username = " "
password = "Senha123"

não acionam a exceção MissingFields, permitindo que o fluxo prossiga para a consulta ao banco de dados.

# Conclusão

A validação de campos obrigatórios deveria normalizar os valores utilizando trim() antes de verificar se estão vazios.

Exemplo:

if (!username?.trim() || !password?.trim())

# Aprendizado

Validações de campos obrigatórios devem considerar valores compostos apenas por espaços em branco para evitar o bypass de regras de negócio e consultas desnecessárias ao banco de dados.