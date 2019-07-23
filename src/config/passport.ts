import * as passport from 'passport';
import { Strategy as SteamStrategy } from 'passport-steam';
import { Strategy as MockStrategy } from 'passport-mocked';

import config from './config';

import User from '../models/user';

// eslint-disable-next-line
passport.serializeUser((user: User, done: (err: any, id?: number) => void): void => {
  done(null, user.id);
});

// TODO(mike): type of id normally was number | string
passport.deserializeUser(async (id: number, done: (err: any, user?: User | null) => void): Promise<void> => {
  try {
    const user = await User.findByPk<User>(id);
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
  returnURL: `http://localhost:${config.port}/api/login/steam/handle`,
  realm: `http://localhost:${config.port}/`,
  apiKey: config.steamApiKey,
  // eslint-disable-next-line
}, (identifier: any, profile: any, done: (err: any, user: User) => void): void => {
  // eslint-disable-next-line
  profile.identifier = identifier;
  User.findOne({where: {steamid: profile._json.steamid}}).then(user => {
    if(!user) {
      User.create({
        steamid: profile._json.steamid,
        username: profile._json.personaname,
        avatar: profile._json.avatar,
      }).then(user => {
        return done(null, user);
      });
    } else {
      user.update({
        username: profile._json.personaname,
        avatar: profile._json.avatar,
      }).then(user => {
        return done(null, user);
      });
    }
  });

}));

if(config.env == 'development') {
  passport.use(new MockStrategy({
    name: 'mock',
    callbackURL: `http://localhost:${config.port}/login/mock/handle`,
  }, (accessToken:any, refreshToken:any, profile:any, done: (err: any, profile: object) => void) => {
    profile.accessToken = accessToken;
    profile.refreshToken = refreshToken;

    return done(null,profile);
  })
  );
}

export default passport;
