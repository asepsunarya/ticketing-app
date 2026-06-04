import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document, Types, now } from 'mongoose';

export type TicketDocument = TicketModel & Document;

class User {
  @Prop()
  _id: Types.ObjectId;

  @Prop()
  email: string;

  @Prop()
  name?: string;

  @Prop()
  photo?: string;
}

const UserSchemaDefinition = {
  _id: Types.ObjectId,
  email: String,
  name: String,
  photo: String,
};

const TicketCommentSchemaDefinition = {
  description: String,
  createdBy: UserSchemaDefinition,
  createdAt: { type: Date, default: now },
};

class TicketComment {
  description: string;
  createdBy: User;
  createdAt: Date;
}

@Schema()
export class TicketModel {
  @Prop()
  projectId: Types.ObjectId;

  @Prop()
  feature: string;

  @Prop()
  description: string;

  @Prop()
  email: string;

  @Prop()
  urgencyLevel: string;

  @Prop()
  reportBy: User;

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
  files: string[];

  @Prop()
  assignedBy?: User;

  @Prop()
  lastUpdatedBy?: User;

  @Prop()
  solution?: string;

  @Prop()
  reason?: string;

  @Prop()
  note?: string;

  @Prop({ type: [TicketCommentSchemaDefinition], default: [] })
  comments?: TicketComment[];
}

export const TicketSchema = SchemaFactory.createForClass(TicketModel);
