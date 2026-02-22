import Attendance from '../models/Attendance.js';

export const markAttendance = async (req, res) => {
  const { student, date, status } = req.body;
  const record = await Attendance.create({ student, date, status });
  res.status(201).json(record);
};

export const getAttendanceSummary = async (req, res) => {
  const records = await Attendance.find({ student: req.params.studentId });
  const total = records.length;
  const present = records.filter((r) => r.status === 'present').length;
  const percentage = total ? (present / total) * 100 : 0;
  res.json({ total, present, absent: total - present, percentage: Number(percentage.toFixed(2)) });
};
