# BUG-003 Tratamento incorreto de validações e autenticação para getTransactionsUser

## Cenários afetados

### Cenário 1 - Token ausente

Resultado obtido:
- Status 500
- Mensagem: "invalid signature"

Evidência:
evidencias/transactions/015-getTransactionsUser-sem-token.png

---

### Cenário 2 - Token inválido

Resultado obtido:
- Status 500
- Mensagem: "invalid signature"

Evidência:
evidencias/transactions/016-getTransactionsUser-token-invalido.png

---

### Cenário 3 - ID ausente

Resultado obtido:
- Status 500
- Mensagem: "Invalid or incomplete id"

Evidência:
evidencias/transactions/017-getTransactionsUser-sem-id.png

---

### Cenário 4 - ID inválido ou inexistente

Resultado obtido:
- Status 500
- Mensagem: "Unauthorized access"

Evidência:
evidencias/transactions/018-getTransactionsUser-id-invalido.png
