import { User } from '@app/models';

import { userAgent } from '../helpers_for_tests/userAgent';
import { request } from '../utils';

let firstUser: User | null;
let firstUserAgent: request.SuperTest<request.Test>;

beforeAll(async() => {
  firstUser = await User.findByPk<User>(1);
  firstUserAgent = await userAgent(firstUser);
});

describe('User', (): void => {
  describe('#getUser', (): void => {
    it('Should return user object or 401', async(): Promise<void> => {
      const res = await firstUserAgent.get('/api/user/');
      expect(res.text).toEqual(JSON.stringify(firstUser));
      expect(res.status).toEqual(200);

      const notLoggedAgent = await userAgent(null);
      const notLoggedRes = await notLoggedAgent.get('/api/user/');
      
      expect(notLoggedRes.status).toEqual(401);
    });
  });
});
