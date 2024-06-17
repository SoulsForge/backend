import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { EldenRingController } from '@/modules/elden-ring/elden-ring.controller';
import { Router } from 'express';
import { Routes } from '@/interfaces/routes.interface';

export class EldenRingRoute implements Routes {
  public path = '/elden-ring';
  public router = Router();

  private eldenRingController = new EldenRingController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.eldenRingController.getAllCharacters);
    this.router.get(`${this.path}/:id`, this.eldenRingController.getCharacterById);
    this.router.post(`${this.path}`, AuthMiddleware, this.eldenRingController.createCharacter);
    this.router.put(`${this.path}/:id`, AuthMiddleware, this.eldenRingController.updateCharacter);
  }
}
