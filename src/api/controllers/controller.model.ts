import { Router } from 'express';

export abstract class Controller {
  protected router: Router;
  protected routeURL: string;

  constructor(routeURL: string) {
    this.router = Router();
    this.routeURL = routeURL;
    this.initialize();
  }

  protected abstract initialize(): void;

  public getRouter(): Router {
    return this.router;
  }

  public getRouteName(): string {
    return this.routeURL;
  }
}
