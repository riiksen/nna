import { Request, Response } from 'express';

export function getUser(req: Request, res: Response): void {
  res.json(req.user);
}
