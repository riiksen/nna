import * as passport from 'passport';
import { Strategy as SteamStrategy } from 'passport-steam';

import config from './config';

import User from '../models/user';

// eslint-disable-next-line
passport.serializeUser((user: User, done: (err: any, id?: number) => void): void => {
  done(null, user.id);
});

// TODO(mike): type of id normally was number | string
passport.deserializeUser(async (id: number, done): Promise<void> => {
  try {
    const user = await User.findByPk<User>(id)
    if (!user) {
      done(new Error('user not found'));
    }

    done(null, user);
  } catch (e) {
    done(e);
  }
});

/**
 * Sign in with Steam
 */
passport.use(new SteamStrategy({
  returnURL: '/login/handle',
  realm: '',
  apiKey: config.steamApiKey,
  // eslint-disable-next-line
}, (identifier: any, profile: any, done: any): void => {
  // eslint-disable-next-line
  profile.identifier = identifier;

  done(null, profile);
}));

export default passport;
