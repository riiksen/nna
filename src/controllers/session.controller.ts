import { Request, Response } from 'express';

import passport from '../config/passport';

export function login(req: Request, res: Response): void {
  const { provider } = req.params;
  switch (provider) {
    case 'steam':
      passport.authenticate('steam')(req, res, (): void => {});
      break;
    default:
  }
}

export function handle(req: Request, res: Response): void {
  const { provider } = req.params;
  switch (provider) {
    case 'steam':
      passport.authenticate('steam')(req, res, (): void => res.redirect('/'));
      break;
    default:
  }
}

// eslint-disable-next-line
export function logout(req: Request, res: Response): void {
  req.logout();
  // res.json({ status: 'OK' })
}
