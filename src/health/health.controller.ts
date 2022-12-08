import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService, HttpHealthIndicator, TypeOrmHealthIndicator } from '@nestjs/terminus';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
    private http: HttpHealthIndicator,
  ) {}

  @Get('live')
  @ApiOperation({ description: 'Is service alive' })
  @ApiOkResponse()
  async live() {
    return { status: 'ok' };
  }

  @Get('ready')
  @HealthCheck()
  @ApiOperation({ description: 'Is searvice running and ready to server requests' })
  async ready() {
    return this.health.check([
      () => this.db.pingCheck('database'),
    ]);
  }
}
