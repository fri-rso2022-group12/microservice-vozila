import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TerminusModule } from '@nestjs/terminus';

import { CustomHealthIndicator } from './custom.health-indicator';
import { HealthController } from './health.controller';

@Module({
  imports: [
    HttpModule,
    TerminusModule,
  ],
  controllers: [
    HealthController,
  ],
  providers: [
    CustomHealthIndicator,
  ]
})
export class HealthModule {}
