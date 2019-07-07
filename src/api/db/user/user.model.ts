import { model, Document } from 'mongoose';
import { userSchema } from './user.schema';
import { User } from '../../../../common/models/user';

export interface UserDocument extends User, Document {}

// tslint:disable-next-line:variable-name
export const UserModel = model<UserDocument>('User', userSchema);
