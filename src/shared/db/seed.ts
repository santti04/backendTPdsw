import { ORM } from './orm.js';
import { Especie } from '../../Especie/especie.entity.js';
import { Raza } from '../../Raza/raza.entity.js';

export async function seedDatabase() {
  const em = ORM.em.fork();

  // Verificamos si ya existen especies en la tabla
  const cantEspecies = await em.count(Especie);
  if (cantEspecies > 0) {
    console.log('Las especies y razas ya han sido cargadas previamente.');
    return;
  }

  console.log('Iniciando carga automática de Especies y Razas...');

  const especiesData = [
    {
      nombre: 'Perro',
      razas: ['Mestizo', 'Caniche', 'Labrador Retriever', 'Bulldog Francés'],
    },
    {
      nombre: 'Gato',
      razas: ['Mestizo', 'Siamés', 'Persa', 'Maine Coon'],
    },
    {
      nombre: 'Conejo',
      razas: ['Cabeza de León', 'Belier', 'Angora', 'Rex'],
    },
    {
      nombre: 'Ave',
      razas: ['Canario', 'Periquito australiano', 'Cacatúa', 'Loro'],
    },
    {
      nombre: 'Roedor',
      razas: ['Hámster Sirio', 'Hámster Ruso', 'Cobaya', 'Chinchilla'],
    },
  ];

  for (const item of especiesData) {
    const especie = em.create(Especie, { nombre: item.nombre });

    for (const razaNombre of item.razas) {
      const raza = em.create(Raza, { nombre: razaNombre, especie });
      em.persist(raza);
    }

    em.persist(especie);
  }

  await em.flush();
  console.log('Especies y razas cargadas exitosamente en la base de datos.');
}
