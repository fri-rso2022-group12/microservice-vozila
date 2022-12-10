import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService, HttpHealthIndicator, TypeOrmHealthIndicator } from '@nestjs/terminus';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly health: HealthCheckService,
    private readonly db: TypeOrmHealthIndicator,
    private readonly http: HttpHealthIndicator,
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
      () => this.http.pingCheck('consul', `${this.configService.get<string>('CONSUL_PROTOCOL')}://${this.configService.get<string>('CONSUL_HOST')}:${this.configService.get<number>('CONSUL_PORT')}/v1/status/leader`, { timeout: 2000 }),
    ]);
  }
}
