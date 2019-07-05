import { model, Document } from 'mongoose';
import { userSchema } from './user.schema';

interface UserDocument extends Document{
  firstName: string;
  lastName: string;
  email: string;
  image?: string;
}

// tslint:disable-next-line:variable-name
const User = model<UserDocument>('Issue', userSchema);

export { User, UserDocument };
