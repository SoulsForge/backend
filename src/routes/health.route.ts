import { Router } from 'express';
import { Routes } from '@/interfaces/routes.interface';
import { TestController } from '@/features/test/test.controller';

export class HealthRoute implements Routes {
  public path = '/';
  public router = Router();
  private testController = new TestController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`/`, (req, res) => {
      res.json({
        message: 'OK',
        timestamp: new Date().toISOString(),
      });
    });

    this.router.post(`/test`, this.testController.createTest);
  }
}
