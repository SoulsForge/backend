import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MiddlewareConsumer, Module } from '@nestjs/common';

import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthModule } from './modules/auth/auth.module';
import { AuthService } from './modules/auth/auth.service';
import { CharacterModule } from './modules/character/character.module';
import { EmailModule } from './modules/email/email.module';
import { EmailService } from './modules/email/email.service';
import GraphQLJSON from 'graphql-type-json';
import { GraphQLModule } from '@nestjs/graphql';
import { LoggingInterceptor } from './common/logging/logging.interceptor';
import { LoggingMiddleware } from './common/logging/logging.middleware';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { ProfileModule } from './modules/profile/profile.module';
import { SearchModule } from './modules/search/search.module';
import { TimelineModule } from './modules/timeline/timeline.module';
import { UserModule } from './modules/user/user.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [configuration],
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      // autoSchemaFile: true,
      // debug: true,
      // playground: true,
      // resolvers: { JSON: GraphQLJSON },
      useFactory(config: ConfigService) {
        return {
          playground: true,
          debug: true,
          autoSchemaFile: true,
          resolvers: { JSON: GraphQLJSON },
          formatError(error) {
            const originalError = error.extensions?.originalError as Error;

            if (!originalError) {
              return {
                message: error.message,
                code: error.extensions?.code,
              };
            }

            return {
              message: originalError.message,
              code: error.extensions?.code,
            };
          },
        };
      },
    }),
    UserModule,
    PrismaModule,
    AuthModule,
    CharacterModule,
    TimelineModule,
    ProfileModule,
    SearchModule,
    EmailModule,
  ],
  controllers: [],
  providers: [
    PrismaService,
    AuthService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    EmailService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}