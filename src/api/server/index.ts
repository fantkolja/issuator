import * as express from 'express';
import { HttpServer } from './http-server.model';
import { Server } from 'http';
import { Controller } from '../controllers/controller.model';

export interface ApiServerConfig {
  port: number;
  middlewares?: express.RequestHandler[];
  controllers?: Controller[];
}

export class ApiServer implements HttpServer {
  private app: express.Application;
  private port: number;

  constructor({ port, middlewares = [], controllers = [] }: ApiServerConfig) {
    this.port = port;
    this.app = express();
    this.addMiddlewares(middlewares);
    this.addControllers(controllers);
  }

  private addRouter(url: string, router: express.Router): void {
    this.app.use(`${url}`, router);
  }

  public addMiddlewares(middlewares: express.RequestHandler[]): void {
    middlewares.forEach((middleware) => {
      this.app.use(middleware);
    });
  }

  public get(url: string, requestHandler: express.RequestHandler): void {
    this.app.get(url, requestHandler);
  }

  public addControllers(controllers: Controller[]): void {
    controllers.forEach((controller) => {
      this.addRouter(controller.getRouteName(), controller.getRouter());
    });
  }

  public start(): Promise<Server> {
    return new Promise((res) => {
      const server: Server = this.app.listen(this.port, () => {
        // tslint:disable-next-line:no-console
        console.log(`API server is listening on ${this.port} port`);
        res(server);
      });
    });
  }
}
