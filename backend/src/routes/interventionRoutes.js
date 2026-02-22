import { Router } from 'express';
import { addIntervention, getInterventions } from '../controllers/interventionController.js';
import { auth, authorize } from '../middleware/authMiddleware.js';

const router = Router();
router.use(auth);
router.post('/', authorize('teacher', 'counselor', 'admin', 'super_admin'), addIntervention);
router.get('/:studentId', getInterventions);

export default router;
