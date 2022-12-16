import { CallHandler, ExecutionContext, Injectable, Logger , NestInterceptor } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';

@Injectable()
export class HttpLoggingInterceptor implements NestInterceptor {
  private readonly logger: Logger = new Logger(HttpLoggingInterceptor.name);

  constructor(
    private readonly configService: ConfigService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (!this.configService.get<boolean>('LOG_REQUESTS'))
      return next.handle();
    
    const request: Request = context.switchToHttp().getRequest();

    this.logger.verbose(`${request.method} ${request.originalUrl} ENTRY`);

    return next.handle().pipe(tap(() => {
      const response: Response = context.switchToHttp().getResponse();
      this.logger.verbose(`${response.req.method} ${response.req.originalUrl} EXIT ${response.statusCode}`);
    }));
  }
}
