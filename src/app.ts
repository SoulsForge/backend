import { ErrorMiddleware } from './middlewares/error.middleware';
import { Routes } from '@interfaces/routes.interface';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import env from '@config';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import { logger } from '@utils/logger';
import morgan from 'morgan';

export class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = env.NODE_ENV;
    this.port = env.PORT;

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`ENV: ${this.env} `);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(morgan('dev'));
    this.app.use(cors({ origin: env.ORIGIN, credentials: true }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      logger.info(`Route added: ${route.path}`);
      this.app.use('/', route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(ErrorMiddleware);
  }
}
