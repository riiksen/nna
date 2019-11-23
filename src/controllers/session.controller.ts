import { Request, Response } from 'express';
import { sign as signJWT } from 'jsonwebtoken';

import { validProvider } from '@app/helpers';
import { User } from '@app/models';

import { config } from '@config/config';
import { passport } from '@initializers/passport';

export function login(req: Request, res: Response): void {
  const { provider } = req.params;
  if (validProvider(provider)) {
    passport.authenticate(provider)(req, res, (): void => {});
  }
}

export function handle(req: Request, res: Response): void {
  const { provider } = req.params;
  if (validProvider(provider)) {
    passport.authenticate(provider)(req, res, (): void => {
      // TODO: add aud and iss
      const payload = { id: (req.user as User).id };

      const token = signJWT(payload, config.jwtSecret);

      res.json(token);
    });
  }
}

export function logout(req: Request, res: Response): void {
  req.logout();
  res.json({ status: 'OK' });
}
