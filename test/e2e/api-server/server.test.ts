import * as request from 'supertest';
import { ApiServer } from '../../../src/api/server';
import { Server } from 'http';

describe('API Server', () => {
  const port = Number(process.env.PORT);
  let server: Server;

  beforeAll(async (done) => {
    const api = new ApiServer({ port });
    server = await api.start();
    api.get('/', (req, res) => {
      res.status(200).json({
        version: '0.0.1',
      });
    });
    done();
  });

  afterAll(() => server.close());

  it('should be running on url from environment', async (done) => {
    const response = await request(`${'http://localhost'}:${port}`)
      .get('/')
      .set('Accept', 'application/json')
      .expect(200);
    expect(response).toBeTruthy();
    expect(response.body).toBeTruthy();
    expect(typeof response.body.version).toBe('string');
    done();
  });
});
