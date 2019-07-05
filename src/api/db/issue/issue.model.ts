import { model } from 'mongoose';
import { issueSchema } from './issue.schema';

// tslint:disable-next-line:variable-name
const Issue = model('Issue', issueSchema);

export { Issue };
