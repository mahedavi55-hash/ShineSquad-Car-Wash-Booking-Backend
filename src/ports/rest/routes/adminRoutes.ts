import { Router } from 'express';
import { adminController } from '../../../infrastructure/container';
import { authMiddleware } from '../middleware/authMiddleware';
import { roleMiddleware } from '../middleware/roleMiddleware';
import { Role } from '../../../domain/enums/Role';

const router = Router();

router.use(authMiddleware, roleMiddleware([Role.ADMIN]));
router.patch('/bookings/:id/approve', adminController.approve);
router.patch('/bookings/:id/decline', adminController.decline);
router.patch('/bookings/:id/complete', adminController.complete);
router.patch('/bookings/:id/reschedule', adminController.reschedule);
router.get('/analytics', adminController.analytics);

export default router;