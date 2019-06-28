import { Controller } from './controller.model';
import { Request, Response, NextFunction } from 'express';
import { ApiResponseBase } from '../../../common/models/api-response';

export class IssueController extends Controller {
  protected initialize(): void {
    this.router.get('/', this.getIssue);
  }

  public async getIssue(req: Request, res: Response, next: NextFunction): Promise<ApiResponseBase> {
    const response: ApiResponseBase = {
      issue: 'issue',
      message: 'Here is your issue :)',
      issues: [],
    };
    res.status(200).json(response);
    return response;
  }
}
