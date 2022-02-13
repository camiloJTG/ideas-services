import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Group {
  @Prop({ required: true, index: true, unique: true, uppercase: true })
  name: string;

  @Prop({ required: true, index: true })
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'users' })
  userId: Types.ObjectId;

  @Prop({ default: new Date() })
  createdAt: Date;

  @Prop({ default: new Date() })
  updatedAt: Date;
}

export const GroupSchema = SchemaFactory.createForClass(Group);
