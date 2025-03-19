import { ConsoleLogger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { PrismaClientExceptionFilter } from './filters/entity-not-found/entity-not-found.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({ prefix: 'SoulsForge' }),
  });
  app.useGlobalPipes(new ValidationPipe());

  // filters
  app.useGlobalFilters(new PrismaClientExceptionFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
