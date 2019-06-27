import { DBProvider } from './db-provider.model';

/**
 * Need to operate with Database that doesn't know what ORM and what actual database type we use
 * because it can change later on...
 * For that to work we'll use strategy pattern
 */

export class Database {
  constructor(private dbProvider: DBProvider) {
  }

  connect(host: string): Promise<boolean> {
    return this.dbProvider.connect(host);
  }

  public on(eventName: string, cb: (...args: any) => void): void {
    this.dbProvider.on(eventName, cb);
  }

  public once(eventName: string, cb: (...args: any) => void): void {
    this.dbProvider.once(eventName, cb);
  }
}
