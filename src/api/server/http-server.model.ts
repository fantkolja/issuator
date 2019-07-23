import { RequestHandler } from 'express';
import { Server } from 'http';
import { Controller } from '../controllers/controller.model';

export interface HttpServer {
  get(url: string, requestHandler: RequestHandler): void;
  addMiddlewares(middlewares: RequestHandler[]): void;
  addControllers(controllers: Controller[]): void;
  start(): Promise<Server>;
}
