import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { requestContext } from './request.context';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  private getColorByMethod(method: string): string {
    const colors = {
      GET: '\x1b[32m', // Verde
      POST: '\x1b[34m', // Azul
      PUT: '\x1b[33m', // Amarillo
      DELETE: '\x1b[31m', // Rojo
      PATCH: '\x1b[36m', // Cyan
    };
    return colors[method] || '\x1b[37m'; // Blanco por defecto
  }

  use(req: Request, res: Response, next: NextFunction) {
    const correlationId = uuidv4();
    const startTime = Date.now();

    requestContext.run({ correlationId, startTime }, () => {
      // Log de request
      const methodColor = this.getColorByMethod(req.method);
      this.logger.log(
        `\x1b[35mCID:${correlationId}\x1b[0m ${methodColor}${req.method}\x1b[0m ${req.originalUrl}`,
      );

      // Log de response
      res.on('finish', () => {
        const duration = Date.now() - startTime;
        const statusColor = res.statusCode >= 400 ? '\x1b[31m' : '\x1b[32m';
        this.logger.log(
          `\x1b[35mCID:${correlationId}\x1b[0m ${statusColor}${res.statusCode}\x1b[0m ${req.method} ${req.originalUrl} \x1b[33m${duration}ms\x1b[0m`,
        );
      });

      next();
    });
  }
}
