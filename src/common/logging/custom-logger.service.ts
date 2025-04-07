import { LoggerService } from '@nestjs/common';
import { requestContext } from './request.context';

const Colors = {
  Reset: '\x1b[0m',
  Green: '\x1b[32m',
  Purple: '\x1b[35m',
  Yellow: '\x1b[33m',
  Red: '\x1b[31m',
  Cyan: '\x1b[36m',
  Gray: '\x1b[90m',
};

export class CustomLogger implements LoggerService {
  private getTimestamp(): string {
    const date = new Date();
    return date.toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  }

  private formatLevel(level: string): string {
    switch (level.trim()) {
      case 'LOG':
        return `${Colors.Green}${level}${Colors.Reset}`;
      case 'DEBUG':
        return `${Colors.Purple}${level}${Colors.Reset}`;
      case 'WARN':
        return `${Colors.Yellow}${level}${Colors.Reset}`;
      case 'ERROR':
        return `${Colors.Red}${level}${Colors.Reset}`;
      default:
        return level;
    }
  }

  private buildLog(
    level: string,
    context: string,
    message: string,
    correlationId?: string,
  ): string {
    const appName = `${Colors.Cyan}[SoulsForge]${Colors.Reset}`;
    const pid = `${Colors.Gray}${process.pid.toString()}${Colors.Reset}`;
    const timestamp = `${Colors.Gray}${this.getTimestamp().replace('a. m.', 'A.M.').replace('p. m.', 'P.M.')}${Colors.Reset}`;
    const ctx = context ? `${Colors.Cyan}[${context}]${Colors.Reset}` : '';
    const cid = correlationId
      ? `${Colors.Gray}[${correlationId}]${Colors.Reset}`
      : '';

    return [
      `${appName} ${pid}  - ${timestamp}`,
      this.formatLevel(level.padEnd(5)),
      ctx,
      cid,
      message,
    ].join(' ');
  }

  log(message: string, context?: string) {
    const store = requestContext.getStore();
    console.log(
      this.buildLog('LOG', context || '', message, store?.correlationId),
    );
  }

  error(message: string, context?: string) {
    const store = requestContext.getStore();
    console.error(
      this.buildLog('ERROR', context || '', message, store?.correlationId),
    );
  }

  warn(message: string, context?: string) {
    const store = requestContext.getStore();
    console.warn(
      this.buildLog('WARN', context || '', message, store?.correlationId),
    );
  }

  debug(message: string, context?: string) {
    const store = requestContext.getStore();
    console.debug(
      this.buildLog('DEBUG', context || '', message, store?.correlationId),
    );
  }
}
