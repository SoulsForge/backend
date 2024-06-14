import { Router } from 'express';
import { Routes } from '@/interfaces/routes.interface';

export class HealthRoute implements Routes {
  public path = '/';
  public router = Router();

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
  }
}
