import { Database } from '../../../src/api/db/database.model';
import { MongooseDBProvider } from '../../../src/api/db/mongoose-db-provider';

describe('Database', () => {
  let db: Database;
  const host = process.env.DB_HOST;
  beforeAll(async (done) => {
    db = new Database(new MongooseDBProvider());
    done();
  });

  it('should connect to the host from environment', async (done) => {
    const eventName = 'open';
    const cb = async () => {
      await db.close();
      db.off(eventName, cb);
      done();
    };
    db.once(eventName, cb);
    await db.connect(host as string);
  });

  it('should throw if passing an invalid host', async (done) => {
    const eventName = 'error';
    const cb = () => {
      db.off(eventName, cb);
      done();
    };
    db.on(eventName, cb);
    await db.connect('INVALID_DB_HOST')
      .catch(() => done());
  });
});
