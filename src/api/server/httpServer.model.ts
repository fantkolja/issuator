import { RequestHandler, Router } from 'express';
import { Server } from 'http';

export interface HttpServer {
  get(url: string, requestHandler: RequestHandler): void;
  addRouter(url: string, router: Router): void;
  addMiddleware(middleware: RequestHandler): void;
  start(): Server;
}
