import Mark from '../models/Mark.js';

export const addMark = async (req, res) => {
  const mark = await Mark.create(req.body);
  res.status(201).json(mark);
};

export const getMarksByStudent = async (req, res) => {
  const marks = await Mark.find({ student: req.params.studentId }).sort({ createdAt: -1 });
  const average = marks.length ? marks.reduce((a, b) => a + b.score, 0) / marks.length : 0;
  res.json({ marks, average: Number(average.toFixed(2)) });
};
