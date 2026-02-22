import { parse } from 'csv-parse/sync';
import Student from '../models/Student.js';

export const createStudent = async (req, res) => {
  const student = await Student.create(req.body);
  res.status(201).json(student);
};

export const getStudents = async (req, res) => {
  const students = await Student.find().sort({ createdAt: -1 });
  res.json(students);
};

export const updateStudent = async (req, res) => {
  const updated = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

export const deleteStudent = async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: 'Student deleted' });
};

export const bulkUploadStudents = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'CSV file required' });

  const records = parse(req.file.buffer.toString(), { columns: true, skip_empty_lines: true });
  const students = records.map((r) => ({
    fullName: r.fullName,
    age: Number(r.age) || null,
    gender: r.gender,
    classGrade: r.classGrade,
    schoolName: r.schoolName,
    familyIncomeRange: r.familyIncomeRange,
    parentEducationLevel: r.parentEducationLevel,
    distanceFromSchoolKm: Number(r.distanceFromSchoolKm) || 0,
    accessToTransportation: r.accessToTransportation === 'true'
  }));

  const inserted = await Student.insertMany(students);
  res.status(201).json({ inserted: inserted.length });
};
