import { Injectable, NestMiddleware, ServiceUnavailableException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ConsulService } from 'nestjs-consul';

@Injectable()
export class MaintenanceMiddleware implements NestMiddleware {

  constructor(
    private readonly consulService: ConsulService<{ MAINTENANCE_MODE: boolean }>,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    if (this.consulService.configs.MAINTENANCE_MODE || false)
      throw new ServiceUnavailableException('Service is currently in maintenance mode');
    next();
  }
}
