import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Vozilo } from './vozilo.entity';
import { VoziloController } from './vozilo.controller';
import { VoziloService } from './vozilo.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Vozilo,
    ]),
  ],
  providers: [VoziloService],
  controllers: [VoziloController]
})
export class VoziloModule {}
