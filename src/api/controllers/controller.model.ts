import { HttpServer } from '../server/httpServer.model';

export interface Controller {
}

export interface ControllerConstructor {
  new (server: HttpServer): Controller;
}
