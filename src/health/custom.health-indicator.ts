import { Injectable } from '@nestjs/common';
import { HealthCheckError, HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';

@Injectable()
export class CustomHealthIndicator extends HealthIndicator {
  async isHealthy(key: string, fun: () => boolean): Promise<HealthIndicatorResult> {
    const isHealthy: boolean = fun();
    const result = this.getStatus(key, isHealthy);

    if (isHealthy)
      return result;
    throw new HealthCheckError('Custom health check failed', result);
  }
}
