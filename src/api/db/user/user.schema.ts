import { Schema } from 'mongoose';
import { UserDocument } from './user.model';

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  // password: { type: String, required: true, select: false }, // @todo: encrypt
  image: { type: String },
});

userSchema.virtual('fullName').get(function (this: UserDocument) {
  return `${this.firstName} ${this.lastName}`;
});

export { userSchema };
