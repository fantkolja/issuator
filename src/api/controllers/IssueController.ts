import { Controller } from './controller.model';
import { Request, Response, NextFunction } from 'express';

export class IssueController extends Controller {
  protected initialize(): void {
    this.router.get('/', this.getIssue);
  }

  private async getIssue(req: Request, res: Response, next: NextFunction): Promise<void> {
    res.status(200).json({
      issue: 'issue',
      message: 'Here is your issue :)',
    });
  }
}
