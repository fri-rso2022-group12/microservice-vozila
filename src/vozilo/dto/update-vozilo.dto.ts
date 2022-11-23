import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';

export class UpdateVoziloDto {
  @ApiProperty({
    description: 'Registrska oznaka',
    example: 'LJ SK-ODA',
    maxLength: 16,
    minLength: 1,
    required: false,
    type: String,
  })
  registrskaOznaka: string;

  @ApiProperty({
    description: 'Številka šasije avtomobila',
    example: 'ABX94KE9',
    maxLength: 64,
    minLength: 1,
    nullable: true,
    required: false,
    type: String,
  })
  vin: string | null;

  @ApiProperty({
    description: 'Model avtomobila',
    example: 1,
    minimum: 1,
    required: false,
    type: Number,
  })
  modelId: number;

  @ApiProperty({
    description: 'Kapaciteta goriva',
    example: 55,
    minimum: 0,
    nullable: true,
    required: false,
    type: Number,
  })
  kapaciteta: number | null;
}

export const UpdateVoziloSchema = Joi.object({
  id: Joi.any().strip(),
  registrskaOznaka: Joi.string().min(1).max(16),
  vin: Joi.string().min(1).max(64).allow(null),
  modelId: Joi.number().min(1),
  kapaciteta: Joi.number().min(0).allow(null),
  dateCreated: Joi.any().strip(),
  dateUpdate: Joi.any().strip(),
});
