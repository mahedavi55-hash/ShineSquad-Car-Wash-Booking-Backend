import { Router } from 'express';
import authRoutes from './authRoutes';
import serviceRoutes from './serviceRoutes';
import slotRoutes from './slotRoutes';
import bookingRoutes from './bookingRoutes';
import adminRoutes from './adminRoutes';

const router = Router();

router.get('/health', (_req, res) => {
  res.status(200).json({ success: true, message: 'ShineSquad API is running.' });
});

router.use('/auth', authRoutes);
router.use('/services', serviceRoutes);
router.use('/slots', slotRoutes);
router.use('/bookings', bookingRoutes);
router.use('/admin', adminRoutes);

export default router;
