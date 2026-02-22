import { Router } from 'express';
import { runPrediction } from '../controllers/predictionController.js';
import { auth } from '../middleware/authMiddleware.js';

const router = Router();
router.use(auth);
router.post('/:studentId', runPrediction);

export default router;
