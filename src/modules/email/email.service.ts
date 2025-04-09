import { Injectable, Logger } from '@nestjs/common';
import { Transporter, createTransport } from 'nodemailer';

import { ConfigService } from '@nestjs/config';

export type FROM = 'accounts' | 'support' | 'noreply';

@Injectable()
export class EmailService {
  private readonly transporter: Transporter;
  private readonly domain: string;
  private readonly logger: Logger = new Logger(EmailService.name);

  constructor(private configService: ConfigService) {
    const { smtpDomain, smtpEndpoint, smtpUsername, smtpPassword } =
      configService.get('smtpConfig');

    // todo: create a bussines email
    this.domain = smtpDomain;
    this.transporter = createTransport({
      service: 'Gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: smtpUsername,
        pass: smtpPassword,
      },
    });
  }

  async sendMail(
    fromId: FROM,
    to: string,
    subject: string,
    body: string,
  ): Promise<boolean> {
    this.logger.log(`Sending email from ${fromId} to ${to}`);
    // const from = `${fromId}@${this.domain}`;
    const from = this.configService.get('smtpConfig.smtpUsername');
    const info = await this.transporter.sendMail({
      from,
      to,
      subject,
      html: body,
    });

    if (info.message) {
      return true;
    } else {
      return false;
    }
  }
}
