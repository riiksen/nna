import * as passport from 'passport';
import { Strategy as SteamStrategy } from 'passport-steam';

import config from './config';

import * as appHelpers from '../helpers/application.helper';

import User from '../models/user';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
passport.serializeUser((user: User, done: (err: any, id?: number) => void): void => {
  done(null, user.id);
});

// TODO(mike): type of id normally was number | string
passport.deserializeUser(async (
  id: number,
  done: (err?: Error | null, user?: User) => void,
): Promise<void> => {
  try {
    const user = await User.findByPk<User>(id);
    if (user) {
      done(null, user);
      return;
    }

    done(new Error('user not found'));
  } catch (e) {
    done(e);
  }
});

/**
 * Sign in with Steam
 * TODO(mike): Automatically detect if port is needed to pass in helpers
 * TODO(mike): Change withPort helpers to their equivalents without port
 */
passport.use(new SteamStrategy({
  returnURL: appHelpers.apiUrlWithPortFor('/login/handle/steam'),
  realm: appHelpers.rootUrlWithPort(),
  apiKey: config.steamApiKey,
  /* eslint-disable @typescript-eslint/no-explicit-any */
}, async (
  identifier: any,
  profile: any,
  done: (err?: Error | null, user?: User | null) => void,
  /* eslint-enable @typescript-eslint/no-explicit-any */
): Promise<void> => {
  try {
    /* eslint-disable no-underscore-dangle */
    const [user] = await User.upsert({
      steamid: profile._json.steamid,
      username: profile._json.personaname,
      avatar: profile._json.avatar,
    }, {
      returning: true,
    });
    /* eslint-enable no-underscore-dangle */
    done(null, user);
  } catch (e) {
    done(e);
  }
}));

export default passport;
