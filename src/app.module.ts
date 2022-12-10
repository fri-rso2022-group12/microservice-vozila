import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomConfigModule } from './custom-config/custom-config.module';
import { DatabaseConfigService } from './custom-config/database-config.service';
import { HealthModule } from './health/health.module';
import { VoziloModule } from './vozilo/vozilo.module';

@Module({
  imports: [
    CustomConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [CustomConfigModule],
      useExisting: DatabaseConfigService,
    }),
    HealthModule,
    PrometheusModule.register(),
    VoziloModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
