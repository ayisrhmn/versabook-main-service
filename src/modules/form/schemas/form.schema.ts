import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Form extends Document {
  @Prop({ required: true, unique: true })
  userId: string;

  @Prop({
    type: [
      {
        label: { type: String, required: true },
        type: { type: String, required: true },
        required: { type: Boolean, required: true },
        options: { type: [String], default: [] },
        order: { type: Number, required: true },
      },
    ],
    default: [],
  })
  fields: Array<{
    label: string;
    type: string;
    required: boolean;
    options?: string[];
    order: number;
  }>;

  @Prop({
    type: Date,
    required: false,
    default: null,
  })
  deletedAt: Date | null;
}

export const FormSchema = SchemaFactory.createForClass(Form);
