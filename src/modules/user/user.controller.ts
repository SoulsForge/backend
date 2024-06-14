import { NextFunction, Request, Response } from 'express';

import { Container } from 'typedi';
import { UserService } from './user.service';

export class UserController {
  private userService = Container.get(UserService);

  public getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.id;
      const user = await this.userService.findUserById(userId);

      res.status(200).json({ data: user });
    } catch (error) {
      next(error);
    }
  };
}
