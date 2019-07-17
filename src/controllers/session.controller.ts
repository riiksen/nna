// import * as passport from 'passport';
// import * as SteamStrategy from 'passport-steam';
import { Request, Response } from 'express';
// import { Request, Response, NextFunction } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function login(req: Request, res: Response): void {
  const { provider } = req.params;
  switch (provider) {
    case 'opskins':
      break;
    case 'steam':
      break;
    default:
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function handle(req: Request, res: Response): void {
  const { provider } = req.params;
  switch (provider) {
    case 'opskins':
      break;
    case 'steam':
      break;
    default:
  }
}

// eslint-disable-next-line
export function logout(req: Request, res: Response): void {
  req.logout();
  // res.json({ status: 'OK' })
}
