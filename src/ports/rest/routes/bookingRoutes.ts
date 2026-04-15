import { Router } from 'express';
import { bookingController } from '../../../infrastructure/container';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/guest', bookingController.createGuest);
router.post('/', authMiddleware, bookingController.createUser);
router.get('/my', authMiddleware, bookingController.getMine);
router.patch('/:id/cancel', authMiddleware, bookingController.cancel);

export default router;
