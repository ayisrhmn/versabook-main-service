import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class User extends Document {
  @Prop()
  fullname: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({
    type: {
      name: { type: String },
      description: { type: String },
      tagline: { type: String },
      email: { type: String },
      website: { type: String },
      phone: { type: String },
      address: { type: String },
      slug: { type: String, unique: true },
    },
    default: null,
  })
  business: {
    name: string;
    description: string;
    tagline: string;
    email: string;
    website: string;
    phone: string;
    address: string;
    slug: string;
  };

  @Prop({
    type: Date,
    required: false,
    default: null,
  })
  deletedAt: Date | null;
}

export const UserSchema = SchemaFactory.createForClass(User);
