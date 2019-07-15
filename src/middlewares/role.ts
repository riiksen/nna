import { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import Role from '../models/role';

export default function(role: string) {
  return function(req: Request, res: Response, next: NextFunction) {
    User.findOne<User>({where: {id:req.user.id}, include: [Role]}).then(user => {
      if(user.isRole(role)) {
        return next();
      }
      return res.sendStatus(404);
    });
  }
}