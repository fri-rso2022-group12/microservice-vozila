import { Body, Controller, Delete, Get, NotFoundException, Post, Patch, Param, ParseIntPipe } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse, ApiTags } from '@nestjs/swagger';

import { CreateVoziloDto, CreateVoziloSchema } from './dto/create-vozilo.dto';
import { JoiValidationPipe } from '../common/pipes/joi-validation.pipe'
import { UpdateVoziloDto, UpdateVoziloSchema } from './dto/update-vozilo.dto';
import { Vozilo } from './vozilo.entity';
import { VoziloService } from './vozilo.service';

@ApiTags('vozilo')
@ApiBadRequestResponse({ description: 'Bad request' })
@ApiForbiddenResponse({ description: 'Ni ustreznih dovoljenj' })
@ApiUnauthorizedResponse({ description: 'Dostop dovoljen zgolj prijavljenim osebam' })
@Controller('vozilo')
export class VoziloController {
  constructor(
    private readonly voziloService: VoziloService,
  ) {}

  @Get()
  @ApiOperation({ description: 'Pridobi vsa vozila' })
  @ApiOkResponse()
  async getAll(): Promise<Vozilo[]> {
    return await this.voziloService.getAll();
  }

  @Get('model/:modelId')
  @ApiOperation({ description: 'Pridobi vsa vozila določenega modela' })
  @ApiOkResponse()
  async getByModelId(
    @Param('modelId', ParseIntPipe) id: number,
  ): Promise<Vozilo[]> {
    return await this.voziloService.getByModelId(id);
  }

  @Get(':id')
  @ApiOperation({ description: 'Pridobi vozilo z določenim identifikatorjem' })
  @ApiOkResponse()
  async getVoziloById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Vozilo> {
    const vozilo = await this.voziloService.getById(id);
    if (!vozilo)
      throw new NotFoundException('Vozilo ne obstaja');
    return vozilo;
  }

  @Post()
  @ApiOperation({ description: 'UStvari novo vozilo' })
  @ApiCreatedResponse()
  async create(
    @Body(new JoiValidationPipe(CreateVoziloSchema)) vozilo: CreateVoziloDto,
  ): Promise<void> {
    await this.voziloService.create(vozilo);
  }

  @Patch(':id')
  @ApiOperation({ description: 'Posodobi obstoječe vozilo' })
  @ApiOkResponse()
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new JoiValidationPipe(UpdateVoziloSchema)) vozilo: UpdateVoziloDto,
  ): Promise<void> {
    await this.voziloService.update(id, vozilo);
  }

  @Delete(':id')
  @ApiOperation({ description: 'Izbriši vozilo' })
  @ApiOkResponse()
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    await this.voziloService.delete(id);
  }
}
