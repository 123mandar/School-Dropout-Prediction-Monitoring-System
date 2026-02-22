import Student from '../models/Student.js';
import Attendance from '../models/Attendance.js';
import Intervention from '../models/Intervention.js';

export const attendanceReport = async (req, res) => {
  const records = await Attendance.find();
  res.json({ generatedAt: new Date(), totalRecords: records.length, records });
};

export const riskDistributionReport = async (req, res) => {
  const students = await Student.find();
  const distribution = students.reduce(
    (acc, s) => {
      acc[s.latestRiskCategory] = (acc[s.latestRiskCategory] || 0) + 1;
      return acc;
    },
    { 'Low Risk': 0, 'Medium Risk': 0, 'High Risk': 0 }
  );
  res.json({ generatedAt: new Date(), distribution });
};

export const interventionEffectivenessReport = async (req, res) => {
  const interventions = await Intervention.find();
  const outcomes = interventions.reduce((acc, i) => {
    const key = i.outcome || 'Unknown';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  res.json({ generatedAt: new Date(), totalInterventions: interventions.length, outcomes });
};
