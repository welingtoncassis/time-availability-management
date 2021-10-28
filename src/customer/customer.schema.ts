import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CustomerDocument = Customer & Document;

@Schema({ timestamps: true })
export class Customer extends Document {
  @Prop({ trim: true, required: true })
  name: string;

  @Prop({ unique: true, required: true, trim: true })
  email: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
