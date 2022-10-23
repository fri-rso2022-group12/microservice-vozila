import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';


@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory {
  private readonly logger = new Logger(DatabaseConfigService.name);

  constructor(
    private readonly configService: ConfigService,
  ) {}

  createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
      type: this.configService.get<any>('TYPEORM_CONNECTION'),
      host: this.configService.get<string>('TYPEORM_HOST'),
      port: this.configService.get<number>('TYPEORM_PORT'),
      username: this.configService.get<string>('TYPEORM_USERNAME'),
      password: this.configService.get<string>('TYPEORM_PASSWORD'),
      database: this.configService.get<string>('TYPEORM_DATABASE'),
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/../migration/**/*{.ts,.js}'],
      synchronize: this.configService.get<boolean>('TYPEORM_SYNCHRONIZE'),
      logging: this.configService.get<boolean>('TYPEORM_LOGGING'),
    };
  }
}
