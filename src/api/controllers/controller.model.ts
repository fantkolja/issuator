import { HttpServer } from '../server/httpServer.model';

export interface Controller {
  [name: string]: any;
}

export type ControllerConstructor = new (server: HttpServer) => Controller;
