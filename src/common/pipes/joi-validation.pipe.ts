import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(
    private schema: ObjectSchema,
  ) {}
  
  transform(valueIn: any, metadata: ArgumentMetadata) {
    const { error, value } = this.schema.validate(valueIn);
    if (error)
      throw new BadRequestException('Validation failed');

    return value
  }
}
