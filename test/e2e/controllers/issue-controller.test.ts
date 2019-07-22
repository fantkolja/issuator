import * as request from 'supertest';
import { Server } from 'http';
import { ApiServer } from '../../../src/api/server';
import { IssueController } from '../../../src/api/controllers/issue.controller';

const ROUTE_NAME = '/issue';

describe('Issue controller', () => {
  const port = Number(process.env.PORT);
  let server: Server;

  beforeAll(async (done) => {
    const api = new ApiServer({ port, controllers: [new IssueController(ROUTE_NAME)] });
    server = await api.start();
    done();
  });

  afterAll(() => server.close());

  it('should return all issues on get request to the root "/issue"', async (done) => {
    const response = await request(`${'http://localhost'}:${port}`)
      .get(ROUTE_NAME)
      .set('Accept', 'application/json')
      .expect(200);
    expect(Array.isArray(response.body.issues)).toBeTruthy();
    done();
  });

  it('should return one or no issues on get request to the root "/issue" with an "id" query param', async (done) => {
    const response = await request(`${'http://localhost'}:${port}`)
      .get(`${ROUTE_NAME}/id=777`)
      .set('Accept', 'application/json')
      .expect(200);
    expect(Array.isArray(response.body.issues)).toBeTruthy();
    done();
  });
});
