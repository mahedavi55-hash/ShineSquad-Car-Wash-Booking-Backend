import { Router } from 'express';
import { slotController } from '../../../infrastructure/container';
import { authMiddleware } from '../middleware/authMiddleware';
import { roleMiddleware } from '../middleware/roleMiddleware';
import { Role } from '../../../domain/enums/Role';

const router = Router();

router.get('/available', slotController.getAvailable);
router.post('/', authMiddleware, roleMiddleware([Role.ADMIN]), slotController.create);

export default router;
