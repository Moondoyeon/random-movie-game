import { server } from 'mock/server';
import dotenv from 'dotenv';

dotenv.config();

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'bypass' });
});
afterEach(() => server.resetHandlers());
afterAll(() => {
  server.close();
});
