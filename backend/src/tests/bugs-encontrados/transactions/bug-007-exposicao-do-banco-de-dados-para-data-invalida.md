# BUG-007 Exposição de detalhes internos do banco de dados para data inválida

## Descrição

Ao informar uma data em formato inválido na consulta de transações por data, a API retorna detalhes internos da consulta SQL executada pelo PostgreSQL, expondo informações técnicas da aplicação.

## Pré-condição

ID válido informado.

Token válido informado.

Data em formato inválido.

## Passos para reprodução

1. Informar um id válido.
2. Informar uma data inválida (2024-12).
3. Executar endpoint GET /transaction/date.

## Resultado esperado

- Status Code 400.
- Mensagem amigável informando que a data está em formato inválido.
- Nenhum detalhe interno da aplicação deve ser exposto.

## Resultado obtido

- Status Code 400.
- Retorno da query SQL executada.
- Exposição de informações internas do banco PostgreSQL.
- Mensagem:

"invalid input syntax for type date"

## Impacto

A exposição de consultas SQL e detalhes internos da estrutura do banco de dados pode fornecer informações sensíveis para usuários mal-intencionados, facilitando a identificação da arquitetura da aplicação e possíveis vetores de ataque.

## Evidência

Arquivo: evidencias/transactions/043-findTransactionsByDate-data-invalida.png

## Severidade

Alta

## Prioridade

Média