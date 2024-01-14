import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now } from 'mongoose';

export type UserDocument = UserModel & Document;

@Schema()
export class UserModel {
  @Prop({ unique: true })
  email: string;

  @Prop()
  name: string;

  @Prop()
  role: string;

  @Prop()
  password: string;

  @Prop({ type: Date, default: now() })
  createdAt: Date;

  @Prop({ type: Date, default: now() })
  updatedAt: Date;

  @Prop()
  photo?: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
