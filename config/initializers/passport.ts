import * as passport from 'passport';
import { Strategy as SteamStrategy } from 'passport-steam';

import * as appHelpers from '@app/helpers/application.helper';
import User from '@app/models/user';

import config from '../config';

type DoneFunction<T> = (err?: Error | null, subject?: T | null) => void;

const userSerializer = (user: User, done: DoneFunction<number>): void => done(null, user.id);
const userDeserializer = async (id: number, done: DoneFunction<User>): Promise<void> => {
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
};

passport.serializeUser(userSerializer);
passport.deserializeUser(userDeserializer);

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
  done: DoneFunction<User>,
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

export { passport };
