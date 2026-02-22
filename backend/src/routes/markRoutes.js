import { Router } from 'express';
import { addMark, getMarksByStudent } from '../controllers/markController.js';
import { auth, authorize } from '../middleware/authMiddleware.js';

const router = Router();
router.use(auth);
router.post('/', authorize('teacher', 'admin', 'super_admin'), addMark);
router.get('/:studentId', getMarksByStudent);

export default router;
