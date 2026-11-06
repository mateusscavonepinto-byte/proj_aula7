import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTransacaoDto } from './dto/create-transacao.dto';
import { Transacao, TransacaoDocument } from './schemas/transacao.schema';

export interface Metricas {
  saldoTotal: number;
  totalDespesas: number;
  totalGastoImpulso: number;
}

type TransacaoBasica = Pick<Transacao, 'valor' | 'tipo' | 'consumoConsciente'>;

/** Função pura: calcula as métricas a partir da lista de transações. */
export function calcularMetricas(transacoes: TransacaoBasica[]): Metricas {
  let totalReceitas = 0;
  let totalDespesas = 0;
  let totalGastoImpulso = 0;

  for (const t of transacoes) {
    if (t.tipo === 'receita') {
      totalReceitas += t.valor;
    } else if (t.tipo === 'despesa') {
      totalDespesas += t.valor;
      if (t.consumoConsciente === false) {
        totalGastoImpulso += t.valor;
      }
    }
  }

  const arredonda = (n: number) => Math.round(n * 100) / 100;

  return {
    saldoTotal: arredonda(totalReceitas - totalDespesas),
    totalDespesas: arredonda(totalDespesas),
    totalGastoImpulso: arredonda(totalGastoImpulso),
  };
}

@Injectable()
export class TransacoesService {
  constructor(
    @InjectModel(Transacao.name)
    private readonly transacaoModel: Model<TransacaoDocument>,
  ) {}

  async create(dto: CreateTransacaoDto): Promise<TransacaoDocument> {
    return this.transacaoModel.create(dto);
  }

  async findAll() {
    const historico = await this.transacaoModel
      .find()
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    return {
      historico,
      metricas: calcularMetricas(historico),
    };
  }
}
