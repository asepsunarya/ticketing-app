import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document, Types, now } from 'mongoose';

export type PeopleDocument = PeopleModel & Document;

class User {
  @Prop()
  _id: Types.ObjectId;

  @Prop()
  email: string;
}

@Schema()
export class PeopleModel {
  @Prop()
  projectId: Types.ObjectId;

  @Prop()
  userId: Types.ObjectId;

  @Prop()
  role: string;

  @Prop()
  createdBy: User;

  @Prop({ type: Date, default: now() })
  createdAt: Date;

  @Prop({ type: Date, default: now() })
  updatedAt: Date;
}

export const PeopleSchema = SchemaFactory.createForClass(PeopleModel);
