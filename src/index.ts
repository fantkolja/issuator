import { ApiServer } from './api/server';
// import { TimetableController } from './api/controllers/TimetableController';

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

// async function test(): Promise<void> {
//   console.log('test');
// }
//
// test();
