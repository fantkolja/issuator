import * as express from 'express';
import { HttpServer } from './httpServer.model';
import { Server } from 'http';
import { Controller, ControllerConstructor } from '../controllers/controller.model';

function setAccessControlHeaders(res: express.Response): void {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, PATCH, POST, DELETE');
  res.set('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
}

export class ApiServer implements HttpServer {
  private static setHeadersMiddleware(req: express.Request, res: express.Response, next: express.NextFunction): void {
    setAccessControlHeaders(res);
    next();
  }
  private app: express.Application;

  constructor(private port: number) {
    this.app = express();
    this.addMiddleware(express.json());
    this.addMiddleware(ApiServer.setHeadersMiddleware);
  }

  public addMiddleware(middleware: express.RequestHandler): void {
    this.app.use(middleware);
  }

  public get(url: string, requestHandler: express.RequestHandler): void {
    this.app.get(url, requestHandler);
  }

  public addRouter(url: string, router: express.Router): void {
    this.app.use(`/api${url}`, router);
  }

  // TODO: specify controller type
  public addControllers(controllers: ControllerConstructor[]): void {
    controllers.forEach((controller): Controller => {
      return new controller(this);
    });
  }

  public start(): Server {
    return this.app.listen(this.port, () => console.log(`API server is listening on ${this.port} port`));
  }
}
