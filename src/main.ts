import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import * as fs from 'fs';
import helmet from 'helmet';

import { AppModule } from './app.module';

function getAppVersion(): string {
  if (fs.existsSync('package.json')) {
    try {
      const pkg = JSON.parse(fs.readFileSync('package.json').toLocaleString());
      return pkg.version || 'unknown';
    } catch {
      return 'unknown';
    }
  }
  return 'unknown';
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Get configuration
  const docPath = configService.get<string>('DOC_PATH');
  const enableDocs = configService.get<boolean>('DOCS');
  const globalPrefix = configService.get<string>('GLOBAL_PREFIX');
  const kafkaBroker = configService.get<string>('KAFKA_BROKER');
  const port = configService.get<number>('PORT');

  // REST global prefix
  if (globalPrefix)
    app.setGlobalPrefix(globalPrefix);

  // Kafka
  const kafka = await app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [kafkaBroker],
      },
      consumer: {
        groupId: 'rso-ms-vozila-vozila',
      },
    }
  });

  // Middlewares
  app.use(compression());
  app.use(helmet({
    contentSecurityPolicy: false,
  }));
  app.enableCors();
  app.enableShutdownHooks();

  // API documentation
  if (enableDocs) {
    const docConfig = new DocumentBuilder()
      .setTitle('Vozilo')
      .setDescription('Vozilo API description')
      .setVersion(getAppVersion())
      .addTag('health', 'Health')
      .addTag('vozilo', 'Vozilo')
      .build();
    const document = SwaggerModule.createDocument(app, docConfig);
    SwaggerModule.setup(docPath, app, document);
  }

  await app.startAllMicroservices();
  await app.listen(port);
}
bootstrap();
