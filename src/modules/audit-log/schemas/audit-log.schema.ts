import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class AuditLog extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  action: string;

  @Prop({ required: true })
  resource: string;

  @Prop({ required: true })
  data: string;
}

export const AuditLogSchema = SchemaFactory.createForClass(AuditLog);
