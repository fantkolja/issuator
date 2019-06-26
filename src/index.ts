import { ApiServer } from './api/server';
import { Database } from './api/db/database.model';
import { MongooseDBProvider } from './api/db/mongoose-db-provider';

// import { TimetableController } from './api/controllers/TimetableController';

async function connectDB(host: string) {
  const db = new Database(new MongooseDBProvider());
  db.on('error', err => console.error('DB connection error:', err));
  db.once('open', () => console.log('DB is connected'));
  await db.connect(host);
  return db;
}

async function launchAPIServer() {
  // todo: add default port???
  const port: number = Number(process.env.PORT || 5000);
  const server: ApiServer = new ApiServer(port);

// app.use(logger('dev'));
// TODO: INTERCEPT all /api calls
// server.addControllers([TimetableController]);
  server.addControllers([]);
  server.get('/', (req, res) => {
    res.status(200).json({
      version: '0.0.1',
      message: 'Hello!',
    });
  });
  server.get('/*', (req, res) => {
    res.status(200).json({
      version: '0.0.1',
      documentationURL: '/',
    });
  });
// TODO: useExpressServer(app, { // register created express server in routing-controllers
//   controllers: [UserController] // and configure it the way you need (controllers, validation, etc.)
// });

// addErrorHandler -> should be after other middleware
// let's do inner checks for that
// e.g. app.use(logErrors)
// app.use(clientErrorHandler)
// app.use(errorHandler)
// catch-all handler, the last one
//   function errorHandler (err, req, res, next) {
//    res.status(500)
//    res.render('error', { error: err })
//   }
  server.start();

}

async function main() {
  await connectDB('mongodb://issuemaster:1105InFa@ds341847.mlab.com:41847/issuator');
  launchAPIServer();
}

console.log('process.env.PORT', process.env.PORT);

main();
