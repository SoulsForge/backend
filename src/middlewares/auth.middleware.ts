import { DataStoredInToken, RequestWithUser } from '@/interfaces/auth.interface';
import { NextFunction, Request, Response } from 'express';

import { HttpException } from '@/exceptions/http.exception';
import env from '@/config';
import { logger } from '@/utils/logger';
import prisma from '@/modules/db/prisma.service';
import { verify } from 'jsonwebtoken';

const getAuthorization = (req: Request) => {
  const cookie = req.cookies['Authorization'];

  logger.info(`Cookie: ${cookie}`);

  if (cookie) {
    return cookie;
  }

  const header = req.header('Authorization');

  logger.info(`Header: ${header}`);

  if (header) {
    return header.split('Bearer ')[1];
  }

  return null;
};

export const AuthMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const authorization = getAuthorization(req);

    if (authorization) {
      const { id } = verify(authorization, env.JWT_SECRET) as DataStoredInToken;
      const user = await prisma.user.findUnique({ where: { id } });

      if (user) {
        req.user = user;
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(401, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};
