import { NextFunction, Request, Response } from 'express';

import { AuthService } from './auth.service';
import Container from 'typedi';

export class AuthController {
  public authService = Container.get(AuthService);

  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData = req.body;
      console.log(userData);

      const registerUserData = await this.authService.register(userData);

      res.status(201).json({
        data: {
          id: registerUserData.id,
          email: registerUserData.email,
          username: registerUserData.username,
        },
        message: 'register',
      });
    } catch (error) {
      next(error);
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData = req.body;

      const { cookie, data } = await this.authService.login(userData);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data, message: 'login' });
    } catch (error) {
      next(error);
    }
  };

  public logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData = req.body;
      const logoutUserData = await this.authService.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logoutUserData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
}
