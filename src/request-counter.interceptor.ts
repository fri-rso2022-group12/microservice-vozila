import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter } from 'prom-client';
import { Observable } from 'rxjs';

@Injectable()
export class RequestCounterInterceptor implements NestInterceptor {
  
  constructor(
    @InjectMetric('request_served')
    private readonly requestCounter: Counter<string>,
  ) {}
  
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.requestCounter.inc();
    return next.handle();
  }
}
