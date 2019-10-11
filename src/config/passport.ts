import * as passport from 'passport';
import { Strategy as SteamStrategy } from 'passport-steam';

import config from './config';

import User from '../models/user';

// eslint-disable-next-line
passport.serializeUser((user: User, done: (err: any, id?: number) => void) => {
  done(null, user.id);
});

// TODO(mike): type of id normally was number | string
passport.deserializeUser((id: number, done: (err: any, user?: User | null) => void) => {
  User.findByPk<User>(id).then((user) => {
    if (!user) {
      done(new Error('user not found'));
    }

    done(null, user);
  });
});

/**
 * Sign in with Steam
 */

passport.use(new SteamStrategy({
  returnURL: `http://localhost:${config.port}/api/login/steam/handle`,
  realm: `http://localhost:${config.port}/`,
  apiKey: config.steamApiKey,
  // eslint-disable-next-line
}, async(identifier: any, profile: any, done: (err: any, user?: User | null) => void): Promise<void> => {
  try {
    const [user] = await User.upsert({
      steamid: profile._json.steamid,
      username: profile._json.personaname,
      avatar: profile._json.avatar,
    }, {
      returning: true,
    });
    done(null, user);
  } catch(err) {
    done(err);
  }
}));

export default passport;
