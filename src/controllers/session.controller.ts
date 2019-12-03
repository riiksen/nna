import { Request, Response } from 'express';
import { sign as signJWT, verify as verifyJWT } from 'jsonwebtoken';

import { config } from '@config/config';
import { User } from '@app/models';

export function handle(req: Request, res: Response): Response {
  const payload = {
    id: (req.user as User).id,
    isRefreshToken: true,
  };
  const refreshToken = signJWT(payload, config.jwtSecret, { expiresIn: '30 days' });

  res.cookie('refreshToken', refreshToken, { httpOnly: true });

  return res.json({ status: 'OK' });
}

export function logout(req: Request, res: Response): Response {
  req.logout();

  return res.json({ status: 'OK' });
}

export function refreshAccessToken(req: Request, res: Response): void | Response {
  // Not all code paths returns a value - beacuse of this if
  // i don't have clue why this happening
  // Added void | Response, beacuse of it.
  if (req.cookies.refreshToken) {
    return res.status(422).send('No refresh token provided.');
  }
  verifyJWT(req.cookies.refreshToken, config.jwtSecret, (err: any, payload: any) => {
    if (err || !payload.isRefreshToken) {
      return res.sendStatus(401);
    }
    const accessToken = signJWT({ id: payload.id as number }, config.jwtSecret, { expiresIn: 30 });

    res.cookie('accessToken', accessToken, { httpOnly: true });

    return res.send({ status: 'OK' });
  });
}
export function getUser(req: Request, res: Response) {
  verifyJWT(req.cookies.accessToken, config.jwtSecret, async (err: any, payload: any) => {
    if (err) {
      return res.sendStatus(401);
    }
    const user = await User.findByPk<User>(payload.id);

    if (user) {
      return res.json(user);
    }
    return res.json({ err: 'Could not get user' });
  });
}
