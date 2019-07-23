import { DBProvider } from './db-provider.model';
import { connect, Mongoose, connection, Connection } from 'mongoose';

export class MongooseDBProvider implements DBProvider {
  private connection: Connection;

  constructor() {
    this.connection = connection;
  }

  public connect(host: string): Promise<void> {
    return connect(host, {
      useNewUrlParser: true,
      autoIndex: false,
    }).then((mongoose: Mongoose) => {});
  }

  public close(): Promise<void> {
    return this.connection.close();
  }

  public on(eventName: string, cb: (...args: any) => void): void {
    this.connection.on(eventName, cb);
  }

  public once(eventName: string, cb: (...args: any) => void): void {
    this.connection.once(eventName, cb);
  }

  public off(eventName: string, cb: (...args: any) => void): void {
    this.connection.off(eventName, cb);
  }
}
