import * as passport from 'passport';
// import * as SteamStrategy from 'passport-steam';
import { Request, Response } from 'express';
// import { Request, Response, NextFunction } from 'express';

export function login(req: Request, res: Response): void {
  passport.authenticate('steam')(req, res, (): void => {});
}

export function handle(req: Request, res: Response): void {
  passport.authenticate('steam')(req, res, (): void => res.redirect('/'));
}

export function logout(req: Request, res: Response): void {
  req.logout();
  res.json({ status: 'OK' });
}
