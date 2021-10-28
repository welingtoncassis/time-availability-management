import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProfessionalDocument = Professional & Document;

@Schema({ timestamps: true })
export class Professional extends Document {
  @Prop({ trim: true, required: true })
  name: string;

  @Prop({ unique: true, required: true, trim: true })
  email: string;
}

export const ProfessionalSchema = SchemaFactory.createForClass(Professional);
