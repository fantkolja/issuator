import * as request from 'supertest';

import { ApiServer } from '../../../src/api/server/index';
import { Server } from 'http';

describe('API Server', () => {
  let port: number;
  let server: Server;

  beforeAll(async (done) => {
    // TODO: load with dotenv
    // port = Number(process.env.TEST_PORT);
    port = Number(5001);
    const api = new ApiServer(port);
    api.addControllers([]);
    server = await api.start();
    console.log('beforeAll');
    done();
  });

  afterAll(() => server.close());

  test(`should be running on url from environment`, async (done) => {
    const response = await request(`${'http://localhost'}:${port}`)
      .get('/')
      .set('Accept', 'application/json')
      .expect(200);
    console.log(response);
    expect(response).toBeTruthy();
    expect(response.body).toBeTruthy();
    expect(typeof response.body.message).toBe('string');
    done();
  });
});
