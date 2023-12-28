import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document, Types, now } from 'mongoose';

export type ProjectDocument = ProjectModel & Document;

class User {
  @Prop()
  _id: Types.ObjectId;

  @Prop()
  email: string;
}

@Schema()
export class ProjectModel {
  @Prop()
  name: string;

  @Prop({ index: true, unique: true, required: true })
  code: string;

  @Prop()
  description: string;

  @Prop()
  leader: User;

  @Prop()
  createdBy: User;

  @Prop({ type: Date, default: now() })
  createdAt: Date;

  @Prop({ type: Date, default: now() })
  updatedAt: Date;

  @Prop()
  picture?: string;
}

export const ProjectSchema = SchemaFactory.createForClass(ProjectModel);
