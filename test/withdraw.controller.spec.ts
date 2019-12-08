import { app } from '@config/application';

import { request } from './utils';

describe('Withdraw', (): void => {
  it('/withdraw should return ok', async (): Promise<void> => {
    const res = await request(app).get('/api/withdraw');

    expect(res.body).toEqual({ ok: 'ok' });
  });
});
