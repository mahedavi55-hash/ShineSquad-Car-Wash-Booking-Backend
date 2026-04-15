import { Router } from 'express';
import { serviceController } from '../../../infrastructure/container';
import { authMiddleware } from '../middleware/authMiddleware';
import { roleMiddleware } from '../middleware/roleMiddleware';
import { Role } from '../../../domain/enums/Role';

const router = Router();

router.get('/', serviceController.getAll);
router.post('/', authMiddleware, roleMiddleware([Role.ADMIN]), serviceController.create);

export default router;
