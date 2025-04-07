import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthJwtPayload } from '../types/auth-jwt.payload';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow('JWT_SECRET'),
    });
  }

  validate(payload: AuthJwtPayload) {
    const { userId } = payload.sub;
    const user = this.authService.validateJwtUser(userId);

    // req.user will be available in the controller/resolver
    return user;
  }
}
