export interface Issue {
  // _id: any;
  author: string; // ID
  assignees: string[]; // ID
  subject: string;
  description: string;
  dueDate?: Date;
  project: string; // ID
  priority?: IssuePriority;
  status?: IssueStatus;
  type?: IssueType;
  categories: [string]; // ID
  milestone?: string; // ID
  attachments: string[]; // URLs
  subIssues: string[]; // IDs
  comments: string[]; // @todo move from here to comments
}
export const enum IssueType { // Should be extendable
  Task,
  Bug,
  Request,
  Other,
}

export const enum IssuePriority {
  Low,
  Normal,
  High,
}

export const enum IssueStatus {
  New,
  Open,
  InProgress,
  Resolved,
  Closed,
}
