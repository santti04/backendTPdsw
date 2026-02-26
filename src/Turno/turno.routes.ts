import { Router } from 'express';
import {
  sanitizeTurnoInput,
  findAll,
  findOne,
  completarTurno,
  add,
  update,
  remove,
} from './turno.controller.js';
import { ORM } from '../shared/db/orm.js';
import { Turno } from './turno.entity.js';
import { EstadoTurno } from './turno.enum.js';

export const turnoRouter = Router();

turnoRouter.get('/', findAll);
turnoRouter.get('/:id', findOne);
turnoRouter.post('/', sanitizeTurnoInput, add);
turnoRouter.put('/:id', sanitizeTurnoInput, update);
turnoRouter.delete('/:id', sanitizeTurnoInput, remove);
turnoRouter.patch('/:turnoId/completar', completarTurno);

// ⚠️ SOLO PARA DESARROLLO — fuerza un turno a COMPLETADO sin validar tiempo
if (process.env.NODE_ENV !== 'production') {
  turnoRouter.patch('/:turnoId/forzar-completado', async (req, res) => {
    try {
      const turnoId = parseInt(req.params.turnoId, 10);
      const em = ORM.em.fork();
      const turno = await em.findOne(Turno, { id: turnoId });
      if (!turno) return res.status(404).json({ message: 'Turno no encontrado.' });
      turno.estado = EstadoTurno.COMPLETADO;
      await em.persistAndFlush(turno);
      res.status(200).json({ message: `Turno ${turnoId} marcado como COMPLETADO (modo dev).` });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
}
