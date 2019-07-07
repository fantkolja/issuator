import { Controller } from './controller.model';
import { Request, Response } from 'express';
import { IssueModel } from '../db/issue/issue.model';
import { IssuePriority, IssueType, Issue } from '../../../common/models/issue';
import { FETCH_QUERY_LIMIT } from '../../../common/config/db';

export class IssueController extends Controller {
  protected initialize(): void {
    this.router.get('/:id?', this.getIssue);
    this.router.post('/', this.postIssue);
  }

  public async getIssue(req: Request, res: Response): Promise<void> {
    let issues: Issue[] = [];
    if (req.params.id) {
      const issue = await IssueModel.findById(req.params.id)
        .populate('author', 'firstName lastName')
        .populate('assignees', 'firstName lastName');
      if (issue) {
        issues = [issue];
      }
    } else {
      issues = await IssueModel.find()
        .limit(FETCH_QUERY_LIMIT);
    }
    res.status(200).json({
      issues,
      message: 'Here are your issues :)',
    });
  }

  public async postIssue(req: Request, res: Response): Promise<void> {
    const issue = await new IssueModel({
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
    res.status(200).json({
      issue,
      message: 'Issue successfully saved!:)',
    });
  }
}
