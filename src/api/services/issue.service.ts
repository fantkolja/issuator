import { Issue, IssuePriority, IssueType } from '../../../common/models/issue';
import { IssueModel } from '../db/issue/issue.model';
import { FETCH_QUERY_LIMIT } from '../../../common/config/db';

class IssueService {
  public getAllIssues(): Promise<Issue[]> {
    return IssueModel
      .find()
      .limit(FETCH_QUERY_LIMIT)
      .exec();
  }

  public getIssue(id: string): Promise<Issue | null> {
    return IssueModel
      .findById(id)
      .populate('author', 'firstName lastName')
      .populate('assignees', 'firstName lastName')
      .exec();
  }

  public createIssue(): Promise<Issue> {
    return new IssueModel({
      author: '5d21f03781a89d3264001281',
      assignees: ['5d21ecb9c60c9b4f20dbdc7e', '5d21f0a181a89d3264001282'],
      subject: 'Color doesnt work',
      description: 'WTF? Color doesnt work...',
      dueDate: new Date('08-27-2019'),
      project: 'Activator',
      priority: IssuePriority.Normal,
      type: IssueType.Bug,
      categories: ['Activator'],
      milestone: '1.6.0',
      attachments: [],
      subIssues: [],
    })
      .save();
  }

  public updateIssue(id: string, update: object): Promise<Issue | null> {
    return IssueModel
      .findByIdAndUpdate(id, update)
      .exec();
  }
}

const issueService = new IssueService();

export { issueService };
