import { Request, Response } from 'express';

import { validProvider } from '@app/helpers';
import { User } from '@app/models';

import { passport } from '@initializers/passport';
import { getRefreshTokenPayload, signAccessFromRefreshTokenPayload, signRefreshToken } from '@lib/requestAuthenticator';

export function login(req: Request, res: Response): void {
  const { provider } = req.params;
  if (validProvider(provider)) {
    passport.authenticate(provider)(req, res);
  }
}

export function handle(req: Request, res: Response): void {
  const { provider } = req.params;
  if (validProvider(provider)) {
    passport.authenticate(provider, (err: Error, user: User): void => {
      if (!err) {
        const refreshToken = signRefreshToken(user.id);

        res.cookie('refreshToken', refreshToken, { httpOnly: true });

        res.json({ status: 'OK' });
      } else {
        res.sendStatus(422);
      }
    })(req, res);
  }
}

export function refreshAccessToken(req: Request, res: Response): void | Response {
  try {
    const payload = getRefreshTokenPayload(req?.cookies?.refreshToken);
    if (!payload) {
      return res.sendStatus(401);
    }

    const accessToken = signAccessFromRefreshTokenPayload(payload);

    res.cookie('accessToken', accessToken, { httpOnly: true });

    return res.send({ status: 'OK' });
  } catch (e) {
    return res.sendStatus(401);
  }
}

export function logout(req: Request, res: Response): Response {
  req.logout();

  return res.json({ status: 'OK' });
}
