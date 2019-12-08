import { User } from '@app/models';
import { app } from '@config/application';
import { signRefreshToken, signAccessFromRefreshTokenPayload } from '@lib/requestAuthenticator';

import { request } from '../utils';

export async function userAgent(user: User | null): Promise<request.SuperTest<request.Test>> {
  let agent = request.agent(app);

  if(user) {
    const refreshToken = signRefreshToken(user.id);

    const accessToken = await agent.post('/api/refreshAccessToken')
      .set('Cookie', `refreshToken=${refreshToken}`);
  }

  return agent;
}
