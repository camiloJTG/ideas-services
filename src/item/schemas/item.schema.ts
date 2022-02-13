import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Item {
  @Prop({ required: true, index: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: false, required: true })
  isCompleted: boolean;

  @Prop({ type: Types.ObjectId, ref: 'groups' })
  groupId: Types.ObjectId;

  @Prop({ default: new Date() })
  createdAt: Date;

  @Prop({ default: new Date() })
  updatedAt: Date;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
