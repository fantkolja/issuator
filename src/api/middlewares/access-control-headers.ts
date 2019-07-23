import * as express from 'express';

export function setHeadersMiddleware(req: express.Request, res: express.Response, next: express.NextFunction): void {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, PATCH, POST, DELETE');
  res.set('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
  next();
}
