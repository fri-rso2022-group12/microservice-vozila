import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm'; 

import { Vozilo } from './vozilo.entity';

@Injectable()
export class VoziloService {
  constructor(
    @InjectRepository(Vozilo)
    private readonly voziloRepository: Repository<Vozilo>,
  ) {}

  async getAll(): Promise<Vozilo[]> {
    return await this.voziloRepository.find();
  }

  async getByModelId(id: number): Promise<Vozilo[]> {
    return await this.voziloRepository.findBy({ modelId: id });
  }

  // TODO: getByProizvajalecId

  async getById(id: number): Promise<Vozilo> {
    return await this.voziloRepository.findOneBy({ id: id });
  }

  async create(vozilo: DeepPartial<Vozilo>): Promise<void> {
    await this.voziloRepository.insert(vozilo);
  }

  async update(id: number, vozilo: DeepPartial<Vozilo>): Promise<void> {
    await this.voziloRepository.update(id, vozilo);
  }

  async delete(id: number): Promise<void> {
    await this.voziloRepository.delete(id);
  }

  async deleteByModelId(modelId: number): Promise<void> {
    await this.voziloRepository.delete({ modelId: modelId });
  }
}
