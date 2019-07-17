import * as passport from 'passport';
import { Strategy as OPSkinsStrategy } from 'passport-opskins';
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
 * Sign in with OPSkins
 */
passport.use(new OPSkinsStrategy({
  apiKey: config.opSkinsApiKey,
  returnURL: '/login/handle/opskins',
  scopes: 'identity_basic',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}, (user: any, done: any): void => {
  done(null, user);
}));

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
