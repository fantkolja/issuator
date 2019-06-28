import { Controller } from './controller.model';
import { Request, Response } from 'express';

export class IssueController extends Controller {
  protected initialize(): void {
    this.router.get('/:id', this.getIssues);
  }

  public async getIssues(req: Request, res: Response): Promise<boolean> {
    res.status(200).json({
      message: 'Here is your issues :)',
      issues: [],
    });
    // console.log('req.params.id -->', req.params.id);
    // @todo: return issues
    return true;
  }

  public async postIssue(req: Request, res: Response): Promise<boolean> {
    res.status(200).json({
      message: 'Issue successfully posted',
      issues: [],
    });
    return true;
  }
}
