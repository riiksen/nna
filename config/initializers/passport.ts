import { Request } from 'express';
import * as passport from 'passport';
import { Strategy as JWTStrategy } from 'passport-jwt';
import { Strategy as SteamStrategy } from 'passport-steam';

import { apiUrlWithPortFor, rootUrlWithPort } from '@app/helpers';
import { User } from '@app/models';

import { checkAccessToken } from '@lib/requestAuthenticator';

import { config } from '../config';

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

function extractAccessTokenFromCookie(req: Request): string | null {
  const accessToken = req?.cookies?.accessToken;
  if (checkAccessToken(accessToken)) {
    return accessToken;
  }
  return null;
}

// TODO: add iss and aud jwt fields
passport.use(new JWTStrategy({
  jwtFromRequest: extractAccessTokenFromCookie,
  secretOrKey: config.jwtSecret,
  passReqToCallback: true,
}, async (
  req: Request,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any,
  done: DoneFunction<User>,
): Promise<void> => {
  try {
    const user = await User.findByPk<User>(payload.id);
    if (user) {
      done(null, user);
      req.user = user;
      return;
    }

    // Should never happen as we issue jwt's, so if this would be called that could
    // mean that someone somehow extracted jwt secret and crafted jwt by himself
    done(new Error('user not found'));
  } catch (e) {
    done(e);
  }
}));

/**
 * Sign in with Steam
 * TODO(mike): Automatically detect if port is needed to pass in helpers
 * TODO(mike): Change withPort helpers to their equivalents without port
 */
passport.use(new SteamStrategy({
  returnURL: apiUrlWithPortFor('/login/handle/steam'),
  realm: rootUrlWithPort(),
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
