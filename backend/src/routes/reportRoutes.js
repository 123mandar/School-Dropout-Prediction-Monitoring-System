import { Router } from 'express';
import {
  attendanceReport,
  interventionEffectivenessReport,
  riskDistributionReport
} from '../controllers/reportController.js';
import { auth, authorize } from '../middleware/authMiddleware.js';

const router = Router();
router.use(auth, authorize('admin', 'super_admin'));
router.get('/attendance', attendanceReport);
router.get('/risk-distribution', riskDistributionReport);
router.get('/intervention-effectiveness', interventionEffectivenessReport);

export default router;
