import * as passport from 'passport';
import * as SteamStrategy from 'passport-steam';
import { Request, Response, NextFunction } from 'express';

export function login(req: Request, res: Response) {

}

export function handle(req: Request, res: Response) {

}

export function logout(req: Request, res: Response) {
  req.logout();
  // res.json({ status: 'OK' })
}
