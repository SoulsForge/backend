import { NextFunction, Request, Response } from 'express';

import Container from 'typedi';
import { EldenRingService } from './elden-ring.service';
import { RequestWithUser } from '@/interfaces/auth.interface';

export class EldenRingController {
  public eldenRingService = Container.get(EldenRingService);

  public getAllCharacters = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const limit = req.query.limit ? +req.query.limit : 10;
      const offset = req.query.offset ? +req.query.offset : 0;

      if (limit < 0 || offset < 0) {
        throw new Error('limit and offset must be positive');
      }

      if (limit > 50) {
        throw new Error('limit must be less than 50');
      }

      let response = null;

      console.log(req.query.user_id);

      if (req.query.user_id) {
        const userId = req.query.user_id as string;
        response = await this.eldenRingService.getCharacterByUserId(userId, limit, offset);
      } else {
        response = await this.eldenRingService.getAllCharacters(limit, offset);
      }

      res.status(200).json({
        data: response,
        limit,
        offset,
      });
    } catch (error) {
      next(error);
    }
  };

  public getCharacterById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id;

      const response = await this.eldenRingService.getCharacterById(id);

      // wait 2 secnond
      await new Promise(resolve => setTimeout(resolve, 2000));

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  public createCharacter = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const characterData = req.body;
      const userId = req.user.id;

      const response = await this.eldenRingService.createCharacter(characterData, userId);

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  };

  public updateCharacter = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const characterData = req.body;

      console.log(id);

      const response = await this.eldenRingService.updateCharacterById(id, characterData);

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}
