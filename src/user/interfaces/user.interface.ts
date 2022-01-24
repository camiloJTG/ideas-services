import { Document, ObjectId } from 'mongoose';

export interface UserDocument extends Document {
  _id?: ObjectId;
  username: string;
  password: string;
  email: string;
  updateAt?: Date;
}
