import { expect, request } from './utils'

import app from '../src/main'

describe('Withdraw', () => {
  it('/withdraw should return ok', async () => {
    const res = await request(app).get('/api/withdraw')

    expect(res.body).to.be.json
    expect(res.body.ok).to.equal("ok")
  })
})
