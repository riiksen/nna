import * as passport from 'passport';
// import { Strategy as OPSkinsStrategy } from 'passport-opskins';
import { Strategy as SteamStrategy } from 'passport-steam';

import config from './config';

import * as appHelpers from '../helpers/application_helper';

import User from '../models/user';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

// /**
//  * Sign in with OPSkins
//  */
// passport.use(new OPSkinsStrategy({
//   apiKey: config.opSkinsApiKey,
//   returnURL: '/login/handle/opskins',
//   scopes: 'identity_basic',
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
// }, (user: any, done: any): void => {
//   done(null, user);
// }));

/**
 * Sign in with Steam
 * TODO(mike): Automatically detect if port is needed to pass in helpers
 */
passport.use(new SteamStrategy({
  returnURL: appHelpers.apiUrlWithPortFor('/login/handle/steam'),
  realm: appHelpers.rootUrlWithPort(),
  apiKey: config.steamApiKey,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}, async (identifier: any, profile: any, done: any): Promise<void> => {
  try {
    const [user] = await User.upsert({
      steamid: profile.id,
      username: profile.displayName,
      avatar: profile.photos[0].value,
    }, {
      returning: true,
    });
    done(null, user);
  } catch (e) {
    done(e);
  }
}));

export default passport;
