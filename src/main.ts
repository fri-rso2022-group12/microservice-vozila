import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
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
  const port = configService.get<number>('PORT');

  // Middlewares
  app.use(compression());
  app.use(helmet());
  app.enableCors();
  app.enableShutdownHooks();

  // API documentation
  if (enableDocs) {
    const docConfig = new DocumentBuilder()
      .setTitle('Tip vozil')
      .setDescription('Tip vozil API description')
      .setVersion(getAppVersion())
      // TODO: .addTag('tag', 'Title')
      .build();
    const document = SwaggerModule.createDocument(app, docConfig);
    SwaggerModule.setup(docPath, app, document);
  }

  await app.listen(port);
}
bootstrap();
