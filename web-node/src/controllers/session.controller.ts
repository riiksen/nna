import passport from "passport";
import SteamStrategy from "passport-steam";
import { Request, Response, NextFunction } from "express";

export function login(req: Request, res: Response) {

}

export function handle(req: Request, res: Response) {

}

export function logout(req: Request, res: Response) {
  req.logout();
  // res.json({ status: "OK" });
}
