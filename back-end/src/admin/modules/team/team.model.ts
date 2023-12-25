import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document, Types, now } from 'mongoose';

export type TeamDocument = TeamModel & Document;

class User {
  @Prop()
  _id: Types.ObjectId;

  @Prop()
  email: string;
}

@Schema()
export class TeamModel {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  createdBy: User;

  @Prop({ type: Date, default: now() })
  createdAt: Date;

  @Prop({ type: Date, default: now() })
  updatedAt: Date;
}

export const TeamSchema = SchemaFactory.createForClass(TeamModel);
