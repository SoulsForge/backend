import { Request, Response } from 'express';

import { logger } from '@/utils/logger';
import prisma from '@/services/prisma.service';

export class TestController {
  public async createTest(req: Request, res: Response) {
    logger.info('TestController.createTest');
    const { name } = req.body;

    const a = await prisma.test.create({
      data: {
        name,
      },
    });

    res.status(201).json(a);
  }
}
