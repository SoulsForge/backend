import { AuthController } from '@/modules/auth/auth.controller';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { Router } from 'express';
import { Routes } from '@/interfaces/routes.interface';

export class AuthRoute implements Routes {
  public path = '/auth';
  public router = Router();
  public auth = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/register`, this.auth.register);
    this.router.post(`${this.path}/login`, this.auth.login);
    this.router.post(`${this.path}/logout`, AuthMiddleware, this.auth.logout);
  }
}
