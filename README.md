# Controle Financeiro Pessoal - API (NestJS + MongoDB)

API RESTful para registrar receitas e despesas e calcular métricas financeiras.
Projeto extensionista, alinhado ao **ODS 1** (erradicação da pobreza) e ao **ODS 12** (consumo e produção responsáveis).

## Como rodar
1. `npm install`
2. Copie `.env.example` para `.env` e preencha `MONGODB_URI` (MongoDB Atlas)
3. `npm run start` e acesse http://localhost:3000
4. Testes: `npm test`

## Endpoints
- `POST /transacoes`: cadastra uma transação
  ```json
  { "descricao": "Compra de roupas", "valor": 199.9, "tipo": "despesa", "categoria": "Lazer", "consumoConsciente": false }
  ```
  `tipo` aceita apenas `receita` ou `despesa`.
- `GET /transacoes`: retorna `{ historico, metricas }`, com `metricas` contendo
  `saldoTotal`, `totalDespesas` e `totalGastoImpulso`.
