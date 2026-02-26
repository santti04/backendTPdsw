import {
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
  Rel,
  Collection,
} from '@mikro-orm/core';
import { Mascota } from '../Mascota/mascota.entity.js';
import { Especie } from '../Especie/especie.entity.js';

@Entity()
export class Raza {
  @PrimaryKey()
  id!: number;

  @Property()
  nombre!: string;

  @OneToMany(() => Mascota, (mascota) => mascota.raza)
  mascotas = new Collection<Mascota>(this);

  @ManyToOne(() => Especie, { nullable: false })
  especie!: Rel<Especie>;
}
