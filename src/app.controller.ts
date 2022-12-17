import { HttpService } from '@nestjs/axios';
import { Controller, Get, Logger, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOperation } from '@nestjs/swagger';
import * as CircuitBreaker from 'opossum';
import { catchError, firstValueFrom, map, tap, throwError } from 'rxjs';

import { AppService } from './app.service';

@Controller()
export class AppController {
  private logger: Logger = new Logger(AppController.name);

  private breaker;

  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
    private readonly http: HttpService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test')
  @ApiOperation({ description: 'Test circuit breaker' })
  async test() {
    if (!this.breaker) {
      const options = {
        timeout: 2000,
        errorTresholdPercentage: 50,
        resetTimeout: 30000,
      };
      const fn = async () => {
        return await firstValueFrom(this.http.get(`${this.configService.get<string>('TIPVOZILAPI_URL')}/health/live`, {
          timeout: 3000
        }).pipe(
          map(v => v.data),
          tap(() => this.logger.warn('API: Success')),
          catchError(error => {
            this.logger.warn('API: Error');
            return throwError(() => error);
          })
        ));
      };
      this.breaker = new CircuitBreaker(fn, options);
      this.breaker.fallback(() => { throw new ServiceUnavailableException('Test ABC'); });
      this.breaker.on('failure', () => {
        this.logger.warn('CircuitBreaker fail');
      });
      this.breaker.on('reject', () => {
        this.logger.warn('CircuitBreaker reject');
      });
      this.breaker.on('open', () => {
        this.logger.warn('CircuitBreaker open');
      });
      this.breaker.on('close', () => {
        this.logger.warn('CircuitBreaker close');
      });
      this.breaker.on('halfOpen', () => {
        this.logger.warn('CircuitBreaker halfOpen');
      });
    }
    return await this.breaker.fire();
  }
}
