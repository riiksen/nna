import { User } from '@app/models';

import { userAgent } from '../helpers_for_tests/userAgent';
import { request } from '../utils';

describe('User', (): void => {

  let testUser: User | null;
  let testUserAgent: request.SuperTest<request.Test>;

  beforeAll(async(done) => {
    [testUser] = await User.findOrCreate<User>({
      where: {
        steamid: 'test',
      }
    });
    testUserAgent = await userAgent(testUser);

    done();
  });
  
  describe('#getUser', (): void => {
    it('Should return user object or 401', async(): Promise<void> => {
      const res = await testUserAgent.get('/api/user/');
      expect(res.body).toEqual(JSON.parse(JSON.stringify(testUser)));
      expect(res.status).toEqual(200);

      const notLoggedAgent = await userAgent(null);
      const notLoggedRes = await notLoggedAgent.get('/api/user/');
      
      expect(notLoggedRes.status).toEqual(401);
    });
  });
});
