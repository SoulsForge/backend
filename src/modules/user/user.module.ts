import { EmailModule } from '../email/email.module';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  providers: [UserResolver, UserService],
  imports: [PrismaModule, EmailModule],
  exports: [UserService],
})
export class UserModule {}
