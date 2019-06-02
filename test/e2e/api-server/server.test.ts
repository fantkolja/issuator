import * as request from 'supertest';

import { ApiServer } from '../../../src/api/server/index';
import { DictionaryController } from '../../../src/api/controllers/DictionaryController';
import { Server } from 'http';

describe('API Server', () => {
  let port: number;
  let server: Server;

  beforeAll(() => {
    // TODO: load with dotenv
    // port = Number(process.env.API_TEST_PORT);
    port = Number(5001);
    const api = new ApiServer(port);
    api.addControllers([DictionaryController]);
    server = api.start();
  });

  afterAll(() => server.close());

  describe('#after init', () => {
    test(`should be running on url from environment`, async (done) => {
      const response = await request(`${'http://localhost'}:${port}`)
        .get('/dictionaries')
        .set('Accept', 'application/json')
        .expect(200);
      expect(response).toBeTruthy();
      expect(response.body).toBeTruthy();
      expect(typeof response.body.message).toBe('string');
      done();
    });
  });
});
