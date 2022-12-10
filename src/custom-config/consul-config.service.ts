import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IConsulConfig } from 'nestjs-consul/dist/interfaces/consul-config.interface';

@Injectable()
export class ConsulConfigService {

  constructor(
    private readonly configService: ConfigService,
  ) {}

  getConfig(): IConsulConfig {
    return {
      keys: [
        { key: 'MAINTENANCE_MODE' },
      ],
      updateCron: this.configService.get<string>('CONSUL_CRON'),
      connection: {
        protocol: this.configService.get<'http' | 'https'>('CONSUL_PROTOCOL'),
        port: this.configService.get<number>('CONSUL_PORT'),
        host: this.configService.get<string>('CONSUL_HOST'),
        token: this.configService.get<string>('CONSUL_TOKEN'),
      }
    };
  }
}
