import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { GqlExecutionContext } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { requestContext } from './request.context';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('GraphQL');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = GqlExecutionContext.create(context);
    const info = ctx.getInfo();
    const store = requestContext.getStore();

    // Log de operación GraphQL
    this.logger.debug(
      `\x1b[35mCID:${store?.correlationId}\x1b[0m \x1b[36m${info.parentType} ${info.fieldName}\x1b[0m`,
    );

    return next.handle().pipe(
      tap({
        error: (err) => {
          this.logger.error(
            `\x1b[35mCID:${store?.correlationId}\x1b[0m \x1b[31mERROR in ${info.fieldName}: ${err.message}\x1b[0m`,
          );
        },
      }),
    );
  }
}
