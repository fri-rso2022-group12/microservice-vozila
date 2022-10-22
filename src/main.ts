import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import * as compression from 'compression';
import helmet from 'helmet';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Get configuration
  const port = configService.get<number>('PORT');

  // Middlewares
  app.use(compression());
  app.use(helmet());
  app.enableCors();
  app.enableShutdownHooks();
  
  await app.listen(port);
}
bootstrap();
