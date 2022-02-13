import { Document, ObjectId } from 'mongoose';

export interface ItemDocument extends Document {
  _id?: ObjectId;
  name: string;
  description: string;
  groupId: ObjectId;
  updatedAt: Date;
}
