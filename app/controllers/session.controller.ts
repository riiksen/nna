import { Request, Response } from 'express';

import { passport } from '@initializers/passport';
import { validProvider } from '@app/helpers';

export function login(req: Request, res: Response): void {
  const { provider } = req.params;
  if (validProvider(provider)) {
    passport.authenticate(provider)(req, res, (): void => {});
  }
}

export function handle(req: Request, res: Response): void {
  const { provider } = req.params;
  if (validProvider(provider)) {
    passport.authenticate(provider)(req, res, (): void => res.redirect('/'));
  }
}

export function logout(req: Request, res: Response): void {
  req.logout();
  res.json({ status: 'OK' });
}
