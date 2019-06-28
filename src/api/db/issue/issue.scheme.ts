import { Schema } from 'mongoose';
import { ISSUE_DESCRIPTION_MAX_LENGTH, ISSUE_SUBJECT_MAX_LENGTH } from '../../../../common/config/db';
import { IssuePriority, IssueStatus } from '../../../../common/models/issue';

export const issueSchema = new Schema({
  author: { type: String, required: true }, // Schema.Types.ObjectId
  assignees: { type: [String], required: true },
  subject: {
    type: String,
    required: true,
    maxlength: ISSUE_SUBJECT_MAX_LENGTH,
  },
  description: {
    type: String,
    required: true,
    maxlength: ISSUE_DESCRIPTION_MAX_LENGTH,
  },
  dueDate: { type: Date },
  project: { type: String, required: true },
  priority: { type: Number, default: IssuePriority.Low },
  status: { type: Number, default: IssueStatus.New },
  type: { type: Number },
  categories: { type: [String] },
  milestone: { type: [String] },
  attachments: { type: [String] },
  subIssues: { type: [String] },
  // comments: { type: [String] },
});
