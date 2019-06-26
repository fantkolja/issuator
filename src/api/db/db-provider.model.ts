export interface DBProvider {
  connect(host: string): Promise<boolean>;
  on(eventName: string, cb: (...args: any) => void): void;
  once(eventName: string, cb: (...args: any) => void): void;
}
