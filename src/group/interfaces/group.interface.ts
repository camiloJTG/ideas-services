import { Document, ObjectId } from 'mongoose';

export interface GroupDocument extends Document {
  _id?: ObjectId;
  name: string;
  description: string;
  userId?: ObjectId;
  updatedAt?: Date;
}
