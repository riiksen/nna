import { User } from '@app/models';

import { userAgent } from '../helpers_for_tests/userAgent';
import { request } from '../utils';

let first_user: User | null;
let user_agent: request.SuperTest<request.Test>;

beforeAll(async() => {
  first_user = await User.findByPk<User>(1);
  user_agent = await userAgent(first_user);
});

describe('User', (): void => {
  describe('#getUser', (): void => {
    it('Should return user object or 401', async(): Promise<void> => {
      const res = await user_agent.get('/api/user/');
      expect(res.text).toEqual(JSON.stringify(first_user));
      expect(res.status).toEqual(200);

      const notLoggedAgent = await userAgent(null);
      const notLoggedRes = await notLoggedAgent.get('/api/user/');
      
      expect(notLoggedRes.status).toEqual(401);
    });
  });
});
