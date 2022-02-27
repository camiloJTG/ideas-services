import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Group } from 'src/group/schemas/group.schema';

@Schema()
export class Item {
  @Prop({ required: true, index: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: false, required: true })
  isCompleted: boolean;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'groups' }] })
  group: Group[];

  @Prop({ default: new Date() })
  createdAt: Date;

  @Prop({ default: new Date() })
  updatedAt: Date;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
