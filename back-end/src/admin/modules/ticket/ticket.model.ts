import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document, Types, now } from 'mongoose';

export type TicketDocument = TicketModel & Document;

class User {
  @Prop()
  _id: Types.ObjectId;

  @Prop()
  email: string;
}

@Schema()
export class TicketModel {
  @Prop()
  product: string;

  @Prop()
  description: string;

  @Prop()
  email: string;

  @Prop()
  screenshot: string[];

  @Prop()
  urgencyLevel: string;

  @Prop()
  reportBy: string;

  @Prop()
  releaseStatus: string;

  @Prop()
  status: string;

  @Prop()
  createdBy: User;

  @Prop({ type: Date, default: now() })
  createdAt: Date;

  @Prop({ type: Date, default: now() })
  updatedAt: Date;

  @Prop()
  assignedBy?: User[];

  @Prop()
  lastUpdatedBy?: User;

  @Prop()
  solution?: string;

  @Prop()
  note?: string;
}

export const TicketSchema = SchemaFactory.createForClass(TicketModel);
