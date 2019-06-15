import { Controller } from './controller.model';
import { Router, Request, Response, NextFunction } from 'express';
import { HttpServer } from '../server/httpServer.model';

// @Controller('/timetable') -> adds constructor, with this.router, and this.app
export class TimetableController implements Controller {
  private router: Router;

  constructor(private server: HttpServer) {
    this.router = Router();
    this.initialize();
    this.server.addRouter('/timetable', this.router);
  }

  private initialize(): void {
    this.router.get('/', this.getTimetable);
  }
  // @Get('/') -> this.router.get()
  private async getTimetable(req: Request, res: Response, next: NextFunction): Promise<void> {
    res.status(200).json({
      timetable: 'timetable',
      message: 'Here is your timetable :)',
    });
  }
}
