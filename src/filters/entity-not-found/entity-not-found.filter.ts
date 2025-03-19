import {
  ArgumentsHost,
  Catch,
  ConflictException,
  HttpStatus,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';

import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements GqlExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    GqlArgumentsHost.create(host);

    // const ctx = host.switchToHttp();

    // const response = ctx.getResponse<Response>();

    // const message = exception.message.replace(/\n/g, '');

    switch (exception.code) {
      case 'P2025':
        return new NotFoundException('Entity not found');
      case 'P2002':
        return new ConflictException('Internal Server Error');
      default:
        return new Error('Internal Server Error');
    }
  }
}
