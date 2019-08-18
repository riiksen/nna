import { Request, Response } from 'express';

import passport from '../config/passport';

const AVAILABLE_PROVIDERS = [
  'steam',
];

function validProvider(provider: string): boolean {
  return AVAILABLE_PROVIDERS.includes(provider);
}

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

// eslint-disable-next-line
export function logout(req: Request, res: Response): void {
  req.logout();
  // res.json({ status: 'OK' })
}
