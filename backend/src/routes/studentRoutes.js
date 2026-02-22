import { Router } from 'express';
import multer from 'multer';
import {
  bulkUploadStudents,
  createStudent,
  deleteStudent,
  getStudents,
  updateStudent
} from '../controllers/studentController.js';
import { auth, authorize } from '../middleware/authMiddleware.js';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.use(auth);
router.get('/', getStudents);
router.post('/', authorize('super_admin', 'admin', 'teacher'), createStudent);
router.put('/:id', authorize('super_admin', 'admin', 'teacher'), updateStudent);
router.delete('/:id', authorize('super_admin', 'admin'), deleteStudent);
router.post('/bulk-upload', authorize('super_admin', 'admin'), upload.single('file'), bulkUploadStudents);

export default router;
