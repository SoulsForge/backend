import { Router } from 'express';
import { Routes } from '@/interfaces/routes.interface';
import { UserController } from '@modules/user/user.controller';

export class UserRoute implements Routes {
  public path = '/user';
  public router = Router();
  private userController: UserController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id`, this.userController.getUserById);
  }
}
