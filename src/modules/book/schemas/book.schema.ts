import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Book extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({
    type: [
      {
        label: { type: String, required: true },
        value: { type: String, required: true },
        type: { type: String, required: true },
      },
    ],
    required: true,
  })
  formData: {
    label: string;
    value: string;
    type: string;
  }[];

  @Prop({
    type: Date,
    required: false,
    default: null,
  })
  deletedAt: Date | null;
}

export const BookSchema = SchemaFactory.createForClass(Book);
