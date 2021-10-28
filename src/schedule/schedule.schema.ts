import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import * as mongoose from 'mongoose';
import { Customer } from '../customer/customer.schema';
import { Professional } from '../professional/professional.schema';
import { Session } from '../session/session.schema';

export type ScheduleDocument = Schedule & mongoose.Document;

@Schema({ timestamps: true })
export class Schedule extends mongoose.Document {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Professional.name,
  })
  professional: Professional;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Customer.name,
  })
  customer: Customer;

  @Prop({ required: true })
  date: Date;
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
