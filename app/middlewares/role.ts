import { Request, Response, NextFunction } from 'express';
import { Role, User } from '@app/models';

export default function (role: string): (req: Request, res: Response, next: NextFunction) => void {
  return (req: Request, res: Response, next: NextFunction): void => {
    User.findOne<User>({ where: { id: req.user.id }, include: [Role] })
      .then((user): (Response | void) => {
        if (user && user.isRole(role)) {
          return next();
        }
        return res.sendStatus(404);
      });
  };
}
