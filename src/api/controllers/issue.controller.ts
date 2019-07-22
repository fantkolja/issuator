import { Controller } from './controller.model';
import { Request, Response } from 'express';
import { Issue } from '../../../common/models/issue';
import { issueService } from '../services/issue.service';

export class IssueController extends Controller {
  protected initialize(): void {
    this.router.get('/:id?', this.getIssue);
    this.router.post('/', this.postIssue);
    this.router.patch('/:id', this.updateIssue);
  }

  private async getIssue(req: Request, res: Response): Promise<void> {
    let issues: Issue[] = [];
    if (req.params.id) {
      const issue = await issueService.getIssue(req.params.id);
      if (issue) {
        issues = [issue];
      }
    } else {
      issues = await issueService.getAllIssues();
    }
    res.status(200).json({
      issues,
      message: 'Here are your issues :)',
    });
  }

  private async postIssue(req: Request, res: Response): Promise<void> {
    const issue = await issueService.createIssue();
    res.status(200).json({
      issue,
      message: 'Issue successfully saved!:)',
    });
  }

  public async updateIssue(req: Request, res: Response): Promise<void> {
    const issueId = req.params.id;
    const issue = issueService.updateIssue(issueId, {});
    if (!issue) {
      res.status(404).json({
        error: `Couldn't find issue with ID ${issueId}`,
      });
    } else {
      res.status(200).json({
        issue,
        message: 'Issue successfully updated!:)',
      });
    }
  }
}
