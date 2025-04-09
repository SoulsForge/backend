import { ConfigModule } from '@nestjs/config';
import { EmailService } from './email.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [EmailService],
  exports: [EmailService],
  imports: [ConfigModule],
})
export class EmailModule {}
