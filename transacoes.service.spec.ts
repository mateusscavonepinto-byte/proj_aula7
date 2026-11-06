import { calcularMetricas } from '../src/transacoes/transacoes.service';

describe('calcularMetricas', () => {
  it('retorna zeros para lista vazia', () => {
    expect(calcularMetricas([])).toEqual({
      saldoTotal: 0,
      totalDespesas: 0,
      totalGastoImpulso: 0,
    });
  });

  it('calcula saldo, despesas e gastos por impulso', () => {
    const resultado = calcularMetricas([
      { tipo: 'receita', valor: 3000, consumoConsciente: true },
      { tipo: 'despesa', valor: 800, consumoConsciente: true },
      { tipo: 'despesa', valor: 150.5, consumoConsciente: false },
      { tipo: 'despesa', valor: 49.5, consumoConsciente: false },
    ]);

    expect(resultado.totalDespesas).toBe(1000);
    expect(resultado.saldoTotal).toBe(2000);
    expect(resultado.totalGastoImpulso).toBe(200);
  });

  it('não conta receita como gasto por impulso', () => {
    const resultado = calcularMetricas([
      { tipo: 'receita', valor: 100, consumoConsciente: false },
    ]);
    expect(resultado.totalGastoImpulso).toBe(0);
    expect(resultado.saldoTotal).toBe(100);
  });
});
