import { expect, request } from './utils';

import { app } from '@config/application';

describe('Withdraw', (): void => {
  it('/withdraw should return ok', async (): Promise<void> => {
    const res = await request(app).get('/api/withdraw');

    expect(res.body).to.deep.equal({ ok: 'ok' });
  });
});
