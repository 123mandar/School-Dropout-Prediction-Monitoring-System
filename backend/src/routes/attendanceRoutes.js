import { Router } from 'express';
import { getAttendanceSummary, markAttendance } from '../controllers/attendanceController.js';
import { auth, authorize } from '../middleware/authMiddleware.js';

const router = Router();
router.use(auth);
router.post('/mark', authorize('teacher', 'admin', 'super_admin'), markAttendance);
router.get('/summary/:studentId', getAttendanceSummary);

export default router;
