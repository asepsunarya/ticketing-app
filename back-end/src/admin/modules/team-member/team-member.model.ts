import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document, Types, now } from 'mongoose';

export type TeamMemberDocument = TeamMemberModel & Document;

class User {
  @Prop()
  _id: Types.ObjectId;

  @Prop()
  email: string;
}

@Schema()
export class TeamMemberModel {
  @Prop()
  teamId: Types.ObjectId;

  @Prop()
  userId: Types.ObjectId;

  @Prop()
  createdBy: User;

  @Prop({ type: Date, default: now() })
  createdAt: Date;

  @Prop({ type: Date, default: now() })
  updatedAt: Date;
}

export const TeamMemberSchema = SchemaFactory.createForClass(TeamMemberModel);
