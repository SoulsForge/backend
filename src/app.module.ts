import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './modules/database/database.module';
import { AuthService } from './modules/auth/auth.service';
import { AuthController } from './modules/auth/auth.controller';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './configs/constants';
import { GameModule } from './modules/game/game.module';
import { BaseCharacterModule } from './modules/character/base-character/base-character.module';
import { EldenRingCharacterModule } from './modules/character/eldenring/elden-ring-character/elden-ring-character.module';
import { EldenRingAtributesModule } from './modules/character/eldenring/elden-ring-atributes/elden-ring-atributes.module';

@Module({
  imports: [
    UserModule,
    DatabaseModule,
    AuthModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30d' },
    }),
    GameModule,
    BaseCharacterModule,
    EldenRingCharacterModule,
    EldenRingAtributesModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}
