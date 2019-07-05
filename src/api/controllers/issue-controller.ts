import { Controller } from './controller.model';
import { Request, Response } from 'express';
import { Issue } from '../db/issue/issue.model';
import { IssuePriority, IssueType } from '../../../common/models/issue';

export class IssueController extends Controller {
  protected initialize(): void {
    this.router.get('/:id', this.getIssues);
    this.router.post('/', this.postIssue);
  }

  public async getIssues(req: Request, res: Response): Promise<boolean> {
    res.status(200).json({
      message: 'Here are your issues :)',
      issues: [req.params],
    });
    // console.log('req.params.id -->', req.params.id);
    // @todo: return issues
    return true;
  }

  public async postIssue(req: Request, res: Response): Promise<boolean> {
    const issue = new Issue({
      author: 'Mykola',
      assignees: ['Oleksandr'],
      subject: 'Scroll doesnt work',
      description: 'WTF? Scroll doesnt work...',
      dueDate: new Date('08-23-2019'),
      project: 'Activator',
      priority: IssuePriority.Low,
      type: IssueType.Bug,
      categories: ['Activator'],
      milestone: '1.6.0',
      attachments: [],
      subIssues: [],
    });
    const result = await issue.save();
    res.status(200).json({
      message: 'Issue successfully saved!:)',
      issue: result,
    });
    return true;
  }
}
