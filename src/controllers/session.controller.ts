import * as passport from 'passport';
// import * as SteamStrategy from 'passport-steam';
import { Request, Response } from 'express';
// import { Request, Response, NextFunction } from 'express';

// eslint-disable-next-line
export function login(req: Request, res: Response) {
  passport.authenticate('steam', () => {

  })(req,res);
}

// eslint-disable-next-line
export function handle(req: Request, res: Response) {
  passport.authenticate('steam', {failureRedirect: '/'}, () => {
    res.redirect('/');
  })(req,res);
}

// eslint-disable-next-line
export function logout(req: Request, res: Response): void {
  req.logout();
  // res.json({ status: 'OK' })
}
