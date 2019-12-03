import { Request, Response } from 'express';
import { sign as signJWT, verify as verifyJWT } from 'jsonwebtoken';

import { config } from '@config/config';
import { User } from '@app/models';

type accessTokenPayloadType = { id: number };
type refreshTokenPayloadType = { id: number; isRefreshToken: boolean };

export function handle(req: Request, res: Response): Response {
  const payload: refreshTokenPayloadType = {
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
  try {
    const payload = verifyJWT(req.cookies.refreshToken,
      config.jwtSecret) as refreshTokenPayloadType;

    if (!payload.isRefreshToken) {
      return res.sendStatus(401);
    }
    const accessToken = signJWT({ id: payload.id as number }, config.jwtSecret, { expiresIn: 30 });

    res.cookie('accessToken', accessToken, { httpOnly: true });

    return res.send({ status: 'OK' });
  } catch (e) {
    return res.sendStatus(401);
  }
}
export async function getUser(req: Request, res: Response): Promise<Response> {
  try {
    const payload = verifyJWT(req.cookies.accessToken,
      config.jwtSecret) as accessTokenPayloadType;

    const user = await User.findByPk<User>(payload.id);

    if (user) {
      return res.json(user);
    }
    return res.json({ err: 'Could not get user' });
  } catch (e) {
    return res.sendStatus(401);
  }
}
