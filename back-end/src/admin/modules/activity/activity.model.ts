import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document, Types, now } from 'mongoose';

export type ActivityDocument = ActivityModel & Document;

class User {
  @Prop()
  _id: Types.ObjectId;

  @Prop()
  email: string;
}

@Schema()
export class ActivityModel {
  @Prop()
  ticketId: Types.ObjectId;

  @Prop()
  description: string;

  @Prop()
  createdBy: User;

  @Prop({ type: Date, default: now() })
  createdAt: Date;

  @Prop({ type: Date, default: now() })
  updatedAt: Date;

  @Prop()
  teamId?: Types.ObjectId;
}

export const ActivitySchema = SchemaFactory.createForClass(ActivityModel);
