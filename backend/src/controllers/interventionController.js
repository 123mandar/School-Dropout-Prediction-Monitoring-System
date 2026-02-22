import Intervention from '../models/Intervention.js';

export const addIntervention = async (req, res) => {
  const entry = await Intervention.create({ ...req.body, createdBy: req.user?._id });
  res.status(201).json(entry);
};

export const getInterventions = async (req, res) => {
  const rows = await Intervention.find({ student: req.params.studentId }).sort({ date: -1 });
  res.json(rows);
};
