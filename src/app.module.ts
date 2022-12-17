import { HttpModule } from '@nestjs/axios';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { ConsulModule } from 'nestjs-consul';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConsulConfigService } from './custom-config/consul-config.service';
import { CustomConfigModule } from './custom-config/custom-config.module';
import { DatabaseConfigService } from './custom-config/database-config.service';
import { HealthModule } from './health/health.module';
import { HttpConfigService } from './custom-config/http-config.service';
import { HttpLoggingInterceptor } from './http-logging.interceptor';
import { MaintenanceMiddleware } from './maintenance.middleware';
import { VoziloModule } from './vozilo/vozilo.module';

@Module({
  imports: [
    CustomConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [CustomConfigModule],
      useExisting: DatabaseConfigService,
    }),
    HttpModule.registerAsync({
      imports: [CustomConfigModule],
      useExisting: HttpConfigService,
    }),
    HealthModule,
    PrometheusModule.register(),
    ConsulModule.forRootAsync({
      imports: [CustomConfigModule],
      inject: [ConsulConfigService],
      useFactory: async (consulConfigService: ConsulConfigService) => {
				return consulConfigService.getConfig();
			},
    }),
    VoziloModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpLoggingInterceptor,
    },
    AppService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MaintenanceMiddleware)
      .exclude('health/(.*)')
      .forRoutes('*');
  }
}
