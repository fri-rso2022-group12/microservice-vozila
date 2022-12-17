import { HttpModuleOptions, HttpModuleOptionsFactory } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HttpConfigService implements HttpModuleOptionsFactory {
  
  constructor(
    private readonly configService: ConfigService,
  ) {}

  createHttpOptions(): HttpModuleOptions | Promise<HttpModuleOptions> {
    return {
      timeout: this.configService.get<number>('HTTP_TIMEOUT'),
    };
  }
}
