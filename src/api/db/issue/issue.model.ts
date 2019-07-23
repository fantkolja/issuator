import { model, Document } from 'mongoose';
import { issueSchema } from './issue.schema';
import { Issue } from '../../../../common/models/issue';

export interface IssueDocument extends Issue, Document {}

// tslint:disable-next-line:variable-name
export const IssueModel = model<IssueDocument>('Issue', issueSchema);
