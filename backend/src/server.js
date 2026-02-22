import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';
import markRoutes from './routes/markRoutes.js';
import predictionRoutes from './routes/predictionRoutes.js';
import interventionRoutes from './routes/interventionRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 200 }));

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/marks', markRoutes);
app.use('/api/predictions', predictionRoutes);
app.use('/api/interventions', interventionRoutes);
app.use('/api/reports', reportRoutes);

app.use(errorHandler);

const port = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(port, () => console.log(`Backend listening on ${port}`));
});
