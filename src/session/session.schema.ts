import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Professional } from '../professional/professional.schema';

export type SessionDocument = Session & mongoose.Document;

@Schema({ timestamps: true })
export class Session extends mongoose.Document {
  @Prop({
    required: true,
    unique: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Professional.name,
  })
  professional: Professional;

  @Prop({ required: true })
  days: number[];

  @Prop({ required: true })
  start: Date;

  @Prop({ required: true })
  end: Date;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
