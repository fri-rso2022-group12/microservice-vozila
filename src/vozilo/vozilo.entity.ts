import { CreateDateColumn, Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Vozilo {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ length: 16 })
  registrskaOznaka: string;

  @Column({ length: 64, nullable: true })
  vin: string | null;

  @Column({ unsigned: true })
  modelId: number;

  @Column({ type: 'float', unsigned: true, nullable: true })
  kapaciteta: number | null;

  @CreateDateColumn()
  dateCreated: string;

  @UpdateDateColumn()
  dateUpdated: string;

  // TODO:
  // - barva
  // - tip goriva
  // - moč motorja
  // - število sedežev
  // - datumPrveRegistracije
  //
  // TODO: Dodatne tabele ?
  // - Tankanje
  // - Seznam servisnih pregledov
  // - Seznam voženj

}
