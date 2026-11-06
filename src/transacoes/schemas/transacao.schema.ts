import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TransacaoDocument = HydratedDocument<Transacao>;

export const TIPOS_TRANSACAO = ['receita', 'despesa'] as const;
export type TipoTransacao = (typeof TIPOS_TRANSACAO)[number];

@Schema({ timestamps: true })
export class Transacao {
  @Prop({ required: true, trim: true })
  descricao: string;

  @Prop({ required: true })
  valor: number;

  @Prop({ required: true, enum: TIPOS_TRANSACAO })
  tipo: TipoTransacao;

  @Prop({ required: true, trim: true })
  categoria: string;

  // true = gasto essencial/consciente; false = gasto por impulso
  @Prop({ required: true, default: true })
  consumoConsciente: boolean;
}

export const TransacaoSchema = SchemaFactory.createForClass(Transacao);
