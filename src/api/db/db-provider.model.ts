export interface DBProvider {
  connect(host: string): Promise<void>;
  close(): Promise<void>;
  on(eventName: string, cb: (...args: any) => void): void;
  once(eventName: string, cb: (...args: any) => void): void;
  off(eventName: string, cb: (...args: any) => void): void;
}
