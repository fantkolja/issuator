import { ApiServer } from './api/server';
import { TimetableController } from './api/controllers/TimetableController';
import { join } from 'path';
import * as express from 'express';
import { timetableScrapper } from './services/scrapper';
import { htmlParser } from './services/html-parser';

const port: number = Number(process.env.API_PORT);
const server: ApiServer = new ApiServer(port);

// TODO: move static files path to config
const staticRoot = join(__dirname, '../frontend/build');
const staticMiddleware: express.Handler = express.static(`${staticRoot}`);

// app.use(logger('dev'));
// TODO: INTERCEPT all /api calls
server.addControllers([TimetableController]);
server.addMiddleware(staticMiddleware);
server.get('/*', (req, res) => {
  res.status(200).sendFile(`${staticRoot}/index.html`);
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

// timetableScrapper.getTeachers();
// timetableScrapper.getTeacher('Фант');
async function test(): Promise<void> {
  const html = await timetableScrapper.getTimeTable();
  const timetable = htmlParser.parseChosenPeriod(html.toString());
  console.log(timetable);
}

test();
