import Student from '../models/Student.js';
import Attendance from '../models/Attendance.js';
import Mark from '../models/Mark.js';
import { predictDropout } from '../services/mlService.js';

export const runPrediction = async (req, res) => {
  const student = await Student.findById(req.params.studentId);
  if (!student) return res.status(404).json({ message: 'Student not found' });

  const attendance = await Attendance.find({ student: student._id });
  const marks = await Mark.find({ student: student._id });
  const present = attendance.filter((a) => a.status === 'present').length;
  const attendancePct = attendance.length ? (present / attendance.length) * 100 : 0;
  const avgMarks = marks.length ? marks.reduce((s, m) => s + m.score, 0) / marks.length : 0;

  const prediction = await predictDropout({
    attendance_percentage: attendancePct,
    academic_performance: avgMarks,
    socioeconomic_score: student.familyIncomeRange?.includes('Low') ? 30 : 70,
    gender: student.gender || 'Other',
    distance_from_school: student.distanceFromSchoolKm || 0,
    previous_failures: student.previousFailures || 0,
    behavioral_flags: student.behavioralFlags || 0
  });

  student.latestRiskScore = prediction.riskScore;
  student.latestRiskCategory = prediction.riskCategory;
  await student.save();

  res.json({ studentId: student._id, ...prediction });
};
